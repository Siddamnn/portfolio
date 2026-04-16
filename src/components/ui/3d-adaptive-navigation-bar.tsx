import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

const PILL_COLLAPSED_WIDTH = 140
const PILL_EXPANDED_WIDTH = 650
const SCROLL_OFFSET = 200
const TRANSITION_MS = 400
const HOVER_DELAY_MS = 100

const SHADOW_EXPANDED = `
  0 2px 4px rgba(0, 0, 0, 0.08),
  0 6px 12px rgba(0, 0, 0, 0.12),
  0 12px 24px rgba(0, 0, 0, 0.14),
  0 24px 48px rgba(0, 0, 0, 0.10),
  inset 0 2px 2px var(--pill-inset-top),
  inset 0 -3px 8px rgba(0, 0, 0, 0.12),
  inset 3px 3px 8px rgba(0, 0, 0, 0.10),
  inset -3px 3px 8px rgba(0, 0, 0, 0.09),
  inset 0 -1px 2px rgba(0, 0, 0, 0.08)`

const SHADOW_TRANSITIONING = `
  0 3px 6px rgba(0, 0, 0, 0.10),
  0 8px 16px rgba(0, 0, 0, 0.08),
  0 16px 32px rgba(0, 0, 0, 0.06),
  0 1px 2px rgba(0, 0, 0, 0.10),
  inset 0 2px 1px var(--pill-inset-top),
  inset 0 -2px 6px rgba(0, 0, 0, 0.08),
  inset 2px 2px 8px rgba(0, 0, 0, 0.06),
  inset -2px 2px 8px rgba(0, 0, 0, 0.05),
  inset 0 0 1px rgba(0, 0, 0, 0.12),
  inset 0 0 20px var(--pill-inner-glow)`

const SHADOW_DEFAULT = `
  0 3px 6px rgba(0, 0, 0, 0.12),
  0 8px 16px rgba(0, 0, 0, 0.10),
  0 16px 32px rgba(0, 0, 0, 0.08),
  0 1px 2px rgba(0, 0, 0, 0.12),
  inset 0 2px 1px var(--pill-inset-top),
  inset 0 -2px 6px rgba(0, 0, 0, 0.10),
  inset 2px 2px 8px rgba(0, 0, 0, 0.08),
  inset -2px 2px 8px rgba(0, 0, 0, 0.07),
  inset 0 0 1px rgba(0, 0, 0, 0.15)`

const TEXT_SHADOW_ACTIVE = `
  0 1px 0 rgba(0, 0, 0, 0.35),
  0 -1px 0 rgba(255, 255, 255, 0.8),
  1px 1px 0 rgba(0, 0, 0, 0.18),
  -1px 1px 0 rgba(0, 0, 0, 0.15)`

const TEXT_SHADOW_INACTIVE = `
  0 1px 0 rgba(0, 0, 0, 0.22),
  0 -1px 0 rgba(255, 255, 255, 0.65),
  1px 1px 0 rgba(0, 0, 0, 0.12),
  -1px 1px 0 rgba(0, 0, 0, 0.10)`

const TEXT_SHADOW_HOVER = `
  0 1px 0 rgba(0, 0, 0, 0.28),
  0 -1px 0 rgba(255, 255, 255, 0.72),
  1px 1px 0 rgba(0, 0, 0, 0.15),
  -1px 1px 0 rgba(0, 0, 0, 0.12)`

interface NavItem {
  label: string
  id: string
}

const navItems: NavItem[] = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'ai-projects' },
  { label: 'Poems', id: 'poems' },
  { label: 'Contact', id: 'contact' },
]

/**
 * 3D Adaptive Navigation Pill
 * Smart navigation with scroll detection and hover expansion
 */
