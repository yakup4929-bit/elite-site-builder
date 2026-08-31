"use client";
import React, { useState } from "react";
import { SiteConfig } from "@/types";
import { SitePreview } from "@/components/SitePreview";
import { SiteNav, SiteFooter } from "@/components/marketing/SiteChrome";
import { useUiLocale } from "@/components/marketing/useUiLocale";

/**
 * Demo data for the sample luxury-watch site — not the product's own branding.
 * Carried in two languages so the locale switcher has something to switch.
 */
const MOCK_SITE_CONFIG: SiteConfig = {
  id: "1",
  name: "Elite Watch Co.",
  primaryColor: "#D4AF37", // Gold
  secondaryColor: "#1A1A1A", // Dark Charcoal
  fontFamily: "Inter",
  defaultLocale: "en",
  locales: ["en", "tr"],
  blocks: [
    {
      id: "b1",
      type: "Hero",
      content: {
        en: {
          subtitle: "Timeless Elegance",
          title: "Crafting the Future of Luxury Timepieces",
          description:
            "Discover a collection where master craftsmanship meets modern innovation. Every second is a statement of prestige.",
          ctaText: "Explore Collection",
          ctaLink: "/collection",
        },
        tr: {
          subtitle: "Zamansız Zarafet",
          title: "Lüks Saatçiliğin Geleceğini Kuruyoruz",
          description:
            "Usta işçiliğin modern yenilikle buluştuğu bir koleksiyon. Her saniye bir prestij beyanı.",
          ctaText: "Koleksiyonu Keşfedin",
          ctaLink: "/collection",
        },
      },
    },
    {
      id: "b2",
      type: "Features",
      content: {
        en: {
          title: "Why Choose Elite?",
          items: [
            { title: "Swiss Precision", description: "Unmatched accuracy in every tick." },
            { title: "Rare Materials", description: "Using only the finest platinum and gold." },
          ],
        },
        tr: {
          title: "Neden Elite?",
          items: [
            { title: "İsviçre Hassasiyeti", description: "Her tıkta eşsiz doğruluk." },
            { title: "Nadir Malzemeler", description: "Yalnızca en iyi platin ve altın." },
          ],
        },
      },
    },
  ],
};

export default function DemoPage() {
  const [uiLocale, setUiLocale] = useUiLocale();
  const [config, setConfig] = useState<SiteConfig>(MOCK_SITE_CONFIG);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <SiteNav locale={uiLocale} onLocaleChange={setUiLocale} />
      <div className="fixed bottom-6 right-6 z-40 flex gap-2">
        <button
          onClick={() => setConfig({ ...config, primaryColor: "#3B82F6" })}
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
        >
          Blue Theme
        </button>
        <button
          onClick={() => setConfig({ ...config, primaryColor: "#D4AF37" })}
          className="px-3 py-1 bg-yellow-600 text-white rounded-md text-xs"
        >
          Gold Theme
        </button>
      </div>

      <SitePreview config={config} />

      <SiteFooter locale={uiLocale} />
    </main>
  );
}
