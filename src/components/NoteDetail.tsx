import { useState } from "react"
import type { Note } from "@/types"

// opens note view with editable fields, calls updateNote on change

export function NoteDetail({ note }: { note: Note }) {
    const [localTitle, setLocalTitle] = useState(note.title)
    const [localBody, setLocalBody] = useState(note.body)

    return (
        <div>
            <input value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
            <textarea value={localBody} onChange={(e) => setLocalBody(e.target.value)} />
        </div>
    )
}
