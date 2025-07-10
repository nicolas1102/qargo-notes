'use client'

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useNotesStore } from "@/store/notesStore"

type Note = {
  id: string
  title: string
  content?: string
  createdAt: string
}

export default function NoteCard({ note }: { note: Note }) {
  const removeNote = useNotesStore((state) => state.removeNote)

  const handleDelete = async () => {
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      removeNote(note.id)
      toast.success("Note deleted")
    } else {
      toast.error("Failed to delete note")
    }
  }

  const date = new Date(note.createdAt)
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="relative w-full p-4">
      <CardHeader className="">
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {note.content && (
          <p className="text-sm text-muted-foreground">{note.content}</p>
        )}
        <div className="text-xs text-muted-foreground">
          {formattedDate} at {formattedTime}
        </div>
      </CardContent>

      <Button
        onClick={handleDelete}
        size="icon"
        variant="ghost"
        className="absolute text-red-500 top-2 right-2 hover:bg-red-100 dark:hover:bg-red-900"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </Card>
  )
}
