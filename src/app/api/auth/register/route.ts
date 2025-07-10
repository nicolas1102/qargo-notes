import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Verify if user already exist
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: { email, password },
    })

    return NextResponse.json({ user: { id: newUser.id, email: newUser.email } }, { status: 201 })
  } catch (error) {
    console.error("Error in register:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