export const PillBase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSectionRef = useRef('hero')
  const activeSectionRef = useRef('hero')

  // Spring animations for smooth motion
  const pillWidth = useSpring(PILL_COLLAPSED_WIDTH, { stiffness: 220, damping: 25, mass: 1 })
  const pillShift = useSpring(0, { stiffness: 220, damping: 25, mass: 1 })

  // Keep ref in sync so the scroll handler always sees the latest value
  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  // Scroll detection — registered once, never re-registers on section changes
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      let currentSection = navItems[0].id

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET) {
            currentSection = section.id
            break
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hover expansion
  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(PILL_EXPANDED_WIDTH)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(PILL_COLLAPSED_WIDTH)
      }, HOVER_DELAY_MS)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, pillWidth])

  const handleMouseEnter = () => {
    setHovering(true)
  }

  const handleMouseLeave = () => {
    setHovering(false)
  }

  const handleSectionClick = (sectionId: string) => {
    setIsTransitioning(true)
    prevSectionRef.current = sectionId
    setActiveSection(sectionId)

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setHovering(false)

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_MS)
  }

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  const activeItem = navItems.find(item => item.id === activeSection)

  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-full"
      style={{
        width: pillWidth,
        height: '56px',
        background: `
          linear-gradient(135deg, 
            hsl(var(--card)) 0%, 
            hsl(var(--muted)) 100%
          )
        `,
        boxShadow: expanded ? SHADOW_EXPANDED : isTransitioning ? SHADOW_TRANSITIONING : SHADOW_DEFAULT,
        x: pillShift,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {/* Primary top edge ridge */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--pill-highlight) 5%, var(--pill-highlight) 95%, transparent 100%)',
          filter: 'blur(0.3px)',
        }}
      />

      {/* Top hemisphere light catch */}
      <div
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: '55%',
          background: 'linear-gradient(180deg, var(--pill-hemisphere) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Directional light - top left */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, var(--pill-hemisphere) 0%, rgba(0,0,0,0) 65%)',
        }}
      />

      {/* Premium gloss reflection - main */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: expanded ? '18%' : '15%',
          top: '16%',
          width: expanded ? '140px' : '60px',
          height: '14px',
          background: `radial-gradient(ellipse at center, var(--pill-gloss) 0%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(4px)',
          transform: 'rotate(-12deg)',
          transition: 'all 0.3s ease',
        }}
      />
      
      {/* Secondary gloss accent - only show when expanded */}
      {expanded && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            right: '22%',
            top: '20%',
            width: '80px',
            height: '10px',
            background: `radial-gradient(ellipse at center, var(--pill-gloss) 0%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(3px)',
            transform: 'rotate(8deg)',
          }}
        />
      )}

      {/* Left edge illumination - only show when expanded */}
      {expanded && (
        <div
          className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
          style={{
            width: '35%',
            background: 'linear-gradient(90deg, var(--pill-hemisphere) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
      )}
      
      {/* Right edge shadow - only show when expanded */}
      {expanded && (
        <div 
          className="absolute inset-y-0 right-0 rounded-r-full pointer-events-none"
          style={{
            width: '35%',
            background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.02) 70%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      )}
      
      {/* Bottom curvature - deep shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Bottom edge contact shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Inner diffuse glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: `inset 0 0 40px var(--pill-inner-glow)`,
          opacity: 0.7,
        }}
      />
      
      {/* Micro edge definition */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.10)',
        }}
      />

      {/* Navigation items container */}
      <div 
        ref={containerRef}
        className="relative z-10 h-full flex items-center justify-center px-6"
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif',
        }}
      >
        {/* Collapsed state - show only active section with smooth text transitions */}
        {!expanded && (
          <div className="flex items-center relative">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  style={{
                    fontSize: '15.5px',
                    fontWeight: 680,
                    color: 'hsl(var(--primary))',
                    letterSpacing: '0.45px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textShadow: TEXT_SHADOW_ACTIVE,
                  }}
                >
                  {activeItem.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Expanded state - show all sections with stagger */}
        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection
              const isHovered = hoveredItemId === item.id && !isActive

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.25,
                    ease: 'easeOut'
                  }}
                  onClick={() => handleSectionClick(item.id)}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="relative cursor-pointer transition-all duration-200"
                  style={{
                    fontSize: isActive ? '15.5px' : '15px',
                    fontWeight: isActive ? 680 : 510,
                    color: isActive ? 'hsl(var(--primary))' : isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    textDecoration: 'none',
                    letterSpacing: '0.45px',
                    background: 'transparent',
                    border: 'none',
                    padding: '10px 16px',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    transform: isActive ? 'translateY(-1.5px)' : isHovered ? 'translateY(-0.5px)' : 'translateY(0)',
                    textShadow: isActive ? TEXT_SHADOW_ACTIVE : isHovered ? TEXT_SHADOW_HOVER : TEXT_SHADOW_INACTIVE,
                  }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.nav>
  )
}
