import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
  }

  await prisma.note.delete({ where: { id } })

  return NextResponse.json({ message: "Note deleted" })
}
