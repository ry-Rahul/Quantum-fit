import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Droplet, Brain, Utensils, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Brain className="h-8 w-8" />
              <span>QuantumFit AI</span>
            </div>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white/20">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-blue-600 hover:bg-white/90">Sign Up</Button>
              </Link>
            </div>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your AI-Powered Fitness Journey Starts Here
              </h1>
              <p className="text-xl opacity-90">
                QuantumFit AI provides personalized workout plans, meal tracking, and real-time fitness insights to help
                you achieve your health goals.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Fitness tracking dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Key Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Diet Profile</h3>
              <p className="text-gray-600">
                Get AI-generated meal plans tailored to your fitness goals and dietary preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <Dumbbell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal-Oriented Fitness Tracking</h3>
              <p className="text-gray-600">Set specific fitness goals and monitor progress with milestone tracking.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <Utensils className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Meal Planner</h3>
              <p className="text-gray-600">
                Receive personalized meal recommendations and track calorie intake easily.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-cyan-100 p-3 rounded-full w-fit mb-4">
                <Droplet className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Intake Monitoring</h3>
              <p className="text-gray-600">
                Keep track of your daily hydration levels with reminders throughout the day.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">BMR & BMI Calculator</h3>
              <p className="text-gray-600">
                Calculate your Basal Metabolic Rate and Body Mass Index to understand your body type.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-red-100 p-3 rounded-full w-fit mb-4">
                <Brain className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Chatbot for Fitness Guidance</h3>
              <p className="text-gray-600">
                Get real-time workout guidance and personalized fitness insights from our AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already achieved their fitness goals with QuantumFit AI.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
              <Brain className="h-6 w-6" />
              <span>QuantumFit AI</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} QuantumFit AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

