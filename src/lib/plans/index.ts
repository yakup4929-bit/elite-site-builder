import type { BlockType } from "@/types";

/**
 * Plans gate what a site may contain. Every limit is read from here rather than
 * checked inline, so adding a tier or moving a feature between tiers is a change
 * to this file alone.
 */

export type PlanId = "sade" | "orta" | "ust" | "sinirsiz";

/** "all" means no ceiling — used instead of a sentinel number so checks read plainly. */
export type Quota = number | "all";

export interface PlanLimits {
  /** How many languages one site may be generated in. */
  maxLocales: Quota;
  /**
   * Whether the customer chooses *which* languages. When false they get the
   * plan's fixed starter set — the tier still produces a working site, it just
   * does not let them pick.
   */
  choosableLocales: boolean;
  /** Languages granted when choosableLocales is false. */
  fixedLocales: string[];
  maxBlocks: Quota;
  allowedBlockTypes: BlockType[] | "all";
  /** Regenerate a single block without rebuilding the whole site. */
  regenerateBlock: boolean;
  /** How many colour/typography variants are offered per generation. */
  themeVariants: number;
  export: false | "html" | "nextjs";
  removeBranding: boolean;
  customDomain: boolean;
}

export interface Plan {
  id: PlanId;
  /** Display name per UI locale; falls back to the "en" entry. */
  name: Record<string, string>;
  tagline: Record<string, string>;
  /** Placeholder pricing — set real figures before charging anyone. */
  price: { monthly: number; currency: string };
  limits: PlanLimits;
}

export const PLANS: Record<PlanId, Plan> = {
  sade: {
    id: "sade",
    name: { tr: "Sade", en: "Starter", fr: "Simple" },
    tagline: {
      tr: "Tek dilde, tek sayfa. Fikri denemek için.",
      en: "One language, one page. To try the idea.",
      fr: "Une langue, une page. Pour essayer l'idée.",
    },
    price: { monthly: 0, currency: "EUR" },
    limits: {
      maxLocales: 1,
      choosableLocales: false,
      fixedLocales: ["tr"],
      maxBlocks: 4,
      allowedBlockTypes: ["Hero", "Features", "Contact", "Footer"],
      regenerateBlock: false,
      themeVariants: 1,
      export: false,
      removeBranding: false,
      customDomain: false,
    },
  },
  orta: {
    id: "orta",
    name: { tr: "Orta", en: "Growth", fr: "Intermédiaire" },
    tagline: {
      tr: "Üç dil, tüm bloklar, bölüm bölüm düzenleme.",
      en: "Three languages, all blocks, per-section editing.",
      fr: "Trois langues, tous les blocs, édition par section.",
    },
    price: { monthly: 19, currency: "EUR" },
    limits: {
      maxLocales: 3,
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      themeVariants: 3,
      export: "html",
      removeBranding: false,
      customDomain: false,
    },
  },
  ust: {
    id: "ust",
    name: { tr: "Üst Seviye", en: "Professional", fr: "Professionnel" },
    tagline: {
      tr: "On dile kadar, kod çıktısı, marka çıkar.",
      en: "Up to ten languages, code export, branding removed.",
      fr: "Jusqu'à dix langues, export du code, sans marque.",
    },
    price: { monthly: 49, currency: "EUR" },
    limits: {
      maxLocales: 10,
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      themeVariants: 5,
      export: "nextjs",
      removeBranding: true,
      customDomain: false,
    },
  },
  sinirsiz: {
    id: "sinirsiz",
    name: { tr: "Sınırsız", en: "Unlimited", fr: "Illimité" },
    tagline: {
      tr: "Dil sınırı yok, kendi alan adın, her şey açık.",
      en: "No language cap, your own domain, everything unlocked.",
      fr: "Aucune limite de langue, votre domaine, tout débloqué.",
    },
    price: { monthly: 99, currency: "EUR" },
    limits: {
      maxLocales: "all",
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      themeVariants: 8,
      export: "nextjs",
      removeBranding: true,
      customDomain: true,
    },
  },
};

export const PLAN_ORDER: PlanId[] = ["sade", "orta", "ust", "sinirsiz"];

export const DEFAULT_PLAN: PlanId = "sade";

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

export function getPlan(id: PlanId): Plan {
  return PLANS[id];
}

export function planName(plan: Plan, uiLocale: string): string {
  return plan.name[uiLocale] ?? plan.name.en ?? plan.id;
}

export function planTagline(plan: Plan, uiLocale: string): string {
  return plan.tagline[uiLocale] ?? plan.tagline.en ?? "";
}

export function withinQuota(count: number, quota: Quota): boolean {
  return quota === "all" || count <= quota;
}

/**
 * Reduces a requested language list to what the plan actually allows. Returns
 * the granted list plus whatever was dropped, so the caller can tell the user
 * what their plan cost them instead of silently trimming.
 */
export function applyLocaleQuota(
  requested: string[],
  plan: Plan,
): { granted: string[]; rejected: string[] } {
  const { maxLocales, choosableLocales, fixedLocales } = plan.limits;

  if (!choosableLocales) {
    const granted = fixedLocales.length > 0 ? fixedLocales : requested.slice(0, 1);
    return { granted, rejected: requested.filter((l) => !granted.includes(l)) };
  }

  if (maxLocales === "all") return { granted: requested, rejected: [] };

  return {
    granted: requested.slice(0, maxLocales),
    rejected: requested.slice(maxLocales),
  };
}

export function allowsBlockType(plan: Plan, type: BlockType): boolean {
  const allowed = plan.limits.allowedBlockTypes;
  return allowed === "all" || allowed.includes(type);
}
