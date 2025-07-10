'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import NoteCard from './NoteCard'
import { Skeleton } from "@/components/ui/skeleton"
import { Inbox } from "lucide-react"

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
          <div
            key={i}
            className="w-full max-w-sm min-w-[280px] mx-auto p-4 space-y-2 border rounded-lg shadow bg-card"
          >
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}
      </div>

    )
  }

  if (!user || notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <Inbox className="w-10 h-10 opacity-50" />
        <p className="text-lg font-medium">No notes yet</p>
        <p className="text-sm">Start by adding your first note</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="grid max-w-6xl gap-4 px-4 py-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="w-full max-w-sm min-w-[280px] mx-auto">
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </div>

  )
}
