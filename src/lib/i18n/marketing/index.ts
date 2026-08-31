import type { UiLocale } from "../ui";
import { localeDir } from "../locales";
import type { MarketingCopy } from "./types";
import { TR } from "./tr";
import { EN } from "./en";
import { FR } from "./fr";
import { DE } from "./de";
import { ES } from "./es";
import { IT } from "./it";
import { PT } from "./pt";
import { NL } from "./nl";
import { RU } from "./ru";
import { AR } from "./ar";

export type { MarketingCopy } from "./types";

/**
 * One file per language rather than one large module: at ten locales a single
 * file becomes hard to diff, and a per-file layout means adding a language is a
 * new file plus one line here.
 */
const COPY: Record<UiLocale, MarketingCopy> = {
  tr: TR,
  en: EN,
  fr: FR,
  de: DE,
  es: ES,
  it: IT,
  pt: PT,
  nl: NL,
  ru: RU,
  ar: AR,
};

export function marketing(locale: string): MarketingCopy {
  return COPY[locale as UiLocale] ?? COPY.en;
}

/**
 * Text direction for the interface itself. Selecting Arabic has to mirror our
 * own pages too — a tool that sells correct RTL output cannot render its own
 * shopfront left-to-right while claiming otherwise.
 */
export function uiDir(locale: string): "ltr" | "rtl" {
  return localeDir(locale);
}
