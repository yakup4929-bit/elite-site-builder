import Anthropic from "@anthropic-ai/sdk";

// Le client est cree A L'APPEL, pas au chargement du module.
//
// Instancie au niveau du module, il s'executait pendant `next build` : Next
// importe ce fichier pour collecter la configuration de /api/generate, le
// constructeur ne trouvait pas la cle et jetait « Missing credentials ». La
// compilation reussissait, la collecte echouait — donc le deploiement aussi.
//
// Une cle d'API est un secret d'EXECUTION. La machine qui construit le site
// n'a pas a la connaitre, et un deploiement ne doit pas dependre d'elle.
let client: Anthropic | null = null;

function anthropic(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY n'est pas definie. Ajoutez-la dans Vercel > " +
        "Settings > Environment Variables, puis redeployez."
      );
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

export async function generateSiteConfig(prompt: string, industry: string) {
  const systemPrompt = `
    You are an elite web design architect. Your goal is to generate a JSON configuration for a modern, high-end website.
    
    The JSON must strictly follow this structure:
    {
      "id": "string",
      "name": "Website Name",
      "primaryColor": "Hex color code (e.g. #D4AF37)",
      "secondaryColor": "Hex color code",
      "fontFamily": "Modern font name",
      "blocks": [
        {
          "id": "b1",
          "type": "Hero",
          "content": {
            "subtitle": "Catchy uppercase subtitle",
            "title": "Powerful high-converting headline",
            "description": "Engaging description",
            "ctaText": "Action-oriented button text",
            "ctaLink": "/link"
          }
        },
        {
          "id": "b2",
          "type": "Features",
          "content": {
            "title": "Value Proposition Title",
            "items": [
              { "title": "Feature 1", "description": "Detailed benefit 1" },
              { "title": "Feature 2", "description": "Detailed benefit 2" },
              { "title": "Feature 3", "description": "Detailed benefit 3" }
            ]
          }
        },
        {
          "id": "b3",
          "type": "About",
          "content": {
            "title": "Our Legacy/Story Title",
            "description": "A professional and inspiring story about the brand",
            "image": "A relevant Unsplash URL if possible, otherwise omit"
          }
        },
        {
          "id": "b4",
          "type": "Pricing",
          "content": {
            "title": "Transparent Pricing",
            "items": [
              { "title": "Basic", "description": "29" },
              { "title": "Professional", "description": "99" },
              { "title": "Enterprise", "description": "299" }
            ]
          }
        },
        {
          "id": "b5",
          "type": "Contact",
          "content": {
            "title": "Lets Build Something Great",
            "description": "Contact us today to elevate your digital presence."
          }
        },
        {
          "id": "b6",
          "type": "Footer",
          "content": {
            "title": "Brand Name"
          }
        }
      ]
    }

    Constraints:
    1. Colors must be sophisticated and match the industry: ${industry}.
    2. Copy must be "Elite", "Professional", and "High-Converting".
    3. Use a consistent and logical flow of blocks.
    4. Output ONLY the raw JSON. No markdown, no comments.
  `;

  // On force la reponse a commencer par « { » en pre-remplissant le tour de
  // l'assistant. Sans cela le modele a tendance a encadrer le JSON de texte ou
  // de balises markdown, et JSON.parse tombe sur une chaine invalide.
  const reponse = await anthropic().messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: "user", content: prompt },
      { role: "assistant", content: "{" },
    ],
  });

  const morceau = reponse.content[0];
  const suite = morceau && morceau.type === "text" ? morceau.text : "";
  return JSON.parse("{" + suite);
}
