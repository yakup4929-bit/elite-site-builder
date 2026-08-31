/**
 * Verifies that ANTHROPIC_API_KEY works, before you waste time wondering whether
 * a failed generation is the key, the model or the code. Reads the key from the
 * environment — it is never printed, logged or written anywhere by this script.
 *
 *   npm run check:key
 */
import { readFileSync, existsSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

// next dev loads .env.local automatically; a bare `node` run does not.
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

const key = process.env.ANTHROPIC_API_KEY;

if (!key) {
  console.error("✗ ANTHROPIC_API_KEY is not set.");
  console.error("  Add it to .env.local, then run this again.");
  process.exit(1);
}

// Shape check first — a mistyped or truncated paste is the common failure, and
// catching it here is instant instead of waiting on a round trip.
if (!key.startsWith("sk-ant-")) {
  console.error("✗ ANTHROPIC_API_KEY does not look like an Anthropic key (expected an sk-ant- prefix).");
  process.exit(1);
}

console.log(`→ Key found (${key.length} chars, ending ...${key.slice(-4)}). Calling the API…`);

// Identity-linked keys must name their workspace; ordinary keys must not send
// the header at all, so it is included only when the variable is set.
const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();
if (workspaceId) console.log(`→ Using workspace ${workspaceId}.`);

const client = new Anthropic({
  apiKey: key,
  ...(workspaceId ? { defaultHeaders: { "anthropic-workspace-id": workspaceId } } : {}),
});

try {
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 200,
    messages: [{ role: "user", content: "Reply with the single word: ok" }],
    // Exercises the same mechanism the generator relies on, so a working check
    // means structured output works — not merely that the key authenticates.
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: { status: { type: "string" } },
          required: ["status"],
          additionalProperties: false,
        },
      },
    },
  });

  const text = response.content.find((b) => b.type === "text");
  JSON.parse(text.text);

  console.log("✓ Key works.");
  console.log(`✓ Model reachable: ${response.model}`);
  console.log("✓ Structured output returned valid JSON.");
  console.log(`  tokens: ${response.usage.input_tokens} in / ${response.usage.output_tokens} out`);
  console.log("\nNext: add the same key to Vercel > Settings > Environment Variables,");
  console.log("otherwise it works locally and still 500s in production.");
} catch (error) {
  if (error instanceof Anthropic.AuthenticationError) {
    console.error("✗ The key was rejected. It may be revoked, mistyped, or from a different org.");
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error("✗ Rate limited — the key is valid, just throttled right now.");
  } else if (error instanceof Anthropic.APIError) {
    if (/workspace/i.test(error.message)) {
      console.error("✗ This is an identity-linked key, so it must say which workspace it acts in.");
      console.error("  Either add ANTHROPIC_WORKSPACE_ID next to the key, or create a plain");
      console.error("  workspace-scoped key in the Console, which needs no extra setting.");
    } else {
      console.error(`✗ API error ${error.status}: ${error.message}`);
    }
  } else {
    console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  }
  process.exit(1);
}
