"use client";
import React from "react";
import { ResolvedBlock, SiteConfig } from "@/types";
import { Hero } from "./blocks/Hero";
import { Features } from "./blocks/Features";
import { About } from "./blocks/About";
import { Pricing } from "./blocks/Pricing";
import { Contact } from "./blocks/Contact";
import { Footer } from "./blocks/Footer";

const BLOCK_COMPONENTS: Record<string, React.FC<{ block: ResolvedBlock; config: SiteConfig }>> = {
  Hero,
  Features,
  About,
  Pricing,
  Contact,
  Footer,
};

/**
 * Takes a block whose content is already narrowed to one language — resolution
 * happens in SitePreview, so block components never see the locale map.
 */
export const BlockRenderer: React.FC<{ block: ResolvedBlock; config: SiteConfig }> = ({ block, config }) => {
  const Component = BLOCK_COMPONENTS[block.type];

  if (!Component) {
    return (
      <div className="py-10 text-center text-slate-400 border-2 border-dashed border-slate-200 m-4 rounded-xl">
        Block type &quot;{block.type}&quot; is not yet implemented.
      </div>
    );
  }

  return <Component block={block} config={config} />;
};
