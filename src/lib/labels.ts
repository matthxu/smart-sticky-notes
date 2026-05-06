import { supabase } from "@/lib/supabase"
import { Label } from "@/types"

export async function fetchLabels(): Promise<Label[]> {
    const { data, error } = await supabase.from("labels").select("*").order("name")
    if (error) throw new Error(error.message)
    return data
}

export async function createLabel(name: string): Promise<Label> {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from("labels").insert({ name, user_id: user?.id }).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function deleteLabel(id: string) {
    const { error } = await supabase.from("labels").delete().eq("id", id)
    if (error) throw new Error(error.message)
}

export async function addLabelToNote(noteId: string, labelId: string) {
    const { error } = await supabase.from("note_labels").insert({ note_id: noteId, label_id: labelId })
    if (error) throw new Error(error.message)
}

export async function removeLabelFromNote(noteId: string, labelId: string) {
    const { error } = await supabase.from("note_labels").delete().eq("note_id", noteId).eq("label_id", labelId)
    if (error) throw new Error(error.message)
}
