import Anthropic from "@anthropic-ai/sdk";
import type { BlockContent, SiteConfig } from "@/types";
import { describeLocale } from "@/lib/i18n/locales";

const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  ...(workspaceId ? { defaultHeaders: { "anthropic-workspace-id": workspaceId } } : {}),
});

/**
 * Conversational editing runs on Sonnet 5, not on the model that generated the
 * site and not on the cheapest one available.
 *
 * Haiku 4.5 was tried first and is three times cheaper, but it missed the point
 * of the instruction: asked to make a headline SHORTER it returned a longer one
 * in Turkish while shortening the English. Editing is judgement about wording,
 * across languages, and that is exactly where the cheaper model gives way. At
 * roughly a cent per turn the difference is immaterial next to the ~$0.42 the
 * generation itself costs, so the quality is worth buying.
 *
 * The model returns a reply plus a list of operations rather than a rewritten
 * config. Asking a small model to echo back a whole site risks it quietly
 * dropping a language or a block; operations can only change what they name, so
 * anything it does not mention is guaranteed untouched.
 */

const EDIT_MODEL = "claude-sonnet-5";

// Sonnet 5 standard pricing per million tokens (Aug 2026).
const PRICE_PER_MTOK = { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 };

const TEXT_FIELDS = [
  "title",
  "subtitle",
  "description",
  "ctaText",
  "ctaLink",
  "secondaryCtaText",
  "secondaryCtaLink",
] as const;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    reply: {
      type: "string",
      description: "One or two sentences to the user, in the language they wrote in.",
    },
    operations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          op: {
            type: "string",
            enum: ["setText", "setItems", "setTheme", "setName", "removeBlock", "moveBlock"],
          },
          blockId: { type: "string" },
          locale: { type: "string" },
          field: { type: "string", enum: TEXT_FIELDS as unknown as string[] },
          value: { type: "string" },
          toIndex: { type: "integer" },
          primaryColor: { type: "string" },
          secondaryColor: { type: "string" },
          fontFamily: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                priceNote: { type: "string" },
                ctaText: { type: "string" },
                badge: { type: "string" },
                features: { type: "array", items: { type: "string" } },
              },
              required: ["title", "description"],
              additionalProperties: false,
            },
          },
        },
        required: ["op"],
        additionalProperties: false,
      },
    },
  },
  required: ["reply", "operations"],
  additionalProperties: false,
} as const;

interface Operation {
  op: string;
  blockId?: string;
  locale?: string;
  field?: string;
  value?: string;
  toIndex?: number;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  items?: NonNullable<BlockContent["items"]>;
}

function buildSystemPrompt(): string {
  return `You edit an already-generated website. The user talks to you in plain language and you turn that into operations on the site's configuration.

Return two things: a short reply in the user's own language, and the operations that carry out what they asked.

Rules:
1. Only emit operations for what the user actually asked. Anything you do not name stays as it is — do not "improve" things nobody mentioned.
2. The site exists in several languages. Unless the user names one language, apply a change to EVERY language, writing each one natively rather than translating your first version. A user asking for a shorter headline wants it shorter in all of them.
3. Never invent a blockId or a locale. Use only the ones listed in the site below.
4. setText changes one field of one block in one language. setItems replaces the whole item list of one block in one language — include every item you want to keep, not only the changed one.
5. For colours use hex. For a Pricing item, "description" is the price as it should read on screen including its currency.
6. A request that gives a DIRECTION rather than exact words — "shorter", "punchier", "warmer", "more formal", "raise the prices" — is actionable. Write the new version yourself; that judgement is what you are for. Do not ask the user to supply the wording.
7. Only ask a question when you genuinely cannot tell WHAT to change — an ambiguous reference, or something that is not on the site. Even then, carry out whatever part of the request WAS clear rather than doing nothing.
8. If the user asks something you cannot do with these operations — adding a new block type, changing the layout, adding a language — say so plainly in the reply and emit nothing.`;
}

function describeSite(config: SiteConfig): string {
  const lines: string[] = [
    `Brand name: ${config.name}`,
    `Colours: primary ${config.primaryColor}, secondary ${config.secondaryColor}`,
    `Font: ${config.fontFamily}`,
    `Languages: ${config.locales.map((l) => `${l} (${describeLocale(l).englishName})`).join(", ")}`,
    `Default language: ${config.defaultLocale}`,
    "",
    "Blocks, in order:",
  ];

  config.blocks.forEach((block, index) => {
    lines.push(`\n[${index}] id="${block.id}" type=${block.type}`);
    for (const [locale, content] of Object.entries(block.content)) {
      const parts: string[] = [];
      for (const field of TEXT_FIELDS) {
        const v = content[field as keyof BlockContent];
        if (typeof v === "string" && v) parts.push(`${field}=${JSON.stringify(v)}`);
      }
      if (content.items?.length) {
        parts.push(`items=${JSON.stringify(content.items)}`);
      }
      lines.push(`  ${locale}: ${parts.join(" ")}`);
    }
  });

  return lines.join("\n");
}

