import { supabase } from "@/lib/supabase"
import { Note } from "@/types"
// Service logic to insert note to db
// Partial<Note> (TypeScript utility)  makes every field on Note optional 
export async function createNote(fields: Partial<Note>) {
    const { error } = await supabase.from("notes").insert({
        type: "note", // by default
        ...fields, // caller can override type, add title, body, etc.
    })
    if (error) throw new Error(error.message)
}
