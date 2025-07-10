'use client'

import { Button } from "@/components/ui/button"
import { useCounterStore } from "@/store/counterStore"

export default function Counter() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-2xl font-semibold">Count: {count}</p>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={decrement}>-</Button>
        <Button onClick={increment}>+</Button>
      </div>
    </div>
  )
}