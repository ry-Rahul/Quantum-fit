"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Brain,
  LayoutDashboard,
  Utensils,
  Dumbbell,
  Droplet,
  BarChart,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Meal Planner",
      href: "/dashboard/meals",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      title: "Workouts",
      href: "/dashboard/workouts",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      title: "Water Tracker",
      href: "/dashboard/water",
      icon: <Droplet className="h-5 w-5" />,
    },
    {
      title: "BMI Calculator",
      href: "/dashboard/bmi",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "AI Assistant",
      href: "/dashboard/assistant",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <Brain className="h-6 w-6 text-blue-600" />
          {!collapsed && <span className="font-bold">QuantumFit AI</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                collapsed && "justify-center",
              )}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className={cn("flex items-center", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">JD</div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

