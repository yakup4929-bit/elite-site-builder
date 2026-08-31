/**
 * Copy for the marketing pages, separate from `ui.ts` which covers the builder
 * itself. A tool that sells multilingual sites cannot ship a single-language
 * shopfront, so this carries the same three languages the builder UI does.
 *
 * Entries are plain strings or string arrays; anything needing interpolation
 * takes a `{count}`-style token replaced at the call site, because splitting a
 * sentence around a value produces word order that only works in one language.
 */

import type { UiLocale } from "./ui";

interface MarketingCopy {
  nav: { product: string; languages: string; pricing: string; demo: string; start: string };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };

  proof: { languages: string; languagesLabel: string; oneCall: string; oneCallLabel: string; rtl: string; rtlLabel: string };

  difference: {
    title: string;
    lead: string;
    translatedTitle: string;
    translatedBody: string;
    generatedTitle: string;
    generatedBody: string;
    closing: string;
  };

  how: { title: string; lead: string; steps: Array<{ title: string; body: string }> };

  languages: {
    title: string;
    lead: string;
    rtlNote: string;
    anyTagNote: string;
    reachLabel: string;
  };

  blocks: { title: string; lead: string; items: Array<{ title: string; body: string }> };

  pricingTeaser: { title: string; lead: string; cta: string; compare: string };

  faq: { title: string; items: Array<{ q: string; a: string }> };

  finalCta: { title: string; body: string; cta: string };

  footer: { tagline: string; product: string; company: string; legal: string; rights: string };

  pricingPage: {
    title: string;
    lead: string;
    monthly: string;
    yearly: string;
    savePrefix: string;
    perMonth: string;
    billedYearly: string;
    choose: string;
    recommended: string;
    comparisonTitle: string;
    featureColumn: string;
    unlimited: string;
    included: string;
    notIncluded: string;
    rows: {
      sitesPerMonth: string;
      maxLocales: string;
      blocks: string;
      regenerateBlock: string;
      toneControl: string;
      themeVariants: string;
      export: string;
      removeBranding: string;
      customDomain: string;
      whiteLabel: string;
      apiAccess: string;
      support: string;
    };
    supportLevels: { email: string; priority: string; dedicated: string };
    exportKinds: { html: string; nextjs: string };
    noFreeTitle: string;
    noFreeBody: string;
  };
}

