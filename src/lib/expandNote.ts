import { claude, FAST_MODEL } from "@/lib/claude"

export async function expandNote(title: string, body: string): Promise<string> {
    const response = await claude.chat.completions.create({
        model: FAST_MODEL,
        max_tokens: 512,
        messages: [
            {
                role: "user",
                content: `Add 2-3 short bullet points to this note. Be direct and specific. No intros, no summaries, no filler. Return only the bullets.

Title: ${title || "(none)"}
Body: ${body || "(none)"}`,
            },
        ],
    })

    const addition = response.choices[0]?.message?.content?.trim() ?? ""
    return addition ? `${body}\n\n${addition}` : body
}
