import type { MarketingCopy } from "./types";

export const FR: MarketingCopy = {
  nav: { product: "Produit", languages: "Langues", pricing: "Tarifs", demo: "Démo", start: "Commencer" },
  hero: {
    eyebrow: "Générateur de sites multilingues",
    title: "Écrivez une phrase. Obtenez un site dans les langues que le monde parle.",
    subtitle:
      "Décrivez votre activité en une phrase et Aeltay Studio construit un site prêt à publier — dans autant de langues que nécessaire, produites ensemble, chacune écrite dans sa langue.",
    primaryCta: "Créer votre site",
    secondaryCta: "Voir un exemple",
    note: "Essayez avant de saisir la moindre carte.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "langues prêtes, ajoutez les autres",
    oneCall: "Une requête",
    oneCallLabel: "toutes les langues produites ensemble",
    rtl: "RTL",
    rtlLabel: "arabe, hébreu, persan et ourdou s'affichent correctement",
  },
  difference: {
    title: "Écrit, pas traduit.",
    lead: "La différence, c'est ce que ressent le lecteur.",
    translatedTitle: "Ce que fait un plugin de traduction",
    translatedBody:
      "Le site est écrit dans une langue, puis confié à une machine. La structure des phrases garde la forme de l'original, les expressions passent au mot à mot, les titres débordent. On comprend — et on sent que ce n'était pas écrit pour soi.",
    generatedTitle: "Ce que fait Aeltay Studio",
    generatedBody:
      "Chaque langue est produite comme une marque haut de gamme écrit réellement sur ce marché. Même offre, même structure, même ordre des blocs — des phrases différentes. L'allemand s'allonge, le japonais se resserre ; le texte en tient compte et la mise en page tient.",
    closing:
      "Toutes les langues venant d'un seul modèle en une seule requête, la voix de la marque ne dérive pas.",
  },
  how: {
    title: "Trois étapes, quelques minutes.",
    lead: "Pas de modèle à choisir, pas de glisser-déposer, pas de cases vides.",
    steps: [
      {
        title: "Décrivez votre activité",
        body: "Une ou deux phrases sur votre secteur et ce que vous faites. Plus c'est précis, plus le texte vous ressemble.",
      },
      {
        title: "Choisissez langues et ton",
        body: "Ajoutez les langues visées et définissez la voix : raffiné, chaleureux, institutionnel, audacieux, technique ou minimal.",
      },
      {
        title: "Récupérez votre site",
        body: "Les sections apparaissent en aperçu en quelques secondes. Régénérez celle qui ne vous plaît pas, puis publiez ou exportez le code.",
      },
    ],
  },
  languages: {
    title: "Ne réduisez pas votre audience.",
    lead: "Le catalogue couvre les langues les plus parlées au monde, et la liste n'est pas fermée — saisissez n'importe quelle étiquette BCP-47 et cette langue est produite aussi.",
    rtlNote:
      "Les langues de droite à gauche s'affichent vraiment de droite à gauche : la mise en page se retourne, l'alignement change, l'ordre des boutons s'inverse.",
    anyTagNote: "Une langue absente du catalogue ? Saisissez son étiquette.",
    reachLabel: "Portée cumulée de votre sélection",
  },
  blocks: {
    title: "Que contient la page ?",
    lead: "Chaque bloc est produit avec son contenu — aucune chaîne ne vient d'un modèle.",
    items: [
      { title: "Hero", body: "Titre, sous-titre, description et deux appels à l'action, écrits pour votre activité." },
      { title: "Atouts", body: "Ce qui vous distingue, en détails concrets plutôt qu'en généralités." },
      { title: "À propos", body: "L'histoire de la marque : les débuts, la méthode et pourquoi ainsi." },
      { title: "Tarifs", body: "Des prix dans votre devise, un contenu d'offre réel, la bonne offre mise en avant." },
      { title: "Contact", body: "Un formulaire et vos coordonnées, aux couleurs du site." },
      { title: "Pied de page", body: "Marque, liens et mention de copyright." },
    ],
  },
  pricingTeaser: {
    title: "Un prix honnête, sans options cachées.",
    lead: "Les langues sont comprises. On ne vous vendra ni crédits de mots ni abonnement par langue.",
    cta: "Voir les tarifs",
    compare:
      "Les seuls plugins de traduction démarrent autour de 15 € par mois pour une langue supplémentaire. Ici, les langues font partie de la génération.",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Le texte est-il vraiment utilisable ?",
        a: "Il est aussi précis que votre brief. Donnez votre secteur, votre ville et ce qui vous différencie et le résultat est publiable ; donnez un seul mot et vous obtiendrez du générique. Toute section peut être régénérée seule.",
      },
      {
        q: "Comment vérifier l'exactitude de la traduction ?",
        a: "Rien n'est traduit. Chaque langue est écrite directement dans cette langue, il n'y a donc pas d'étape de transfert à corrompre. Vous pouvez relire et modifier chaque langue dans l'aperçu.",
      },
      {
        q: "Combien de langues puis-je ajouter ?",
        a: "Selon l'offre : deux en Démarrage, six en Professionnel, vingt en Entreprise, illimité en Agence. Si vous en demandez plus, l'application vous dit lesquelles ont été écartées au lieu de couper en silence.",
      },
      {
        q: "Puis-je héberger le site moi-même ?",
        a: "Oui. Démarrage exporte du HTML statique ; Professionnel et au-delà exportent un projet Next.js complet. Aucun verrouillage.",
      },
      {
        q: "Pourquoi pas d'offre gratuite ?",
        a: "Chaque génération coûte de vrais jetons de modèle, et c'est l'opération la plus chère du produit. Une offre gratuite reviendrait à la subventionner. Nous avons plutôt gardé un prix d'entrée bas.",
      },
      {
        q: "Puis-je annuler ?",
        a: "À tout moment. Si vous avez payé à l'année, vous gardez l'accès jusqu'à la fin de la période.",
      },
    ],
  },
  finalCta: {
    title: "Décrivez votre activité en une phrase. Nous construisons le reste.",
    body: "Votre premier site sera dans l'aperçu en quelques minutes.",
    cta: "Créer votre site",
  },
  footer: {
    tagline: "Le générateur de sites multilingues de la famille Aeltay.",
    product: "Produit",
    company: "Société",
    legal: "Mentions",
    rights: "Tous droits réservés.",
  },
  pricingPage: {
    title: "Tarifs",
    lead: "Langues comprises. Ni crédits de mots, ni abonnement par langue.",
    monthly: "Mensuel",
    yearly: "Annuel",
    savePrefix: "{n} % d'économie",
    perMonth: "/mois",
    billedYearly: "en paiement annuel",
    choose: "Choisir cette offre",
    recommended: "Le plus choisi",
    comparisonTitle: "Les offres côte à côte",
    featureColumn: "Fonctionnalité",
    unlimited: "Illimité",
    included: "Oui",
    notIncluded: "Non",
    rows: {
      sitesPerMonth: "Sites par mois",
      maxLocales: "Nombre de langues",
      blocks: "Blocs",
      regenerateBlock: "Régénérer une section",
      toneControl: "Choix du ton",
      themeVariants: "Variantes de thème",
      export: "Export",
      removeBranding: "Retirer la marque Aeltay",
      customDomain: "Domaine personnalisé",
      whiteLabel: "Marque blanche",
      apiAccess: "Accès API",
      support: "Support",
    },
    supportLevels: { email: "E-mail", priority: "Prioritaire", dedicated: "Dédié" },
    exportKinds: { html: "HTML statique", nextjs: "Projet Next.js" },
    noFreeTitle: "Pourquoi pas d'offre gratuite ?",
    noFreeBody:
      "Générer un site coûte de vrais jetons de modèle à chaque fois — une offre gratuite subventionnerait l'opération la plus chère du produit. Nous avons gardé un prix d'entrée bas et inclus les langues.",
  },
};
