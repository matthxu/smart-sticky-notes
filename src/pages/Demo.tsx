import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Note } from "@/types"
import { sampleNotes } from "@/data/sampleNotes"
import { NoteCard } from "@/components/NoteCard"
import { NoteDetail } from "@/components/NoteDetail"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { getDailyDigest } from "@/lib/dailyDigest"

function loadNotes(): Note[] {
    const today = new Date().toDateString()
    if (localStorage.getItem("demo_date") !== today) {
        localStorage.setItem("demo_date", today)
        localStorage.removeItem("demo_notes")
    }
    const stored = localStorage.getItem("demo_notes")
    return stored ? JSON.parse(stored) : sampleNotes
}

function saveNotes(notes: Note[]) {
    localStorage.setItem("demo_notes", JSON.stringify(notes))
}

export function Demo() {
    const [notes, setNotes] = useState<Note[]>(loadNotes)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [digest, setDigest] = useState<string | null>(null)
    const [isDigesting, setIsDigesting] = useState(false)

    useEffect(() => { saveNotes(notes) }, [notes])

    function updateNote(id: string, title: string, body: string) {
        setNotes((prev) => prev.map((n) => n.id === id ? { ...n, title, body, updated_at: new Date().toISOString() } : n))
        if (selectedNote?.id === id) setSelectedNote((n) => n ? { ...n, title, body } : n)
    }

    async function handleDigest() {
        setIsDigesting(true)
        try { setDigest(await getDailyDigest(notes)) }
        finally { setIsDigesting(false) }
    }

    const allLabels = [...new Map(notes.flatMap((n) => n.labels ?? []).map((l) => [l.id, l])).values()]
    const [activeLabels, setActiveLabels] = useState<string[]>([])
    function toggleLabel(id: string) {
        setActiveLabels((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id])
    }

    const filtered = activeLabels.length > 0
        ? notes.filter((n) => activeLabels.every((id) => n.labels?.some((l) => l.id === id)))
        : notes

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mb-6 flex items-center justify-between text-sm">
                        <span className="text-yellow-700">Demo mode — data resets daily. No changes are saved permanently.</span>
                        <Link to="/signup" className="text-yellow-800 font-medium hover:underline">Sign up free</Link>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">My Notes <span className="text-sm font-normal text-gray-400">demo</span></h1>
                        <button
                            onClick={handleDigest}
                            disabled={isDigesting}
                            className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40"
                        >
                            {isDigesting ? "Generating..." : "Daily digest"}
                        </button>
                    </div>

                    {allLabels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {allLabels.map((label) => (
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

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onOpen={setSelectedNote}
                                onDelete={(id) => setNotes((prev) => prev.filter((n) => n.id !== id))}
                                onRefetch={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={digest !== null} onOpenChange={(open) => { if (!open) setDigest(null) }}>
                <DialogContent>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Daily Digest</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{digest}</p>
                </DialogContent>
            </Dialog>

            <Dialog open={selectedNote !== null} onOpenChange={(open) => { if (!open) setSelectedNote(null) }}>
                <DialogContent>
                    {selectedNote && (
                        <NoteDetail
                            note={selectedNote}
                            update={updateNote}
                            refetch={() => {}}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
