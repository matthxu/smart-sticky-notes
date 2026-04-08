import { CreateNoteForm } from "@/components/CreateNoteForm"
import { useNotes } from "@/hooks/useNotes"

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
        <div>
            <h1>Home</h1>
            <CreateNoteForm refetch={refetch}/>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
