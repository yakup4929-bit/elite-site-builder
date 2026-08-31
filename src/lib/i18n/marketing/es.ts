import type { MarketingCopy } from "./types";

export const ES: MarketingCopy = {
  nav: { product: "Producto", languages: "Idiomas", pricing: "Precios", demo: "Demo", start: "Empezar" },
  hero: {
    eyebrow: "Generador de sitios multilingües",
    title: "Escribe una frase. Obtén un sitio en los idiomas que habla el mundo.",
    subtitle:
      "Describe tu negocio en una frase y Aeltay Studio construye un sitio listo para publicar — en tantos idiomas como necesites, producidos a la vez, cada uno escrito en su idioma.",
    primaryCta: "Crea tu sitio",
    secondaryCta: "Ver un ejemplo",
    note: "Pruébalo antes de introducir ninguna tarjeta.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "idiomas listos, añade cualquier otro",
    oneCall: "Una petición",
    oneCallLabel: "todos los idiomas se producen juntos",
    rtl: "RTL",
    rtlLabel: "árabe, hebreo, persa y urdu se leen correctamente",
  },
  difference: {
    title: "Escrito, no traducido.",
    lead: "La diferencia está en cómo se siente la página al leerla.",
    translatedTitle: "Qué hace un plugin de traducción",
    translatedBody:
      "Primero se escribe el sitio en un idioma y luego el texto pasa por una máquina. La estructura conserva la forma del original, los modismos llegan literales, los titulares desbordan sus cajas. Se entiende — y se nota que no se escribió para ti.",
    generatedTitle: "Qué hace Aeltay Studio",
    generatedBody:
      "Cada idioma se produce como escribe realmente una marca premium en ese mercado. La misma oferta, la misma estructura, el mismo orden de bloques — frases distintas. El alemán se alarga, el japonés se acorta; el texto lo tiene en cuenta y la maquetación aguanta.",
    closing:
      "Como todos los idiomas salen de un solo modelo en una sola petición, la voz de la marca no se desvía entre ellos.",
  },
  how: {
    title: "Tres pasos, unos minutos.",
    lead: "Sin elegir plantilla, sin arrastrar y soltar, sin cajas vacías que rellenar.",
    steps: [
      {
        title: "Describe tu negocio",
        body: "Una o dos frases sobre tu sector y lo que haces. Cuanto más concreto, más tuyo será el texto.",
      },
      {
        title: "Elige idiomas y tono",
        body: "Añade los idiomas a los que quieres llegar y fija la voz: refinada, cercana, corporativa, audaz, técnica o mínima.",
      },
      {
        title: "Llévate tu sitio",
        body: "Las secciones aparecen en la vista previa en segundos. Regenera la que no te convenza, y luego publica o exporta el código.",
      },
    ],
  },
  languages: {
    title: "No estreches tu audiencia.",
    lead: "El catálogo cubre los idiomas más hablados del mundo y no es una lista cerrada: escribe cualquier etiqueta BCP-47 y ese idioma también se produce.",
    rtlNote:
      "Los idiomas de derecha a izquierda se leen realmente de derecha a izquierda: la maquetación se refleja, la alineación cambia y el orden de los botones se invierte.",
    anyTagNote: "¿Necesitas un idioma que no está en la lista? Escribe su etiqueta.",
    reachLabel: "Alcance combinado de tu selección",
  },
  blocks: {
    title: "¿Qué hay en la página?",
    lead: "Cada bloque se produce con su contenido — ninguna cadena viene de una plantilla.",
    items: [
      { title: "Hero", body: "Titular, subtítulo, descripción y dos llamadas a la acción, escritos para tu negocio." },
      { title: "Ventajas", body: "Lo que te separa de la competencia, en detalle concreto y no en generalidades." },
      { title: "Sobre nosotros", body: "La historia de la marca: cómo empezó, cómo trabaja y por qué así." },
      { title: "Precios", body: "Precios en tu moneda, contenidos reales de cada plan, el plan correcto destacado." },
      { title: "Contacto", body: "Formulario y datos de contacto, en la paleta del propio sitio." },
      { title: "Pie de página", body: "Marca, enlaces y la línea de copyright." },
    ],
  },
  pricingTeaser: {
    title: "Precio honesto, sin añadidos.",
    lead: "Los idiomas están incluidos. No te venderemos créditos de palabras ni una suscripción por idioma.",
    cta: "Ver precios",
    compare:
      "Los plugins de traducción por sí solos empiezan en unos 15 € al mes por un único idioma extra. Aquí los idiomas forman parte de la generación.",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿El texto sirve de verdad o es relleno?",
        a: "Es tan concreto como tu brief. Da tu sector, tu ubicación y lo que te diferencia y el resultado es publicable; da una sola palabra y saldrá algo genérico. Cualquier sección puede regenerarse por separado.",
      },
      {
        q: "¿Cómo sé que la traducción es correcta?",
        a: "No se traduce nada. Cada idioma se escribe desde cero en ese idioma, así que no hay paso de transferencia que pueda corromperlo. Aun así puedes revisar y editar cada idioma en la vista previa.",
      },
      {
        q: "¿Cuántos idiomas puedo añadir?",
        a: "Depende del plan: dos en Inicio, seis en Profesional, veinte en Empresa, ilimitados en Agencia. Si pides más de los que permite tu plan, la aplicación te dice exactamente cuáles quedaron fuera en lugar de recortar en silencio.",
      },
      {
        q: "¿Puedo llevarme el sitio a mi propio servidor?",
        a: "Sí. Inicio exporta HTML estático; Profesional y superiores exportan un proyecto Next.js completo. No hay bloqueo.",
      },
      {
        q: "¿Por qué no hay plan gratuito?",
        a: "Cada generación cuesta tokens reales de modelo, y es la operación más cara del producto. Un plan gratuito subvencionaría precisamente eso. Preferimos mantener bajo el precio de entrada.",
      },
      {
        q: "¿Puedo cancelar?",
        a: "Cuando quieras. Si pagaste anualmente, conservas el acceso hasta el final del periodo.",
      },
    ],
  },
  finalCta: {
    title: "Describe tu negocio en una frase. Nosotros construimos el resto.",
    body: "Tu primer sitio estará en la vista previa en minutos.",
    cta: "Crea tu sitio",
  },
  footer: {
    tagline: "El generador de sitios multilingües de la familia Aeltay.",
    product: "Producto",
    company: "Empresa",
    legal: "Legal",
    rights: "Todos los derechos reservados.",
  },
  pricingPage: {
    title: "Precios",
    lead: "Idiomas incluidos. Sin créditos de palabras ni suscripción por idioma.",
    monthly: "Mensual",
    yearly: "Anual",
    savePrefix: "ahorra {n} %",
    perMonth: "/mes",
    billedYearly: "con pago anual",
    choose: "Elegir este plan",
    recommended: "El más elegido",
    comparisonTitle: "Planes uno al lado del otro",
    featureColumn: "Función",
    unlimited: "Ilimitado",
    included: "Sí",
    notIncluded: "No",
    rows: {
      sitesPerMonth: "Sitios al mes",
      maxLocales: "Idiomas",
      blocks: "Bloques",
      regenerateBlock: "Regenerar una sección",
      toneControl: "Elección de tono",
      themeVariants: "Variantes de tema",
      export: "Exportación",
      removeBranding: "Quitar la marca Aeltay",
      customDomain: "Dominio propio",
      whiteLabel: "Marca blanca",
      apiAccess: "Acceso API",
      support: "Soporte",
    },
    supportLevels: { email: "Correo", priority: "Prioritario", dedicated: "Dedicado" },
    exportKinds: { html: "HTML estático", nextjs: "Proyecto Next.js" },
    noFreeTitle: "¿Por qué no hay plan gratuito?",
    noFreeBody:
      "Generar un sitio cuesta tokens reales de modelo cada vez: un plan gratuito subvencionaría la operación más cara del producto. Preferimos mantener bajo el precio de entrada e incluir los idiomas.",
  },
};
