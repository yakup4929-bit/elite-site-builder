/**
 * Strings for the builder itself — separate from the languages a generated site
 * is written in, and separate from `marketing/` which covers the public pages.
 *
 * A missing key or an unknown UI language falls back to English rather than
 * rendering the raw key, so adding a locale can never blank out the interface.
 */

export const UI_LOCALES = ["tr", "en", "fr", "de", "es", "it", "pt", "nl", "ru", "ar"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];

export const DEFAULT_UI_LOCALE: UiLocale = "tr";

export type Dictionary = {
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
  tone: string;
  density: string;
  toneLocked: string;
  reach: string;
  reachUnit: string;
  backToSite: string;
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
    tone: "Ton",
    density: "Metin",
    toneLocked: "Ton seçimi Profesyonel paketten itibaren",
    reach: "Erişim",
    reachUnit: "milyon kişi",
    backToSite: "Siteye dön",
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
    tone: "Tone",
    density: "Copy",
    toneLocked: "Tone control from Professional upwards",
    reach: "Reach",
    reachUnit: "million people",
    backToSite: "Back to site",
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
    tone: "Ton",
    density: "Texte",
    toneLocked: "Choix du ton à partir de Professionnel",
    reach: "Portée",
    reachUnit: "millions de personnes",
    backToSite: "Retour au site",
  },
  de: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Branche (z. B. Luxusuhren)",
    promptPlaceholder: "Was für eine Website möchten Sie?",
    generate: "Erstellen",
    generating: "Wird erstellt…",
    emptyState: "Beschreiben Sie oben die gewünschte Website, um zu beginnen.",
    languages: "Sprachen",
    addLanguage: "Sprache hinzufügen",
    primaryLanguage: "Hauptsprache",
    plan: "Tarif",
    planLocked: "Dieser Tarif erlaubt keine Sprachauswahl",
    localesDropped: "Von Ihrem Tarif nicht abgedeckte Sprachen:",
    interfaceLanguage: "Oberflächensprache",
    errorPrefix: "Fehler",
    tone: "Tonfall",
    density: "Textlänge",
    toneLocked: "Tonfall ab Professional wählbar",
    reach: "Reichweite",
    reachUnit: "Millionen Menschen",
    backToSite: "Zurück zur Website",
  },
  es: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Sector (p. ej. Relojes de lujo)",
    promptPlaceholder: "¿Qué tipo de sitio quieres?",
    generate: "Generar",
    generating: "Generando…",
    emptyState: "Describe arriba el sitio que quieres para empezar.",
    languages: "Idiomas",
    addLanguage: "Añadir idioma",
    primaryLanguage: "principal",
    plan: "Plan",
    planLocked: "Este plan no permite elegir idiomas",
    localesDropped: "Idiomas que tu plan no incluyó:",
    interfaceLanguage: "Idioma de la interfaz",
    errorPrefix: "Error",
    tone: "Tono",
    density: "Texto",
    toneLocked: "Elección de tono desde Profesional",
    reach: "Alcance",
    reachUnit: "millones de personas",
    backToSite: "Volver al sitio",
  },
  it: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Settore (es. Orologi di lusso)",
    promptPlaceholder: "Che tipo di sito desideri?",
    generate: "Genera",
    generating: "Generazione…",
    emptyState: "Descrivi sopra il sito che desideri per iniziare.",
    languages: "Lingue",
    addLanguage: "Aggiungi lingua",
    primaryLanguage: "principale",
    plan: "Piano",
    planLocked: "Questo piano non consente di scegliere le lingue",
    localesDropped: "Lingue non incluse dal tuo piano:",
    interfaceLanguage: "Lingua dell'interfaccia",
    errorPrefix: "Errore",
    tone: "Tono",
    density: "Testo",
    toneLocked: "Scelta del tono da Professional in su",
    reach: "Portata",
    reachUnit: "milioni di persone",
    backToSite: "Torna al sito",
  },
  pt: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Setor (ex.: Relógios de luxo)",
    promptPlaceholder: "Que tipo de site quer?",
    generate: "Gerar",
    generating: "A gerar…",
    emptyState: "Descreva acima o site que pretende para começar.",
    languages: "Idiomas",
    addLanguage: "Adicionar idioma",
    primaryLanguage: "principal",
    plan: "Plano",
    planLocked: "Este plano não permite escolher idiomas",
    localesDropped: "Idiomas não incluídos no seu plano:",
    interfaceLanguage: "Idioma da interface",
    errorPrefix: "Erro",
    tone: "Tom",
    density: "Texto",
    toneLocked: "Escolha de tom a partir do Profissional",
    reach: "Alcance",
    reachUnit: "milhões de pessoas",
    backToSite: "Voltar ao site",
  },
  nl: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Branche (bijv. Luxe horloges)",
    promptPlaceholder: "Wat voor site wilt u?",
    generate: "Genereren",
    generating: "Bezig…",
    emptyState: "Beschrijf hierboven de site die u wilt om te beginnen.",
    languages: "Talen",
    addLanguage: "Taal toevoegen",
    primaryLanguage: "hoofdtaal",
    plan: "Pakket",
    planLocked: "Dit pakket staat geen taalkeuze toe",
    localesDropped: "Talen die uw pakket niet dekte:",
    interfaceLanguage: "Interfacetaal",
    errorPrefix: "Fout",
    tone: "Toon",
    density: "Tekst",
    toneLocked: "Toonkeuze vanaf Professional",
    reach: "Bereik",
    reachUnit: "miljoen mensen",
    backToSite: "Terug naar de site",
  },
  ru: {
    brand: "Aeltay Studio",
    industryPlaceholder: "Отрасль (напр.: часы класса люкс)",
    promptPlaceholder: "Какой сайт вам нужен?",
    generate: "Создать",
    generating: "Создаём…",
    emptyState: "Опишите нужный сайт в поле выше, чтобы начать.",
    languages: "Языки",
    addLanguage: "Добавить язык",
    primaryLanguage: "основной",
    plan: "Тариф",
    planLocked: "Этот тариф не позволяет выбирать языки",
    localesDropped: "Языки, не вошедшие в ваш тариф:",
    interfaceLanguage: "Язык интерфейса",
    errorPrefix: "Ошибка",
    tone: "Тон",
    density: "Текст",
    toneLocked: "Выбор тона — с тарифа «Профессиональный»",
    reach: "Охват",
    reachUnit: "млн человек",
    backToSite: "Вернуться на сайт",
  },
  ar: {
    brand: "Aeltay Studio",
    industryPlaceholder: "القطاع (مثال: الساعات الفاخرة)",
    promptPlaceholder: "أي نوع من المواقع تريد؟",
    generate: "أنشئ الموقع",
    generating: "جارٍ الإنشاء…",
    emptyState: "صف الموقع الذي تريده في الحقل أعلاه للبدء.",
    languages: "اللغات",
    addLanguage: "أضف لغة",
    primaryLanguage: "الأساسية",
    plan: "الباقة",
    planLocked: "هذه الباقة لا تتيح اختيار اللغات",
    localesDropped: "لغات لم تشملها باقتك:",
    interfaceLanguage: "لغة الواجهة",
    errorPrefix: "خطأ",
    tone: "النبرة",
    density: "النص",
    toneLocked: "اختيار النبرة من باقة «المحترف» فصاعدًا",
    reach: "الوصول",
    reachUnit: "مليون شخص",
    backToSite: "العودة إلى الموقع",
  },
};

export function isUiLocale(value: string): value is UiLocale {
  return (UI_LOCALES as readonly string[]).includes(value);
}

export function t(locale: string, key: keyof Dictionary): string {
  const dict = isUiLocale(locale) ? DICTIONARIES[locale] : DICTIONARIES.en;
  return dict[key] ?? DICTIONARIES.en[key];
}
