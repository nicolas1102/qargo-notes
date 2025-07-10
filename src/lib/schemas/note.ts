import { z } from "zod"

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  userId: z.string().min(1),
})

export type NoteSchema = z.infer<typeof noteSchema>
