
"use client";
import React from "react";
import { SiteBlock, SiteConfig } from "@/types";
import { Hero } from "./blocks/Hero";
import { Features } from "./blocks/Features";
import { About } from "./blocks/About";
import { Pricing } from "./blocks/Pricing";
import { Contact } from "./blocks/Contact";
import { Footer } from "./blocks/Footer";

const BLOCK_COMPONENTS: Record<string, React.FC<{ block: SiteBlock; config: any }>> = {
  Hero: Hero,
  Features: Features,
  About: About,
  Pricing: Pricing,
  Contact: Contact,
  Footer: Footer,
};

export const BlockRenderer: React.FC<{ block: SiteBlock; config: SiteConfig }> = ({ block, config }) => {
  const Component = BLOCK_COMPONENTS[block.type];

  if (!Component) {
    return (
      <div className="py-10 text-center text-slate-400 border-2 border-dashed border-slate-200 m-4 rounded-xl">
        Block type "{block.type}" is not yet implemented.
      </div>
    );
  }

  return <Component block={block} config={config} />;
};

