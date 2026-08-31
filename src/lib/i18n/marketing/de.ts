import type { MarketingCopy } from "./types";

export const DE: MarketingCopy = {
  nav: { product: "Produkt", languages: "Sprachen", pricing: "Preise", demo: "Demo", start: "Loslegen" },
  hero: {
    eyebrow: "Mehrsprachiger Website-Generator",
    title: "Ein Satz genügt. Heraus kommt eine Website in den Sprachen der Welt.",
    subtitle:
      "Beschreiben Sie Ihr Geschäft in einem Satz, und Aeltay Studio baut eine startbereite Website — in so vielen Sprachen wie nötig, gemeinsam erzeugt, jede in ihrer eigenen Sprache geschrieben.",
    primaryCta: "Website erstellen",
    secondaryCta: "Beispiel ansehen",
    note: "Testen Sie es, bevor Sie Zahlungsdaten eingeben.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "Sprachen bereit, weitere frei ergänzbar",
    oneCall: "Eine Anfrage",
    oneCallLabel: "alle Sprachen entstehen zusammen",
    rtl: "RTL",
    rtlLabel: "Arabisch, Hebräisch, Persisch und Urdu laufen korrekt",
  },
  difference: {
    title: "Geschrieben, nicht übersetzt.",
    lead: "Der Unterschied zeigt sich beim Lesen.",
    translatedTitle: "Was ein Übersetzungs-Plugin tut",
    translatedBody:
      "Zuerst entsteht eine Website in einer Sprache, dann geht der Text an eine Maschine. Der Satzbau behält die Form des Originals, Redewendungen kommen wörtlich an, Überschriften sprengen ihre Kästen. Man versteht es — und merkt, dass es nicht für einen geschrieben wurde.",
    generatedTitle: "Was Aeltay Studio tut",
    generatedBody:
      "Jede Sprache entsteht so, wie eine Premiummarke in diesem Markt tatsächlich schreibt. Gleiches Angebot, gleiche Struktur, gleiche Blockreihenfolge — andere Sätze. Deutsch wird lang, Japanisch kurz; der Text berücksichtigt das, damit das Layout hält.",
    closing:
      "Weil alle Sprachen aus einem Modell in einer Anfrage stammen, driftet die Markenstimme nicht auseinander.",
  },
  how: {
    title: "Drei Schritte, wenige Minuten.",
    lead: "Keine Vorlagenauswahl, kein Drag-and-drop, keine leeren Felder.",
    steps: [
      {
        title: "Ihr Geschäft beschreiben",
        body: "Ein, zwei Sätze zu Branche und Tätigkeit. Je konkreter, desto mehr gehört der Text Ihnen.",
      },
      {
        title: "Sprachen und Tonfall wählen",
        body: "Fügen Sie die Zielsprachen hinzu und bestimmen Sie die Stimme: gediegen, warm, sachlich, mutig, technisch oder minimal.",
      },
      {
        title: "Website übernehmen",
        body: "Die Abschnitte erscheinen binnen Sekunden in der Live-Vorschau. Einzelne Abschnitte neu erzeugen, dann veröffentlichen oder den Code exportieren.",
      },
    ],
  },
  languages: {
    title: "Verkleinern Sie Ihr Publikum nicht.",
    lead: "Der Katalog deckt die meistgesprochenen Sprachen der Welt ab und ist keine geschlossene Liste — geben Sie ein beliebiges BCP-47-Kürzel ein, und auch diese Sprache wird erzeugt.",
    rtlNote:
      "Rechtsläufige Sprachen laufen wirklich von rechts nach links: Das Layout spiegelt, die Ausrichtung kippt, die Reihenfolge der Schaltflächen dreht sich um.",
    anyTagNote: "Eine Sprache fehlt im Katalog? Kürzel eingeben, fertig.",
    reachLabel: "Gesamtreichweite Ihrer Auswahl",
  },
  blocks: {
    title: "Was steht auf der Seite?",
    lead: "Jeder Block entsteht mit seinem Inhalt — keine Zeichenkette stammt aus einer Vorlage.",
    items: [
      { title: "Hero", body: "Überschrift, Unterzeile, Beschreibung und zwei Handlungsaufrufe, für Ihr Geschäft geschrieben." },
      { title: "Stärken", body: "Was Sie vom Wettbewerb trennt, konkret statt allgemein." },
      { title: "Über uns", body: "Die Geschichte der Marke: Anfang, Arbeitsweise und warum gerade so." },
      { title: "Preise", body: "Preise in Ihrer Währung, echte Paketinhalte, die richtige Stufe hervorgehoben." },
      { title: "Kontakt", body: "Formular und Kontaktdaten, in der Farbwelt der Seite." },
      { title: "Fußzeile", body: "Marke, Links und Copyright-Zeile." },
    ],
  },
  pricingTeaser: {
    title: "Ehrlicher Preis, keine Zusatzmodule.",
    lead: "Sprachen sind im Tarif enthalten. Keine Wortguthaben, kein Abo pro Sprache.",
    cta: "Preise ansehen",
    compare:
      "Reine Übersetzungs-Plugins beginnen bei etwa 15 € im Monat für eine einzige Zusatzsprache. Hier sind Sprachen Teil der Erzeugung.",
  },
  faq: {
    title: "Häufige Fragen",
    items: [
      {
        q: "Ist der Text wirklich brauchbar oder nur Füllmaterial?",
        a: "Er ist so konkret wie Ihr Briefing. Nennen Sie Branche, Ort und Ihr Alleinstellungsmerkmal, und das Ergebnis ist veröffentlichungsreif; ein Ein-Wort-Briefing liefert Allgemeinplätze. Jeder Abschnitt lässt sich einzeln neu erzeugen.",
      },
      {
        q: "Woher weiß ich, dass die Übersetzung stimmt?",
        a: "Es wird nichts übersetzt. Jede Sprache entsteht direkt in dieser Sprache, es gibt also keinen Übertragungsschritt, der etwas verfälschen könnte. Prüfen und bearbeiten können Sie jede Sprache trotzdem in der Vorschau.",
      },
      {
        q: "Wie viele Sprachen kann ich hinzufügen?",
        a: "Je nach Tarif: zwei bei Starter, sechs bei Professional, zwanzig bei Business, unbegrenzt bei Agency. Fordern Sie mehr an, als Ihr Tarif erlaubt, nennt die Anwendung genau die ausgelassenen Sprachen, statt still zu kürzen.",
      },
      {
        q: "Kann ich die Website auf meinen eigenen Server holen?",
        a: "Ja. Starter exportiert statisches HTML, Professional und höher ein vollständiges Next.js-Projekt. Kein Lock-in.",
      },
      {
        q: "Warum gibt es keinen kostenlosen Tarif?",
        a: "Jede Erzeugung kostet echte Modell-Token und ist damit der teuerste Vorgang im Produkt. Ein Gratistarif würde genau das subventionieren. Stattdessen haben wir den Einstiegspreis niedrig gehalten.",
      },
      {
        q: "Kann ich kündigen?",
        a: "Jederzeit. Bei Jahreszahlung bleibt der Zugang bis zum Periodenende bestehen.",
      },
    ],
  },
  finalCta: {
    title: "Beschreiben Sie Ihr Geschäft in einem Satz. Den Rest bauen wir.",
    body: "Ihre erste Website liegt in wenigen Minuten in der Vorschau.",
    cta: "Website erstellen",
  },
  footer: {
    tagline: "Der mehrsprachige Website-Generator der Aeltay-Familie.",
    product: "Produkt",
    company: "Unternehmen",
    legal: "Rechtliches",
    rights: "Alle Rechte vorbehalten.",
  },
  pricingPage: {
    title: "Preise",
    lead: "Sprachen inklusive. Keine Wortguthaben, kein Abo pro Sprache.",
    monthly: "Monatlich",
    yearly: "Jährlich",
    savePrefix: "{n} % sparen",
    perMonth: "/Mon.",
    billedYearly: "bei Jahreszahlung",
    choose: "Diesen Tarif wählen",
    recommended: "Am beliebtesten",
    comparisonTitle: "Tarife im Vergleich",
    featureColumn: "Funktion",
    unlimited: "Unbegrenzt",
    included: "Ja",
    notIncluded: "Nein",
    rows: {
      sitesPerMonth: "Websites pro Monat",
      maxLocales: "Sprachen",
      blocks: "Blöcke",
      regenerateBlock: "Abschnitt neu erzeugen",
      toneControl: "Tonfall wählbar",
      themeVariants: "Design-Varianten",
      export: "Export",
      removeBranding: "Aeltay-Branding entfernen",
      customDomain: "Eigene Domain",
      whiteLabel: "White-Label",
      apiAccess: "API-Zugang",
      support: "Support",
    },
    supportLevels: { email: "E-Mail", priority: "Bevorzugt", dedicated: "Fester Ansprechpartner" },
    exportKinds: { html: "Statisches HTML", nextjs: "Next.js-Projekt" },
    noFreeTitle: "Warum gibt es keinen kostenlosen Tarif?",
    noFreeBody:
      "Eine Website zu erzeugen kostet jedes Mal echte Modell-Token — ein Gratistarif würde den teuersten Vorgang des Produkts subventionieren. Stattdessen ist der Einstiegspreis niedrig und die Sprachen sind inbegriffen.",
  },
};
