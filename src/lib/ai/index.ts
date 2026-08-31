import Anthropic from "@anthropic-ai/sdk";
import type { SiteConfig } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const BLOCK_TYPES = ["Hero", "Features", "About", "Pricing", "Contact", "Footer"];

// Constrains the model's output so the response is always valid JSON in this
// exact shape — no markdown fences to strip, no JSON.parse crashes.
const SITE_CONFIG_SCHEMA = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    primaryColor: { type: "string", description: "Hex color code, e.g. #D4AF37" },
    secondaryColor: { type: "string", description: "Hex color code" },
    fontFamily: { type: "string", description: "Modern font family name" },
    blocks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", enum: BLOCK_TYPES },
          content: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              description: { type: "string" },
              ctaText: { type: "string" },
              ctaLink: { type: "string" },
              image: { type: "string" },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    icon: { type: "string" },
                  },
                  required: ["title", "description"],
                  additionalProperties: false,
                },
              },
            },
            required: ["title"],
            additionalProperties: false,
          },
        },
        required: ["id", "type", "content"],
        additionalProperties: false,
      },
    },
  },
  required: ["id", "name", "primaryColor", "secondaryColor", "fontFamily", "blocks"],
  additionalProperties: false,
} as const;

export async function generateSiteConfig(prompt: string, industry: string): Promise<SiteConfig> {
  const systemPrompt = `You are an elite web design architect. You generate the configuration for a modern, high-end marketing website.

Industry: ${industry}

Guidelines:
1. Colors must be sophisticated and appropriate for the industry.
2. Copy must be elite, professional and high-converting — never generic filler.
3. Order the blocks in a logical narrative flow. Use Hero, Features, About, Pricing, Contact and Footer as they fit the brief; every block type may appear at most once.
4. Give each block a unique id ("b1", "b2", ...).
5. For Features and Pricing, put the entries in "items". For a Pricing item, "description" is the price amount only (e.g. "99").`;

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }],
    output_config: {
      format: { type: "json_schema", schema: SITE_CONFIG_SCHEMA },
    },
  });

  const text = response.content.find((block) => block.type === "text");
  if (!text || text.type !== "text") {
    throw new Error(`Model returned no text content (stop_reason: ${response.stop_reason})`);
  }

  return JSON.parse(text.text) as SiteConfig;
}
