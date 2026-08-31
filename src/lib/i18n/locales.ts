/**
 * Locale support is open-ended: any BCP-47 tag is accepted. The catalogue below
 * only exists so the UI can show a native name and pick a text direction without
 * a network call — an unknown tag still works, it just falls back to showing the
 * raw tag and left-to-right.
 */

export interface LocaleInfo {
  /** BCP-47 tag, e.g. "tr", "pt-BR" */
  code: string;
  /** Name in the language itself — what a speaker expects to see in a switcher */
  nativeName: string;
  /** English name, for the builder UI when it runs in English */
  englishName: string;
  dir: "ltr" | "rtl";
}

const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv"]);

const CATALOGUE: readonly LocaleInfo[] = [
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", dir: "ltr" },
  { code: "en", nativeName: "English", englishName: "English", dir: "ltr" },
  { code: "fr", nativeName: "Français", englishName: "French", dir: "ltr" },
  { code: "de", nativeName: "Deutsch", englishName: "German", dir: "ltr" },
  { code: "es", nativeName: "Español", englishName: "Spanish", dir: "ltr" },
  { code: "it", nativeName: "Italiano", englishName: "Italian", dir: "ltr" },
  { code: "pt", nativeName: "Português", englishName: "Portuguese", dir: "ltr" },
  { code: "pt-BR", nativeName: "Português (Brasil)", englishName: "Portuguese (Brazil)", dir: "ltr" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch", dir: "ltr" },
  { code: "pl", nativeName: "Polski", englishName: "Polish", dir: "ltr" },
  { code: "ru", nativeName: "Русский", englishName: "Russian", dir: "ltr" },
  { code: "uk", nativeName: "Українська", englishName: "Ukrainian", dir: "ltr" },
  { code: "cs", nativeName: "Čeština", englishName: "Czech", dir: "ltr" },
  { code: "ro", nativeName: "Română", englishName: "Romanian", dir: "ltr" },
  { code: "el", nativeName: "Ελληνικά", englishName: "Greek", dir: "ltr" },
  { code: "sv", nativeName: "Svenska", englishName: "Swedish", dir: "ltr" },
  { code: "da", nativeName: "Dansk", englishName: "Danish", dir: "ltr" },
  { code: "fi", nativeName: "Suomi", englishName: "Finnish", dir: "ltr" },
  { code: "no", nativeName: "Norsk", englishName: "Norwegian", dir: "ltr" },
  { code: "hu", nativeName: "Magyar", englishName: "Hungarian", dir: "ltr" },
  { code: "bg", nativeName: "Български", englishName: "Bulgarian", dir: "ltr" },
  { code: "sr", nativeName: "Српски", englishName: "Serbian", dir: "ltr" },
  { code: "hr", nativeName: "Hrvatski", englishName: "Croatian", dir: "ltr" },
  { code: "sq", nativeName: "Shqip", englishName: "Albanian", dir: "ltr" },
  { code: "az", nativeName: "Azərbaycan", englishName: "Azerbaijani", dir: "ltr" },
  { code: "kk", nativeName: "Қазақша", englishName: "Kazakh", dir: "ltr" },
  { code: "uz", nativeName: "O'zbek", englishName: "Uzbek", dir: "ltr" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", dir: "rtl" },
  { code: "he", nativeName: "עברית", englishName: "Hebrew", dir: "rtl" },
  { code: "fa", nativeName: "فارسی", englishName: "Persian", dir: "rtl" },
  { code: "ur", nativeName: "اردو", englishName: "Urdu", dir: "rtl" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", dir: "ltr" },
  { code: "bn", nativeName: "বাংলা", englishName: "Bengali", dir: "ltr" },
  { code: "th", nativeName: "ไทย", englishName: "Thai", dir: "ltr" },
  { code: "vi", nativeName: "Tiếng Việt", englishName: "Vietnamese", dir: "ltr" },
  { code: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian", dir: "ltr" },
  { code: "ms", nativeName: "Bahasa Melayu", englishName: "Malay", dir: "ltr" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese", dir: "ltr" },
  { code: "ko", nativeName: "한국어", englishName: "Korean", dir: "ltr" },
  { code: "zh", nativeName: "中文", englishName: "Chinese", dir: "ltr" },
  { code: "zh-TW", nativeName: "繁體中文", englishName: "Chinese (Traditional)", dir: "ltr" },
  { code: "sw", nativeName: "Kiswahili", englishName: "Swahili", dir: "ltr" },
];

const BY_CODE = new Map(CATALOGUE.map((l) => [l.code.toLowerCase(), l]));

export const LOCALE_CATALOGUE = CATALOGUE;

/** Rough BCP-47 shape: "tr", "pt-BR", "zh-Hant-TW". Deliberately permissive. */
export function isValidLocaleTag(tag: string): boolean {
  return /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/i.test(tag);
}

/**
 * Describes any tag, cataloged or not. An unknown tag keeps working — we fall
 * back to the tag itself and infer direction from the primary subtag, so adding
 * a language never requires editing this file.
 */
export function describeLocale(tag: string): LocaleInfo {
  const known = BY_CODE.get(tag.toLowerCase());
  if (known) return known;

  const primary = tag.split("-")[0]!.toLowerCase();
  const fallbackOfPrimary = BY_CODE.get(primary);
  if (fallbackOfPrimary) {
    return { ...fallbackOfPrimary, code: tag };
  }

  return {
    code: tag,
    nativeName: tag,
    englishName: tag,
    dir: RTL_LANGUAGES.has(primary) ? "rtl" : "ltr",
  };
}

export function localeDir(tag: string): "ltr" | "rtl" {
  return describeLocale(tag).dir;
}

/** Drops duplicates and invalid tags, and guarantees defaultLocale comes first. */
export function normaliseLocales(locales: string[], defaultLocale: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tag of [defaultLocale, ...locales]) {
    const trimmed = tag.trim();
    if (!trimmed || !isValidLocaleTag(trimmed)) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}
