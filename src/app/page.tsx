import Counter from "@/components/Counter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white dark:bg-black p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Qargo Notes
      </h1>
      <Counter />
    </main>
  )
}