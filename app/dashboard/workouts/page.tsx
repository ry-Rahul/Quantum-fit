"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Calendar, Clock, Flame, Plus, CheckCircle, BarChart, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function WorkoutsPage() {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample workout data
  const workoutPlans = [
    {
      id: "strength-1",
      name: "Upper Body Strength",
      type: "Strength",
      duration: 45,
      difficulty: "Intermediate",
      calories: 320,
      lastCompleted: "2 days ago",
      progress: 60,
      exercises: [
        { name: "Bench Press", sets: 4, reps: 10, weight: "60kg", completed: true },
        { name: "Shoulder Press", sets: 3, reps: 12, weight: "40kg", completed: true },
        { name: "Lat Pulldown", sets: 4, reps: 10, weight: "55kg", completed: false },
        { name: "Bicep Curls", sets: 3, reps: 15, weight: "15kg", completed: false },
        { name: "Tricep Extensions", sets: 3, reps: 15, weight: "20kg", completed: false },
      ],
    },
    {
      id: "cardio-1",
      name: "HIIT Cardio",
      type: "Cardio",
      duration: 30,
      difficulty: "Advanced",
      calories: 400,
      lastCompleted: "5 days ago",
      progress: 0,
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: "30 sec", weight: "Bodyweight", completed: false },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", weight: "Bodyweight", completed: false },
        { name: "Burpees", sets: 3, reps: "30 sec", weight: "Bodyweight", completed: false },
        { name: "High Knees", sets: 3, reps: "30 sec", weight: "Bodyweight", completed: false },
        { name: "Rest", sets: 3, reps: "15 sec", weight: "N/A", completed: false },
      ],
    },
    {
      id: "strength-2",
      name: "Lower Body Strength",
      type: "Strength",
      duration: 50,
      difficulty: "Intermediate",
      calories: 380,
      lastCompleted: "1 week ago",
      progress: 0,
      exercises: [
        { name: "Squats", sets: 4, reps: 12, weight: "70kg", completed: false },
        { name: "Deadlifts", sets: 3, reps: 10, weight: "80kg", completed: false },
        { name: "Leg Press", sets: 3, reps: 15, weight: "120kg", completed: false },
        { name: "Lunges", sets: 3, reps: "12 each leg", weight: "20kg", completed: false },
        { name: "Calf Raises", sets: 4, reps: 20, weight: "40kg", completed: false },
      ],
    },
    {
      id: "flexibility-1",
      name: "Full Body Stretch",
      type: "Flexibility",
      duration: 25,
      difficulty: "Beginner",
      calories: 150,
      lastCompleted: "3 days ago",
      progress: 100,
      exercises: [
        { name: "Hamstring Stretch", sets: 2, reps: "30 sec hold", weight: "N/A", completed: true },
        { name: "Quad Stretch", sets: 2, reps: "30 sec hold", weight: "N/A", completed: true },
        { name: "Shoulder Stretch", sets: 2, reps: "30 sec hold", weight: "N/A", completed: true },
        { name: "Hip Flexor Stretch", sets: 2, reps: "30 sec hold", weight: "N/A", completed: true },
        { name: "Child's Pose", sets: 2, reps: "30 sec hold", weight: "N/A", completed: true },
      ],
    },
  ]

  // Exercise library data
  const exerciseLibrary = [
    { name: "Bench Press", muscle: "Chest", equipment: "Barbell", difficulty: "Intermediate" },
    { name: "Squats", muscle: "Legs", equipment: "Barbell", difficulty: "Intermediate" },
    { name: "Deadlifts", muscle: "Back", equipment: "Barbell", difficulty: "Advanced" },
    { name: "Pull-ups", muscle: "Back", equipment: "Bodyweight", difficulty: "Intermediate" },
    { name: "Push-ups", muscle: "Chest", equipment: "Bodyweight", difficulty: "Beginner" },
    { name: "Lunges", muscle: "Legs", equipment: "Bodyweight", difficulty: "Beginner" },
    { name: "Shoulder Press", muscle: "Shoulders", equipment: "Dumbbell", difficulty: "Intermediate" },
    { name: "Bicep Curls", muscle: "Arms", equipment: "Dumbbell", difficulty: "Beginner" },
    { name: "Tricep Extensions", muscle: "Arms", equipment: "Cable", difficulty: "Beginner" },
    { name: "Lat Pulldown", muscle: "Back", equipment: "Cable", difficulty: "Beginner" },
    { name: "Leg Press", muscle: "Legs", equipment: "Machine", difficulty: "Beginner" },
    { name: "Calf Raises", muscle: "Legs", equipment: "Machine", difficulty: "Beginner" },
    { name: "Plank", muscle: "Core", equipment: "Bodyweight", difficulty: "Beginner" },
    { name: "Russian Twists", muscle: "Core", equipment: "Bodyweight", difficulty: "Beginner" },
    { name: "Mountain Climbers", muscle: "Full Body", equipment: "Bodyweight", difficulty: "Intermediate" },
    { name: "Burpees", muscle: "Full Body", equipment: "Bodyweight", difficulty: "Advanced" },
  ]

  // Filter exercises based on search query
  const filteredExercises = searchQuery
    ? exerciseLibrary.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : exerciseLibrary

  // Workout history data
  const workoutHistory = [
    { date: "Today", workout: "Upper Body Strength", duration: 45, calories: 320 },
    { date: "Yesterday", workout: "Full Body Stretch", duration: 25, calories: 150 },
    { date: "3 days ago", workout: "HIIT Cardio", duration: 30, calories: 400 },
    { date: "5 days ago", workout: "Lower Body Strength", duration: 50, calories: 380 },
    { date: "1 week ago", workout: "Upper Body Strength", duration: 45, calories: 320 },
    { date: "1 week ago", workout: "Full Body Stretch", duration: 25, calories: 150 },
    { date: "2 weeks ago", workout: "HIIT Cardio", duration: 30, calories: 400 },
  ]

  // Weekly workout stats
  const weeklyStats = {
    workouts: 5,
    totalMinutes: 195,
    caloriesBurned: 1570,
    completionRate: 85,
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workouts</h1>

      <Tabs defaultValue="my-workouts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
          <TabsTrigger value="library">Exercise Library</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        {/* My Workouts Tab */}
        <TabsContent value="my-workouts" className="space-y-4">
          {/* Weekly Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Weekly Workout Summary</CardTitle>
              <CardDescription>Your workout progress for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Workouts</p>
                  <p className="text-2xl font-bold">{weeklyStats.workouts}</p>
                  <p className="text-xs text-gray-500">Goal: 6</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Minutes</p>
                  <p className="text-2xl font-bold">{weeklyStats.totalMinutes}</p>
                  <p className="text-xs text-gray-500">Goal: 240</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-2xl font-bold">{weeklyStats.caloriesBurned}</p>
                  <p className="text-xs text-gray-500">Goal: 2000</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Completion</p>
                  <p className="text-2xl font-bold">{weeklyStats.completionRate}%</p>
                  <Progress value={weeklyStats.completionRate} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workout Plans */}
          <div className="grid gap-4 md:grid-cols-2">
            {workoutPlans.map((workout) => (
              <Card key={workout.id} className={activeWorkout === workout.id ? "border-blue-500" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> {workout.duration} min
                        <Flame className="h-3.5 w-3.5 ml-2" /> {workout.calories} cal
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        workout.type === "Strength" ? "default" : workout.type === "Cardio" ? "destructive" : "outline"
                      }
                    >
                      {workout.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span>{workout.progress}%</span>
                    </div>
                    <Progress value={workout.progress} className="h-2" />
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>Last completed: {workout.lastCompleted}</p>
                    <p>Difficulty: {workout.difficulty}</p>
                    <p>{workout.exercises.length} exercises</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    variant={activeWorkout === workout.id ? "secondary" : "default"}
                    onClick={() => setActiveWorkout(activeWorkout === workout.id ? null : workout.id)}
                  >
                    {activeWorkout === workout.id ? "Hide Details" : "View Workout"}
                  </Button>
                </CardFooter>

                {/* Expanded workout details */}
                {activeWorkout === workout.id && (
                  <div className="px-6 pb-6">
                    <h4 className="font-medium mb-2">Exercises</h4>
                    <div className="space-y-3">
                      {workout.exercises.map((exercise, index) => (
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
                                {exercise.sets} sets × {exercise.reps} • {exercise.weight}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1">Start Workout</Button>
                      <Button variant="outline" className="flex-1">
                        Edit Workout
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            {/* Add New Workout Card */}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-200 bg-gray-50">
              <Dumbbell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Create New Workout</h3>
              <p className="text-gray-500 text-center mb-4">Design your own custom workout routine</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New Workout
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Exercise Library Tab */}
        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Library</CardTitle>
              <CardDescription>Browse and search for exercises to add to your workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search exercises..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Exercises</DropdownMenuItem>
                    <DropdownMenuItem>Chest</DropdownMenuItem>
                    <DropdownMenuItem>Back</DropdownMenuItem>
                    <DropdownMenuItem>Legs</DropdownMenuItem>
                    <DropdownMenuItem>Arms</DropdownMenuItem>
                    <DropdownMenuItem>Shoulders</DropdownMenuItem>
                    <DropdownMenuItem>Core</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {filteredExercises.map((exercise, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {exercise.muscle}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {exercise.equipment}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>Track your past workouts and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workoutHistory.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{entry.workout}</p>
                        <p className="text-sm text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.duration} min</p>
                      <p className="text-sm text-gray-500">{entry.calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout Statistics</CardTitle>
              <CardDescription>Track your fitness progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50 mb-6">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Workout statistics visualization</p>
                  <p className="text-sm text-gray-400">(Chart will be displayed here)</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Workouts:</span>
                        <span className="font-semibold">22</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Time:</span>
                        <span className="font-semibold">18.5 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calories Burned:</span>
                        <span className="font-semibold">8,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Workout Duration:</span>
                        <span className="font-semibold">42 min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Most Frequent Workouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upper Body Strength:</span>
                        <span className="font-semibold">8 times</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">HIIT Cardio:</span>
                        <span className="font-semibold">6 times</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lower Body Strength:</span>
                        <span className="font-semibold">5 times</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Body Stretch:</span>
                        <span className="font-semibold">3 times</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

