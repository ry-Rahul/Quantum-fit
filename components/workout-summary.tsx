"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock, CheckCircle } from "lucide-react"

export default function WorkoutSummary() {
  const exercises = [
    { name: "Bench Press", sets: 4, reps: 10, completed: true },
    { name: "Shoulder Press", sets: 3, reps: 12, completed: true },
    { name: "Lat Pulldown", sets: 4, reps: 10, completed: false },
    { name: "Bicep Curls", sets: 3, reps: 15, completed: false },
    { name: "Tricep Extensions", sets: 3, reps: 15, completed: false },
  ]

  const completedExercises = exercises.filter((ex) => ex.completed).length
  const progress = (completedExercises / exercises.length) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Dumbbell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Upper Body Strength</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>45 minutes</span>
            </div>
          </div>
        </div>
        <Button>Start Workout</Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {completedExercises} of {exercises.length} exercises
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-3 pt-2">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-md ${
              exercise.completed ? "bg-gray-50" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center">
              {exercise.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3" />
              )}
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-gray-500">
                  {exercise.sets} sets × {exercise.reps} reps
                </p>
              </div>
            </div>
            {!exercise.completed && (
              <Button variant="outline" size="sm">
                Start
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

