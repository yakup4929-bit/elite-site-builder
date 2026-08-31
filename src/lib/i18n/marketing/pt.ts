import type { MarketingCopy } from "./types";

export const PT: MarketingCopy = {
  nav: { product: "Produto", languages: "Idiomas", pricing: "Preços", demo: "Demo", start: "Começar" },
  hero: {
    eyebrow: "Gerador de sites multilingues",
    title: "Escreva uma frase. Obtenha um site nos idiomas que o mundo fala.",
    subtitle:
      "Descreva o seu negócio numa frase e o Aeltay Studio constrói um site pronto a publicar — em tantos idiomas quantos precisar, produzidos em conjunto, cada um escrito no seu idioma.",
    primaryCta: "Criar o seu site",
    secondaryCta: "Ver um exemplo",
    note: "Experimente antes de introduzir qualquer cartão.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "idiomas prontos, acrescente outros",
    oneCall: "Um pedido",
    oneCallLabel: "todos os idiomas produzidos em conjunto",
    rtl: "RTL",
    rtlLabel: "árabe, hebraico, persa e urdu correm corretamente",
  },
  difference: {
    title: "Escrito, não traduzido.",
    lead: "A diferença está no que se sente ao ler a página.",
    translatedTitle: "O que faz um plugin de tradução",
    translatedBody:
      "Primeiro escreve-se o site num idioma e depois o texto passa por uma máquina. A estrutura mantém a forma do original, as expressões chegam à letra, os títulos transbordam das caixas. Percebe-se — e nota-se que não foi escrito para nós.",
    generatedTitle: "O que faz o Aeltay Studio",
    generatedBody:
      "Cada idioma é produzido como uma marca premium escreve realmente nesse mercado. A mesma oferta, a mesma estrutura, a mesma ordem de blocos — frases diferentes. O alemão alonga-se, o japonês encurta; o texto conta com isso e a maquetação aguenta.",
    closing:
      "Como todos os idiomas saem de um só modelo num só pedido, a voz da marca não se desvia entre eles.",
  },
  how: {
    title: "Três passos, poucos minutos.",
    lead: "Sem escolher modelos, sem arrastar e largar, sem caixas vazias para preencher.",
    steps: [
      {
        title: "Descreva o seu negócio",
        body: "Uma ou duas frases sobre o setor e o que faz. Quanto mais concreto, mais o texto lhe pertence.",
      },
      {
        title: "Escolha idiomas e tom",
        body: "Acrescente os idiomas que quer alcançar e defina a voz: requintada, calorosa, institucional, ousada, técnica ou minimal.",
      },
      {
        title: "Leve o seu site",
        body: "As secções aparecem na pré-visualização em segundos. Regenere a que não o convencer e depois publique ou exporte o código.",
      },
    ],
  },
  languages: {
    title: "Não estreite o seu público.",
    lead: "O catálogo cobre os idiomas mais falados do mundo e não é uma lista fechada: escreva qualquer etiqueta BCP-47 e esse idioma também é produzido.",
    rtlNote:
      "Os idiomas da direita para a esquerda correm mesmo da direita para a esquerda: a maquetação espelha, o alinhamento muda e a ordem dos botões inverte-se.",
    anyTagNote: "Precisa de um idioma que não está listado? Escreva a etiqueta.",
    reachLabel: "Alcance combinado da sua seleção",
  },
  blocks: {
    title: "O que há na página?",
    lead: "Cada bloco é produzido com o seu conteúdo — nenhuma cadeia vem de um modelo.",
    items: [
      { title: "Hero", body: "Título, subtítulo, descrição e dois apelos à ação, escritos para o seu negócio." },
      { title: "Vantagens", body: "O que o distingue da concorrência, em detalhe concreto e não em generalidades." },
      { title: "Sobre", body: "A história da marca: como começou, como trabalha e porquê assim." },
      { title: "Preços", body: "Preços na sua moeda, conteúdos reais de cada plano, o plano certo em destaque." },
      { title: "Contacto", body: "Formulário e contactos, na paleta do próprio site." },
      { title: "Rodapé", body: "Marca, ligações e a linha de direitos de autor." },
    ],
  },
  pricingTeaser: {
    title: "Preço honesto, sem extras.",
    lead: "Os idiomas estão incluídos. Não lhe venderemos créditos de palavras nem subscrição por idioma.",
    cta: "Ver preços",
    compare:
      "Só os plugins de tradução começam à volta de 15 € por mês por um único idioma adicional. Aqui os idiomas fazem parte da geração.",
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "O texto serve mesmo ou é enchimento?",
        a: "É tão concreto quanto o seu briefing. Indique o setor, a localização e o que o diferencia e o resultado é publicável; uma só palavra dará algo genérico. Qualquer secção pode ser regenerada isoladamente.",
      },
      {
        q: "Como sei que a tradução está correta?",
        a: "Nada é traduzido. Cada idioma é escrito de raiz nesse idioma, por isso não há um passo de transferência que possa corrompê-lo. Ainda assim pode rever e editar cada idioma na pré-visualização.",
      },
      {
        q: "Quantos idiomas posso acrescentar?",
        a: "Depende do plano: dois no Inicial, seis no Profissional, vinte no Empresa, ilimitados no Agência. Se pedir mais do que o plano permite, a aplicação diz exatamente quais ficaram de fora em vez de cortar em silêncio.",
      },
      {
        q: "Posso levar o site para o meu servidor?",
        a: "Sim. O Inicial exporta HTML estático; o Profissional e acima exportam um projeto Next.js completo. Não há bloqueio.",
      },
      {
        q: "Porque não há plano gratuito?",
        a: "Cada geração custa tokens reais de modelo e é a operação mais cara do produto. Um plano gratuito subsidiaria exatamente isso. Preferimos manter baixo o preço de entrada.",
      },
      {
        q: "Posso cancelar?",
        a: "Quando quiser. Se pagou anualmente, mantém o acesso até ao fim do período.",
      },
    ],
  },
  finalCta: {
    title: "Descreva o seu negócio numa frase. Nós construímos o resto.",
    body: "O seu primeiro site estará na pré-visualização em minutos.",
    cta: "Criar o seu site",
  },
  footer: {
    tagline: "O gerador de sites multilingues da família Aeltay.",
    product: "Produto",
    company: "Empresa",
    legal: "Legal",
    rights: "Todos os direitos reservados.",
  },
  pricingPage: {
    title: "Preços",
    lead: "Idiomas incluídos. Sem créditos de palavras, sem subscrição por idioma.",
    monthly: "Mensal",
    yearly: "Anual",
    savePrefix: "poupe {n}%",
    perMonth: "/mês",
    billedYearly: "em pagamento anual",
    choose: "Escolher este plano",
    recommended: "O mais escolhido",
    comparisonTitle: "Planos lado a lado",
    featureColumn: "Funcionalidade",
    unlimited: "Ilimitado",
    included: "Sim",
    notIncluded: "Não",
    rows: {
      sitesPerMonth: "Sites por mês",
      maxLocales: "Idiomas",
      blocks: "Blocos",
      regenerateBlock: "Regenerar uma secção",
      toneControl: "Escolha do tom",
      themeVariants: "Variantes de tema",
      export: "Exportação",
      removeBranding: "Remover a marca Aeltay",
      customDomain: "Domínio próprio",
      whiteLabel: "Marca branca",
      apiAccess: "Acesso API",
      support: "Apoio",
    },
    supportLevels: { email: "E-mail", priority: "Prioritário", dedicated: "Dedicado" },
    exportKinds: { html: "HTML estático", nextjs: "Projeto Next.js" },
    noFreeTitle: "Porque não há plano gratuito?",
    noFreeBody:
      "Gerar um site custa tokens reais de modelo de cada vez — um plano gratuito subsidiaria a operação mais cara do produto. Preferimos manter baixo o preço de entrada e incluir os idiomas.",
  },
};
