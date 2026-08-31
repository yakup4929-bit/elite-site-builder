/**
 * Generation options the customer controls beyond the brief itself.
 *
 * Each option carries a `promptHint` written as an instruction to the model
 * rather than a label, so the prompt builder can splice it in directly. Hints
 * describe *how to write*, never *what to say* — the brief owns the content, and
 * a hint that smuggled in subject matter would fight it.
 */

export interface Choice {
  id: string;
  label: Record<string, string>;
  /** One line shown under the label so the difference is legible before choosing. */
  hint: Record<string, string>;
  promptHint: string;
}

function pick(record: Record<string, string>, uiLocale: string, fallback = ""): string {
  return record[uiLocale] ?? record.en ?? fallback;
}

export function choiceLabel(choice: Choice, uiLocale: string): string {
  return pick(choice.label, uiLocale, choice.id);
}

export function choiceHint(choice: Choice, uiLocale: string): string {
  return pick(choice.hint, uiLocale);
}

// ---------------------------------------------------------------- tone of voice

export const TONES: Choice[] = [
  {
    id: "elit",
    label: { tr: "Elit", en: "Refined", fr: "Raffiné" },
    hint: {
      tr: "Ölçülü, güven veren, abartısız lüks.",
      en: "Measured, assured, luxury without shouting.",
      fr: "Mesuré, assuré, un luxe qui ne crie pas.",
    },
    promptHint:
      "Write with restraint. Confidence comes from specifics and understatement, never from superlatives. Avoid exclamation marks and words like 'amazing' or 'revolutionary'.",
  },
  {
    id: "sicak",
    label: { tr: "Sıcak", en: "Warm", fr: "Chaleureux" },
    hint: {
      tr: "Samimi, insana yakın, konuşur gibi.",
      en: "Friendly, personal, close to spoken language.",
      fr: "Amical, personnel, proche de la langue parlée.",
    },
    promptHint:
      "Write the way a proprietor would speak to a guest they are glad to see. Address the reader directly, use short sentences, and prefer plain words over industry vocabulary.",
  },
  {
    id: "kurumsal",
    label: { tr: "Kurumsal", en: "Corporate", fr: "Institutionnel" },
    hint: {
      tr: "Net, ciddi, kanıta dayalı.",
      en: "Clear, serious, evidence-led.",
      fr: "Clair, sérieux, fondé sur des preuves.",
    },
    promptHint:
      "Write for a reader evaluating a supplier. Lead with capability, scale and process. State figures and commitments plainly; avoid warmth that would read as unserious.",
  },
  {
    id: "cesur",
    label: { tr: "Cesur", en: "Bold", fr: "Audacieux" },
    hint: {
      tr: "Kısa, iddialı, dikkat çeken.",
      en: "Short, assertive, attention-taking.",
      fr: "Court, affirmé, qui capte l'attention.",
    },
    promptHint:
      "Write in short, declarative sentences. Take a position. Headlines should be able to stand alone on a billboard, but every claim must still be one the business could defend.",
  },
  {
    id: "teknik",
    label: { tr: "Teknik", en: "Technical", fr: "Technique" },
    hint: {
      tr: "Ayrıntılı, spesifik, uzmana hitap eden.",
      en: "Detailed, specific, written for a specialist.",
      fr: "Détaillé, précis, destiné à un spécialiste.",
    },
    promptHint:
      "Assume the reader knows the field. Use exact terminology, materials, standards and numbers. Do not explain basics, and do not soften detail for a general audience.",
  },
  {
    id: "minimal",
    label: { tr: "Minimal", en: "Minimal", fr: "Minimal" },
    hint: {
      tr: "Az kelime, çok boşluk, sade.",
      en: "Few words, much space, plain.",
      fr: "Peu de mots, beaucoup d'espace, sobre.",
    },
    promptHint:
      "Use as few words as will carry the meaning. No adjective survives unless it changes the sentence. Prefer a fragment to a padded sentence.",
  },
];

export const DEFAULT_TONE = "elit";

// ------------------------------------------------------------------ copy length

export const DENSITIES: Choice[] = [
  {
    id: "oz",
    label: { tr: "Öz", en: "Concise", fr: "Concis" },
    hint: {
      tr: "Kısa bloklar, hızlı okunur.",
      en: "Short blocks, quick to read.",
      fr: "Blocs courts, lecture rapide.",
    },
    promptHint:
      "Keep descriptions to one or two sentences and feature entries to a single line.",
  },
  {
    id: "dengeli",
    label: { tr: "Dengeli", en: "Balanced", fr: "Équilibré" },
    hint: {
      tr: "Anlatmaya yetecek kadar.",
      en: "Enough to explain, no more.",
      fr: "Juste ce qu'il faut pour expliquer.",
    },
    promptHint:
      "Give descriptions two or three sentences and let feature entries carry a concrete detail each.",
  },
  {
    id: "detayli",
    label: { tr: "Detaylı", en: "Detailed", fr: "Détaillé" },
    hint: {
      tr: "Uzun metin, SEO'ya çalışır.",
      en: "Longer copy, works harder for search.",
      fr: "Texte plus long, meilleur pour le référencement.",
    },
    promptHint:
      "Write fuller paragraphs — four to six sentences where the section warrants it — and give each feature entry a specific, searchable detail. Depth must come from substance, never from repetition.",
  },
];

export const DEFAULT_DENSITY = "dengeli";

// ---------------------------------------------------------------------- lookups

export function findTone(id: string | undefined): Choice {
  return TONES.find((t) => t.id === id) ?? TONES.find((t) => t.id === DEFAULT_TONE)!;
}

export function findDensity(id: string | undefined): Choice {
  return DENSITIES.find((d) => d.id === id) ?? DENSITIES.find((d) => d.id === DEFAULT_DENSITY)!;
}
