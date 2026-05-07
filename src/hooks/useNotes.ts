//  - useState — gives a component a piece of memory that, when changed, causes a re-render
//  - useEffect — runs side-effects (like fetching data from Supabase) after a render
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Note } from "@/types"

export function useNotes(showArchived = false) {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchNotes() {
        let query = supabase
            .from("notes")
            .select("*, labels(id, name), list_items(id, content, is_checked, display_order)")
            .is("deleted_at", null)

        if (!showArchived) {
            query = query.eq("is_archived", false)
        }

        const { data, error } = await query

        if (error) {
            setError(error.message)
        } else {
            setNotes(data)
        }
        setIsLoading(false)
    }

    async function updateNote(id: string, title: string, body: string) {
        await supabase.from("notes").update({ title, body }).eq("id", id)
    }

    useEffect(() => {
        fetchNotes()
    }, [showArchived])

    return { notes, isLoading, error, refetch: fetchNotes, update: updateNote }
}