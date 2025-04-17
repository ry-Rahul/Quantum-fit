"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Send, User } from "lucide-react"

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your QuantumFit AI assistant. How can I help with your fitness journey today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, you would use your API key
      // This is a simulated response for demo purposes
      const prompt = `
        You are a fitness and nutrition assistant for QuantumFit AI.
        Help the user with their fitness journey, provide workout advice, nutrition tips, and motivation.
        Be concise, supportive, and knowledgeable.
        
        User query: ${input}
      `

      // Simulate AI response
      setTimeout(async () => {
        let response
        try {
          // This would use the AI SDK in a real implementation
          // const { text } = await generateText({
          //   model: openai("gpt-4o"),
          //   prompt: prompt
          // });
          // response = text;

          // For demo purposes, we'll use predefined responses
          const responses = [
            "Great question! For weight loss, focus on a calorie deficit through a balanced diet and regular exercise. Aim for 150+ minutes of cardio weekly, plus strength training 2-3 times a week.",
            "I recommend tracking your water intake throughout the day. For your body weight, aim for about 2.5-3 liters daily. Set reminders on your phone to help you stay consistent.",
            "Based on your goals, I'd suggest a protein intake of 1.6-1.8g per kg of body weight. Focus on lean sources like chicken, fish, tofu, and legumes spread throughout your meals.",
            "For muscle recovery, ensure you're getting 7-9 hours of quality sleep, staying hydrated, and consuming protein within 30 minutes after your workout. Active recovery days are also important!",
          ]
          response = responses[Math.floor(Math.random() * responses.length)]
        } catch (error) {
          response = "I'm having trouble connecting right now. Please try again later."
        }

        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again later.",
        },
      ])
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>

      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="flex items-center text-lg">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            QuantumFit AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === "user" ? (
                        <>
                          <span className="font-medium">You</span>
                          <User className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">QuantumFit AI</span>
                        </>
                      )}
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                    <div className="flex items-center mb-1">
                      <Brain className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="font-medium">QuantumFit AI</span>
                    </div>
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about workouts, nutrition, or fitness goals..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Suggested Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "What's the best workout for weight loss?",
            "How much water should I drink daily?",
            "How much protein do I need for muscle building?",
            "Tips for faster muscle recovery?",
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-3 px-4 text-left"
              onClick={() => {
                setInput(question)
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

