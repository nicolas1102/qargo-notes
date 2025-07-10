'use client'

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-background">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Qargo Notes
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:block">
            {user.email}
          </span>
          <LogoutButton />
        </div>
      )}
    </header>
  )
}
