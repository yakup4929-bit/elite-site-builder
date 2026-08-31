import type { MarketingCopy } from "./types";

export const NL: MarketingCopy = {
  nav: { product: "Product", languages: "Talen", pricing: "Prijzen", demo: "Demo", start: "Beginnen" },
  hero: {
    eyebrow: "Meertalige sitegenerator",
    title: "Schrijf één zin. Krijg een site in de talen die de wereld spreekt.",
    subtitle:
      "Beschrijf uw bedrijf in één zin en Aeltay Studio bouwt een publicatieklare website — in zoveel talen als u nodig hebt, samen geproduceerd, elk geschreven in die taal.",
    primaryCta: "Bouw uw site",
    secondaryCta: "Bekijk een voorbeeld",
    note: "Probeer het voordat u kaartgegevens invoert.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "talen klaar, voeg elke andere toe",
    oneCall: "Eén verzoek",
    oneCallLabel: "alle talen tegelijk geproduceerd",
    rtl: "RTL",
    rtlLabel: "Arabisch, Hebreeuws, Perzisch en Urdu lopen correct",
  },
  difference: {
    title: "Geschreven, niet vertaald.",
    lead: "Het verschil merkt u zodra iemand de pagina leest.",
    translatedTitle: "Wat een vertaalplug-in doet",
    translatedBody:
      "Eerst wordt een site in één taal geschreven, daarna gaat die tekst naar een machine. De zinsbouw houdt de vorm van het origineel, uitdrukkingen komen letterlijk over, koppen passen niet meer in hun kader. Men begrijpt het — en merkt dat het niet voor hen geschreven is.",
    generatedTitle: "Wat Aeltay Studio doet",
    generatedBody:
      "Elke taal wordt geproduceerd zoals een premiummerk in die markt daadwerkelijk schrijft. Zelfde aanbod, zelfde structuur, zelfde blokvolgorde — andere zinnen. Duits wordt lang, Japans kort; de tekst houdt daar rekening mee zodat de opmaak standhoudt.",
    closing:
      "Omdat alle talen uit één model in één verzoek komen, verschuift de merkstem niet tussen talen.",
  },
  how: {
    title: "Drie stappen, enkele minuten.",
    lead: "Geen sjabloon kiezen, geen slepen en neerzetten, geen lege vakken invullen.",
    steps: [
      {
        title: "Beschrijf uw bedrijf",
        body: "Eén of twee zinnen over uw branche en wat u doet. Hoe concreter, hoe meer de tekst van u is.",
      },
      {
        title: "Kies talen en toon",
        body: "Voeg de talen toe die u wilt bereiken en bepaal de stem: verfijnd, warm, zakelijk, uitgesproken, technisch of minimaal.",
      },
      {
        title: "Neem uw site mee",
        body: "Secties verschijnen binnen seconden in de live voorbeeldweergave. Genereer een sectie die u niet bevalt opnieuw en publiceer daarna of exporteer de code.",
      },
    ],
  },
  languages: {
    title: "Maak uw publiek niet kleiner.",
    lead: "De catalogus dekt de meestgesproken talen ter wereld en is geen gesloten lijst: typ een willekeurige BCP-47-tag en ook die taal wordt geproduceerd.",
    rtlNote:
      "Talen van rechts naar links lopen echt van rechts naar links: de opmaak spiegelt, de uitlijning kantelt, de volgorde van knoppen keert om.",
    anyTagNote: "Een taal nodig die er niet bij staat? Typ gewoon de tag.",
    reachLabel: "Gecombineerd bereik van uw selectie",
  },
  blocks: {
    title: "Wat staat er op de pagina?",
    lead: "Elk blok wordt met zijn inhoud geproduceerd — geen enkele tekst komt uit een sjabloon.",
    items: [
      { title: "Hero", body: "Kop, subkop, beschrijving en twee call-to-actions, geschreven voor uw bedrijf." },
      { title: "Sterke punten", body: "Wat u onderscheidt van de concurrent, in concrete details in plaats van algemeenheden." },
      { title: "Over ons", body: "Het verhaal van het merk: hoe het begon, hoe het werkt en waarom zo." },
      { title: "Prijzen", body: "Prijzen in uw eigen valuta, echte pakketinhoud, het juiste pakket uitgelicht." },
      { title: "Contact", body: "Formulier en contactgegevens, in de kleuren van de site zelf." },
      { title: "Voettekst", body: "Merk, links en de copyrightregel." },
    ],
  },
  pricingTeaser: {
    title: "Eerlijke prijs, geen bijverkoop.",
    lead: "Talen zitten in het pakket. U krijgt later geen woordtegoeden of abonnement per taal aangeboden.",
    cta: "Bekijk de prijzen",
    compare:
      "Vertaalplug-ins alleen beginnen rond € 15 per maand voor één extra taal. Hier zijn talen onderdeel van de generatie.",
  },
  faq: {
    title: "Veelgestelde vragen",
    items: [
      {
        q: "Is de tekst echt bruikbaar of opvulling?",
        a: "Zo concreet als uw briefing. Geef uw branche, locatie en wat u onderscheidt en het resultaat is publiceerbaar; geef één woord en u krijgt iets algemeens. Elke sectie kan afzonderlijk opnieuw worden gegenereerd.",
      },
      {
        q: "Hoe weet ik dat de vertaling klopt?",
        a: "Er wordt niets vertaald. Elke taal wordt vanaf nul in die taal geschreven, dus er is geen overdrachtsstap die iets kan bederven. U kunt elke taal alsnog nakijken en aanpassen in de voorbeeldweergave.",
      },
      {
        q: "Hoeveel talen kan ik toevoegen?",
        a: "Dat hangt van uw pakket af: twee bij Start, zes bij Professional, twintig bij Business, onbeperkt bij Agency. Vraagt u er meer dan uw pakket toestaat, dan noemt de app precies welke zijn weggelaten in plaats van stil te snijden.",
      },
      {
        q: "Kan ik de site naar mijn eigen server halen?",
        a: "Ja. Start exporteert statische HTML; Professional en hoger exporteren een volledig Next.js-project. Geen lock-in.",
      },
      {
        q: "Waarom is er geen gratis pakket?",
        a: "Elke generatie kost echte modeltokens en dat is de duurste handeling in het product. Een gratis pakket zou precies dat subsidiëren. In plaats daarvan hebben we de instapprijs laag gehouden.",
      },
      {
        q: "Kan ik opzeggen?",
        a: "Altijd. Bij jaarbetaling houdt u toegang tot het einde van de periode.",
      },
    ],
  },
  finalCta: {
    title: "Beschrijf uw bedrijf in één zin. De rest bouwen wij.",
    body: "Uw eerste site staat binnen enkele minuten in de voorbeeldweergave.",
    cta: "Bouw uw site",
  },
  footer: {
    tagline: "De meertalige sitegenerator van de Aeltay-familie.",
    product: "Product",
    company: "Bedrijf",
    legal: "Juridisch",
    rights: "Alle rechten voorbehouden.",
  },
  pricingPage: {
    title: "Prijzen",
    lead: "Talen inbegrepen. Geen woordtegoeden, geen abonnement per taal.",
    monthly: "Maandelijks",
    yearly: "Jaarlijks",
    savePrefix: "bespaar {n}%",
    perMonth: "/mnd",
    billedYearly: "bij jaarbetaling",
    choose: "Kies dit pakket",
    recommended: "Meest gekozen",
    comparisonTitle: "Pakketten naast elkaar",
    featureColumn: "Functie",
    unlimited: "Onbeperkt",
    included: "Ja",
    notIncluded: "Nee",
    rows: {
      sitesPerMonth: "Sites per maand",
      maxLocales: "Talen",
      blocks: "Blokken",
      regenerateBlock: "Sectie opnieuw genereren",
      toneControl: "Toonkeuze",
      themeVariants: "Themavarianten",
      export: "Export",
      removeBranding: "Aeltay-branding verwijderen",
      customDomain: "Eigen domein",
      whiteLabel: "White-label",
      apiAccess: "API-toegang",
      support: "Ondersteuning",
    },
    supportLevels: { email: "E-mail", priority: "Met voorrang", dedicated: "Vast aanspreekpunt" },
    exportKinds: { html: "Statische HTML", nextjs: "Next.js-project" },
    noFreeTitle: "Waarom is er geen gratis pakket?",
    noFreeBody:
      "Een site genereren kost elke keer echte modeltokens — een gratis pakket zou de duurste handeling in het product subsidiëren. We hebben de instapprijs laag gehouden en de talen erin gestopt.",
  },
};
