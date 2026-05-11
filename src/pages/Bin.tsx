import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { restoreNote, deleteNote } from "@/lib/notes"
import type { Note } from "@/types"
import { Link } from "react-router-dom"

export function Bin() {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function fetchDeleted() {
        const { data } = await supabase
            .from("notes")
            .select("id, title, body, type")
            .not("deleted_at", "is", null)
            .order("deleted_at", { ascending: false })
        setNotes(data ?? [])
        setIsLoading(false)
    }

    useEffect(() => { fetchDeleted() }, [])

    async function handleRestore(id: string) {
        await restoreNote(id)
        fetchDeleted()
    }

    async function handleDelete(id: string) {
        if (!confirm("Permanently delete this note? This can't be undone.")) return
        await deleteNote(id)
        fetchDeleted()
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Bin</h1>
                    <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Back to notes</Link>
                </div>
                {isLoading ? (
                    <p className="text-gray-400 text-sm">Loading...</p>
                ) : notes.length === 0 ? (
                    <p className="text-gray-400 text-sm">Bin is empty.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {notes.map((note) => (
                            <div key={note.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
                                <span className="text-gray-700 text-sm truncate mr-4">{note.title || note.body || "Untitled"}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => handleRestore(note.id)} className="text-sm text-blue-500 hover:text-blue-700">Restore</button>
                                    <button onClick={() => handleDelete(note.id)} className="text-sm text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
