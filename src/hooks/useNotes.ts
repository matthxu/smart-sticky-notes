//  - useState — gives a component a piece of memory that, when changed, causes a re-render
//  - useEffect — runs side-effects (like fetching data from Supabase) after a render
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Note } from "@/types"

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchNotes() {
        const { data, error } = await supabase.from("notes").select("*")

        if (error) {
            setError(error.message)
        } else {
            setNotes(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        // runs ONCE on mount to populate home with all notes
        fetchNotes()
    }, [])

    return { notes, isLoading, error, refetch: fetchNotes }
}