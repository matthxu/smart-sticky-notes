import { supabase } from "@/lib/supabase"
import { Note } from "@/types"

// Service logic to add note object to db
// Partial<Note> (TypeScript utility)  makes every field on Note optional 
export async function createNote(fields: Partial<Note>) {
    const { data, error } = await supabase.from("notes").insert({
        type: "note",
        ...fields,
    }).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function updateNote(id: string, fields: Partial<Note>) {
    const { error } = await supabase.from("notes").update(fields).eq('id', id)
    if (error) throw new Error(error.message)
}

export async function deleteNote(id: string) {
    const { error } = await supabase.from("notes").delete().eq('id', id)
    if (error) throw new Error(error.message)
}

export async function softDeleteNote(id: string) {
    const { error } = await supabase
        .from("notes")
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)
    if (error) throw new Error(error.message)
}

export async function restoreNote(id: string) {
    const { error } = await supabase
        .from("notes")
        .update({ deleted_at: null })
        .eq('id', id)
    if (error) throw new Error(error.message)
}