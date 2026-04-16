import { CreateNoteForm } from "@/components/CreateNoteForm"
import { useNotes } from "@/hooks/useNotes"
import { NoteCard } from "@/components/NoteCard"
import { useState } from "react"
import type { Note } from "@/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function Home() {
    const { notes, isLoading, error, refetch } = useNotes()
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    function handleOpen(note: Note) {
        setSelectedNote(note)
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
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">My Notes</h1>

                    <CreateNoteForm refetch={refetch} />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} onOpen={handleOpen} />
                        ))}
                    </div>
                </div>
            </div>
            <Dialog>
                
            </Dialog>
        </>
    )
}
