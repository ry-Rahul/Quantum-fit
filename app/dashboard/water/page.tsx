"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Droplet,
  Plus,
  Minus,
  Calendar,
  Clock,
  BarChart,
  Bell,
  Settings,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WaterTrackerPage() {
  const [waterIntake, setWaterIntake] = useState(1.8);
  const [waterGoal, setWaterGoal] = useState(2.5);
  const [waterHistory, setWaterHistory] = useState([
    { date: "Today", intake: 1.8, goal: 2.5, percentage: 72 },
    { date: "Yesterday", intake: 2.3, goal: 2.5, percentage: 92 },
    { date: "2 days ago", intake: 2.1, goal: 2.5, percentage: 84 },
    { date: "3 days ago", intake: 1.9, goal: 2.5, percentage: 76 },
    { date: "4 days ago", intake: 2.5, goal: 2.5, percentage: 100 },
    { date: "5 days ago", intake: 2.2, goal: 2.5, percentage: 88 },
    { date: "6 days ago", intake: 1.7, goal: 2.5, percentage: 68 },
  ]);
  const [reminders, setReminders] = useState([
    { id: 1, time: "08:00", enabled: true },
    { id: 2, time: "10:30", enabled: true },
    { id: 3, time: "13:00", enabled: true },
    { id: 4, time: "15:30", enabled: true },
    { id: 5, time: "18:00", enabled: true },
    { id: 6, time: "20:30", enabled: false },
  ]);

  const percentage = Math.min(Math.round((waterIntake / waterGoal) * 100), 100);

  const addWater = (amount: number) => {
    setWaterIntake((prev) => Math.min(prev + amount, waterGoal));
  };

  const removeWater = (amount: number) => {
    setWaterIntake((prev) => Math.max(prev - amount, 0));
  };

  const resetWater = () => {
    setWaterIntake(0);
  };

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  // Weekly stats calculation
  const weeklyAverage =
    waterHistory.reduce((sum, day) => sum + day.intake, 0) /
    waterHistory.length;
  const bestDay = [...waterHistory].sort(
    (a, b) => b.percentage - a.percentage
  )[0];
  const totalWeeklyIntake = waterHistory.reduce(
    (sum, day) => sum + day.intake,
    0
  );

  // Time of last drink (simulated)
  const [lastDrinkTime, setLastDrinkTime] = useState("10:45 AM");

  // Update last drink time when adding water
  useEffect(() => {
    const updateLastDrinkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setLastDrinkTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    // Only update if water is added
    if (waterIntake > 0) {
      updateLastDrinkTime();
    }
  }, [waterIntake]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Water Tracker</h1>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        {/* Today's Water Intake Tab */}
        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Water Tracker */}
            <Card className="md:row-span-2">
              <CardHeader>
                <CardTitle>Today's Water Intake</CardTitle>
                <CardDescription>
                  Track your hydration throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-b-full transition-all duration-500 ease-in-out"
                    style={{ height: `${percentage}%`, opacity: 0.8 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <Droplet className="h-12 w-12 text-blue-500" />
                    <span className="text-3xl font-bold mt-2">
                      {waterIntake.toFixed(1)}L
                    </span>
                    <span className="text-lg text-gray-500">{percentage}%</span>
                  </div>
                </div>

                <div className="w-full space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {waterIntake.toFixed(1)}L / {waterGoal}L
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.1)}
                    className="flex flex-col items-center py-3"
                  >
                    <span className="text-lg font-medium">+100</span>
                    <span className="text-xs">ml</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.25)}
                    className="flex flex-col items-center py-3"
                  >
                    <span className="text-lg font-medium">+250</span>
                    <span className="text-xs">ml</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.5)}
                    className="flex flex-col items-center py-3"
                  >
                    <span className="text-lg font-medium">+500</span>
                    <span className="text-xs">ml</span>
                  </Button>
                </div>

                <div className="flex gap-2 w-full mt-3">
                  <Button
                    variant="outline"
                    onClick={() => removeWater(0.1)}
                    className="flex items-center justify-center flex-1"
                  >
                    <Minus className="h-4 w-4 mr-1" />
                    100ml
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={resetWater}
                    className="flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Water Intake Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Intake Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Droplet className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Daily Goal</p>
                        <p className="text-sm text-gray-500">
                          Recommended amount
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">{waterGoal}L</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Last Drink</p>
                        <p className="text-sm text-gray-500">
                          Time of last intake
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">{lastDrinkTime}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Remaining</p>
                        <p className="text-sm text-gray-500">
                          To reach daily goal
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">
                      {(waterGoal - waterIntake).toFixed(1)}L
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Add Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
                <CardDescription>
                  Common drink sizes for quick tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.2)}
                    className="flex justify-between items-center h-auto py-3"
                  >
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Glass</span>
                    </div>
                    <span className="text-gray-500">200ml</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.33)}
                    className="flex justify-between items-center h-auto py-3"
                  >
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Can</span>
                    </div>
                    <span className="text-gray-500">330ml</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.5)}
                    className="flex justify-between items-center h-auto py-3"
                  >
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Bottle</span>
                    </div>
                    <span className="text-gray-500">500ml</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWater(0.75)}
                    className="flex justify-between items-center h-auto py-3"
                  >
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Large Bottle</span>
                    </div>
                    <span className="text-gray-500">750ml</span>
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full mt-3">
                      <Settings className="h-4 w-4 mr-2" /> Customize Presets
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit Presets</DropdownMenuItem>
                    <DropdownMenuItem>Add New Preset</DropdownMenuItem>
                    <DropdownMenuItem>Reset to Default</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Intake History</CardTitle>
              <CardDescription>
                Your hydration records for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterHistory.map((day, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 font-medium">{day.date}</div>
                    <div className="flex-1 mx-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {day.intake.toFixed(1)}L / {day.goal}L
                        </span>
                        <span>{day.percentage}%</span>
                      </div>
                      <Progress value={day.percentage} className="h-2" />
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        day.percentage >= 100
                          ? "text-green-600"
                          : day.percentage >= 75
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {day.percentage >= 100
                        ? "Completed"
                        : day.percentage >= 75
                        ? "Good"
                        : "Low"}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                View Full History
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Statistics</CardTitle>
                <CardDescription>
                  Your hydration performance this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border rounded-lg bg-gray-50 mb-6">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Water intake chart</p>
                    <p className="text-sm text-gray-400">
                      (Chart will be displayed here)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Droplet className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="font-medium">Weekly Average</p>
                    </div>
                    <p className="font-bold">{weeklyAverage.toFixed(1)}L</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="font-medium">Best Day</p>
                    </div>
                    <p className="font-bold">
                      {bestDay.date} ({bestDay.intake}L)
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <BarChart className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="font-medium">Total Weekly Intake</p>
                    </div>
                    <p className="font-bold">{totalWeeklyIntake.toFixed(1)}L</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hydration Insights</CardTitle>
                <CardDescription>
                  Personalized recommendations based on your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-700 mb-2">
                      Consistency
                    </h3>
                    <p className="text-sm text-blue-600">
                      You're maintaining good hydration consistency. Try to
                      drink water at regular intervals throughout the day for
                      optimal hydration.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-700 mb-2">
                      Goal Achievement
                    </h3>
                    <p className="text-sm text-green-600">
                      You've reached your daily goal 3 out of 7 days this week.
                      Keep up the good work and aim for at least 5 days next
                      week.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-700 mb-2">
                      Morning Hydration
                    </h3>
                    <p className="text-sm text-yellow-600">
                      Your data shows you drink less water in the mornings. Try
                      having a glass of water right after waking up to boost
                      your hydration.
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6">Get Personalized Plan</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reminders Tab */}
        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hydration Reminders</CardTitle>
              <CardDescription>
                Set up reminders to stay hydrated throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          reminder.enabled ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <Bell
                          className={`h-5 w-5 ${
                            reminder.enabled ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">Drink Water</p>
                        <p className="text-sm text-gray-500">{reminder.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={reminder.enabled}
                          onChange={() => toggleReminder(reminder.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add New Reminder
                </Button>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">
                    Reminder Tips
                  </h3>
                  <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
                    <li>Set reminders every 2-3 hours during waking hours</li>
                    <li>Drink a glass of water with each meal</li>
                    <li>
                      Keep a water bottle visible at your desk or workspace
                    </li>
                    <li>Drink a glass of water before and after exercise</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
