
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { LevelGrid } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- AetherSculpt ---
export const generateAssetConcept = async (prompt: string, techSpecs: string = "Concept Only"): Promise<string[]> => {
  try {
    const fullPrompt = `${prompt} | Technical Specs: ${techSpecs} | Style: 3D Render, Neutral Background, 8K, Isometric View`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    const images: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          images.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    }
    if (images.length === 0) throw new Error("No images generated.");
    return images;
  } catch (error) {
    console.error("Asset Gen Error:", error);
    throw error;
  }
};

// --- AetherWorld ---
export const generateWorldChunkData = async (x: number, y: number, biome: string): Promise<any> => {
  const prompt = `
    Generate data for a 64x64m game world chunk at coordinates (${x}, ${y}).
    Biome: ${biome}.
    Include vegetation density (0-1), terrain height variance, and a list of static mesh instances (e.g., 'Tree_01', 'Rock_Large').
    Output JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            chunkId: { type: Type.STRING },
            biome: { type: Type.STRING },
            vegetationDensity: { type: Type.NUMBER },
            terrainHeight: { type: Type.STRING },
            instances: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["chunkId", "biome", "instances"]
        }
      }
    });
    
    if (!response.text) throw new Error("No text returned.");
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Chunk Gen Error:", error);
    throw error;
  }
};

// --- AetherCode ---
export const generateGameCode = async (intent: string, language: 'csharp' | 'gdscript'): Promise<string> => {
    const prompt = `
      Write optimized game code in ${language}.
      Intent: ${intent}.
      requirements:
      1. Include comments explaining Big O complexity.
      2. Wrap unsafe operations in try/catch (C#) or safety checks (GDScript).
      3. Follow standard naming conventions.
      4. Return ONLY the code block.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt
        });
        return response.text || "// Error generating code.";
    } catch (error) {
        console.error("Code Gen Error:", error);
        throw error;
    }
};

// --- AetherMaze / LevelGenerator ---
export const generateLevelMap = async (width: number, height: number, density: 'low' | 'medium' | 'high'): Promise<{ level: LevelGrid }> => {
  const prompt = `
    Generate a 2D dungeon grid of size ${width}x${height}.
    Room Density: ${density}.
    Use the following integer codes:
    0: Wall
    1: Floor
    2: Door
    3: Treasure
    4: Start
    5: End
    Return a JSON object with a property 'level' containing a 2D array of integers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
         responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: {
              type: Type.ARRAY,
              items: {
                type: Type.ARRAY,
                items: { type: Type.INTEGER }
              }
            }
          }
        }
      }
    });

    if (!response.text) throw new Error("No text returned");
    const json = JSON.parse(response.text);
    return json;
  } catch (error) {
    console.error("Level Gen Error", error);
    return { level: [] };
  }
};

// --- AetherNarrative ---
export const generateNarrative = async (context: string, type: string, tone: string): Promise<string> => {
    const prompt = `
      Generate game narrative content.
      Type: ${type}
      Tone: ${tone}
      Context: ${context}
      Return plain text content formatted for display.
    `;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      return response.text || "No content generated.";
    } catch (error) {
      console.error("Narrative Gen Error", error);
      throw error;
    }
};
