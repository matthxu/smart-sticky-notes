import { CreateNoteForm } from "@/components/CreateNoteForm"
import { useNotes } from "@/hooks/useNotes"
import { NoteCard } from "@/components/NoteCard"

export function Home() {
    const { notes, isLoading, error, refetch } = useNotes()

    if (isLoading) {
        return <p>Just a moment...</p>
    }
    if (error) {
        console.log(error)
        return <p>Error: {error}</p>
    }
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Notes</h1>
                <CreateNoteForm refetch={refetch} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            </div>
        </div>
    )
}
