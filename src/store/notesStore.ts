import { create } from 'zustand'

type Note = {
  id: string
  title: string
  content: string
  createdAt: string
}

type NotesState = {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  removeNote: (id: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  removeNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}))
