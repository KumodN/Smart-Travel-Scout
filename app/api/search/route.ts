import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { inventory } from "@/app/data/inventory";
import { AIResponseSchema } from "@/app/utils/validation";
import { keywordSearch } from "@/app/utils/search";

// --- OPENAI CONFIGURATION ---
/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
*/

// --- GEMINI CONFIGURATION ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Reverting to flash for wider availability
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0,
  }
});

export async function POST(req: NextRequest) {
  let isFallback = false;
  let query = "";

  try {
    const body = await req.json();
    query = body.query;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Create a system prompt that grounds the AI to our inventory
    const systemPrompt = `You are the "Smart Travel Scout" assistant. Your ONLY job is to help users find travel experiences from the provided inventory.

INVENTORY:
${JSON.stringify(inventory, null, 2)}

STRICT RULES:
1. ONLY recommend items that exist in the INVENTORY above.
2. If the user request is unrelated to travel or cannot be met by the INVENTORY, return an empty "matches" array.
3. NEVER invent or predict destinations/packages not in the list.
4. Your response must be valid JSON matching the schema: { "matches": [{ "id": number, "reason": string }] }.
5. The "reason" should briefly explain why it matches (citing tags, location, or price).
6. Be helpful but stay strictly within bounds. If you don't have the right information, return no matches.`;

    // --- GEMINI IMPLEMENTATION ---
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `User request: ${query}` },
    ]);

    const responseText = result.response.text();
    const aiResponse = JSON.parse(responseText || '{"matches": []}');

    // Validate the AI response
    const validated = AIResponseSchema.parse(aiResponse);

    // Join AI results with our inventory data and verify IDs actually exist
    const results = validated.matches
      .map((match) => {
        const pkg = inventory.find((p) => p.id === match.id);
        if (!pkg) return null;
        return {
          package: pkg,
          matchReason: match.reason,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return NextResponse.json({
      results,
      metadata: {
        totalMatches: results.length,
        query,
        method: "AI",
      },
    });
  } catch (error: any) {
    console.error("Search error (attempting fallback):", error);
    
    // --- FALLBACK TO KEYWORD SEARCH ---
    isFallback = true;
    const fallbackResults = keywordSearch(query);

    return NextResponse.json({
      results: fallbackResults,
      metadata: {
        totalMatches: fallbackResults.length,
        query,
        method: "Keyword (Fallback)",
        warning: "AI provider currently unavailable. Results generated via keyword search.",
      },
    });
  }
}
