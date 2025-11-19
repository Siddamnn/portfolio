"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteLogo } from "./site-logo"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./ui/theme-toggle"
import { PillBase } from "./ui/3d-adaptive-navigation-bar"

const navLinks = [
  { href: "#about", label: "About Me" },
  { href: "#ai-projects", label: "AI Projects" },
  { href: "#frontend-projects", label: "Frontend" },
  { href: "#poems", label: "Poems" },
]

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 pointer-events-none">
      <div className="container mx-auto flex justify-between items-start relative h-full">
        {/* Logo */}
        <div className="pointer-events-auto">
            <Link href="#hero" aria-label="Back to top" onClick={() => setMobileMenuOpen(false)}>
            <SiteLogo />
            </Link>
        </div>
        
        {/* Desktop Navigation (Pill) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
            <PillBase />
        </div>

        {/* Mobile Menu & Dark Mode */}
        <div className="flex items-center gap-2 pointer-events-auto">
            <div className="hidden md:block">
                <ThemeToggle />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <nav className="flex flex-col space-y-4 mt-8">
                            {navLinks.map(({ href, label }) => (
                                <Button
                                key={href}
                                variant="ghost"
                                asChild
                                className="text-lg justify-start"
                                >
                                    <Link href={href} onClick={() => setMobileMenuOpen(false)}>{label}</Link>
                                </Button>
                            ))}
                            <Button asChild className="w-full mt-4">
                                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Me</Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  )
}
