import { useState } from "react"
import { createNote } from "@/lib/notes"
import { useAuth } from '@/lib/auth-context'

// explicitly describing type of prop (because typescript)
interface CreateNoteFormProps {
    refetch: () => Promise<void>
}

// jsx for creating note. destructuring refetch prop
export function CreateNoteForm({ refetch }: CreateNoteFormProps) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const { user } = useAuth()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault() // prevents page reload (default form behaviour)

        try {
            // call createNote with title and body. id assigned from useAuth
            await createNote({ user_id: user.id, title, body })
            // clear the inputs after
            setTitle("")
            setBody("")
            refetch()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
            <button type="submit">Add Note</button>
        </form>
    )
}
