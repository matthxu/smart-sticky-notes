import { useState, useEffect, useRef } from "react"
import type { Note } from "@/types"

export function NoteDetail({ note, update }: { note: Note; update: (id: string, title: string, body: string) => void }) {
    const [localTitle, setLocalTitle] = useState(note.title ?? "")
    const [localBody, setLocalBody] = useState(note.body ?? "")
    const isMounted = useRef(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        const timer = setTimeout(() => {
            update(note.id, localTitle, localBody)
        }, 100)

        return () => clearTimeout(timer)
    }, [localTitle, localBody])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [localBody])

    return (
        <div className="flex flex-col gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-300 shadow-inner">
            <input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="text-xl font-bold text-gray-800 bg-transparent border-b border-yellow-300 pb-1 w-full outline-none focus:ring-0"
            />
            <textarea
                ref={textareaRef}
                value={localBody}
                onChange={(e) => setLocalBody(e.target.value)}
                className="note-scroll w-full text-sm text-gray-700 bg-transparent resize-none outline-none focus:ring-0 overflow-y-auto max-h-[70vh]"
            />
        </div>
    )
}
