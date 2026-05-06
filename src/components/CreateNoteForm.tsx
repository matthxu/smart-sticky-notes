import { useState, useEffect, useRef } from "react"
import { createNote } from "@/lib/notes"
import { createListItem } from "@/lib/listItems"
import { autoLabel } from "@/lib/autoLabel"
import { useAuth } from "@/lib/auth-context"
import type { NoteType } from "@/types"

interface CreateNoteFormProps {
    refetch: () => Promise<void>
}

export function CreateNoteForm({ refetch }: CreateNoteFormProps) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [type, setType] = useState<NoteType>("note")
    const [listItems, setListItems] = useState<string[]>([""])
    const [focusIndex, setFocusIndex] = useState<number | null>(null)
    const { user } = useAuth()
    const [isExpanded, setIsExpanded] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const itemRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                setIsExpanded(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (focusIndex !== null) {
            itemRefs.current[focusIndex]?.focus()
            setFocusIndex(null)
        }
    }, [focusIndex, listItems])

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const note = await createNote({ user_id: user.id, title, body: type === "note" ? body : null, type })
            if (type === "list" && note) {
                const filled = listItems.filter((s) => s.trim())
                await Promise.all(filled.map((content, i) => createListItem(note.id, content, i)))
            }
            setTitle("")
            setBody("")
            setType("note")
            setListItems([""])
            refetch()
            setIsExpanded(false)
            if (note) {
                autoLabel(note.id, title, type === "note" ? body : listItems.filter(Boolean).join(", ")).then(refetch)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Take a note..."
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                onClick={() => setIsExpanded(true)}
            />
            {isExpanded && (
                <>
                    <div className="flex gap-2">
                        {(["note", "list"] as NoteType[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`text-xs px-3 py-1 rounded-full border transition-colors ${type === t ? "bg-yellow-400 border-yellow-400 text-gray-800" : "border-gray-300 text-gray-500 hover:border-yellow-300"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {type === "note" ? (
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Body"
                            rows={3}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                        />
                    ) : (
                        <div className="flex flex-col gap-1 border border-gray-300 rounded-md px-3 py-2">
                            {listItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-sm border border-gray-300 flex-shrink-0" />
                                    <input
                                        ref={(el) => { itemRefs.current[i] = el }}
                                        value={item}
                                        onChange={(e) => {
                                            const updated = [...listItems]
                                            updated[i] = e.target.value
                                            setListItems(updated)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                setListItems((prev) => [...prev, ""])
                                                setFocusIndex(i + 1)
                                            }
                                        }}
                                        placeholder={`Item ${i + 1}`}
                                        className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setListItems((prev) => [...prev, ""])
                                    setFocusIndex(listItems.length)
                                }}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mt-1"
                            >
                                <span className="w-3 h-3" />
                                + Add item
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="self-end bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium text-sm px-4 py-2 rounded-md transition-colors"
                    >
                        Add Note
                    </button>
                </>
            )}
        </form>
    )
}
