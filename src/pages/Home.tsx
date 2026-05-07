import { CreateNoteForm } from "@/components/CreateNoteForm"
import { useNotes } from "@/hooks/useNotes"
import { useLabels } from "@/hooks/useLabels"
import { NoteCard } from "@/components/NoteCard"
import { NoteDetail } from "@/components/NoteDetail"
import { useState } from "react"
import type { Note } from "@/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { softDeleteNote } from "@/lib/notes"
import { Link } from "react-router-dom"

type SortOption = "pinned" | "created" | "modified" | "alpha"

function sortNotes(notes: Note[], sort: SortOption): Note[] {
    const sorted = [...notes]
    switch (sort) {
        case "pinned":
            return sorted.sort((a, b) => {
                if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            })
        case "created":
            return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        case "modified":
            return sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        case "alpha":
            return sorted.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""))
    }
}

export function Home() {
    const [showArchived, setShowArchived] = useState(false)
    const [activeLabels, setActiveLabels] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<SortOption>("pinned")
    const { notes, isLoading, error, refetch, update } = useNotes(showArchived)
    const { labels } = useLabels()
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    function toggleLabel(id: string) {
        setActiveLabels((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id])
    }

    const usedLabels = labels.filter((l) => notes.some((n) => n.labels?.some((nl) => nl.id === l.id)))

    const filteredNotes = sortNotes(
        activeLabels.length > 0
            ? notes.filter((n) => activeLabels.every((id) => n.labels?.some((l) => l.id === id)))
            : notes,
        sortBy
    )

    function handleOpen(note: Note) {
        setSelectedNote(note)
    }

    async function handleDelete(id: string) {
        await softDeleteNote(id)
        if (selectedNote?.id === id) setSelectedNote(null)
        refetch()
    }

    if (isLoading) {
        return <p>Just a moment...</p>
    }
    if (error) {
        console.log(error)
        return <p>Error: {error}</p>
    }
    return (
        <>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="text-sm text-gray-500 border border-gray-200 rounded px-2 py-1 bg-white hover:border-gray-300 focus:outline-none"
                            >
                                <option value="pinned">Pinned first</option>
                                <option value="created">Date created</option>
                                <option value="modified">Date modified</option>
                                <option value="alpha">Alphabetical</option>
                            </select>
                            <button
                                onClick={() => setShowArchived((v) => !v)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                {showArchived ? "Hide archived" : "Show archived"}
                            </button>
                            <Link to="/bin" className="text-sm text-gray-500 hover:text-gray-700">Bin</Link>
                        </div>
                    </div>

                    <CreateNoteForm refetch={refetch} />

                    {usedLabels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {usedLabels.map((label) => (
                                <button
                                    key={label.id}
                                    onClick={() => toggleLabel(label.id)}
                                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${activeLabels.includes(label.id) ? "bg-yellow-400 border-yellow-400 text-gray-800" : "border-gray-300 text-gray-500 hover:border-yellow-300"}`}
                                >
                                    {label.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {filteredNotes.map((note) => (
                            <NoteCard key={note.id} note={note} onOpen={handleOpen} onDelete={handleDelete} onRefetch={refetch} />
                        ))}
                    </div>
                </div>
            </div>
            <Dialog
                open={selectedNote !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedNote(null)
                    refetch()
                }}>
                <DialogContent>{selectedNote && <NoteDetail note={selectedNote} update={update} refetch={refetch} />}</DialogContent>
            </Dialog>
        </>
    )
}
