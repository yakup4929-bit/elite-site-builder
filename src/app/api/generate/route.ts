
import { NextResponse } from "next/server";
import { generateSiteConfig } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { prompt, industry } = await req.json();
    const config = await generateSiteConfig(prompt, industry);
    return NextResponse.json(config);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate site" }, { status: 500 });
  }
}

