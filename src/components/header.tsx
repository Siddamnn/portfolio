"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteLogo } from "./site-logo"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { DarkModeToggle } from "./dark-mode-toggle"

const navLinks = [
  { href: "#about", label: "About Me" },
  { href: "#ai-projects", label: "AI Projects" },
  { href: "#blockchain-projects", label: "Blockchain" },
  { href: "#frontend-projects", label: "Frontend" },
  { href: "#poems", label: "Poems" },
]

export function Header() {
  const [isSticky, setSticky] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = window.innerHeight * 0.9;
      setSticky(window.scrollY > heroSectionHeight)
      
      const sections = navLinks.map(link => document.querySelector(link.href))
      let currentSection = ""
      sections.forEach(section => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop
          if (window.scrollY >= sectionTop - 100) {
            currentSection = section.id
          }
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isSticky ? "py-3 bg-background/80 backdrop-blur-lg shadow-md" : "py-6 -translate-y-full opacity-0"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#hero" aria-label="Back to top" onClick={() => setMobileMenuOpen(false)}>
          <SiteLogo />
        </Link>
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(({ href, label }) => (
            <Button
              key={href}
              variant="link"
              asChild
              className={cn(
                "text-base font-medium transition-colors",
                activeSection === href.substring(1)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          <Button asChild className="ml-4">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <DarkModeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle />
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
                            className={cn(
                                "text-lg justify-start",
                                activeSection === href.substring(1) && "bg-accent"
                            )}
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
    </header>
  )
}
