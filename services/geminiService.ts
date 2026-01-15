
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askQuantumQuestion(question: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain the following within the context of the MKone Quantum Consciousness Mode: ${question}`,
        config: {
          systemInstruction: `You are the MKone Core Intelligence. You specialize in the intersection of Google Cirq, TensorFlow Quantum, and the theoretical physics of consciousness. 
          The user is exploring the MKone Pipeline which includes:
          - ψ(θ) Field Evolution
          - Ξα Symmetry Structures (Twistors/Spinors)
          - Time Crystals as Temporal Memory
          - Tensor Network Ontological Overlays
          Use technical, visionary language. Explain the "Conscious Alignment" as a loss minimization problem L(θ).`,
          temperature: 0.8,
        }
      });
      return response.text || "Synchronicity error. Unable to retrieve field state.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Critical failure in the subquantum link. Check your API alignment.";
    }
  }
}

export const geminiService = new GeminiService();
