import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, context: any) {
  const id = context?.params?.id

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  try {
    await prisma.note.delete({ where: { id } })
    return NextResponse.json({ message: "Note deleted" })
  } catch (error) {
    console.error("Error deleting note:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
