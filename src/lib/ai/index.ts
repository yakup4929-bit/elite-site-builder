import Anthropic from "@anthropic-ai/sdk";
import type { BlockContent, BlockType, LocalizedContent, SiteBlock, SiteConfig } from "@/types";
import { describeLocale, normaliseLocales } from "@/lib/i18n/locales";
import { applyLocaleQuota, blockTypesFor, getPlan, type Plan } from "@/lib/plans";
import { findDensity, findTone } from "@/lib/options";

/**
 * An identity-linked API key must say which workspace it acts in, or the API
 * rejects the request with 400 `anthropic-workspace-id is required`. The SDK
 * only picks ANTHROPIC_WORKSPACE_ID up through the profile/federation path, not
 * from a plain `new Anthropic({ apiKey })`, so the header is set here. Ordinary
 * workspace-scoped keys do not need it — the header is omitted when unset
 * rather than sent empty, which would itself be rejected.
 */
const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  ...(workspaceId ? { defaultHeaders: { "anthropic-workspace-id": workspaceId } } : {}),
});

/**
 * Generation runs in two passes rather than asking for every language at once.
 *
 * One request for all languages was the original design and it read well, but
 * measurement killed it: output grows about 2,600 tokens per language, so six
 * languages took 240 seconds and twenty would take roughly thirteen minutes and
 * approach the output ceiling. The Business tier sells twenty languages — that
 * shape simply does not work.
 *
 * So: one pass writes the whole site in the primary language, deciding the
 * structure, the palette and the offer. The remaining languages are then written
 * concurrently against that result, which makes wall-clock roughly constant no
 * matter how many are asked for.
 *
 * The second pass is still writing, not translating. Each language gets the
 * brief and the structure, and is told to write the way that market writes — the
 * primary version is there so the offer and the block order stay identical, not
 * to be rendered word for word.
 */

const GENERATION_MODEL = "claude-opus-5";

// Claude Opus 5 list price per million tokens (Aug 2026).
const PRICE_PER_MTOK = { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 };

/** Concurrency cap: enough to keep wall-clock flat, low enough to stay clear of rate limits. */
const MAX_PARALLEL_LOCALES = 8;

export interface GenerationUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  /** USD, from the model's list price at time of writing. */
  estimatedCostUsd: number;
  model: string;
  localeCount: number;
  /** How many model calls this generation took — one, plus one per extra language. */
  requests: number;
}

export interface GenerateResult {
  config: SiteConfig;
  rejectedLocales: string[];
  usage: GenerationUsage;
}

type RawUsage = {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
};

function priceUsage(usage: RawUsage): number {
  return (
    (usage.input_tokens * PRICE_PER_MTOK.input +
      usage.output_tokens * PRICE_PER_MTOK.output +
      (usage.cache_read_input_tokens ?? 0) * PRICE_PER_MTOK.cacheRead +
      (usage.cache_creation_input_tokens ?? 0) * PRICE_PER_MTOK.cacheWrite) /
    1_000_000
  );
}

// --------------------------------------------------------------------- schemas

const CONTENT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" },
    description: { type: "string" },
    ctaText: { type: "string" },
    ctaLink: { type: "string" },
    secondaryCtaText: { type: "string" },
    secondaryCtaLink: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          priceNote: { type: "string" },
          features: { type: "array", items: { type: "string" } },
          ctaText: { type: "string" },
          badge: { type: "string" },
        },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
  },
  required: ["title"],
  additionalProperties: false,
} as const;

function baseSchema(blockTypes: BlockType[]) {
  return {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string", description: "Brand name, identical across languages" },
      primaryColor: { type: "string", description: "Hex colour, e.g. #D4AF37" },
      secondaryColor: { type: "string", description: "Hex colour" },
      fontFamily: { type: "string" },
      blocks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            type: { type: "string", enum: blockTypes },
            content: CONTENT_SCHEMA,
          },
          required: ["id", "type", "content"],
          additionalProperties: false,
        },
      },
    },
    required: ["id", "name", "primaryColor", "secondaryColor", "fontFamily", "blocks"],
    additionalProperties: false,
  };
}

/** The enum pins the block ids so a language pass cannot invent or rename one. */
function localeSchema(blockIds: string[]) {
  return {
    type: "object",
    properties: {
      blocks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", enum: blockIds },
            content: CONTENT_SCHEMA,
          },
          required: ["id", "content"],
          additionalProperties: false,
        },
      },
    },
    required: ["blocks"],
    additionalProperties: false,
  };
}

// --------------------------------------------------------------------- prompts

