import type { Note } from "@/types"

// renders a single note in the grid, click opens it
type NoteCardProps = {
    note: Note
}

export function NoteCard({ note }: NoteCardProps) {
    return (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer">
            <h3 className="font-semibold text-gray-800 mb-1">{note.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{note.body}</p>
            <span className="text-xs text-gray-400 mt-2 block">{note.type}</span>
        </div>
    )
}
