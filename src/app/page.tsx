'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import NoteForm from "@/components/NoteForm"
import NotesList from "@/components/NotesList"

export default function HomePage() {
  const user = useAuthStore((state) => state.user)
  const hydrated = useAuthStore((state) => state.hydrated)
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/auth")
    }
  }, [hydrated, user, router])

  if (!hydrated) return null // o un loader si prefieres

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <NoteForm />
      <NotesList />
    </main>
  )
}
