'use client'

import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 mt-10">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">Qargo Notes</h1>
      <p className="mb-8 text-center text-muted-foreground">
        Simple and secure note-taking. Log in or create your account to get started.
      </p>
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
      <p className="my-8 text-sm italic text-center text-muted-foreground">
        “Start your day with a note and a coffee.”
      </p>
    </main>
  )
}
