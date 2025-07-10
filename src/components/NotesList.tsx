'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import NoteCard from './NoteCard'
import { Skeleton } from "@/components/ui/skeleton"

export default function NotesList() {
  const user = useAuthStore((state) => state.user)
  const { notes, setNotes } = useNotesStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return
      setLoading(true)
      const res = await fetch(`/api/notes?userId=${user.id}`)
      const data = await res.json()
      setNotes(data.notes)
      setLoading(false)
    }
    fetchNotes()
  }, [user, setNotes])

  if (loading || !user) {
    return (
      <div className="grid max-w-6xl gap-4 px-4 py-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full p-4 space-y-2 border rounded-lg shadow bg-card">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}
      </div>
    )
  }

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
