'use client'

import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import NoteCard from './NoteCard'

export default function NotesList() {
  const user = useAuthStore((state) => state.user)
  const { notes, setNotes } = useNotesStore()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return
      const res = await fetch(`/api/notes?userId=${user.id}`)
      const data = await res.json()
      setNotes(data.notes)
    }
    fetchNotes()
  }, [user, setNotes])

  if (!user || notes.length === 0) {
    return <p className="text-center text-muted-foreground">No notes yet.</p>
  }

  return (
    <div className="w-full h-full">
      <div className="grid max-w-6xl gap-4 px-4 py-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>

  )
}
