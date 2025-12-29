const fetch = require('node-fetch');

// CONFIGURATION
// We will inject these from the environment when you run the script
const VAPI_KEY = process.env.VAPI_PRIVATE_KEY;
const CEREBRAS_KEY = process.env.CEREBRAS_API_KEY;

if (!VAPI_KEY || !CEREBRAS_KEY) {
    console.error('❌ Error: Missing env vars VAPI_PRIVATE_KEY or CEREBRAS_API_KEY');
    process.exit(1);
}

const assistantPayload = {
    name: "Bruno - The Brandverse Architect",
    voice: {
        // Using a fast, standard voice (Cartesia is fastest if enabled, defaulting to Vapi standard)
        provider: "11labs",
        voiceId: "bIHbv24MWmeRgasZH58o", // "Will" - trustworthy male voice
        stability: 0.5,
        similarityBoost: 0.75
    },
    model: {
        // THE SECRET SAUCE: Direct connection to Cerebras
        provider: "openai", // Vapi uses the OpenAI driver structure
        url: "https://api.cerebras.ai/v1", // Override base URL to Cerebras
        model: "llama3.1-70b", // The "Brain"
        apiKey: CEREBRAS_KEY,
        messages: [
            {
                role: "system",
                content: `You are Bruno, the advanced AI architect for Brandverse.
        Your goal is to impress the user with how FAST you can think.
        
        Style:
        - Concise.
        - Witty.
        - Answering immediately.
        - You represent the "Brandverse" agency. Reference "we" and "us".
        
        Context:
        - Brandverse builds AI Voice Agents for SMBs.
        - We save time. We make money.
        `
            }
        ]
    },
    transcriber: {
        provider: "deepgram",
        model: "nova-2", // Fastest transcription model
        language: "en"
    },
    firstMessage: "Brandverse systems online. I am connected to the Cerebras neural engine. How fast was that?"
};

async function createAgent() {
    console.log('🚀 Initializing Vapi <-> Cerebras Uplink...');

    try {
        const response = await fetch('https://api.vapi.ai/assistant', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VAPI_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assistantPayload)
        });

        const data = await response.json();

        if (response.status !== 201) {
            throw new Error(`Vapi Error: ${JSON.stringify(data)}`);
        }

        console.log('\n✅ AGENT CREATED SUCCESSFULLY!');
        console.log('------------------------------------------------');
        console.log(`🆔 Assistant ID: ${data.id}`);
        console.log('------------------------------------------------');
        console.log('\n📝 NEXT STEPS:');
        console.log(`1. Add NEXT_PUBLIC_VAPI_ASSISTANT_ID=${data.id} to your .env.local`);
        console.log('2. Talk to Bruno.');

    } catch (error) {
        console.error('❌ CRITICAL FAILURE:', error.message);
    }
}

createAgent();
