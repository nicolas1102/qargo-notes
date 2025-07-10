'use client'

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
      <div className="flex flex-wrap items-center justify-between gap-1 px-6 py-4 mx-auto max-w-7xl">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-md">
            ☕ Qargo Notes 
          </h1>
        </Link>

        {user && (
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}
