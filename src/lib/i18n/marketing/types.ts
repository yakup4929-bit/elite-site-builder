/**
 * Shape of the marketing copy. Every locale file must satisfy it, so a language
 * added later cannot silently omit a section — the compiler names what is
 * missing instead of the page rendering a blank.
 */

export interface MarketingCopy {
  nav: { product: string; languages: string; pricing: string; demo: string; start: string };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };

  proof: { languages: string; languagesLabel: string; oneCall: string; oneCallLabel: string; rtl: string; rtlLabel: string };

  difference: {
    title: string;
    lead: string;
    translatedTitle: string;
    translatedBody: string;
    generatedTitle: string;
    generatedBody: string;
    closing: string;
  };

  how: { title: string; lead: string; steps: Array<{ title: string; body: string }> };

  languages: {
    title: string;
    lead: string;
    rtlNote: string;
    anyTagNote: string;
    reachLabel: string;
  };

  blocks: { title: string; lead: string; items: Array<{ title: string; body: string }> };

  pricingTeaser: { title: string; lead: string; cta: string; compare: string };

  faq: { title: string; items: Array<{ q: string; a: string }> };

  finalCta: { title: string; body: string; cta: string };

  footer: { tagline: string; product: string; company: string; legal: string; rights: string };

  pricingPage: {
    title: string;
    lead: string;
    monthly: string;
    yearly: string;
    savePrefix: string;
    perMonth: string;
    billedYearly: string;
    choose: string;
    recommended: string;
    comparisonTitle: string;
    featureColumn: string;
    unlimited: string;
    included: string;
    notIncluded: string;
    rows: {
      sitesPerMonth: string;
      maxLocales: string;
      blocks: string;
      regenerateBlock: string;
      toneControl: string;
      themeVariants: string;
      export: string;
      removeBranding: string;
      customDomain: string;
      whiteLabel: string;
      apiAccess: string;
      support: string;
    };
    supportLevels: { email: string; priority: string; dedicated: string };
    exportKinds: { html: string; nextjs: string };
    noFreeTitle: string;
    noFreeBody: string;
  };
}
