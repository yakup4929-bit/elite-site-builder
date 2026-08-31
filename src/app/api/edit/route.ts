import { NextResponse } from "next/server";
import { editSite, type EditTurn } from "@/lib/ai/edit";
import { getPlan, isPlanId, DEFAULT_PLAN } from "@/lib/plans";
import type { SiteConfig } from "@/types";

/** Enough context to stay coherent without paying to resend an entire session. */
const MAX_HISTORY_TURNS = 12;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it to .env.local locally, and to the project's Environment Variables on Vercel." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const { config, message, history, planId } = body ?? {};

    if (typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }
    if (!config || !Array.isArray(config.blocks) || !Array.isArray(config.locales)) {
      return NextResponse.json({ error: "a valid site config is required" }, { status: 400 });
    }

    const plan = getPlan(isPlanId(planId) ? planId : DEFAULT_PLAN);
    if (!plan.limits.regenerateBlock) {
      // Editing is gated with the same limit that gates regenerating a section:
      // both are "change what was generated" and belong to the same tier.
      return NextResponse.json(
        { error: "PLAN_UPGRADE_REQUIRED", requiredPlan: "profesyonel" },
        { status: 403 },
      );
    }

    const turns: EditTurn[] = Array.isArray(history)
      ? history
          .filter(
            (t: unknown): t is EditTurn =>
              !!t &&
              typeof (t as EditTurn).text === "string" &&
              ((t as EditTurn).role === "user" || (t as EditTurn).role === "assistant"),
          )
          .slice(-MAX_HISTORY_TURNS)
      : [];

    const result = await editSite(config as SiteConfig, message, turns);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Edit Error:", error);
    const messageText = error instanceof Error ? error.message : "Failed to edit site";
    return NextResponse.json({ error: messageText }, { status: 500 });
  }
}
