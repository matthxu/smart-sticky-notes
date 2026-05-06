import { supabase } from "@/lib/supabase"

export async function createListItem(noteId: string, content: string, displayOrder: number) {
    const { data, error } = await supabase
        .from("list_items")
        .insert({ note_id: noteId, content, display_order: displayOrder, is_checked: false })
        .select()
        .single()
    if (error) throw new Error(error.message)
    return data
}

export async function updateListItem(id: string, fields: { content?: string; is_checked?: boolean }) {
    const { error } = await supabase.from("list_items").update(fields).eq("id", id)
    if (error) throw new Error(error.message)
}

export async function deleteListItem(id: string) {
    const { error } = await supabase.from("list_items").delete().eq("id", id)
    if (error) throw new Error(error.message)
}
