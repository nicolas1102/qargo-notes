'use client'

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="w-full px-6 py-4 border-b bg-background flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Qargo Notes
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user.email}
          </span>
          <LogoutButton />
        </div>
      )}
    </header>
  )
}
