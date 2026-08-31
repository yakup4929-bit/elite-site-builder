/**
 * Strings for the builder itself — separate from the languages a generated site
 * is written in. A missing key or an unknown UI language falls back to English
 * rather than rendering the raw key.
 */

export const UI_LOCALES = ["tr", "en", "fr"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];

export const DEFAULT_UI_LOCALE: UiLocale = "tr";

type Dictionary = {
  brand: string;
  industryPlaceholder: string;
  promptPlaceholder: string;
  generate: string;
  generating: string;
  emptyState: string;
  languages: string;
  addLanguage: string;
  primaryLanguage: string;
  plan: string;
  planLocked: string;
  localesDropped: string;
  interfaceLanguage: string;
  errorPrefix: string;
};

const DICTIONARIES: Record<UiLocale, Dictionary> = {
  tr: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Sektör (Örn: Lüks Saat)",
    promptPlaceholder: "Nasıl bir site istersiniz?",
    generate: "Sihri Başlat",
    generating: "Üretiliyor…",
    emptyState: "Hayalinizdeki siteyi oluşturmak için yukarıya direktiflerinizi yazın.",
    languages: "Diller",
    addLanguage: "Dil ekle",
    primaryLanguage: "ana dil",
    plan: "Paket",
    planLocked: "Bu paket dil seçimine izin vermiyor",
    localesDropped: "Paketiniz nedeniyle eklenmeyen diller:",
    interfaceLanguage: "Arayüz dili",
    errorPrefix: "Hata",
  },
  en: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Industry (e.g. Luxury Watches)",
    promptPlaceholder: "What kind of site do you want?",
    generate: "Generate",
    generating: "Generating…",
    emptyState: "Describe the site you want in the field above to get started.",
    languages: "Languages",
    addLanguage: "Add language",
    primaryLanguage: "primary",
    plan: "Plan",
    planLocked: "This plan does not allow choosing languages",
    localesDropped: "Languages your plan did not include:",
    interfaceLanguage: "Interface language",
    errorPrefix: "Error",
  },
  fr: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Secteur (ex : Montres de luxe)",
    promptPlaceholder: "Quel type de site souhaitez-vous ?",
    generate: "Générer",
    generating: "Génération…",
    emptyState: "Décrivez le site souhaité dans le champ ci-dessus pour commencer.",
    languages: "Langues",
    addLanguage: "Ajouter une langue",
    primaryLanguage: "principale",
    plan: "Forfait",
    planLocked: "Ce forfait ne permet pas de choisir les langues",
    localesDropped: "Langues non incluses par votre forfait :",
    interfaceLanguage: "Langue de l'interface",
    errorPrefix: "Erreur",
  },
};

export function isUiLocale(value: string): value is UiLocale {
  return (UI_LOCALES as readonly string[]).includes(value);
}

export function t(locale: string, key: keyof Dictionary): string {
  const dict = isUiLocale(locale) ? DICTIONARIES[locale] : DICTIONARIES.en;
  return dict[key] ?? DICTIONARIES.en[key];
}
