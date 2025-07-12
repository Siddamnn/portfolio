"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'
import { SiteLogo } from "./site-logo"

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
          className="object-cover opacity-30 dark:opacity-50"
          priority
          data-ai-hint="los angeles skyline night"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      <div className="z-10 text-center px-4">
        <SiteLogo className="text-8xl md:text-9xl lg:text-[10rem] drop-shadow-xl" />
        <p className="mt-2 text-xl md:text-2xl text-foreground/80 drop-shadow-md">Welcome to Sid&apos;s</p>
      </div>
    </section>
  )
}
