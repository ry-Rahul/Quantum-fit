"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Droplet, Plus, Minus } from "lucide-react"

export default function WaterIntakeTracker() {
  const [waterIntake, setWaterIntake] = useState(1.8)
  const goal = 2.5
  const percentage = Math.min(Math.round((waterIntake / goal) * 100), 100)

  const addWater = (amount: number) => {
    setWaterIntake((prev) => Math.min(prev + amount, goal))
  }

  const removeWater = (amount: number) => {
    setWaterIntake((prev) => Math.max(prev - amount, 0))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <div
            className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-b-full transition-all duration-500 ease-in-out"
            style={{ height: `${percentage}%`, opacity: 0.8 }}
          />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Droplet className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">{waterIntake.toFixed(1)}L</span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-center font-medium">Add Water</p>
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => addWater(0.1)} className="h-8 px-2">
            <Plus className="h-4 w-4 mr-1" />
            100ml
          </Button>
          <Button variant="outline" size="sm" onClick={() => addWater(0.25)} className="h-8 px-2">
            <Plus className="h-4 w-4 mr-1" />
            250ml
          </Button>
          <Button variant="outline" size="sm" onClick={() => removeWater(0.1)} className="h-8 px-2">
            <Minus className="h-4 w-4 mr-1" />
            100ml
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Daily Goal:</span>
          <span className="font-medium">{goal}L</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Remaining:</span>
          <span className="font-medium">{(goal - waterIntake).toFixed(1)}L</span>
        </div>
      </div>
    </div>
  )
}

