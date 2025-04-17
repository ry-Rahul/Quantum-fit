"use client"

import { useEffect, useRef } from "react"

export default function CalorieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data for the chart
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const caloriesConsumed = [1950, 2100, 1850, 2000, 1900, 2200, 1850]
    const caloriesBurned = [2200, 2300, 2100, 2250, 2150, 2400, 2200]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / days.length / 3
    const barSpacing = barWidth / 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw horizontal grid lines
    const maxCalories = 3000
    const gridLines = 6
    const gridSpacing = chartHeight / gridLines

    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#94a3b8"

    for (let i = 0; i <= gridLines; i++) {
      const y = canvas.height - padding - i * gridSpacing
      const value = Math.round((i / gridLines) * maxCalories)

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.strokeStyle = "#e2e8f0"
      ctx.stroke()

      ctx.fillText(value.toString(), padding - 10, y)
    }

    // Draw bars and labels
    days.forEach((day, i) => {
      const x = padding + i * (barWidth * 3 + barSpacing)

      // Consumed calories bar
      const consumedHeight = (caloriesConsumed[i] / maxCalories) * chartHeight
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, canvas.height - padding - consumedHeight, barWidth, consumedHeight)

      // Burned calories bar
      const burnedHeight = (caloriesBurned[i] / maxCalories) * chartHeight
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(x + barWidth + barSpacing, canvas.height - padding - burnedHeight, barWidth, burnedHeight)

      // Day label
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "#64748b"
      ctx.fillText(day, x + barWidth, canvas.height - padding + 10)
    })

    // Legend
    const legendX = canvas.width - padding - 150
    const legendY = padding + 20

    // Consumed legend
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#64748b"
    ctx.fillText("Calories Consumed", legendX + 25, legendY + 7.5)

    // Burned legend
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.fillText("Calories Burned", legendX + 25, legendY + 32.5)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

