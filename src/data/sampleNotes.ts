import type { Note } from "@/types"

export const sampleNotes: Note[] = [
    {
        id: "1", user_id: "demo", type: "note", is_pinned: true, is_archived: false, deleted_at: null,
        title: "Q2 Goals", category: "Work", reminder_at: null,
        body: "• Ship the new dashboard by end of May\n• Reduce API response time under 200ms\n• Onboard two new team members",
        created_at: "2026-05-01T09:00:00Z", updated_at: "2026-05-01T09:00:00Z",
        labels: [{ id: "l1", user_id: "demo", name: "work" }, { id: "l2", user_id: "demo", name: "goals" }],
        list_items: [],
    },
    {
        id: "2", user_id: "demo", type: "note", is_pinned: false, is_archived: false, deleted_at: null,
        title: "Book recommendations", category: "Personal", reminder_at: null,
        body: "• The Pragmatic Programmer\n• Atomic Habits\n• Deep Work\n• The Design of Everyday Things",
        created_at: "2026-05-03T11:00:00Z", updated_at: "2026-05-03T11:00:00Z",
        labels: [{ id: "l3", user_id: "demo", name: "reading" }],
        list_items: [],
    },
    {
        id: "3", user_id: "demo", type: "list", is_pinned: false, is_archived: false, deleted_at: null,
        title: "Grocery run", category: "Shopping", reminder_at: null,
        body: null,
        created_at: "2026-05-05T08:00:00Z", updated_at: "2026-05-05T08:00:00Z",
        labels: [],
        list_items: [
            { id: "li1", note_id: "3", content: "Milk", is_checked: true, display_order: 0 },
            { id: "li2", note_id: "3", content: "Eggs", is_checked: false, display_order: 1 },
            { id: "li3", note_id: "3", content: "Bread", is_checked: false, display_order: 2 },
            { id: "li4", note_id: "3", content: "Coffee", is_checked: false, display_order: 3 },
        ],
    },
    {
        id: "4", user_id: "demo", type: "note", is_pinned: false, is_archived: false, deleted_at: null,
        title: "App idea", category: "Ideas", reminder_at: null,
        body: "A habit tracker that integrates with your calendar. Shows streaks and predicts when you're likely to break a habit based on past patterns.",
        created_at: "2026-05-07T14:00:00Z", updated_at: "2026-05-07T14:00:00Z",
        labels: [{ id: "l4", user_id: "demo", name: "ideas" }],
        list_items: [],
    },
    {
        id: "5", user_id: "demo", type: "reminder", is_pinned: false, is_archived: false, deleted_at: null,
        title: "Dentist appointment", category: "Health", reminder_at: "2026-05-15T10:00:00Z",
        body: "Annual checkup. Bring insurance card.",
        created_at: "2026-05-08T10:00:00Z", updated_at: "2026-05-08T10:00:00Z",
        labels: [{ id: "l5", user_id: "demo", name: "health" }],
        list_items: [],
    },
]