const TR: MarketingCopy = {
  nav: { product: "Ürün", languages: "Diller", pricing: "Fiyatlar", demo: "Demo", start: "Başla" },
  hero: {
    eyebrow: "Çok dilli site üretici",
    title: "Bir cümle yaz. Dünyanın konuştuğu dillerde bir site çıksın.",
    subtitle:
      "Aeltay Studio, işini bir cümleyle anlattığında sana yayına hazır bir web sitesi kurar — istediğin kadar dilde, hepsi tek seferde, hepsi o dilde yazılmış.",
    primaryCta: "Siteni kur",
    secondaryCta: "Örneği gör",
    note: "Kredi kartı bilgisi istemeden deneyebilirsin.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "hazır dil, dilediğini ekle",
    oneCall: "Tek istek",
    oneCallLabel: "tüm diller aynı anda üretilir",
    rtl: "RTL",
    rtlLabel: "Arapça, İbranice, Farsça, Urduca doğru akar",
  },
  difference: {
    title: "Çeviri değil, üretim.",
    lead: "Aradaki fark, sitenin okunduğunda nasıl hissettirdiğidir.",
    translatedTitle: "Çeviri eklentisi ne yapar",
    translatedBody:
      "Önce tek dilde bir site yazılır, sonra o metin makineye verilir. Cümle yapısı ilk dilin kalıbında kalır; deyimler birebir çevrilir, başlıklar kutulara sığmaz. Okuyucu anlar ama yabancı olduğunu da anlar.",
    generatedTitle: "Aeltay Studio ne yapar",
    generatedBody:
      "Her dil, o pazarda gerçekten nasıl yazılıyorsa öyle üretilir. Aynı teklif, aynı yapı, aynı blok sırası — ama her dilin kendi cümlesiyle. Almanca uzar, Japonca kısalır; metin buna göre yazılır, düzen bozulmaz.",
    closing:
      "Hepsi tek modele tek istekte üretildiği için markanın sesi diller arasında kaymaz.",
  },
  how: {
    title: "Üç adım, birkaç dakika.",
    lead: "Şablon seçmek, sürükle bırak, boş kutuları doldurmak yok.",
    steps: [
      {
        title: "İşini anlat",
        body: "Sektörünü ve ne yaptığını bir iki cümleyle yaz. Ne kadar somut olursan metin o kadar sana ait olur.",
      },
      {
        title: "Dillerini ve tonunu seç",
        body: "Ulaşmak istediğin dilleri ekle, sesini belirle: elit, sıcak, kurumsal, cesur, teknik ya da minimal.",
      },
      {
        title: "Siteni al",
        body: "Bölümler saniyeler içinde canlı önizlemede belirir. Beğenmediğin bölümü tek başına yeniden ürettir, sonra yayına al ya da kodunu indir.",
      },
    ],
  },
  languages: {
    title: "Kitleni dar tutma.",
    lead: "Katalogda dünyanın en çok konuşulan dilleri var ve liste kapalı değil — istediğin BCP-47 etiketini yazarsan o dili de üretir.",
    rtlNote:
      "Sağdan sola yazılan diller gerçekten sağdan sola akar: düzen döner, hizalama değişir, butonların sırası tersine geçer.",
    anyTagNote: "Katalogda olmayan bir dil mi lazım? Etiketini yaz, yeter.",
    reachLabel: "Seçtiğin dillerin toplam erişimi",
  },
  blocks: {
    title: "Sayfada ne var?",
    lead: "Her blok içeriğiyle birlikte üretilir — hiçbir metin şablondan gelmez.",
    items: [
      { title: "Hero", body: "Başlık, alt başlık, açıklama ve iki eylem çağrısı. Hepsi işine göre yazılır." },
      { title: "Özellikler", body: "Seni rakibinden ayıran maddeler, genel geçer laf değil somut ayrıntılarla." },
      { title: "Hakkında", body: "Markanın hikâyesi; kuruluş, usul ve neden böyle çalıştığın." },
      { title: "Fiyatlandırma", body: "Kendi para biriminde fiyatlar, gerçek paket içerikleri, doğru vurgu." },
      { title: "İletişim", body: "Form ve iletişim bilgileri, sitenin rengine uyumlu." },
      { title: "Alt bilgi", body: "Marka, bağlantılar ve telif satırı." },
    ],
  },
  pricingTeaser: {
    title: "Dürüst fiyat, gizli eklenti yok.",
    lead: "Diller pakete dahil. Sonradan kelime kredisi ya da dil başına abonelik satın almazsın.",
    cta: "Fiyatları gör",
    compare:
      "Yalnızca çeviri eklentileri tek ek dil için aylık 15 €'dan başlıyor. Burada diller üretimin parçası.",
  },
  faq: {
    title: "Sık sorulanlar",
    items: [
      {
        q: "Üretilen metin gerçekten kullanılabilir mi, yoksa doldurma mı?",
        a: "Verdiğin brief ne kadar somutsa metin o kadar sana ait olur. Sektörünü, konumunu ve seni farklı kılan şeyi yazarsan çıkan metin yayına hazır olur; tek kelimelik bir brief verirsen genel bir metin alırsın. Beğenmediğin bölümü tek başına yeniden ürettirebilirsin.",
      },
      {
        q: "Çevirinin doğruluğunu nasıl biliyorum?",
        a: "Çeviri yapılmıyor. Her dil o dilde baştan yazılıyor, yani birinden diğerine aktarımda bozulacak bir şey yok. Yine de her dili önizlemede görüp düzenleyebilirsin.",
      },
      {
        q: "Kaç dil ekleyebilirim?",
        a: "Paketine bağlı: Başlangıç iki, Profesyonel altı, İşletme yirmi, Ajans sınırsız. Paketinin üstünde dil eklersen sistem hangilerinin dışarıda kaldığını sana açıkça söyler, sessizce kırpmaz.",
      },
      {
        q: "Siteyi kendi sunucuma taşıyabilir miyim?",
        a: "Evet. Başlangıç paketinde statik HTML, Profesyonel ve üstünde tam bir Next.js projesi olarak indirebilirsin. Kilitli değilsin.",
      },
      {
        q: "Neden ücretsiz paket yok?",
        a: "Her üretim gerçek model maliyeti doğuruyor ve bu ürünün en pahalı işlemi tam olarak o. Ücretsiz paket, en maliyetli eylemi sübvanse etmek olurdu. Bunun yerine giriş fiyatını düşük tuttuk.",
      },
      {
        q: "İptal edebilir miyim?",
        a: "İstediğin zaman. Yıllık ödediysen dönem sonuna kadar kullanmaya devam edersin.",
      },
    ],
  },
  finalCta: {
    title: "İşini bir cümleyle anlat, gerisini biz kuralım.",
    body: "İlk siten birkaç dakika sonra önizlemede olacak.",
    cta: "Siteni kur",
  },
  footer: {
    tagline: "Aeltay ailesinin çok dilli site üretim aracı.",
    product: "Ürün",
    company: "Kurumsal",
    legal: "Yasal",
    rights: "Tüm hakları saklıdır.",
  },
  pricingPage: {
    title: "Fiyatlar",
    lead: "Diller dahil. Kelime kredisi yok, dil başına abonelik yok.",
    monthly: "Aylık",
    yearly: "Yıllık",
    savePrefix: "%{n} tasarruf",
    perMonth: "/ay",
    billedYearly: "yıllık ödemede",
    choose: "Bu paketi seç",
    recommended: "En çok seçilen",
    comparisonTitle: "Paketler yan yana",
    featureColumn: "Özellik",
    unlimited: "Sınırsız",
    included: "Var",
    notIncluded: "Yok",
    rows: {
      sitesPerMonth: "Aylık site üretimi",
      maxLocales: "Dil sayısı",
      blocks: "Blok sayısı",
      regenerateBlock: "Bölümü yeniden üret",
      toneControl: "Ton seçimi",
      themeVariants: "Tema varyantı",
      export: "Dışa aktarma",
      removeBranding: "Aeltay markasını kaldır",
      customDomain: "Özel alan adı",
      whiteLabel: "Kendi markanla sun",
      apiAccess: "API erişimi",
      support: "Destek",
    },
    supportLevels: { email: "E-posta", priority: "Öncelikli", dedicated: "Özel temsilci" },
    exportKinds: { html: "Statik HTML", nextjs: "Next.js projesi" },
    noFreeTitle: "Neden ücretsiz paket yok?",
    noFreeBody:
      "Bir site üretmek her seferinde gerçek model maliyeti doğuruyor — ücretsiz paket, ürünün en pahalı işlemini sübvanse etmek olurdu. Bunun yerine giriş fiyatını düşük tuttuk ve dilleri pakete dahil ettik.",
  },
};

