import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const id = context.params.id

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  try {
    await prisma.note.delete({ where: { id } })
    return NextResponse.json({ message: "Note deleted" })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
