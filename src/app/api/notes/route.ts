import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ notes })
}

export async function POST(req: Request) {
  const { title, content, userId } = await req.json()

  if (!title || !userId) {
    return NextResponse.json({ error: "Missing title or userId" }, { status: 400 })
  }

  const note = await prisma.note.create({
    data: {
      title,
      content: content || "",
      userId,
    },
  })

  return NextResponse.json({ note }, { status: 201 })
}
