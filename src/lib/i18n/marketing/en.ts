import type { MarketingCopy } from "./types";

export const EN: MarketingCopy = {
  nav: { product: "Product", languages: "Languages", pricing: "Pricing", demo: "Demo", start: "Start" },
  hero: {
    eyebrow: "Multilingual site generator",
    title: "Write one sentence. Get a site in the languages the world speaks.",
    subtitle:
      "Describe your business in a sentence and Aeltay Studio builds a launch-ready website — in as many languages as you need, produced together, each one written in that language.",
    primaryCta: "Build your site",
    secondaryCta: "See an example",
    note: "Try it before entering any card details.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "languages ready, add any other",
    oneCall: "One request",
    oneCallLabel: "every language produced together",
    rtl: "RTL",
    rtlLabel: "Arabic, Hebrew, Persian and Urdu read correctly",
  },
  difference: {
    title: "Written, not translated.",
    lead: "The difference is what the page feels like when someone reads it.",
    translatedTitle: "What a translation plugin does",
    translatedBody:
      "A site is written in one language, then handed to a machine. Sentence structure keeps the shape of the original, idioms come across literally, headlines outgrow their boxes. Readers understand it — and can tell it was not written for them.",
    generatedTitle: "What Aeltay Studio does",
    generatedBody:
      "Each language is produced the way a premium brand in that market actually writes. Same offer, same structure, same block order — different sentences. German runs long, Japanese runs short; the copy accounts for it so the layout holds.",
    closing:
      "Because every language comes from one model in one request, the brand voice does not drift between them.",
  },
  how: {
    title: "Three steps, a few minutes.",
    lead: "No template picking, no drag and drop, no empty boxes to fill.",
    steps: [
      {
        title: "Describe your business",
        body: "A sentence or two about your industry and what you do. The more specific you are, the more the copy belongs to you.",
      },
      {
        title: "Pick languages and voice",
        body: "Add the languages you want to reach and set the tone: refined, warm, corporate, bold, technical or minimal.",
      },
      {
        title: "Take your site",
        body: "Sections appear in a live preview within seconds. Regenerate any single section you dislike, then publish or export the code.",
      },
    ],
  },
  languages: {
    title: "Do not narrow your audience.",
    lead: "The catalogue covers the world's most spoken languages, and it is not a closed list — write any BCP-47 tag and that language is produced too.",
    rtlNote:
      "Right-to-left languages genuinely run right to left: the layout mirrors, alignment flips, button order reverses.",
    anyTagNote: "Need a language that is not listed? Just type its tag.",
    reachLabel: "Combined reach of your selection",
  },
  blocks: {
    title: "What is on the page?",
    lead: "Every block is produced with its content — no string comes from a template.",
    items: [
      { title: "Hero", body: "Headline, subtitle, description and two calls to action, all written for your business." },
      { title: "Features", body: "What separates you from a competitor, in concrete detail rather than generalities." },
      { title: "About", body: "Your brand's story: how it started, how it works and why that way." },
      { title: "Pricing", body: "Prices in your own currency, real tier contents, the right tier highlighted." },
      { title: "Contact", body: "A form and contact details, tinted to the site's own palette." },
      { title: "Footer", body: "Brand, links and the copyright line." },
    ],
  },
  pricingTeaser: {
    title: "Honest pricing, no bolt-ons.",
    lead: "Languages are in the plan. You will not be sold word credits or a per-language subscription later.",
    cta: "See pricing",
    compare:
      "Translation plugins alone start around €15 a month for a single extra language. Here, languages are part of generation.",
  },
  faq: {
    title: "Frequently asked",
    items: [
      {
        q: "Is the copy actually usable, or filler?",
        a: "It is as specific as your brief. Give it your industry, location and what makes you different and the result is publishable; give it one word and you get something generic. Any section you dislike can be regenerated on its own.",
      },
      {
        q: "How do I know the translation is accurate?",
        a: "Nothing is translated. Each language is written from scratch in that language, so there is no transfer step to corrupt. You can still review and edit every language in the preview.",
      },
      {
        q: "How many languages can I add?",
        a: "It depends on your plan: two on Starter, six on Professional, twenty on Business, unlimited on Agency. Ask for more than your plan allows and the app tells you exactly which were left out rather than trimming silently.",
      },
      {
        q: "Can I move the site to my own server?",
        a: "Yes. Starter exports static HTML; Professional and above export a complete Next.js project. You are not locked in.",
      },
      {
        q: "Why is there no free plan?",
        a: "Every generation costs real model tokens, and that is the most expensive operation in the product. A free tier would be subsidising exactly that. We kept the entry price low instead.",
      },
      {
        q: "Can I cancel?",
        a: "Any time. If you paid yearly you keep access until the period ends.",
      },
    ],
  },
  finalCta: {
    title: "Describe your business in a sentence. We will build the rest.",
    body: "Your first site will be in the preview within minutes.",
    cta: "Build your site",
  },
  footer: {
    tagline: "The Aeltay family's multilingual site generator.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    rights: "All rights reserved.",
  },
  pricingPage: {
    title: "Pricing",
    lead: "Languages included. No word credits, no per-language subscription.",
    monthly: "Monthly",
    yearly: "Yearly",
    savePrefix: "save {n}%",
    perMonth: "/mo",
    billedYearly: "billed yearly",
    choose: "Choose this plan",
    recommended: "Most popular",
    comparisonTitle: "Plans side by side",
    featureColumn: "Feature",
    unlimited: "Unlimited",
    included: "Yes",
    notIncluded: "No",
    rows: {
      sitesPerMonth: "Sites per month",
      maxLocales: "Languages",
      blocks: "Blocks",
      regenerateBlock: "Regenerate a section",
      toneControl: "Tone control",
      themeVariants: "Theme variants",
      export: "Export",
      removeBranding: "Remove Aeltay branding",
      customDomain: "Custom domain",
      whiteLabel: "White-label",
      apiAccess: "API access",
      support: "Support",
    },
    supportLevels: { email: "Email", priority: "Priority", dedicated: "Dedicated" },
    exportKinds: { html: "Static HTML", nextjs: "Next.js project" },
    noFreeTitle: "Why is there no free plan?",
    noFreeBody:
      "Generating a site costs real model tokens every time — a free tier would subsidise the most expensive operation in the product. We kept the entry price low and put the languages in the plan instead.",
  },
};
