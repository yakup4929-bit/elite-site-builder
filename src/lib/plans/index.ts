import type { BlockType } from "@/types";

/**
 * Plans gate what a site may contain. Every limit is read from here rather than
 * checked inline, so adding a tier or moving a feature between tiers is a change
 * to this file alone.
 *
 * Pricing is anchored on what the market actually charges (Aug 2026): AI site
 * builders sit at $10-50/mo (Wix ADI $17/29/39/159, Durable ~$12, 10Web $10-30,
 * Framer $5-20), and translation tooling is billed separately on top — Weglot
 * starts at EUR 15/mo for ONE extra language and reaches EUR 699 for twenty.
 *
 * That gap is the position: languages here are generated natively as part of the
 * site, not bolted on as machine translation, so a plan that includes six
 * languages is competing with a builder subscription PLUS a Weglot tier. Prices
 * are set to undercut that combination while staying above the bargain builders,
 * because the output is not comparable to theirs.
 *
 * There is no free tier by deliberate choice: generation costs real model tokens
 * on every run, and a free tier would be subsidising the most expensive action
 * in the product.
 */

export type PlanId = "baslangic" | "profesyonel" | "isletme" | "ajans";

/** "all" means no ceiling — used instead of a sentinel number so checks read plainly. */
export type Quota = number | "all";

export type SupportLevel = "email" | "priority" | "dedicated";

export interface PlanLimits {
  /** Sites that may be generated per billing month. */
  sitesPerMonth: Quota;
  /** How many languages one site may be generated in. */
  maxLocales: Quota;
  /** Whether the customer chooses which languages. */
  choosableLocales: boolean;
  /** Languages granted when choosableLocales is false. */
  fixedLocales: string[];
  maxBlocks: Quota;
  allowedBlockTypes: BlockType[] | "all";
  /** Regenerate a single block without rebuilding the whole site. */
  regenerateBlock: boolean;
  /** Choose the writing voice rather than taking the default. */
  toneControl: boolean;
  /** How many colour/typography variants are offered per generation. */
  themeVariants: number;
  export: false | "html" | "nextjs";
  removeBranding: boolean;
  customDomain: boolean;
  whiteLabel: boolean;
  apiAccess: boolean;
  support: SupportLevel;
}

export interface Plan {
  id: PlanId;
  /** Display name per UI locale; falls back to the "en" entry. */
  name: Record<string, string>;
  tagline: Record<string, string>;
  /** Who the tier is for — shown on the pricing page above the feature list. */
  audience: Record<string, string>;
  price: {
    /** Billed monthly. */
    monthly: number;
    /** Billed yearly, expressed as the equivalent monthly figure. */
    yearlyMonthly: number;
    currency: "EUR";
  };
  /** At most one plan should carry this. */
  recommended?: boolean;
  limits: PlanLimits;
}

const ALL_BLOCK_TYPES: BlockType[] = ["Hero", "Features", "About", "Pricing", "Contact", "Footer"];

