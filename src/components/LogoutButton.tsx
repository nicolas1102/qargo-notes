'use client'

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/auth")
  }

  return (
    <Button variant="default" onClick={handleLogout}>
      Logout
    </Button>
  )
}
