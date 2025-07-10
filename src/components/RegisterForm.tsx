'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterForm() {
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Register failed")
        toast.error(data.error || "Register failed")
        return
      }

      login(data.user)
      toast.success("Account created successfully")
      router.push("/")
    } catch (err) {
      console.error("Register error:", err)
      setError("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register with your email and password to create and manage your personal notes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label htmlFor="tabs-demo-name">Password</Label>
          <Input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
