'use client'

import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import { Button } from "@/components/ui/button"

export default function NotesList() {
  const user = useAuthStore((state) => state.user)
  const { notes, setNotes, removeNote } = useNotesStore()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return
      const res = await fetch(`/api/notes?userId=${user.id}`)
      const data = await res.json()
      setNotes(data.notes)
    }
    fetchNotes()
  }, [user, setNotes])

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" })
    removeNote(id)
  }

  if (notes.length === 0) {
    return <p className="text-center text-muted-foreground">No notes yet.</p>
  }

  return (
    <ul className="w-full max-w-md space-y-4">
      {notes.map((note) => (
        <li
          key={note.id}
          className="border rounded p-3 shadow-sm flex flex-col gap-1"
        >
          <div className="font-semibold">{note.title}</div>
          {note.content && <div className="text-sm text-gray-600">{note.content}</div>}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(note.id)}
            className={'pointer'}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  )
}
