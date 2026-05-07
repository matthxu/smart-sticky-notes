import { claude, SMART_MODEL } from "@/lib/claude"
import type { Note } from "@/types"

export async function getDailyDigest(notes: Note[], systemPrompt?: string): Promise<string> {
    const noteList = notes
        .map((n, i) => `${i + 1}. ${n.title || "(untitled)"}: ${(n.body ?? "").slice(0, 200)}`)
        .join("\n")

    const response = await claude.chat.completions.create({
        model: SMART_MODEL,
        max_tokens: 512,
        system: systemPrompt || undefined,
        messages: [{
            role: "user",
            content: `Here are my current notes:\n\n${noteList}\n\nGive me a brief daily digest: summarise what I have on, highlight anything urgent or time-sensitive, and suggest a top priority. Be concise.`,
        }],
    })

    return response.choices[0]?.message?.content?.trim() ?? "No digest available."
}
