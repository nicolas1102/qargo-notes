import { prisma } from "@/lib/prisma"

import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  await prisma.note.delete({ where: { id } })

  return NextResponse.json({ message: "Note deleted" })
}