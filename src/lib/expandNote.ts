import { claude, FAST_MODEL } from "@/lib/claude"

export async function expandNote(title: string, body: string): Promise<string> {
    const response = await claude.chat.completions.create({
        model: FAST_MODEL,
        max_tokens: 512,
        messages: [
            {
                role: "user",
                content: `Expand this note into more detail. Use short sentences and bullet points. Be practical and specific. Do not write introductions or conclusions. Return only the expanded note content, nothing else.

Title: ${title || "(none)"}
Body: ${body || "(none)"}`,
            },
        ],
    })

    return response.choices[0]?.message?.content?.trim() ?? body
}
