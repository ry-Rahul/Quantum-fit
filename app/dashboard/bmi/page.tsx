"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Scale, Flame } from "lucide-react"

export default function BMIPage() {
  const [activeTab, setActiveTab] = useState("bmi")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [result, setResult] = useState<{
    bmi?: number
    category?: string
    bmr?: number
    tdee?: number
  }>({})

  const calculateBMI = () => {
    if (!height || !weight) return

    const heightInMeters = Number.parseFloat(height) / 100
    const weightInKg = Number.parseFloat(weight)

    const bmi = weightInKg / (heightInMeters * heightInMeters)

    let category = ""
    if (bmi < 18.5) category = "Underweight"
    else if (bmi < 25) category = "Normal weight"
    else if (bmi < 30) category = "Overweight"
    else category = "Obese"

    setResult({ ...result, bmi: Number.parseFloat(bmi.toFixed(1)), category })
  }

  const calculateBMR = () => {
    if (!height || !weight || !age) return

    const heightInCm = Number.parseFloat(height)
    const weightInKg = Number.parseFloat(weight)
    const ageInYears = Number.parseFloat(age)

    let bmr = 0

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears
    } else {
      bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears
    }

    // Calculate TDEE based on activity level
    let activityMultiplier = 1.2 // Sedentary
    if (activityLevel === "light") activityMultiplier = 1.375
    else if (activityLevel === "moderate") activityMultiplier = 1.55
    else if (activityLevel === "active") activityMultiplier = 1.725
    else if (activityLevel === "very-active") activityMultiplier = 1.9

    const tdee = bmr * activityMultiplier

    setResult({
      ...result,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    })
  }

  const handleCalculate = () => {
    if (activeTab === "bmi") {
      calculateBMI()
    } else {
      calculateBMR()
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">BMI & BMR Calculator</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="bmi" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            BMI Calculator
          </TabsTrigger>
          <TabsTrigger value="bmr" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            BMR Calculator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bmi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Mass Index (BMI) Calculator</CardTitle>
              <CardDescription>
                Calculate your BMI to determine if you're at a healthy weight for your height
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="mt-6 w-full" disabled={!height || !weight}>
                Calculate BMI
              </Button>

              {result.bmi && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Your Results</h3>
                    <BarChart className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">BMI:</span>
                      <span className="font-semibold">{result.bmi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span
                        className={`font-semibold ${
                          result.category === "Normal weight"
                            ? "text-green-600"
                            : result.category === "Underweight"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {result.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>BMI Categories:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Underweight: BMI less than 18.5</li>
                      <li>Normal weight: BMI 18.5 to 24.9</li>
                      <li>Overweight: BMI 25 to 29.9</li>
                      <li>Obese: BMI 30 or higher</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bmr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basal Metabolic Rate (BMR) Calculator</CardTitle>
              <CardDescription>Calculate your BMR to determine your daily calorie needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="height-bmr">Height (cm)</Label>
                  <Input
                    id="height-bmr"
                    type="number"
                    placeholder="e.g., 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-bmr">Weight (kg)</Label>
                  <Input
                    id="weight-bmr"
                    type="number"
                    placeholder="e.g., 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 30"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="mr-2"
                      />
                      <Label htmlFor="male" className="cursor-pointer">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="mr-2"
                      />
                      <Label htmlFor="female" className="cursor-pointer">
                        Female
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <select
                  id="activity"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="very-active">Very Active (hard exercise daily)</option>
                </select>
              </div>

              <Button onClick={handleCalculate} className="mt-6 w-full" disabled={!height || !weight || !age}>
                Calculate BMR
              </Button>

              {result.bmr && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Your Results</h3>
                    <Flame className="h-5 w-5 text-orange-600" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">BMR:</span>
                      <span className="font-semibold">{result.bmr} calories/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TDEE:</span>
                      <span className="font-semibold">{result.tdee} calories/day</span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>What these numbers mean:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>BMR (Basal Metabolic Rate): Calories your body needs at complete rest</li>
                      <li>TDEE (Total Daily Energy Expenditure): Total calories you burn in a day</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

