'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import NoteForm from "./NoteForm"
import { useState } from "react"

export default function NoteDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            Fill in the title and content for your note.
          </DialogDescription>
        </DialogHeader>
        <NoteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