export interface EditTurn {
  role: "user" | "assistant";
  text: string;
}

export interface EditResult {
  reply: string;
  config: SiteConfig;
  /** How many operations were applied, after invalid ones were dropped. */
  applied: number;
  costUsd: number;
}

function applyOperations(config: SiteConfig, operations: Operation[]): { config: SiteConfig; applied: number } {
  // Cloned so a half-applied batch can never leave the caller's copy inconsistent.
  const next: SiteConfig = JSON.parse(JSON.stringify(config));
  let applied = 0;

  const blockById = (id?: string) => next.blocks.find((b) => b.id === id);
  const isHex = (v?: string) => typeof v === "string" && /^#[0-9a-f]{3,8}$/i.test(v);

  for (const operation of operations) {
    switch (operation.op) {
      case "setText": {
        const block = blockById(operation.blockId);
        const locale = operation.locale;
        if (!block || !locale || !operation.field || typeof operation.value !== "string") break;
        if (!next.locales.includes(locale)) break;
        // A locale the block never carried is created rather than dropped, so a
        // language added later can still be filled in by conversation.
        block.content[locale] ??= {};
        (block.content[locale] as Record<string, unknown>)[operation.field] = operation.value;
        applied++;
        break;
      }
      case "setItems": {
        const block = blockById(operation.blockId);
        const locale = operation.locale;
        if (!block || !locale || !Array.isArray(operation.items)) break;
        if (!next.locales.includes(locale)) break;
        block.content[locale] ??= {};
        block.content[locale]!.items = operation.items;
        applied++;
        break;
      }
      case "setTheme": {
        let changed = false;
        if (isHex(operation.primaryColor)) { next.primaryColor = operation.primaryColor!; changed = true; }
        if (isHex(operation.secondaryColor)) { next.secondaryColor = operation.secondaryColor!; changed = true; }
        if (operation.fontFamily) { next.fontFamily = operation.fontFamily; changed = true; }
        if (changed) applied++;
        break;
      }
      case "setName": {
        if (typeof operation.value === "string" && operation.value.trim()) {
          next.name = operation.value.trim();
          applied++;
        }
        break;
      }
      case "removeBlock": {
        const index = next.blocks.findIndex((b) => b.id === operation.blockId);
        // Refuse to empty the site entirely — a "remove everything" reading of a
        // vague request should not leave a blank page.
        if (index !== -1 && next.blocks.length > 1) {
          next.blocks.splice(index, 1);
          applied++;
        }
        break;
      }
      case "moveBlock": {
        const from = next.blocks.findIndex((b) => b.id === operation.blockId);
        const to = operation.toIndex;
        if (from !== -1 && typeof to === "number" && to >= 0 && to < next.blocks.length) {
          const [moved] = next.blocks.splice(from, 1);
          next.blocks.splice(to, 0, moved!);
          applied++;
        }
        break;
      }
      default:
        break;
    }
  }

  return { config: next, applied };
}

export async function editSite(
  config: SiteConfig,
  message: string,
  history: EditTurn[],
): Promise<EditResult> {
  const response = await anthropic.messages.create({
    model: EDIT_MODEL,
    max_tokens: 8000,
    system: [
      {
        type: "text",
        text: buildSystemPrompt(),
        // The instructions never change between turns, so they are the stable
        // prefix worth caching; the site description below does change.
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      ...history.map((turn) => ({ role: turn.role, content: turn.text })),
      {
        role: "user" as const,
        content: `Current site:\n\n${describeSite(config)}\n\n---\n\nRequest: ${message}`,
      },
    ],
    output_config: { format: { type: "json_schema", schema: RESPONSE_SCHEMA } },
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error(`Model returned no text content (stop_reason: ${response.stop_reason})`);
  }

  const parsed = JSON.parse(textBlock.text) as { reply: string; operations: Operation[] };
  const { config: updated, applied } = applyOperations(config, parsed.operations ?? []);

  const usage = response.usage;
  const costUsd =
    (usage.input_tokens * PRICE_PER_MTOK.input +
      usage.output_tokens * PRICE_PER_MTOK.output +
      (usage.cache_read_input_tokens ?? 0) * PRICE_PER_MTOK.cacheRead +
      (usage.cache_creation_input_tokens ?? 0) * PRICE_PER_MTOK.cacheWrite) /
    1_000_000;

  return { reply: parsed.reply, config: updated, applied, costUsd };
}
