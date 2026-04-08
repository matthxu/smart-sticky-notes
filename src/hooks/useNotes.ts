//  - useState — gives a component a piece of memory that, when changed, causes a re-render
//  - useEffect — runs side-effects (like fetching data from Supabase) after a render
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from "react"

export function useNotes() {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // fetch notes from Supabase here
        async function fetchNotes() {
            const { data, error } = await supabase.from("notes").select("*")

            if (error) {
                setError(error)
            } else {
                setNotes(data)
            }
            setIsLoading(false)
        }
        fetchNotes()
    }, [])

    return { notes, isLoading, error }
}