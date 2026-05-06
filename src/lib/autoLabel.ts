import { claude, FAST_MODEL } from "@/lib/claude"
import { fetchLabels, createLabel, addLabelToNote } from "@/lib/labels"

export async function autoLabel(noteId: string, title: string, body: string | null) {
    const existingLabels = await fetchLabels()

    const labelList = existingLabels.length
        ? `Existing labels: ${existingLabels.map((l) => l.name).join(", ")}`
        : "No existing labels."

    const response = await claude.chat.completions.create({
        model: FAST_MODEL,
        max_tokens: 64,
        messages: [
            {
                role: "user",
                content: `You are a note labeling assistant. Given a note, return a JSON array of label names that apply to it.
Rules:
- Prefer existing labels over creating new ones
- Only suggest a new label if the note has clear, meaningful content that fits a category
- Never use the note title or body text verbatim as a label
- If the note is too vague, short, or nonsensical to categorize, return []
- Return at most 2 labels
- Return only a JSON array of strings, no explanation, no markdown

${labelList}

Note title: ${title || "(none)"}
Note body: ${body || "(none)"}`,
            },
        ],
    })

    const raw = response.choices[0]?.message?.content?.trim() ?? "[]"
    const text = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()

    let names: string[] = []
    try {
        names = JSON.parse(text)
    } catch (e) {
        console.error("autoLabel parse error:", e, "raw response:", raw)
        return
    }

    for (const name of names) {
        let label = existingLabels.find((l) => l.name.toLowerCase() === name.toLowerCase())
        if (!label) {
            label = await createLabel(name)
        }
        await addLabelToNote(noteId, label.id)
    }
}
