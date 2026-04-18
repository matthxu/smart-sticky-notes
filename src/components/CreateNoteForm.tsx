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
    const [isExpanded, setIsExpanded] = useState(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault() // prevents page reload (default form behaviour)

        try {
            // call createNote with title and body. id assigned from useAuth
            await createNote({ user_id: user.id, title, body })
            // clear the inputs after
            setTitle("")
            setBody("")
            refetch()
            setIsExpanded(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Take a note..."
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                onClick={() => setIsExpanded(true)}
            />
            {isExpanded && (
                <>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                        rows={3}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                    />
                    <button
                        type="submit"
                        className="self-end bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium text-sm px-4 py-2 rounded-md transition-colors">
                        Add Note
                    </button>
                </>
            )}
        </form>
    )
}
