import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export type ModelProvider = "pro" | "flash" | "cerebras" | "deepseek" | "openai" | "grok";

export async function generateResponse(prompt: string, modelType: ModelProvider = "flash") {

    // 🧠 CEREBRAS (The Speed Demon)
    if (modelType === "cerebras") {
        try {
            const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b",
                    messages: [{ role: "user", content: prompt }],
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Cerebras API Error:", error);
            throw new Error("Lightning strike failed! Switching to backup...");
        }
    }

    // 🐉 DEEPSEEK (The Architect - Deep Logic)
    if (modelType === "deepseek") {
        try {
            const response = await fetch("https://api.deepseek.com/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [{ role: "user", content: prompt }],
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("DeepSeek API Error:", error);
            throw new Error("Architect is offline.");
        }
    }

    // 🚀 GROK (The Disruptor - Raw & Edgy)
    if (modelType === "grok") {
        try {
            const response = await fetch("https://api.x.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "grok-beta",
                    messages: [{ role: "user", content: prompt }],
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Grok API Error:", error);
            throw new Error("Grok is unresponsive.");
        }
    }

    // 🎓 OPENAI (The Captain - Complex Logic)
    if (modelType === "openai") {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: prompt }],
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API Error:", error);
            throw new Error("Command center offline.");
        }
    }

    // 💎 GEMINI (The Reliable Core - Default)
    try {
        const modelId = modelType === "pro" ? "gemini-1.5-pro" : "gemini-1.5-flash";
        const model = genAI.getGenerativeModel({ model: modelId });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("All fallback systems failed.");
    }
}
