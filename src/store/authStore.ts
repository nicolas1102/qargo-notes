import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  email: string
}

type AuthState = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  hydrated: boolean
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "qargo-user",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
