'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useAuthStore } from "@/store/authStore"
import { useNotesStore } from "@/store/notesStore"
import { noteSchema } from "@/lib/schemas/note"
import { toast } from "sonner"

export default function NoteForm() {
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

    const result = noteSchema.safeParse({ title, content, userId: user.id })

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
    } else {
      toast.error("Failed to create note")
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Add a new note with a title and optional content.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Note content (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Add Note"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
