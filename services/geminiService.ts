
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

// Standard client initialization using named parameter for apiKey.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsights = async (transactions: Transaction[]) => {
  // Ensure the environment variable is used as the exclusive source for the API key.
  if (!process.env.API_KEY) {
    return "API Key not configured. Please add your Gemini API key to use Smart Insights.";
  }

  const prompt = `
    Como experto arquitecto financiero, analiza el siguiente historial de transacciones (formato JSON) y proporciona 3 recomendaciones personalizadas para mejorar la salud financiera del usuario. 
    Responde en español, de forma profesional pero cercana.
    Enfócate en patrones de gasto, ahorro potencial y optimización.
    
    Transacciones:
    ${JSON.stringify(transactions)}
  `;

  try {
    // Using gemini-3-pro-preview for complex reasoning and data analysis tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['WARNING', 'OPPORTUNITY', 'TIPS'] }
                },
                required: ['title', 'description', 'type']
              }
            }
          }
        }
      }
    });

    // Access the response text using the .text property as per guidelines.
    const textOutput = response.text || "{}";
    const insightsData = JSON.parse(textOutput);
    return insightsData.insights || [];
  } catch (error) {
    console.error("Error fetching insights from Gemini:", error);
    return [];
  }
};
