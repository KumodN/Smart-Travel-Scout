import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { inventory } from "@/app/data/inventory";
import { AIResponseSchema } from "@/app/utils/validation";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Create a system prompt that grounds the AI to our inventory
    const systemPrompt = `You are a travel assistant that ONLY recommends experiences from this specific inventory:
    ${JSON.stringify(inventory, null, 2)}
    
    Rules:
    1. ONLY recommend items from this inventory
    2. Return matches as JSON array with IDs and reasons
    3. Consider price, location, and tags when matching
    4. If nothing matches well, return empty array
    5. Format: { "matches": [{ "id": number, "reason": string }] }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Find the best matches for: ${query}` },
      ],
      temperature: 0.3, // Low temperature for consistent results
      response_format: { type: "json_object" },
    });

    const aiResponse = JSON.parse(
      completion.choices[0].message.content || "{}",
    );

    // Validate the AI response
    const validated = AIResponseSchema.parse(aiResponse);

    // Join AI results with our inventory data
    const results = validated.matches.map((match) => ({
      package: inventory.find((pkg) => pkg.id === match.id)!,
      matchReason: match.reason,
      score: 1, // You could add scoring logic here
    }));

    return NextResponse.json({
      results,
      metadata: {
        totalMatches: results.length,
        query,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to process search" },
      { status: 500 },
    );
  }
}
