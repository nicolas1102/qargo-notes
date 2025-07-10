'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import NotesList from "@/components/NotesList"
import NoteDialog from '@/components/NoteDialog'
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const user = useAuthStore((state) => state.user)
  const hydrated = useAuthStore((state) => state.hydrated)
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/auth")
    }
  }, [hydrated, user, router])


  if (!hydrated) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-lg font-medium">Loading your notes...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <p className="text-sm text-muted-foreground">
        Create, save, and manage your personal notes with ease.
      </p>
      <NoteDialog />
      <NotesList />
    </main>
  )
}
