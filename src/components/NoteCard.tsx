import { Trash2 } from "lucide-react"
import type { Note } from "@/types"

export function NoteCard({ note, onOpen, onDelete }: {
    note: Note
    onOpen: (note: Note) => void
    onDelete: (id: string) => void
}) {
    return (
        <div
            onClick={() => onOpen(note)}
            className="relative group bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer"
        >
            <h3 className="font-semibold text-gray-800 mb-1">{note.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{note.body}</p>
            <span className="text-xs text-gray-400 mt-2 block">{note.type}</span>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note.id)
                }}
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                aria-label="Delete note"
            >
                <Trash2 size={15} />
            </button>
        </div>
    )
}
