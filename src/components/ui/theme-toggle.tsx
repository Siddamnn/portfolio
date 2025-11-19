"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("w-16 h-8 rounded-full bg-muted", className)} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full relative">
        <motion.div
          className="flex justify-center items-center w-6 h-6 rounded-full z-10"
          animate={{
            x: isDark ? 0 : 32,
            backgroundColor: isDark ? "#27272a" : "#e5e7eb" // zinc-800 : gray-200
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          )}
        </motion.div>

        <motion.div
          className="flex justify-center items-center w-6 h-6 rounded-full absolute right-0"
          animate={{
            x: isDark ? 0 : -32,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
