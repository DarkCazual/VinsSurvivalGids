import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, subtitle, welTags, nietTags, sfeerWoorden, logoType } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY niet geconfigureerd" }, { status: 500 });
    }

    // Prompt opbouw volgens de specificatie uit het boek
    const prompt = `
Je bent een meester merk-ontwerper en vector-logo specialist.
Bedrijfsnaam: "${name || "Mijn Bedrijf"}"
Ondertitel: "${subtitle || ""}"
Archetype: ${logoType}
Elementen die WEL moeten terugkomen: ${welTags?.join(", ") || "geen specifieke"}
Elementen die NIET mogen voorkomen: ${nietTags?.join(", ") || "geen"}
Sfeer: ${sfeerWoorden?.filter(Boolean).join(", ") || "ambachtelijk, betrouwbaar"}

Ontwerp een professioneel, direct bruikbaar concept voor dit logo archetype.
Geef een bondige analyse (2 regels) waarom dit ontwerp perfect past bij deze ondernemer en geef creatieve suggesties voor de uiteindelijke drukwerkuitvoering.
`.trim();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json({ error: "Gemini kon dit type even niet genereren" }, { status: response.status });
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ 
      success: true, 
      aiConcept: aiText,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Fout in /api/logo/generate:", error);
    return NextResponse.json({ error: error.message || "Interne serverfout" }, { status: 500 });
  }
}