const EN: MarketingCopy = {
  nav: { product: "Product", languages: "Languages", pricing: "Pricing", demo: "Demo", start: "Start" },
  hero: {
    eyebrow: "Multilingual site generator",
    title: "Write one sentence. Get a site in the languages the world speaks.",
    subtitle:
      "Describe your business in a sentence and Aeltay Studio builds a launch-ready website — in as many languages as you need, produced together, each one written in that language.",
    primaryCta: "Build your site",
    secondaryCta: "See an example",
    note: "Try it before entering any card details.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "languages ready, add any other",
    oneCall: "One request",
    oneCallLabel: "every language produced together",
    rtl: "RTL",
    rtlLabel: "Arabic, Hebrew, Persian and Urdu read correctly",
  },
  difference: {
    title: "Written, not translated.",
    lead: "The difference is what the page feels like when someone reads it.",
    translatedTitle: "What a translation plugin does",
    translatedBody:
      "A site is written in one language, then handed to a machine. Sentence structure keeps the shape of the original, idioms come across literally, headlines outgrow their boxes. Readers understand it — and can tell it was not written for them.",
    generatedTitle: "What Aeltay Studio does",
    generatedBody:
      "Each language is produced the way a premium brand in that market actually writes. Same offer, same structure, same block order — different sentences. German runs long, Japanese runs short; the copy accounts for it so the layout holds.",
    closing:
      "Because every language comes from one model in one request, the brand voice does not drift between them.",
  },
  how: {
    title: "Three steps, a few minutes.",
    lead: "No template picking, no drag and drop, no empty boxes to fill.",
    steps: [
      {
        title: "Describe your business",
        body: "A sentence or two about your industry and what you do. The more specific you are, the more the copy belongs to you.",
      },
      {
        title: "Pick languages and voice",
        body: "Add the languages you want to reach and set the tone: refined, warm, corporate, bold, technical or minimal.",
      },
      {
        title: "Take your site",
        body: "Sections appear in a live preview within seconds. Regenerate any single section you dislike, then publish or export the code.",
      },
    ],
  },
  languages: {
    title: "Do not narrow your audience.",
    lead: "The catalogue covers the world's most spoken languages, and it is not a closed list — write any BCP-47 tag and that language is produced too.",
    rtlNote:
      "Right-to-left languages genuinely run right to left: the layout mirrors, alignment flips, button order reverses.",
    anyTagNote: "Need a language that is not listed? Just type its tag.",
    reachLabel: "Combined reach of your selection",
  },
  blocks: {
    title: "What is on the page?",
    lead: "Every block is produced with its content — no string comes from a template.",
    items: [
      { title: "Hero", body: "Headline, subtitle, description and two calls to action, all written for your business." },
      { title: "Features", body: "What separates you from a competitor, in concrete detail rather than generalities." },
      { title: "About", body: "Your brand's story: how it started, how it works and why that way." },
      { title: "Pricing", body: "Prices in your own currency, real tier contents, the right tier highlighted." },
      { title: "Contact", body: "A form and contact details, tinted to the site's own palette." },
      { title: "Footer", body: "Brand, links and the copyright line." },
    ],
  },
  pricingTeaser: {
    title: "Honest pricing, no bolt-ons.",
    lead: "Languages are in the plan. You will not be sold word credits or a per-language subscription later.",
    cta: "See pricing",
    compare:
      "Translation plugins alone start around €15 a month for a single extra language. Here, languages are part of generation.",
  },
  faq: {
    title: "Frequently asked",
    items: [
      {
        q: "Is the copy actually usable, or filler?",
        a: "It is as specific as your brief. Give it your industry, location and what makes you different and the result is publishable; give it one word and you get something generic. Any section you dislike can be regenerated on its own.",
      },
      {
        q: "How do I know the translation is accurate?",
        a: "Nothing is translated. Each language is written from scratch in that language, so there is no transfer step to corrupt. You can still review and edit every language in the preview.",
      },
      {
        q: "How many languages can I add?",
        a: "It depends on your plan: two on Starter, six on Professional, twenty on Business, unlimited on Agency. Ask for more than your plan allows and the app tells you exactly which were left out rather than trimming silently.",
      },
      {
        q: "Can I move the site to my own server?",
        a: "Yes. Starter exports static HTML; Professional and above export a complete Next.js project. You are not locked in.",
      },
      {
        q: "Why is there no free plan?",
        a: "Every generation costs real model tokens, and that is the most expensive operation in the product. A free tier would be subsidising exactly that. We kept the entry price low instead.",
      },
      {
        q: "Can I cancel?",
        a: "Any time. If you paid yearly you keep access until the period ends.",
      },
    ],
  },
  finalCta: {
    title: "Describe your business in a sentence. We will build the rest.",
    body: "Your first site will be in the preview within minutes.",
    cta: "Build your site",
  },
  footer: {
    tagline: "The Aeltay family's multilingual site generator.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    rights: "All rights reserved.",
  },
  pricingPage: {
    title: "Pricing",
    lead: "Languages included. No word credits, no per-language subscription.",
    monthly: "Monthly",
    yearly: "Yearly",
    savePrefix: "save {n}%",
    perMonth: "/mo",
    billedYearly: "billed yearly",
    choose: "Choose this plan",
    recommended: "Most popular",
    comparisonTitle: "Plans side by side",
    featureColumn: "Feature",
    unlimited: "Unlimited",
    included: "Yes",
    notIncluded: "No",
    rows: {
      sitesPerMonth: "Sites per month",
      maxLocales: "Languages",
      blocks: "Blocks",
      regenerateBlock: "Regenerate a section",
      toneControl: "Tone control",
      themeVariants: "Theme variants",
      export: "Export",
      removeBranding: "Remove Aeltay branding",
      customDomain: "Custom domain",
      whiteLabel: "White-label",
      apiAccess: "API access",
      support: "Support",
    },
    supportLevels: { email: "Email", priority: "Priority", dedicated: "Dedicated" },
    exportKinds: { html: "Static HTML", nextjs: "Next.js project" },
    noFreeTitle: "Why is there no free plan?",
    noFreeBody:
      "Generating a site costs real model tokens every time — a free tier would subsidise the most expensive operation in the product. We kept the entry price low and put the languages in the plan instead.",
  },
};

const FR: MarketingCopy = {
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

const COPY: Record<UiLocale, MarketingCopy> = { tr: TR, en: EN, fr: FR };

export function marketing(locale: string): MarketingCopy {
  return COPY[locale as UiLocale] ?? COPY.en;
}
