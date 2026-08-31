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

/**
 * Copy for one block in every language the site was generated in, keyed by
 * BCP-47 tag. Design tokens (colours, image URLs, links) stay outside — only
 * text varies per language.
 */
export type LocalizedContent = Record<string, BlockContent>;

/** A block as stored: one entry per language. */
export interface SiteBlock {
  id: string;
  type: BlockType;
  content: LocalizedContent;
}

/**
 * A block as rendered: content already narrowed to the active language. Block
 * components take this, so they never deal with locales themselves.
 */
export interface ResolvedBlock {
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
  /** The language shown first; always present in `locales`. */
  defaultLocale: string;
  /** Every language this site carries, default first. */
  locales: string[];
  blocks: SiteBlock[];
}

export interface AIRequest {
  prompt: string;
  industry: string;
  locales?: string[];
  defaultLocale?: string;
  planId?: string;
}

export interface AIResponse {
  config: SiteConfig;
  /** Languages asked for but not granted by the plan. */
  rejectedLocales?: string[];
}

/**
 * Falls back down the chain active -> default -> first available, so a block
 * missing a translation renders in a neighbouring language rather than blank.
 */
export function resolveBlock(block: SiteBlock, locale: string, defaultLocale: string): ResolvedBlock {
  const content =
    block.content[locale] ??
    block.content[defaultLocale] ??
    Object.values(block.content)[0] ??
    {};
  return { id: block.id, type: block.type, content };
}
