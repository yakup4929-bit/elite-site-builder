
"use client";
import React, { useState } from "react";
import { SiteConfig, SiteBlock } from "@/types";
import { BlockRenderer } from "@/components/BlockRenderer";

const MOCK_SITE_CONFIG: SiteConfig = {
  id: "1",
  name: "Elite Watch Co.",
  primaryColor: "#D4AF37", // Gold
  secondaryColor: "#1A1A1A", // Dark Charcoal
  fontFamily: "Inter",
  blocks: [
    {
      id: "b1",
      type: "Hero",
      content: {
        subtitle: "Timeless Elegance",
        title: "Crafting the Future of Luxury Timepieces",
        description: "Discover a collection where master craftsmanship meets modern innovation. Every second is a statement of prestige.",
        ctaText: "Explore Collection",
        ctaLink: "/collection",
      },
    },
    {
      id: "b2",
      type: "Features", // Not implemented yet, should show the placeholder
      content: {
        title: "Why Choose Elite?",
        items: [
          { title: "Swiss Precision", description: "Unmatched accuracy in every tick." },
          { title: "Rare Materials", description: "Using only the finest platinum and gold." },
        ],
      },
    },
  ],
};

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(MOCK_SITE_CONFIG);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Simulation Header */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => setConfig({...config, primaryColor: "#3B82F6"})} 
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
        >
          Blue Theme
        </button>
        <button 
          onClick={() => setConfig({...config, primaryColor: "#D4AF37"})} 
          className="px-3 py-1 bg-yellow-600 text-white rounded-md text-xs"
        >
          Gold Theme
        </button>
      </div>

      {config.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} config={config} />
      ))}
    </main>
  );
}

