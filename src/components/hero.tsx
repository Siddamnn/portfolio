"use client"

import { useRef } from "react"
import Image from 'next/image'
import { SiteLogo } from "./site-logo"
import { useScroll, useTransform, motion } from "framer-motion"
import CurvedLoop from "@/components/ui/curved-loop"

export function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src='/bg.png'
          alt="LA city lights"
          fill
          sizes="100vw"
          className="object-cover opacity-30 dark:opacity-50"
          priority
          data-ai-hint="los angeles skyline night"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>
      <div className="z-10 text-center px-4 w-full">
        <SiteLogo className="text-8xl md:text-9xl lg:text-[10rem] drop-shadow-xl mx-auto" />
        <div className="mt-4 w-full">
            <CurvedLoop 
                marqueeText="Welcome to Sid's ✦ "
                speed={0.5}
                curveAmount={50}
                interactive={true}
                className="fill-foreground/80 text-[3rem]"
            />
        </div>
      </div>
    </section>
  )
}
