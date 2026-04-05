export type NoteType = 'note' | 'list' | 'reminder'

export interface Note {
  id: string
  user_id: string
  title: string | null
  body: string | null
  type: NoteType
  category: string | null
  is_pinned: boolean
  is_archived: boolean
  deleted_at: string | null
  reminder_at: string | null
  created_at: string
  updated_at: string
  labels?: Label[]
  list_items?: ListItem[]
}

export interface ListItem {
  id: string
  note_id: string
  content: string
  is_checked: boolean
  display_order: number
}

export interface Label {
  id: string
  user_id: string
  name: string
}

export interface UserSettings {
  user_id: string
  custom_system_prompt: string | null
}

export const CATEGORIES = [
  'Personal', 'Work', 'Study', 'Health',
  'Finance', 'Ideas', 'Travel', 'Shopping', 'Other'
] as const

export type Category = typeof CATEGORIES[number]