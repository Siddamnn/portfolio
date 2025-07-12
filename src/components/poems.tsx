'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Sparkles } from 'lucide-react';

export type Poem = {
  title: string;
  text: string;
};

type PoemsProps = {
  poems: Poem[];
}

export function Poems({ poems }: PoemsProps) {
  return (
    <section id="poems" className="py-20 lg:py-32">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-4 text-center">Sid's Starlit Verses</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          A collection of verses penned under the neon glow of city lights and starlit skies.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left h-full">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3"><BookOpen className="text-primary mt-1 shrink-0" /> <span>{poem.title}</span></CardTitle>
                    <CardDescription>Click to read the full poem</CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">{poem.title}</DialogTitle>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-4 text-foreground/90 space-y-3 py-4">
                  {poem.text.split('\n').map((line, i) => (
                    <p key={i}>{line || '\u00A0'}</p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {poems.length === 0 && (
           <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg">The poetry collection is currently empty.</p>
          </div>
        )}
      </div>
    </section>
  );
}
