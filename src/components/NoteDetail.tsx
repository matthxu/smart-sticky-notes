import { useState, useEffect, useRef } from "react"
import { Tag, X, Plus, Trash2 } from "lucide-react"
import type { Note, ListItem } from "@/types"
import { useLabels } from "@/hooks/useLabels"
import { addLabelToNote, removeLabelFromNote } from "@/lib/labels"
import { createListItem, updateListItem, deleteListItem } from "@/lib/listItems"

export function NoteDetail({ note, update, refetch }: {
    note: Note
    update: (id: string, title: string, body: string) => void
    refetch: () => void
}) {
    const [localTitle, setLocalTitle] = useState(note.title ?? "")
    const [localBody, setLocalBody] = useState(note.body ?? "")
    const [noteLabels, setNoteLabels] = useState<Label[]>(note.labels ?? [])
    const [listItems, setListItems] = useState<ListItem[]>(
        [...(note.list_items ?? [])].sort((a, b) => a.display_order - b.display_order)
    )
    const [newItemContent, setNewItemContent] = useState("")
    const [showLabelPicker, setShowLabelPicker] = useState(false)
    const [newLabelName, setNewLabelName] = useState("")
    const isMounted = useRef(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const pickerRef = useRef<HTMLDivElement>(null)
    const { labels, addLabel } = useLabels()

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        const timer = setTimeout(() => {
            update(note.id, localTitle, localBody)
        }, 100)
        return () => clearTimeout(timer)
    }, [localTitle, localBody])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [localBody])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setShowLabelPicker(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    async function handleToggleLabel(labelId: string, labelName: string) {
        const isAttached = noteLabels.some((l) => l.id === labelId)
        if (isAttached) {
            await removeLabelFromNote(note.id, labelId)
            setNoteLabels((prev) => prev.filter((l) => l.id !== labelId))
        } else {
            await addLabelToNote(note.id, labelId)
            setNoteLabels((prev) => [...prev, { id: labelId, name: labelName, user_id: "" }])
        }
        refetch()
    }

    async function handleToggleItem(id: string, current: boolean) {
        await updateListItem(id, { is_checked: !current })
        setListItems((prev) => prev.map((item) => item.id === id ? { ...item, is_checked: !current } : item))
    }

    async function handleDeleteItem(id: string) {
        await deleteListItem(id)
        setListItems((prev) => prev.filter((item) => item.id !== id))
    }

    async function handleAddItem() {
        const trimmed = newItemContent.trim()
        if (!trimmed) return
        const displayOrder = listItems.length
        const created = await createListItem(note.id, trimmed, displayOrder)
        setListItems((prev) => [...prev, created])
        setNewItemContent("")
    }

    async function handleCreateAndAttach() {
        const trimmed = newLabelName.trim()
        if (!trimmed) return
        const created = await addLabel(trimmed)
        if (created) {
            await addLabelToNote(note.id, created.id)
            setNoteLabels((prev) => [...prev, created])
            refetch()
        }
        setNewLabelName("")
    }

    return (
        <div className="flex flex-col gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-300 shadow-inner">
            <input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="text-xl font-bold text-gray-800 bg-transparent border-b border-yellow-300 pb-1 w-full outline-none focus:ring-0"
            />
            {note.type === "list" ? (
                <div className="flex flex-col gap-1">
                    {listItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 group/item">
                            <input
                                type="checkbox"
                                checked={item.is_checked}
                                onChange={() => handleToggleItem(item.id, item.is_checked)}
                                className="accent-yellow-500 flex-shrink-0"
                            />
                            <span className={`flex-1 text-sm text-gray-700 ${item.is_checked ? "line-through text-gray-400" : ""}`}>
                                {item.content}
                            </span>
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400"
                                aria-label="Delete item"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            value={newItemContent}
                            onChange={(e) => setNewItemContent(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                            placeholder="Add item..."
                            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button onClick={handleAddItem} className="text-gray-400 hover:text-yellow-600">
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={localBody}
                    onChange={(e) => setLocalBody(e.target.value)}
                    className="note-scroll w-full text-sm text-gray-700 bg-transparent resize-none outline-none focus:ring-0 overflow-y-auto max-h-[70vh]"
                />
            )}

            <div className="flex flex-wrap gap-1 items-center mt-1">
                {noteLabels.map((label) => (
                    <span
                        key={label.id}
                        className="flex items-center gap-1 text-xs bg-yellow-200 text-yellow-800 border border-yellow-300 rounded-full px-2 py-0.5"
                    >
                        {label.name}
                        <button
                            onClick={() => handleToggleLabel(label.id, label.name)}
                            className="hover:text-red-500"
                            aria-label={`Remove label ${label.name}`}
                        >
                            <X size={10} />
                        </button>
                    </span>
                ))}

                <div className="relative" ref={pickerRef}>
                    <button
                        onClick={() => setShowLabelPicker((v) => !v)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 rounded-full px-2 py-0.5"
                    >
                        <Tag size={10} />
                        Add label
                    </button>

                    {showLabelPicker && (
                        <div className="absolute bottom-full mb-1 left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48">
                            <div className="flex flex-col gap-1 max-h-36 overflow-y-auto mb-2">
                                {labels.length === 0 && (
                                    <p className="text-xs text-gray-400 px-1">No labels yet</p>
                                )}
                                {labels.map((label) => {
                                    const attached = noteLabels.some((l) => l.id === label.id)
                                    return (
                                        <button
                                            key={label.id}
                                            onClick={() => handleToggleLabel(label.id, label.name)}
                                            className={`text-left text-xs px-2 py-1 rounded hover:bg-yellow-50 flex items-center justify-between ${attached ? "font-semibold text-yellow-700" : "text-gray-700"}`}
                                        >
                                            {label.name}
                                            {attached && <span className="text-yellow-500">✓</span>}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="flex gap-1 border-t border-gray-100 pt-2">
                                <input
                                    value={newLabelName}
                                    onChange={(e) => setNewLabelName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleCreateAndAttach()}
                                    placeholder="New label..."
                                    className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-yellow-300"
                                />
                                <button
                                    onClick={handleCreateAndAttach}
                                    className="text-yellow-600 hover:text-yellow-800"
                                    aria-label="Create label"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
