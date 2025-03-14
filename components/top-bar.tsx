"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Chrome, Code, Settings, HelpCircle, User, Moon, Sun, PlayCircle } from "lucide-react"
import { useTheme } from "next-themes"

export default function TopBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
    // Set light theme as default if not already set
    if (!theme) {
      setTheme("light")
    }
  }, [theme, setTheme])

  return (
    <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Chrome className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">Selenium Flow Builder</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <PlayCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Code className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </Button>

            <Button variant="outline" size="sm" className="ml-2">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

