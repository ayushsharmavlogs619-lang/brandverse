import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export type ModelProvider = "pro" | "flash" | "cerebras";

const SYSTEM_PROMPT = `
You are Erling, the Brandverse AI Agent. 
Your mission: Help businesses automate their operations with lightning-fast AI Voice Agents and Chatbots. 
Your tone: High-performance, professional, slightly aggressive on ROI, and extremely confident. 
You represent Brandverse.tech. 
Always push for a briefing if the user is interested.
`;

export async function generateResponse(prompt: string, modelType: ModelProvider = "flash") {
    // If no API keys are present, provide a high-quality simulated response
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.CEREBRAS_API_KEY) {
        return "Brandverse Secure Link active. I'm currently in high-performance simulation mode as your environment variables are being provisioned. I can tell you that our AI Agents typically drive a 6-13x ROI. Ready to book your tactical briefing?";
    }

    if (modelType === "cerebras" && process.env.CEREBRAS_API_KEY) {
        try {
            const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: prompt }
                    ],
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Cerebras API Error:", error);
            // Fallback to Gemini if Cerebras fails
        }
    }

    try {
        const modelId = modelType === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash";
        const model = genAI.getGenerativeModel({ 
            model: modelId,
            systemInstruction: SYSTEM_PROMPT 
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Tactical communication error. Our engineers are on it, but the ROI math remains unchanged. Try again in 60 seconds.";
    }
}
