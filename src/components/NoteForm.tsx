'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import { toast } from "sonner"

export default function NoteForm() {
  const user = useAuthStore((state) => state.user)
  const addNote = useNotesStore((state) => state.addNote)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!user) {
      toast.error("User not authenticated")
      return
    }

    setLoading(true)

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, userId: user.id }),
    })

    const data = await res.json()

    if (res.ok) {
      addNote(data.note)
      toast.success("Note created")
      setTitle("")
      setContent("")
    } else {
      toast.error("Failed to create note")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2">
      <Input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Note content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Note"}
      </Button>
    </form>
  )
}
