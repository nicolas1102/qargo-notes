'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import { noteSchema } from "@/lib/schemas/note"
import { toast } from "sonner"

type Props = {
  onSuccess?: () => void
}

export default function NoteForm({ onSuccess }: Props) {
  const user = useAuthStore((state) => state.user)
  const addNote = useNotesStore((state) => state.addNote)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("User not authenticated")
      return
    }

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    const result = noteSchema.safeParse({ title: trimmedTitle, content: trimmedContent, userId: user.id })

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors
      const firstError = errorMessages.title?.[0] || errorMessages.userId?.[0] || "Invalid note"
      toast.error(firstError)
      return
    }

    setLoading(true)

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    })

    const data = await res.json()

    if (res.ok) {
      addNote(data.note)
      toast.success("Note created")
      setTitle("")
      setContent("")
      onSuccess?.()
    } else {
      toast.error("Failed to create note")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Note"}
      </Button>
    </form>

  )
}