export const PLANS: Record<PlanId, Plan> = {
  baslangic: {
    id: "baslangic",
    name: { tr: "Başlangıç", en: "Starter", fr: "Démarrage" },
    tagline: {
      tr: "İki dilde, yayına hazır bir site.",
      en: "A launch-ready site in two languages.",
      fr: "Un site prêt à publier en deux langues.",
    },
    audience: {
      tr: "Tek işletmesi olan, ilk sitesini kuranlar için.",
      en: "For a single business putting up its first site.",
      fr: "Pour une entreprise qui met en ligne son premier site.",
    },
    price: { monthly: 19, yearlyMonthly: 15, currency: "EUR" },
    limits: {
      sitesPerMonth: 3,
      maxLocales: 2,
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: 6,
      allowedBlockTypes: "all",
      regenerateBlock: false,
      toneControl: false,
      themeVariants: 2,
      export: "html",
      removeBranding: false,
      customDomain: false,
      whiteLabel: false,
      apiAccess: false,
      support: "email",
    },
  },
  profesyonel: {
    id: "profesyonel",
    name: { tr: "Profesyonel", en: "Professional", fr: "Professionnel" },
    tagline: {
      tr: "Altı dil, bölüm bölüm düzenleme, kod çıktısı.",
      en: "Six languages, per-section editing, code export.",
      fr: "Six langues, édition par section, export du code.",
    },
    audience: {
      tr: "Sınır ötesine satan işletmeler ve serbest çalışan tasarımcılar için.",
      en: "For businesses selling across borders, and freelance designers.",
      fr: "Pour les entreprises qui vendent à l'international et les designers indépendants.",
    },
    price: { monthly: 49, yearlyMonthly: 39, currency: "EUR" },
    recommended: true,
    limits: {
      sitesPerMonth: 15,
      maxLocales: 6,
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      toneControl: true,
      themeVariants: 4,
      export: "nextjs",
      removeBranding: true,
      customDomain: false,
      whiteLabel: false,
      apiAccess: false,
      support: "priority",
    },
  },
  isletme: {
    id: "isletme",
    name: { tr: "İşletme", en: "Business", fr: "Entreprise" },
    tagline: {
      tr: "Yirmi dil, kendi alan adın, öncelikli üretim.",
      en: "Twenty languages, your own domain, priority generation.",
      fr: "Vingt langues, votre domaine, génération prioritaire.",
    },
    audience: {
      tr: "Birden fazla pazarda markası olan şirketler için.",
      en: "For companies running a brand in several markets.",
      fr: "Pour les entreprises présentes sur plusieurs marchés.",
    },
    price: { monthly: 99, yearlyMonthly: 79, currency: "EUR" },
    limits: {
      sitesPerMonth: 50,
      maxLocales: 20,
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      toneControl: true,
      themeVariants: 6,
      export: "nextjs",
      removeBranding: true,
      customDomain: true,
      whiteLabel: false,
      apiAccess: false,
      support: "priority",
    },
  },
  ajans: {
    id: "ajans",
    name: { tr: "Ajans", en: "Agency", fr: "Agence" },
    tagline: {
      tr: "Dil ve site sınırı yok, kendi markanla, API erişimiyle.",
      en: "No language or site cap, under your own brand, with API access.",
      fr: "Sans limite de langue ni de site, sous votre marque, avec accès API.",
    },
    audience: {
      tr: "Müşterisi adına site üreten ajanslar ve stüdyolar için.",
      en: "For agencies and studios producing sites on behalf of clients.",
      fr: "Pour les agences et studios produisant des sites pour leurs clients.",
    },
    price: { monthly: 249, yearlyMonthly: 199, currency: "EUR" },
    limits: {
      sitesPerMonth: "all",
      maxLocales: "all",
      choosableLocales: true,
      fixedLocales: [],
      maxBlocks: "all",
      allowedBlockTypes: "all",
      regenerateBlock: true,
      toneControl: true,
      themeVariants: 10,
      export: "nextjs",
      removeBranding: true,
      customDomain: true,
      whiteLabel: true,
      apiAccess: true,
      support: "dedicated",
    },
  },
};

export const PLAN_ORDER: PlanId[] = ["baslangic", "profesyonel", "isletme", "ajans"];

export const DEFAULT_PLAN: PlanId = "profesyonel";

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

export function getPlan(id: PlanId): Plan {
  return PLANS[id];
}

function pick(record: Record<string, string>, uiLocale: string, fallback = ""): string {
  return record[uiLocale] ?? record.en ?? fallback;
}

export function planName(plan: Plan, uiLocale: string): string {
  return pick(plan.name, uiLocale, plan.id);
}

export function planTagline(plan: Plan, uiLocale: string): string {
  return pick(plan.tagline, uiLocale);
}

export function planAudience(plan: Plan, uiLocale: string): string {
  return pick(plan.audience, uiLocale);
}

/** Yearly billing is shown as a percentage so the saving is legible at a glance. */
export function yearlySavingPercent(plan: Plan): number {
  const { monthly, yearlyMonthly } = plan.price;
  return Math.round(((monthly - yearlyMonthly) / monthly) * 100);
}

export function yearlyTotal(plan: Plan): number {
  return plan.price.yearlyMonthly * 12;
}

export function withinQuota(count: number, quota: Quota): boolean {
  return quota === "all" || count <= quota;
}

/**
 * Reduces a requested language list to what the plan allows. Returns the granted
 * list plus whatever was dropped, so the caller can tell the user what their plan
 * cost them instead of silently trimming.
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

  return { granted: requested.slice(0, maxLocales), rejected: requested.slice(maxLocales) };
}

export function allowsBlockType(plan: Plan, type: BlockType): boolean {
  const allowed = plan.limits.allowedBlockTypes;
  return allowed === "all" || allowed.includes(type);
}

export function blockTypesFor(plan: Plan): BlockType[] {
  return plan.limits.allowedBlockTypes === "all" ? ALL_BLOCK_TYPES : plan.limits.allowedBlockTypes;
}

/** The cheapest plan that grants at least `count` languages — drives upgrade prompts. */
export function smallestPlanForLocales(count: number): Plan | null {
  for (const id of PLAN_ORDER) {
    const { maxLocales } = PLANS[id].limits;
    if (maxLocales === "all" || maxLocales >= count) return PLANS[id];
  }
  return null;
}
