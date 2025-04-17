import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Droplet, TrendingUp, Utensils } from "lucide-react"
import WaterIntakeTracker from "@/components/water-intake-tracker"
import CalorieChart from "@/components/calorie-chart"
import WorkoutSummary from "@/components/workout-summary"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850 / 2,200</div>
            <Progress value={84} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">350 calories remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 / 2.5 L</div>
            <Progress value={72} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">700ml remaining today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 / 60 min</div>
            <Progress value={75} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">15 minutes remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Weight loss: -0.8kg this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your fitness journey for the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CalorieChart />
              </CardContent>
            </Card>

            <Card className="row-span-2">
              <CardHeader>
                <CardTitle>Water Intake</CardTitle>
                <CardDescription>Track your hydration throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterIntakeTracker />
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Today's Workout</CardTitle>
                <CardDescription>Upper Body Strength - 45 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkoutSummary />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal Plan</CardTitle>
              <CardDescription>Your AI-generated meal plan for today</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nutrition content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout Library</CardTitle>
              <CardDescription>Browse and select your workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Workout content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Progress content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