function sharedRules(tonePrompt: string, densityPrompt: string): string {
  return `Voice:
${tonePrompt}
${densityPrompt}

Rules for the copy:
1. Copy must be professional and high-converting — never generic filler.
2. Pricing items carry everything the card shows, because nothing on it is hardcoded:
   - "description" is the price exactly as it should appear, including the currency in the
     convention of that market (e.g. "48.000 ₺", "1.250 €"). Never assume dollars.
   - "priceNote" says what the price covers ("gecelik", "kişi başı", "tek seferlik"). Omit it
     when the price is a one-off and a suffix would mislead — do not invent "/ay" for
     something that is not a subscription.
   - "features" lists 3-5 things that tier actually includes, specific to this business.
   - "ctaText" is that tier's button label.
   - "badge" marks at most ONE tier as the recommended choice; omit it on the others.
3. A Hero may carry "secondaryCtaText" for a lower-emphasis action; omit it if one call to
   action is enough.`;
}

function buildBasePrompt(
  industry: string,
  locale: string,
  plan: Plan,
  blockTypes: BlockType[],
  tonePrompt: string,
  densityPrompt: string,
): string {
  const info = describeLocale(locale);
  const blockLimit =
    plan.limits.maxBlocks === "all" ? "as many blocks as the brief warrants" : `at most ${plan.limits.maxBlocks} blocks`;

  return `You are an elite web design architect. You produce the configuration for a modern, high-end marketing website.

Industry: ${industry}
Language: ${locale} (${info.englishName})${info.dir === "rtl" ? ", right-to-left script" : ""}

You are writing the primary version of this site. Other languages will be written from your
structure afterwards, so the block choice and order you decide here is the one they all use.

Rules for the design:
1. Colours must be sophisticated and appropriate for the industry.
2. Use ${blockLimit}, chosen from: ${blockTypes.join(", ")}. Each type may appear at most once,
   ordered as a logical narrative.
3. Give each block a unique id ("b1", "b2", ...).

${sharedRules(tonePrompt, densityPrompt)}`;
}

function buildLocalePrompt(
  industry: string,
  locale: string,
  primaryLocale: string,
  tonePrompt: string,
  densityPrompt: string,
): string {
  const info = describeLocale(locale);
  const primary = describeLocale(primaryLocale);

  return `You are an elite web design architect writing one language of a website that already exists.

Industry: ${industry}
Write in: ${locale} (${info.englishName})${info.dir === "rtl" ? ", right-to-left script" : ""}
Reference version: ${primaryLocale} (${primary.englishName})

You are WRITING this language, not translating the reference. Do not render the reference
sentence by sentence — write the way a premium brand in this market actually writes, then check
that it makes the same promise.

1. Keep the same offer, the same block ids and the same order. Only the wording changes.
2. Return an entry for EVERY block in the reference. Omitting one leaves a gap on the page.
3. Lengths should be comparable to the reference so the layout holds. German and Finnish run
   long, Chinese and Japanese run short — compensate in wording, not by dropping content.
4. Leave the brand name as it is unless the script demands otherwise. Prices keep the same
   amounts; adapt only the formatting convention if this market writes numbers differently.

${sharedRules(tonePrompt, densityPrompt)}`;
}

// ------------------------------------------------------------------ generation

export interface GenerateOptions {
  prompt: string;
  industry: string;
  locales?: string[];
  defaultLocale?: string;
  planId?: string;
  /** Ignored on plans without toneControl. */
  tone?: string;
  density?: string;
  /**
   * Thinking depth. Output tokens dominate the cost of a generation and
   * thinking bills as output, so this is the largest cost lever available.
   */
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
}

/** Output room for one language; the base pass writes the structure too, so it gets more. */
const MAX_TOKENS_BASE = 12000;
const MAX_TOKENS_LOCALE = 8000;

async function runInBatches<T, R>(
  items: T[],
  size: number,
  work: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await Promise.all(items.slice(i, i + size).map(work))));
  }
  return results;
}

