"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { HoverButton } from '@/components/ui/hover-button'
import { cn } from '@/lib/utils'

interface BackgroundMusicProps {
  src: string
  className?: string
}

export function BackgroundMusic({ src, className }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set volume to 30% and enable looping
    audio.volume = 0.3
    audio.loop = true

    // Auto-play when component mounts
    const playAudio = async () => {
      try {
        await audio.play()
      } catch {
        // Autoplay prevented by browser policy - user needs to interact first
        setIsPlaying(false)
      }
    }

    playAudio()

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        await audio.pause()
      } else {
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <HoverButton
        onClick={togglePlay}
        className={cn(
          "fixed bottom-4 right-4 z-50 h-12 w-12 p-0 rounded-full",
          "bg-background/90 backdrop-blur-sm border border-border shadow-lg",
          "hover:bg-[#f59e0b]/10 transition-all duration-300",
          className
        )}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-[#f59e0b]" />
        ) : (
          <Play className="h-5 w-5 text-[#f59e0b]" />
        )}
      </HoverButton>
    </>
  )
}
