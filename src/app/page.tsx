'use client'

import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"

export default function Home() {
  const user = useAuthStore((state) => state.user)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Qargo Notes</h1>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button onClick={() => login({ id: "123", email: "demo@test.com" })}>
          Simulate Login
        </Button>
      )}
    </main>
  )
}
