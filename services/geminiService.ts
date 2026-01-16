
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationResponse } from '../types';

export async function getMicrogreensRecommendation(goal: string, preferences: string): Promise<RecommendationResponse> {
  // Always use process.env.API_KEY directly when initializing the client.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Recommend microgreens for a person with this health goal: "${goal}" and these flavor preferences: "${preferences}".`,
    config: {
      systemInstruction: "You are a professional nutritionist specializing in microgreens (Prakriti Greens). Provide expert advice in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedGreens: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 2-3 specific microgreens like Broccoli, Radish, Pea, Sunflower etc."
          },
          reasoning: {
            type: Type.STRING,
            description: "A short professional explanation of why these are suggested."
          },
          usageTips: {
            type: Type.STRING,
            description: "A quick culinary tip for these greens."
          }
        },
        required: ["suggestedGreens", "reasoning", "usageTips"]
      }
    }
  });

  try {
    // response.text is a property, and we ensure it is a string before parsing.
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      suggestedGreens: ["Broccoli", "Sunflower"],
      reasoning: "General nutrient density support for your health goals.",
      usageTips: "Add to your morning smoothie or daily salad."
    };
  }
}
