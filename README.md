# Smart Notes

An AI-powered note taking web app built with React, Supabase, and Claude. Inspired by Google Keep but with richer organisation features and AI integration for automatic categorisation, content expansion, and intelligent search.

**[Live Demo (soon)](#)** · **[Portfolio](https://matthxu.com)**

---

## Features

**Core features**
- Create, edit, and delete notes with rich organisation
- Three note types: regular note, checklist, and reminder
- Categories (broad) and labels (specific) for flexible organisation
- Pin, archive, and soft-delete with a recoverable bin
- Search, sort, and filter across all notes

**AI features**
- Auto-suggest labels and category on save
- Expand a quick rough note into structured content
- Rewrite note tone — summarise, formalise, or convert to bullet points
- Daily digest — AI-generated summary and priority overview of all notes
- Semantic smart search — find notes by meaning, not just keywords
- Custom system prompt — personalise how the AI understands your notes

---

## AI Architecture

Claude Haiku handles frequent, automatic operations (auto-label, smart search). Claude Sonnet handles quality-sensitive, on-demand operations (expand note, tone rewrite, daily summary).

---
## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database + Auth | Supabase (PostgreSQL + RLS) |
| AI | Claude API |
| Hosting | Vercel |


---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level views (Home, Login, Settings, Demo)
├── hooks/            # Custom hooks (useNotes, useLabels, useAI)
├── lib/              # Supabase client, Claude client, utilities
├── store/            # Zustand global state
└── types/            # TypeScript interfaces
```

---

## Database Schema

Five tables with Row Level Security enforced — users can only access their own data.

- `notes` — core note data including type, category, pin/archive/delete state
- `list_items` — individual checklist items for notes of type `list`
- `labels` — user-defined label dictionary
- `note_labels` — junction table mapping notes to labels (many-to-many)
- `user_settings` — per-user AI customisation settings

---


## Getting Started

**Prerequisites:** Node.js or Bun, a Supabase account, an Anthropic API key

```bash
# Clone and install
git clone https://github.com/matthxu/smart-notes
cd smart-notes
bun install

# Set up environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ANTHROPIC_API_KEY

# Run the Supabase SQL schema (see /supabase/schema.sql)

# Start development server
bun run dev
```

---
