export type BlockType = "Hero" | "Features" | "About" | "Pricing" | "Contact" | "Footer";

export interface BlockContent {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  image?: string;
}

export interface SiteBlock {
  id: string;
  type: BlockType;
  content: BlockContent;
}

export interface SiteConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  blocks: SiteBlock[];
}

export interface AIRequest {
  prompt: string;
  industry: string;
  preferences: string[];
}

export interface AIResponse {
  config: SiteConfig;
}

