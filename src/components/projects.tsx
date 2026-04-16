"use client"

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from 'lucide-react'

export type Project = {
  title: string
  description: string
  svgBackground?: ReactNode
  tags: string[]
  liveUrl?: string
  repoUrl?: string
}

type ProjectsProps = {
  id: string
  title: string
  projects: Project[]
}

function ProjectRow({
  project,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  project: Project
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}) {
  const isHovered = hoveredIndex === index
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
    >
      <motion.div
        className="relative border-b border-primary/15 overflow-hidden cursor-pointer"
        onHoverStart={() => setHoveredIndex(index)}
        onHoverEnd={() => setHoveredIndex(null)}
        animate={{ opacity: isOtherHovered ? 0.2 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute left-0 inset-y-0 bg-primary z-20"
          animate={{ width: isHovered ? '3px' : '0px' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute inset-0 z-0"
          animate={{ clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {project.svgBackground}
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/65 to-background/88" />
        </motion.div>

        <div className="relative z-10 flex items-center gap-6 lg:gap-10 px-8 lg:px-10 py-8 lg:py-10">
          <span className="font-mono text-xs font-bold text-primary/40 w-8 shrink-0 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex-1 min-w-0">
            <motion.h3
              className="font-headline font-bold text-foreground leading-none text-2xl lg:text-4xl"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {project.title}
            </motion.h3>
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  key="desc"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-sm text-muted-foreground max-w-lg overflow-hidden"
                >
                  {project.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex gap-2 flex-wrap justify-end shrink-0 max-w-xs">
            {project.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs font-mono">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            )}
            <motion.span
              className="text-primary text-lg select-none"
              animate={{ x: isHovered ? 6 : 0, opacity: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects({ id, title, projects }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id={id} className="py-20 lg:py-32">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-12 px-8 lg:px-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>
        <div className="border-t border-primary/15">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
