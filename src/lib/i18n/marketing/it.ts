import type { MarketingCopy } from "./types";

export const IT: MarketingCopy = {
  nav: { product: "Prodotto", languages: "Lingue", pricing: "Prezzi", demo: "Demo", start: "Inizia" },
  hero: {
    eyebrow: "Generatore di siti multilingue",
    title: "Scrivi una frase. Ottieni un sito nelle lingue che parla il mondo.",
    subtitle:
      "Descrivi la tua attività in una frase e Aeltay Studio costruisce un sito pronto alla pubblicazione — in quante lingue servono, prodotte insieme, ciascuna scritta nella propria lingua.",
    primaryCta: "Crea il tuo sito",
    secondaryCta: "Vedi un esempio",
    note: "Provalo prima di inserire qualsiasi carta.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "lingue pronte, aggiungi le altre",
    oneCall: "Una richiesta",
    oneCallLabel: "tutte le lingue prodotte insieme",
    rtl: "RTL",
    rtlLabel: "arabo, ebraico, persiano e urdu scorrono correttamente",
  },
  difference: {
    title: "Scritto, non tradotto.",
    lead: "La differenza è come si sente la pagina quando la si legge.",
    translatedTitle: "Cosa fa un plugin di traduzione",
    translatedBody:
      "Prima il sito viene scritto in una lingua, poi il testo passa a una macchina. La struttura mantiene la forma dell'originale, i modi di dire arrivano alla lettera, i titoli escono dai riquadri. Si capisce — e si sente che non è stato scritto per noi.",
    generatedTitle: "Cosa fa Aeltay Studio",
    generatedBody:
      "Ogni lingua viene prodotta come scrive davvero un marchio premium in quel mercato. Stessa offerta, stessa struttura, stesso ordine dei blocchi — frasi diverse. Il tedesco si allunga, il giapponese si accorcia; il testo ne tiene conto e l'impaginazione regge.",
    closing:
      "Poiché tutte le lingue nascono da un solo modello in una sola richiesta, la voce del marchio non si sposta tra l'una e l'altra.",
  },
  how: {
    title: "Tre passi, pochi minuti.",
    lead: "Nessun modello da scegliere, nessun trascina e rilascia, nessuna casella vuota.",
    steps: [
      {
        title: "Descrivi la tua attività",
        body: "Una o due frasi sul settore e su cosa fai. Più sei concreto, più il testo ti appartiene.",
      },
      {
        title: "Scegli lingue e tono",
        body: "Aggiungi le lingue da raggiungere e imposta la voce: raffinata, calda, istituzionale, decisa, tecnica o minimale.",
      },
      {
        title: "Prendi il tuo sito",
        body: "Le sezioni compaiono in anteprima in pochi secondi. Rigenera quella che non ti convince, poi pubblica o esporta il codice.",
      },
    ],
  },
  languages: {
    title: "Non restringere il tuo pubblico.",
    lead: "Il catalogo copre le lingue più parlate al mondo e non è un elenco chiuso: scrivi una qualsiasi etichetta BCP-47 e anche quella lingua viene prodotta.",
    rtlNote:
      "Le lingue da destra a sinistra scorrono davvero da destra a sinistra: l'impaginazione si specchia, l'allineamento cambia, l'ordine dei pulsanti si inverte.",
    anyTagNote: "Serve una lingua non elencata? Basta scriverne l'etichetta.",
    reachLabel: "Portata complessiva della tua selezione",
  },
  blocks: {
    title: "Cosa c'è nella pagina?",
    lead: "Ogni blocco nasce con il suo contenuto — nessuna stringa proviene da un modello.",
    items: [
      { title: "Hero", body: "Titolo, sottotitolo, descrizione e due inviti all'azione, scritti per la tua attività." },
      { title: "Punti di forza", body: "Ciò che ti distingue dai concorrenti, in dettagli concreti anziché generici." },
      { title: "Chi siamo", body: "La storia del marchio: com'è nato, come lavora e perché così." },
      { title: "Prezzi", body: "Prezzi nella tua valuta, contenuti reali dei piani, il piano giusto messo in evidenza." },
      { title: "Contatti", body: "Modulo e recapiti, nei colori del sito stesso." },
      { title: "Piè di pagina", body: "Marchio, collegamenti e riga di copyright." },
    ],
  },
  pricingTeaser: {
    title: "Prezzo onesto, nessun componente aggiuntivo.",
    lead: "Le lingue sono incluse. Non ti verranno venduti crediti di parole né abbonamenti per lingua.",
    cta: "Vedi i prezzi",
    compare:
      "I soli plugin di traduzione partono da circa 15 € al mese per una sola lingua aggiuntiva. Qui le lingue fanno parte della generazione.",
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        q: "Il testo è davvero utilizzabile o è riempitivo?",
        a: "È concreto quanto il tuo brief. Indica settore, luogo e ciò che ti distingue e il risultato è pubblicabile; una sola parola produrrà qualcosa di generico. Ogni sezione può essere rigenerata da sola.",
      },
      {
        q: "Come faccio a sapere che la traduzione è corretta?",
        a: "Non viene tradotto nulla. Ogni lingua è scritta da zero in quella lingua, quindi non c'è un passaggio di trasferimento che possa alterarla. Puoi comunque rivedere e modificare ogni lingua nell'anteprima.",
      },
      {
        q: "Quante lingue posso aggiungere?",
        a: "Dipende dal piano: due con Avvio, sei con Professional, venti con Business, illimitate con Agency. Se ne chiedi più di quante il piano consenta, l'app ti dice esattamente quali sono rimaste fuori invece di tagliare in silenzio.",
      },
      {
        q: "Posso spostare il sito sul mio server?",
        a: "Sì. Avvio esporta HTML statico; Professional e superiori esportano un progetto Next.js completo. Nessun vincolo.",
      },
      {
        q: "Perché non c'è un piano gratuito?",
        a: "Ogni generazione costa token reali del modello, ed è l'operazione più costosa del prodotto. Un piano gratuito finirebbe per sovvenzionare proprio quella. Abbiamo preferito tenere basso il prezzo d'ingresso.",
      },
      {
        q: "Posso disdire?",
        a: "In qualsiasi momento. Con il pagamento annuale mantieni l'accesso fino alla fine del periodo.",
      },
    ],
  },
  finalCta: {
    title: "Descrivi la tua attività in una frase. Al resto pensiamo noi.",
    body: "Il tuo primo sito sarà in anteprima in pochi minuti.",
    cta: "Crea il tuo sito",
  },
  footer: {
    tagline: "Il generatore di siti multilingue della famiglia Aeltay.",
    product: "Prodotto",
    company: "Azienda",
    legal: "Note legali",
    rights: "Tutti i diritti riservati.",
  },
  pricingPage: {
    title: "Prezzi",
    lead: "Lingue incluse. Nessun credito di parole, nessun abbonamento per lingua.",
    monthly: "Mensile",
    yearly: "Annuale",
    savePrefix: "risparmia {n}%",
    perMonth: "/mese",
    billedYearly: "con pagamento annuale",
    choose: "Scegli questo piano",
    recommended: "Il più scelto",
    comparisonTitle: "Piani a confronto",
    featureColumn: "Funzione",
    unlimited: "Illimitato",
    included: "Sì",
    notIncluded: "No",
    rows: {
      sitesPerMonth: "Siti al mese",
      maxLocales: "Lingue",
      blocks: "Blocchi",
      regenerateBlock: "Rigenerare una sezione",
      toneControl: "Scelta del tono",
      themeVariants: "Varianti di tema",
      export: "Esportazione",
      removeBranding: "Rimuovere il marchio Aeltay",
      customDomain: "Dominio personalizzato",
      whiteLabel: "White-label",
      apiAccess: "Accesso API",
      support: "Assistenza",
    },
    supportLevels: { email: "E-mail", priority: "Prioritaria", dedicated: "Dedicata" },
    exportKinds: { html: "HTML statico", nextjs: "Progetto Next.js" },
    noFreeTitle: "Perché non c'è un piano gratuito?",
    noFreeBody:
      "Generare un sito costa ogni volta token reali del modello: un piano gratuito sovvenzionerebbe l'operazione più costosa del prodotto. Abbiamo preferito tenere basso il prezzo d'ingresso e includere le lingue.",
  },
};
