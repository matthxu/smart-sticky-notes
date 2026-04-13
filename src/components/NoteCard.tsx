import type { Note } from "@/types"

// renders a single note in the grid, click opens it
type NoteCardProps = {
    note: Note
}

export function NoteCard({ note }: NoteCardProps) {
    return (
        <div>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
        </div>
    )
}
