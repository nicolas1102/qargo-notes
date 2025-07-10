'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import NoteForm from "@/components/NoteForm"
import NotesList from "@/components/NotesList"

export default function HomePage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push("/login")
  }, [user, router])

  if (!user) return null

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <NoteForm />
      <NotesList />
    </main>
  )
}
