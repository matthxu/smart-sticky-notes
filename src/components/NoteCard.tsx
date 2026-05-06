import { Trash2 } from "lucide-react"
import type { Note, Label } from "@/types"

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

            {note.labels && note.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {note.labels.map((label: Label) => (
                        <span
                            key={label.id}
                            className="text-xs bg-yellow-200 text-yellow-800 border border-yellow-300 rounded-full px-2 py-0.5"
                        >
                            {label.name}
                        </span>
                    ))}
                </div>
            )}

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
