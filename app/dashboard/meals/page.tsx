"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Utensils, Plus, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const mealPlan = [
    {
      id: 1,
      meal: "Breakfast",
      time: "7:30 AM",
      calories: 450,
      foods: [
        { name: "Greek Yogurt", amount: "200g", calories: 150, protein: 20, carbs: 8, fat: 5 },
        { name: "Blueberries", amount: "100g", calories: 60, protein: 1, carbs: 14, fat: 0 },
        { name: "Granola", amount: "50g", calories: 240, protein: 6, carbs: 30, fat: 10 },
      ],
    },
    {
      id: 2,
      meal: "Lunch",
      time: "12:30 PM",
      calories: 650,
      foods: [
        { name: "Grilled Chicken Breast", amount: "150g", calories: 250, protein: 45, carbs: 0, fat: 6 },
        { name: "Brown Rice", amount: "100g", calories: 150, protein: 3, carbs: 32, fat: 1 },
        { name: "Steamed Broccoli", amount: "150g", calories: 50, protein: 4, carbs: 10, fat: 0 },
        { name: "Olive Oil", amount: "15ml", calories: 120, protein: 0, carbs: 0, fat: 14 },
      ],
    },
    {
      id: 3,
      meal: "Snack",
      time: "4:00 PM",
      calories: 200,
      foods: [
        { name: "Apple", amount: "1 medium", calories: 80, protein: 0, carbs: 21, fat: 0 },
        { name: "Almonds", amount: "25g", calories: 120, protein: 5, carbs: 4, fat: 10 },
      ],
    },
    {
      id: 4,
      meal: "Dinner",
      time: "7:00 PM",
      calories: 550,
      foods: [
        { name: "Salmon Fillet", amount: "150g", calories: 280, protein: 35, carbs: 0, fat: 15 },
        { name: "Quinoa", amount: "100g", calories: 120, protein: 4, carbs: 21, fat: 2 },
        { name: "Roasted Vegetables", amount: "200g", calories: 100, protein: 3, carbs: 20, fat: 2 },
        { name: "Lemon Dressing", amount: "15ml", calories: 50, protein: 0, carbs: 2, fat: 5 },
      ],
    },
  ]

  const foodDatabase = [
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, category: "Protein" },
    { name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13, category: "Protein" },
    { name: "Brown Rice", calories: 150, protein: 3, carbs: 32, fat: 1, category: "Carbs" },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, category: "Carbs" },
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: "Vegetables" },
    { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: "Vegetables" },
    { name: "Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, category: "Fats" },
    { name: "Olive Oil", calories: 119, protein: 0, carbs: 0, fat: 13.5, category: "Fats" },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, category: "Dairy" },
    { name: "Eggs", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, category: "Protein" },
    { name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, category: "Nuts & Seeds" },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, category: "Fruits" },
    { name: "Blueberries", calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, category: "Fruits" },
    { name: "Quinoa", calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, category: "Carbs" },
    { name: "Lentils", calories: 116, protein: 9, carbs: 20, fat: 0.4, category: "Protein" },
  ]

  const filteredFoods = searchQuery
    ? foodDatabase.filter(
        (food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : foodDatabase

  const totalCalories = mealPlan.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = mealPlan.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.protein, 0),
    0,
  )
  const totalCarbs = mealPlan.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.carbs, 0),
    0,
  )
  const totalFat = mealPlan.reduce((sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.fat, 0), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meal Planner</h1>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Meals</TabsTrigger>
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="food">Food Database</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Nutrition Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Nutrition Summary</CardTitle>
              <CardDescription>Your nutritional intake for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-2xl font-bold">{totalCalories}</p>
                  <p className="text-xs text-gray-500">Goal: 2200</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="text-2xl font-bold">{totalProtein}g</p>
                  <p className="text-xs text-gray-500">Goal: 140g</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="text-2xl font-bold">{totalCarbs}g</p>
                  <p className="text-xs text-gray-500">Goal: 220g</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="text-2xl font-bold">{totalFat}g</p>
                  <p className="text-xs text-gray-500">Goal: 70g</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals List */}
          <div className="space-y-4">
            {mealPlan.map((meal) => (
              <Card key={meal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{meal.meal}</CardTitle>
                      <CardDescription>{meal.time}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {meal.calories} cal
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {meal.foods.map((food, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-gray-500">{food.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{food.calories} cal</p>
                          <p className="text-xs text-gray-500">
                            P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="mt-2 text-blue-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Food
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Meal
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Meal Plan</CardTitle>
              <CardDescription>Your AI-generated meal plan for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{day}</p>
                      <p className="text-sm text-gray-500">4 meals • 2,200 calories</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button>
                  <Utensils className="h-4 w-4 mr-2" /> Generate New Meal Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Database</CardTitle>
              <CardDescription>Browse and search for foods to add to your meals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search foods..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {filteredFoods.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredFoods.map((food, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{food.name}</p>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {food.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{food.calories} cal</p>
                            <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-6">
                              <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center mt-4">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" /> Add Custom Food
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No foods found matching "{searchQuery}"</p>
                    <Button variant="outline" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" /> Add Custom Food
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