export async function generateSiteConfig(options: GenerateOptions): Promise<GenerateResult> {
  const plan = getPlan((options.planId as never) ?? "profesyonel");

  const requestedDefault = options.defaultLocale?.trim() || "tr";
  const requested = normaliseLocales(options.locales ?? [requestedDefault], requestedDefault);
  const { granted, rejected } = applyLocaleQuota(requested, plan);

  const locales = granted.length > 0 ? granted : [requestedDefault];
  const defaultLocale = locales.includes(requestedDefault) ? requestedDefault : locales[0]!;
  const otherLocales = locales.filter((l) => l !== defaultLocale);

  const blockTypes = blockTypesFor(plan);
  // Tone is a paid control: on plans without it the default voice is used, so the
  // prompt stays valid either way rather than branching the whole template.
  const tone = findTone(plan.limits.toneControl ? options.tone : undefined);
  const density = findDensity(options.density);
  const effort = options.effort ?? "high";

  const usages: RawUsage[] = [];

  // ---- pass 1: structure and the primary language ----
  const baseStream = anthropic.messages.stream({
    model: GENERATION_MODEL,
    max_tokens: MAX_TOKENS_BASE,
    system: buildBasePrompt(options.industry, defaultLocale, plan, blockTypes, tone.promptHint, density.promptHint),
    messages: [{ role: "user", content: options.prompt }],
    output_config: { format: { type: "json_schema", schema: baseSchema(blockTypes) }, effort },
  });

  const baseResponse = await baseStream.finalMessage();
  usages.push(baseResponse.usage);

  const baseText = baseResponse.content.find((block) => block.type === "text");
  if (!baseText || baseText.type !== "text") {
    throw new Error(`Model returned no text content (stop_reason: ${baseResponse.stop_reason})`);
  }

  const base = JSON.parse(baseText.text) as {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    blocks: Array<{ id: string; type: BlockType; content: BlockContent }>;
  };

  const blockIds = base.blocks.map((b) => b.id);
  const reference = JSON.stringify(
    base.blocks.map((b) => ({ id: b.id, type: b.type, content: b.content })),
    null,
    1,
  );

  // ---- pass 2: every other language, concurrently ----
  const translated = await runInBatches(otherLocales, MAX_PARALLEL_LOCALES, async (locale) => {
    const stream = anthropic.messages.stream({
      model: GENERATION_MODEL,
      max_tokens: MAX_TOKENS_LOCALE,
      system: buildLocalePrompt(options.industry, locale, defaultLocale, tone.promptHint, density.promptHint),
      messages: [
        {
          role: "user",
          content: `Brief: ${options.prompt}\n\nBrand: ${base.name}\n\nReference version (${defaultLocale}):\n${reference}`,
        },
      ],
      output_config: { format: { type: "json_schema", schema: localeSchema(blockIds) }, effort },
    });

    const response = await stream.finalMessage();
    const text = response.content.find((block) => block.type === "text");
    // A language that fails is reported as empty rather than failing the whole
    // site: five good languages and one gap beats no site at all, and the gap
    // falls back to the primary language when rendered.
    const blocks =
      text && text.type === "text"
        ? (JSON.parse(text.text) as { blocks: Array<{ id: string; content: BlockContent }> }).blocks
        : [];

    return { locale, blocks, usage: response.usage };
  });

  for (const entry of translated) usages.push(entry.usage);

  // ---- combine ----
  const byLocale = new Map(translated.map((entry) => [entry.locale, entry.blocks]));

  const blocks: SiteBlock[] = base.blocks.map((block) => {
    const content: LocalizedContent = { [defaultLocale]: block.content };
    for (const locale of otherLocales) {
      const match = byLocale.get(locale)?.find((b) => b.id === block.id);
      if (match) content[locale] = match.content;
    }
    return { id: block.id, type: block.type, content };
  });

  const totals = usages.reduce(
    (acc, u) => ({
      input: acc.input + u.input_tokens,
      output: acc.output + u.output_tokens,
      cacheRead: acc.cacheRead + (u.cache_read_input_tokens ?? 0),
      cacheWrite: acc.cacheWrite + (u.cache_creation_input_tokens ?? 0),
      cost: acc.cost + priceUsage(u),
    }),
    { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, cost: 0 },
  );

  const usage: GenerationUsage = {
    inputTokens: totals.input,
    outputTokens: totals.output,
    cacheReadTokens: totals.cacheRead,
    cacheWriteTokens: totals.cacheWrite,
    estimatedCostUsd: totals.cost,
    model: baseResponse.model,
    localeCount: locales.length,
    requests: usages.length,
  };

  console.log(
    `[generate] ${locales.length} locale(s) in ${usage.requests} request(s), ` +
      `in=${usage.inputTokens} out=${usage.outputTokens} cost=$${usage.estimatedCostUsd.toFixed(4)}`,
  );

  return {
    usage,
    config: {
      id: base.id,
      name: base.name,
      primaryColor: base.primaryColor,
      secondaryColor: base.secondaryColor,
      fontFamily: base.fontFamily,
      defaultLocale,
      locales,
      blocks,
    },
    rejectedLocales: rejected,
  };
}
