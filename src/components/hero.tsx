"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="LA city lights"
          fill
          className="object-cover opacity-30"
          priority
          data-ai-hint="los angeles skyline night"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      <div className="z-10 text-center px-4">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold text-foreground drop-shadow-lg">
          Welcome to Sid&apos;s
        </h1>
      </div>
    </section>
  )
}
