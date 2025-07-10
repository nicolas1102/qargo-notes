'use client'

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}
