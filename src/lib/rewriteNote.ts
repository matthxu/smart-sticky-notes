import { claude, SMART_MODEL } from "@/lib/claude"

export type RewriteMode = "bullets" | "formal" | "summarise"

const prompts: Record<RewriteMode, string> = {
    bullets: "Rewrite this note as a concise bullet list. Return only the bullets, no intro.",
    formal: "Rewrite this note in a formal, professional tone. Return only the rewritten text.",
    summarise: "Summarise this note into 1-3 sentences. Return only the summary.",
}

export async function rewriteNote(body: string, mode: RewriteMode, systemPrompt?: string): Promise<string> {
    const response = await claude.chat.completions.create({
        model: SMART_MODEL,
        max_tokens: 512,
        system: systemPrompt || undefined,
        messages: [{ role: "user", content: `${prompts[mode]}\n\n${body}` }],
    })
    return response.choices[0]?.message?.content?.trim() ?? body
}
