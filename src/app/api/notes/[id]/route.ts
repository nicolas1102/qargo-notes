import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  await prisma.note.delete({ where: { id } })

  return NextResponse.json({ message: "Note deleted" })
}
