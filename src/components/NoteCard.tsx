import { Trash2, Pin, Archive } from "lucide-react"
import type { Note, Label } from "@/types"
import { updateNote } from "@/lib/notes"

export function NoteCard({ note, onOpen, onDelete, onRefetch }: {
    note: Note
    onOpen: (note: Note) => void
    onDelete: (id: string) => void
    onRefetch: () => void
}) {
    async function handlePin(e: React.MouseEvent) {
        e.stopPropagation()
        await updateNote(note.id, { is_pinned: !note.is_pinned })
        onRefetch()
    }

    async function handleArchive(e: React.MouseEvent) {
        e.stopPropagation()
        await updateNote(note.id, { is_archived: !note.is_archived })
        onRefetch()
    }

    return (
        <div
            onClick={() => onOpen(note)}
            className="relative group bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer"
        >
            {note.is_pinned && (
                <Pin size={12} className="absolute top-2 right-2 text-yellow-500 fill-yellow-500" />
            )}

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

            <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handlePin} aria-label={note.is_pinned ? "Unpin" : "Pin"}>
                    <Pin size={14} className={note.is_pinned ? "text-yellow-500 fill-yellow-500" : "text-gray-400 hover:text-yellow-500"} />
                </button>
                <button onClick={handleArchive} aria-label={note.is_archived ? "Unarchive" : "Archive"}>
                    <Archive size={14} className="text-gray-400 hover:text-blue-500" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(note.id) }} aria-label="Delete note">
                    <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                </button>
            </div>
        </div>
    )
}
