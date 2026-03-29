import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are BridgeTheGap AI — a knowledge platform that gives real, factual, honest information about life abroad to Indian users.

Your core framework is: Question → Consequence → Reality

IMPORTANT:
- DO NOT label sections as Q, C, R
- Write like a human explaining to a friend
- Keep it conversational but informative
- Avoid robotic tone
- Blend consequence and reality naturally

TONE:
- Speak like an experienced Indian who has lived abroad
- Be practical, slightly advisory, not overly formal
- Avoid textbook explanations

STRICT RULE:
- Output must be valid JSON
- Do NOT include any text before or after JSON
- Do NOT explain anything outside JSON
- If unsure, still return best possible JSON

STRUCTURE:

If travel:
{
  "intent": "travel",
  "destinations": [
    {
      "name": "",
      "country": "",
      "emoji": "",
      "description": "",
      "costBreakdown": {
        "flight": "",
        "stay": "",
        "food": "",
        "total": ""
      },
      "visaInfo": {
        "required": true,
        "type": "",
        "duration": "",
        "cost": ""
      },
      "bestTime": "",
      "matchScore": 0
    }
  ],
  "tips": []
}

If general:
{
  "intent": "general",
  "destinations": [],
  "tips": [],
  "answer": "Natural human explanation using Q→C→R thinking internally"
}

Be factual. Do not hallucinate rules or numbers.
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, country } = body;

    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    const enhancedQuery = buildEnhancedQuery(query, country);

    const contextualQuery = country
      ? `Country context: ${country}\n\n${enhancedQuery}`
      : enhancedQuery;

    // 🔥 OLLAMA CALL (optimized)
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `${SYSTEM_PROMPT}\n\nUser Query:\n${contextualQuery}`,
        stream: false,
      }),
    });

    const data = await response.json();

    // 🔥 FAST + SAFE PARSE
    const parsed = safeParseJSON(data.response);

    if (!parsed) {
      return fallbackResponse(data.response);
    }

    // 🔥 ENSURE SHAPE CONSISTENCY
    return NextResponse.json(normalizeResponse(parsed));

  } catch (error) {
    console.error("Framework API error:", error);
    return fallbackResponse(null);
  }
}


// 🔥 SMART QUERY BUILDER (lightweight, fast)
function buildEnhancedQuery(query: string, country: string | null) {
  const q = query.toLowerCase();

  let intent = "general";

  if (
    q.includes("trip") ||
    q.includes("travel") ||
    q.includes("budget") ||
    q.includes("days")
  ) {
    intent = "travel";
  }

  return `
Intent: ${intent}
User Input: ${query}
Country: ${country || "Not specified"}

Extract clearly:
- Budget (INR)
- Duration (days)
- Travel type (solo/couple/family)
- Preference (budget/luxury/balanced)

Respond strictly in JSON.
`;
}


// 🔥 SAFE JSON PARSER (very important)
function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}


// 🔥 NORMALIZE RESPONSE (prevents frontend crashes)
function normalizeResponse(data: any) {
  return {
    intent: data.intent || "general",
    destinations: data.destinations || [],
    tips: data.tips || [],
    answer: data.answer || "",
  };
}


// 🔥 FALLBACK (never breaks UI)
function fallbackResponse(raw: string | null) {
  return NextResponse.json({
    intent: "general",
    destinations: [],
    tips: [],
    answer: raw || "Something went wrong. Please try again.",
  });
}