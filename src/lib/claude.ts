import OpenAI from "openai"

export const claude = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
})

export const FAST_MODEL = "google/gemini-2.0-flash-001"
