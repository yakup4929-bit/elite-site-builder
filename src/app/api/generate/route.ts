import { NextResponse } from "next/server";
import { generateSiteConfig } from "@/lib/ai";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server." },
      { status: 500 },
    );
  }

  try {
    const { prompt, industry } = await req.json();
    const config = await generateSiteConfig(prompt, industry);
    return NextResponse.json(config);
  } catch (error) {
    console.error("AI Generation Error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
