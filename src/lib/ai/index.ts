import Anthropic from "@anthropic-ai/sdk";
import type { BlockType, LocalizedContent, SiteBlock, SiteConfig } from "@/types";
import { describeLocale, normaliseLocales } from "@/lib/i18n/locales";
import { applyLocaleQuota, getPlan, type Plan } from "@/lib/plans";

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

const ALL_BLOCK_TYPES: BlockType[] = ["Hero", "Features", "About", "Pricing", "Contact", "Footer"];

/**
 * Every language is produced in one request rather than generating once and
 * translating after. A translation pass drifts in tone and prices each language
 * separately; asking for them together keeps one voice across the site and costs
 * a single prompt.
 */
function buildSchema(locales: string[], blockTypes: BlockType[]) {
  const contentSchema = {
    type: "object",
    properties: {
      title: { type: "string" },
      subtitle: { type: "string" },
      description: { type: "string" },
      ctaText: { type: "string" },
      ctaLink: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
          required: ["title", "description"],
          additionalProperties: false,
        },
      },
    },
    required: ["title"],
    additionalProperties: false,
  };

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
            // An array with an explicit locale field, not an object keyed by
            // language: a strict schema cannot express arbitrary keys, and the
            // enum here stops the model inventing languages that were not asked for.
            translations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  locale: { type: "string", enum: locales },
                  content: contentSchema,
                },
                required: ["locale", "content"],
                additionalProperties: false,
              },
            },
          },
          required: ["id", "type", "translations"],
          additionalProperties: false,
        },
      },
    },
    required: ["id", "name", "primaryColor", "secondaryColor", "fontFamily", "blocks"],
    additionalProperties: false,
  };
}

function buildSystemPrompt(industry: string, locales: string[], defaultLocale: string, plan: Plan, blockTypes: BlockType[]) {
  const localeLines = locales
    .map((tag) => {
      const info = describeLocale(tag);
      const dir = info.dir === "rtl" ? ", right-to-left script" : "";
      const primary = tag === defaultLocale ? " (primary language)" : "";
      return `  - ${tag}: ${info.englishName}${primary}${dir}`;
    })
    .join("\n");

  const blockLimit =
    plan.limits.maxBlocks === "all" ? "as many blocks as the brief warrants" : `at most ${plan.limits.maxBlocks} blocks`;

  return `You are an elite web design architect. You produce the configuration for a modern, high-end marketing website.

Industry: ${industry}

Languages — write every block in all of these:
${localeLines}

Rules for the copy:
1. Write natively in each language. Do not translate the primary language word for word — an idiom that lands in one language falls flat in another. Match how a premium brand in that market actually writes.
2. Keep the same offer, structure and block order across languages; only the wording changes.
3. Lengths should be comparable across languages so the layout holds. German and Finnish run long, Chinese and Japanese run short — compensate in wording, not by dropping content.
4. Leave the brand name identical in every language unless the script demands otherwise.
5. Never leave a language out of a block's translations array. Every block needs an entry for all ${locales.length} language(s).

Rules for the design:
6. Colours must be sophisticated and appropriate for the industry.
7. Use ${blockLimit}, chosen from: ${blockTypes.join(", ")}. Each type may appear at most once, ordered as a logical narrative.
8. Give each block a unique id ("b1", "b2", ...).
9. For Features and Pricing use "items". For a Pricing item, "description" is the price amount only (e.g. "99").
10. Copy must be professional and high-converting — never generic filler.`;
}

/** Output grows roughly linearly with language count; give the model room for all of them. */
function tokenBudget(localeCount: number): number {
  return Math.min(8000 + localeCount * 6000, 64000);
}

export interface GenerateOptions {
  prompt: string;
  industry: string;
  locales?: string[];
  defaultLocale?: string;
  planId?: string;
}

export interface GenerateResult {
  config: SiteConfig;
  rejectedLocales: string[];
}

export async function generateSiteConfig(options: GenerateOptions): Promise<GenerateResult> {
  const plan = getPlan((options.planId as never) ?? "sade");

  const requestedDefault = options.defaultLocale?.trim() || "tr";
  const requested = normaliseLocales(options.locales ?? [requestedDefault], requestedDefault);
  const { granted, rejected } = applyLocaleQuota(requested, plan);

  const locales = granted.length > 0 ? granted : [requestedDefault];
  const defaultLocale = locales.includes(requestedDefault) ? requestedDefault : locales[0]!;

  const blockTypes =
    plan.limits.allowedBlockTypes === "all" ? ALL_BLOCK_TYPES : plan.limits.allowedBlockTypes;

  // Streamed because a many-language site can run tens of thousands of output
  // tokens, which would otherwise risk an HTTP timeout.
  const stream = anthropic.messages.stream({
    model: "claude-opus-5",
    max_tokens: tokenBudget(locales.length),
    system: buildSystemPrompt(options.industry, locales, defaultLocale, plan, blockTypes),
    messages: [{ role: "user", content: options.prompt }],
    output_config: {
      format: { type: "json_schema", schema: buildSchema(locales, blockTypes) },
    },
  });

  const response = await stream.finalMessage();

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error(`Model returned no text content (stop_reason: ${response.stop_reason})`);
  }

  const raw = JSON.parse(textBlock.text) as {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    blocks: Array<{
      id: string;
      type: BlockType;
      translations: Array<{ locale: string; content: LocalizedContent[string] }>;
    }>;
  };

  const blocks: SiteBlock[] = raw.blocks.map((block) => {
    const content: LocalizedContent = {};
    for (const entry of block.translations) {
      content[entry.locale] = entry.content;
    }
    return { id: block.id, type: block.type, content };
  });

  return {
    config: {
      id: raw.id,
      name: raw.name,
      primaryColor: raw.primaryColor,
      secondaryColor: raw.secondaryColor,
      fontFamily: raw.fontFamily,
      defaultLocale,
      locales,
      blocks,
    },
    rejectedLocales: rejected,
  };
}
