import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Link as LinkIcon } from 'lucide-react'

export type Project = {
  title: string
  description: string
  imageUrl: string
  imageHint: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  techIcon?: React.ReactNode
}

type ProjectsProps = {
  id: string
  title: string
  projects: Project[]
}

export function Projects({ id, title, projects }: ProjectsProps) {
  return (
    <section id={id} className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-12 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="flex justify-between items-start mb-2">
                  <span>{project.title}</span>
                  {project.techIcon}
                </CardTitle>
                <CardDescription className="flex-grow">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </div>
              <CardFooter className="flex gap-2 bg-muted/50 p-4">
                {project.liveUrl && (
                  <Button asChild className="flex-1">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
