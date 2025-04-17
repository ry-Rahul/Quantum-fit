"use client"

import { useState } from "react"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardHeader() {
  const isMobile = useMobile()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Workout Reminder</p>
                <p className="text-xs text-gray-500">Your scheduled workout starts in 30 minutes</p>
                <p className="text-xs text-gray-400">10 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Water Intake</p>
                <p className="text-xs text-gray-500">You're behind on your water intake goal</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Goal Achieved!</p>
                <p className="text-xs text-gray-500">You've reached your daily step goal</p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">JD</div>
      </div>
    </header>
  )
}

