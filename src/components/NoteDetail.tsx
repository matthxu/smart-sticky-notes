import { useState, useEffect, useRef } from "react"
import type { Note } from "@/types"

export function NoteDetail({ note, update }: { note: Note; update: (id: string, title: string, body: string) => void }) {
    const [localTitle, setLocalTitle] = useState(note.title ?? "")
    const [localBody, setLocalBody] = useState(note.body ?? "")
    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        const timer = setTimeout(() => {
            update(note.id, localTitle, localBody)
        }, 300)

        return () => clearTimeout(timer)
    }, [localTitle, localBody])

    return (
        <div>
            <input value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
            <textarea value={localBody} onChange={(e) => setLocalBody(e.target.value)} />
        </div>
    )
}
