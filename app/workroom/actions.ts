'use server'

import { generateResponse } from '@/lib/ai';

export async function chatAction(formData: FormData) {
    const message = formData.get('message') as string;
    const modelType = (formData.get('modelType') as "pro" | "flash" | "cerebras") || "flash";
    if (!message) return { error: "No message provided" };

    try {
        const response = await generateResponse(message, modelType);
        return { response };
    } catch (error) {
        return { error: "The pitch is flooded! Try again later." };
    }
}
