/**
 * Locale support is open-ended: any BCP-47 tag is accepted. The catalogue below
 * exists so the UI can show a native name, pick a text direction and rank by
 * reach without a network call — an unknown tag still works, it just falls back
 * to the raw tag and left-to-right.
 *
 * `speakers` is total speakers in millions (L1 + L2, rounded). It is not
 * displayed as a fact; it only orders the picker so the languages that reach the
 * most people surface first instead of an alphabetical list where Afrikaans
 * outranks Mandarin.
 */

export interface LocaleInfo {
  /** BCP-47 tag, e.g. "tr", "pt-BR" */
  code: string;
  /** Name in the language itself — what a speaker expects to see in a switcher */
  nativeName: string;
  /** English name, for the builder UI when it runs in English */
  englishName: string;
  dir: "ltr" | "rtl";
  /** Approximate total speakers, millions. Ordering only. */
  speakers: number;
  region: "europe" | "asia" | "africa" | "americas" | "middle-east" | "oceania";
}

const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ku", "arc"]);

const CATALOGUE: readonly LocaleInfo[] = [
  // ---- Global reach ----
  { code: "en", nativeName: "English", englishName: "English", dir: "ltr", speakers: 1500, region: "europe" },
  { code: "zh", nativeName: "简体中文", englishName: "Chinese (Simplified)", dir: "ltr", speakers: 1100, region: "asia" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", dir: "ltr", speakers: 610, region: "asia" },
  { code: "es", nativeName: "Español", englishName: "Spanish", dir: "ltr", speakers: 560, region: "europe" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", dir: "rtl", speakers: 420, region: "middle-east" },
  { code: "fr", nativeName: "Français", englishName: "French", dir: "ltr", speakers: 310, region: "europe" },
  { code: "bn", nativeName: "বাংলা", englishName: "Bengali", dir: "ltr", speakers: 280, region: "asia" },
  { code: "pt", nativeName: "Português", englishName: "Portuguese", dir: "ltr", speakers: 265, region: "europe" },
  { code: "ru", nativeName: "Русский", englishName: "Russian", dir: "ltr", speakers: 255, region: "europe" },
  { code: "ur", nativeName: "اردو", englishName: "Urdu", dir: "rtl", speakers: 235, region: "asia" },
  { code: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian", dir: "ltr", speakers: 200, region: "asia" },
  { code: "de", nativeName: "Deutsch", englishName: "German", dir: "ltr", speakers: 135, region: "europe" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese", dir: "ltr", speakers: 125, region: "asia" },
  { code: "pt-BR", nativeName: "Português (Brasil)", englishName: "Portuguese (Brazil)", dir: "ltr", speakers: 215, region: "americas" },
  { code: "mr", nativeName: "मराठी", englishName: "Marathi", dir: "ltr", speakers: 100, region: "asia" },
  { code: "te", nativeName: "తెలుగు", englishName: "Telugu", dir: "ltr", speakers: 95, region: "asia" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", dir: "ltr", speakers: 90, region: "middle-east" },
  { code: "ta", nativeName: "தமிழ்", englishName: "Tamil", dir: "ltr", speakers: 87, region: "asia" },
  { code: "vi", nativeName: "Tiếng Việt", englishName: "Vietnamese", dir: "ltr", speakers: 86, region: "asia" },
  { code: "ko", nativeName: "한국어", englishName: "Korean", dir: "ltr", speakers: 82, region: "asia" },
  { code: "it", nativeName: "Italiano", englishName: "Italian", dir: "ltr", speakers: 68, region: "europe" },
  { code: "fa", nativeName: "فارسی", englishName: "Persian", dir: "rtl", speakers: 78, region: "middle-east" },
  { code: "sw", nativeName: "Kiswahili", englishName: "Swahili", dir: "ltr", speakers: 72, region: "africa" },
  { code: "ha", nativeName: "Hausa", englishName: "Hausa", dir: "ltr", speakers: 80, region: "africa" },
  { code: "th", nativeName: "ไทย", englishName: "Thai", dir: "ltr", speakers: 61, region: "asia" },
  { code: "gu", nativeName: "ગુજરાતી", englishName: "Gujarati", dir: "ltr", speakers: 60, region: "asia" },
  { code: "pl", nativeName: "Polski", englishName: "Polish", dir: "ltr", speakers: 45, region: "europe" },
  { code: "kn", nativeName: "ಕನ್ನಡ", englishName: "Kannada", dir: "ltr", speakers: 56, region: "asia" },
  { code: "ml", nativeName: "മലയാളം", englishName: "Malayalam", dir: "ltr", speakers: 38, region: "asia" },
  { code: "pa", nativeName: "ਪੰਜਾਬੀ", englishName: "Punjabi", dir: "ltr", speakers: 113, region: "asia" },
  { code: "uk", nativeName: "Українська", englishName: "Ukrainian", dir: "ltr", speakers: 40, region: "europe" },
  { code: "ms", nativeName: "Bahasa Melayu", englishName: "Malay", dir: "ltr", speakers: 40, region: "asia" },
  { code: "zh-TW", nativeName: "繁體中文", englishName: "Chinese (Traditional)", dir: "ltr", speakers: 40, region: "asia" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch", dir: "ltr", speakers: 30, region: "europe" },
  { code: "ro", nativeName: "Română", englishName: "Romanian", dir: "ltr", speakers: 25, region: "europe" },
  { code: "am", nativeName: "አማርኛ", englishName: "Amharic", dir: "ltr", speakers: 35, region: "africa" },
  { code: "yo", nativeName: "Yorùbá", englishName: "Yoruba", dir: "ltr", speakers: 46, region: "africa" },
  { code: "ig", nativeName: "Igbo", englishName: "Igbo", dir: "ltr", speakers: 31, region: "africa" },
  { code: "my", nativeName: "မြန်မာ", englishName: "Burmese", dir: "ltr", speakers: 33, region: "asia" },
  { code: "az", nativeName: "Azərbaycan", englishName: "Azerbaijani", dir: "ltr", speakers: 30, region: "middle-east" },
  { code: "uz", nativeName: "Oʻzbekcha", englishName: "Uzbek", dir: "ltr", speakers: 35, region: "asia" },
  { code: "ne", nativeName: "नेपाली", englishName: "Nepali", dir: "ltr", speakers: 32, region: "asia" },
  { code: "si", nativeName: "සිංහල", englishName: "Sinhala", dir: "ltr", speakers: 22, region: "asia" },
  { code: "km", nativeName: "ខ្មែរ", englishName: "Khmer", dir: "ltr", speakers: 17, region: "asia" },
  { code: "el", nativeName: "Ελληνικά", englishName: "Greek", dir: "ltr", speakers: 13, region: "europe" },
  { code: "hu", nativeName: "Magyar", englishName: "Hungarian", dir: "ltr", speakers: 13, region: "europe" },
  { code: "cs", nativeName: "Čeština", englishName: "Czech", dir: "ltr", speakers: 11, region: "europe" },
  { code: "sv", nativeName: "Svenska", englishName: "Swedish", dir: "ltr", speakers: 13, region: "europe" },
  { code: "he", nativeName: "עברית", englishName: "Hebrew", dir: "rtl", speakers: 9, region: "middle-east" },
  { code: "bg", nativeName: "Български", englishName: "Bulgarian", dir: "ltr", speakers: 8, region: "europe" },
  { code: "sr", nativeName: "Српски", englishName: "Serbian", dir: "ltr", speakers: 12, region: "europe" },
  { code: "hr", nativeName: "Hrvatski", englishName: "Croatian", dir: "ltr", speakers: 7, region: "europe" },
  { code: "sk", nativeName: "Slovenčina", englishName: "Slovak", dir: "ltr", speakers: 5, region: "europe" },
  { code: "da", nativeName: "Dansk", englishName: "Danish", dir: "ltr", speakers: 6, region: "europe" },
  { code: "fi", nativeName: "Suomi", englishName: "Finnish", dir: "ltr", speakers: 5, region: "europe" },
  { code: "no", nativeName: "Norsk", englishName: "Norwegian", dir: "ltr", speakers: 5, region: "europe" },
  { code: "sq", nativeName: "Shqip", englishName: "Albanian", dir: "ltr", speakers: 8, region: "europe" },
  { code: "lt", nativeName: "Lietuvių", englishName: "Lithuanian", dir: "ltr", speakers: 3, region: "europe" },
  { code: "lv", nativeName: "Latviešu", englishName: "Latvian", dir: "ltr", speakers: 2, region: "europe" },
  { code: "et", nativeName: "Eesti", englishName: "Estonian", dir: "ltr", speakers: 1, region: "europe" },
  { code: "sl", nativeName: "Slovenščina", englishName: "Slovenian", dir: "ltr", speakers: 2, region: "europe" },
  { code: "mk", nativeName: "Македонски", englishName: "Macedonian", dir: "ltr", speakers: 2, region: "europe" },
  { code: "bs", nativeName: "Bosanski", englishName: "Bosnian", dir: "ltr", speakers: 3, region: "europe" },
  { code: "ka", nativeName: "ქართული", englishName: "Georgian", dir: "ltr", speakers: 4, region: "europe" },
  { code: "hy", nativeName: "Հայերեն", englishName: "Armenian", dir: "ltr", speakers: 5, region: "middle-east" },
  { code: "kk", nativeName: "Қазақша", englishName: "Kazakh", dir: "ltr", speakers: 14, region: "asia" },
  { code: "ky", nativeName: "Кыргызча", englishName: "Kyrgyz", dir: "ltr", speakers: 5, region: "asia" },
  { code: "tk", nativeName: "Türkmençe", englishName: "Turkmen", dir: "ltr", speakers: 7, region: "asia" },
  { code: "tg", nativeName: "Тоҷикӣ", englishName: "Tajik", dir: "ltr", speakers: 8, region: "asia" },
  { code: "mn", nativeName: "Монгол", englishName: "Mongolian", dir: "ltr", speakers: 5, region: "asia" },
  { code: "ps", nativeName: "پښتو", englishName: "Pashto", dir: "rtl", speakers: 43, region: "middle-east" },
  { code: "ku", nativeName: "Kurdî", englishName: "Kurdish", dir: "ltr", speakers: 30, region: "middle-east" },
  { code: "tl", nativeName: "Tagalog", englishName: "Tagalog", dir: "ltr", speakers: 82, region: "asia" },
  { code: "jv", nativeName: "Basa Jawa", englishName: "Javanese", dir: "ltr", speakers: 68, region: "asia" },
  { code: "or", nativeName: "ଓଡ଼ିଆ", englishName: "Odia", dir: "ltr", speakers: 35, region: "asia" },
  { code: "as", nativeName: "অসমীয়া", englishName: "Assamese", dir: "ltr", speakers: 15, region: "asia" },
  { code: "lo", nativeName: "ລາວ", englishName: "Lao", dir: "ltr", speakers: 30, region: "asia" },
  { code: "zu", nativeName: "isiZulu", englishName: "Zulu", dir: "ltr", speakers: 28, region: "africa" },
  { code: "xh", nativeName: "isiXhosa", englishName: "Xhosa", dir: "ltr", speakers: 19, region: "africa" },
  { code: "af", nativeName: "Afrikaans", englishName: "Afrikaans", dir: "ltr", speakers: 17, region: "africa" },
  { code: "so", nativeName: "Soomaali", englishName: "Somali", dir: "ltr", speakers: 22, region: "africa" },
  { code: "rw", nativeName: "Kinyarwanda", englishName: "Kinyarwanda", dir: "ltr", speakers: 15, region: "africa" },
  { code: "sn", nativeName: "chiShona", englishName: "Shona", dir: "ltr", speakers: 14, region: "africa" },
  { code: "ny", nativeName: "Chichewa", englishName: "Chichewa", dir: "ltr", speakers: 14, region: "africa" },
  { code: "ff", nativeName: "Fulfulde", englishName: "Fula", dir: "ltr", speakers: 37, region: "africa" },
  { code: "ti", nativeName: "ትግርኛ", englishName: "Tigrinya", dir: "ltr", speakers: 9, region: "africa" },
  { code: "mg", nativeName: "Malagasy", englishName: "Malagasy", dir: "ltr", speakers: 25, region: "africa" },
  { code: "es-MX", nativeName: "Español (México)", englishName: "Spanish (Mexico)", dir: "ltr", speakers: 130, region: "americas" },
  { code: "es-AR", nativeName: "Español (Argentina)", englishName: "Spanish (Argentina)", dir: "ltr", speakers: 45, region: "americas" },
  { code: "fr-CA", nativeName: "Français (Canada)", englishName: "French (Canada)", dir: "ltr", speakers: 11, region: "americas" },
  { code: "en-GB", nativeName: "English (UK)", englishName: "English (UK)", dir: "ltr", speakers: 60, region: "europe" },
  { code: "en-US", nativeName: "English (US)", englishName: "English (US)", dir: "ltr", speakers: 330, region: "americas" },
  { code: "de-CH", nativeName: "Deutsch (Schweiz)", englishName: "German (Switzerland)", dir: "ltr", speakers: 5, region: "europe" },
  { code: "nl-BE", nativeName: "Nederlands (België)", englishName: "Dutch (Belgium)", dir: "ltr", speakers: 6, region: "europe" },
  { code: "ca", nativeName: "Català", englishName: "Catalan", dir: "ltr", speakers: 10, region: "europe" },
  { code: "eu", nativeName: "Euskara", englishName: "Basque", dir: "ltr", speakers: 1, region: "europe" },
  { code: "gl", nativeName: "Galego", englishName: "Galician", dir: "ltr", speakers: 2, region: "europe" },
  { code: "is", nativeName: "Íslenska", englishName: "Icelandic", dir: "ltr", speakers: 1, region: "europe" },
  { code: "ga", nativeName: "Gaeilge", englishName: "Irish", dir: "ltr", speakers: 2, region: "europe" },
  { code: "cy", nativeName: "Cymraeg", englishName: "Welsh", dir: "ltr", speakers: 1, region: "europe" },
  { code: "mt", nativeName: "Malti", englishName: "Maltese", dir: "ltr", speakers: 1, region: "europe" },
  { code: "mi", nativeName: "Te Reo Māori", englishName: "Maori", dir: "ltr", speakers: 1, region: "oceania" },
  { code: "sm", nativeName: "Gagana Samoa", englishName: "Samoan", dir: "ltr", speakers: 1, region: "oceania" },
  { code: "haw", nativeName: "ʻŌlelo Hawaiʻi", englishName: "Hawaiian", dir: "ltr", speakers: 1, region: "oceania" },
  { code: "dv", nativeName: "ދިވެހި", englishName: "Dhivehi", dir: "rtl", speakers: 1, region: "asia" },
  { code: "ug", nativeName: "ئۇيغۇرچە", englishName: "Uyghur", dir: "rtl", speakers: 11, region: "asia" },
  { code: "sd", nativeName: "سنڌي", englishName: "Sindhi", dir: "rtl", speakers: 32, region: "asia" },
  { code: "yi", nativeName: "ייִדיש", englishName: "Yiddish", dir: "rtl", speakers: 1, region: "europe" },
];

const BY_CODE = new Map(CATALOGUE.map((l) => [l.code.toLowerCase(), l]));

/** Ordered by reach, so the picker leads with the languages that serve the most people. */
export const LOCALE_CATALOGUE: readonly LocaleInfo[] = [...CATALOGUE].sort((a, b) => b.speakers - a.speakers);

export const LOCALE_COUNT = CATALOGUE.length;

/** Rough BCP-47 shape: "tr", "pt-BR", "zh-Hant-TW". Deliberately permissive. */
export function isValidLocaleTag(tag: string): boolean {
  return /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/i.test(tag);
}

/**
 * Describes any tag, catalogued or not. An unknown tag keeps working — we fall
 * back to the tag itself and infer direction from the primary subtag, so a
 * language nobody thought of never becomes an error.
 */
export function describeLocale(tag: string): LocaleInfo {
  const known = BY_CODE.get(tag.toLowerCase());
  if (known) return known;

  const primary = tag.split("-")[0]!.toLowerCase();
  const fallbackOfPrimary = BY_CODE.get(primary);
  if (fallbackOfPrimary) return { ...fallbackOfPrimary, code: tag };

  return {
    code: tag,
    nativeName: tag,
    englishName: tag,
    dir: RTL_LANGUAGES.has(primary) ? "rtl" : "ltr",
    speakers: 0,
    region: "europe",
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

/** Combined reach of a language set, for the "how many people can read this" figure. */
export function combinedReach(locales: string[]): number {
  return locales.reduce((total, tag) => total + describeLocale(tag).speakers, 0);
}

export function searchLocales(query: string, limit = 12): LocaleInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return LOCALE_CATALOGUE.slice(0, limit);
  return LOCALE_CATALOGUE.filter(
    (l) =>
      l.code.toLowerCase().startsWith(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.englishName.toLowerCase().includes(q),
  ).slice(0, limit);
}
