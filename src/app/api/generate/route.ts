import { NextResponse } from "next/server";
import { generateSiteConfig } from "@/lib/ai";
import { isPlanId, DEFAULT_PLAN } from "@/lib/plans";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it to .env.local locally, and to the project's Environment Variables on Vercel." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const { prompt, industry, locales, defaultLocale, planId, tone, density } = body ?? {};

    if (typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const result = await generateSiteConfig({
      prompt,
      industry: typeof industry === "string" ? industry : "",
      locales: Array.isArray(locales) ? locales.filter((l) => typeof l === "string") : undefined,
      defaultLocale: typeof defaultLocale === "string" ? defaultLocale : undefined,
      planId: isPlanId(planId) ? planId : DEFAULT_PLAN,
      tone: typeof tone === "string" ? tone : undefined,
      density: typeof density === "string" ? density : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Generation Error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
