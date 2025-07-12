'use client';

import { useState } from 'react';
import { generatePoem, type GeneratePoemOutput } from '@/ai/flows/generate-poem';
import { summarizePoem } from '@/ai/flows/poem-summarizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, BookOpen, Quote } from 'lucide-react';

type PoemWithSummary = GeneratePoemOutput & { summary?: string; isSummaryLoading?: boolean };

export function Poems() {
  const [topic, setTopic] = useState('');
  const [poems, setPoems] = useState<PoemWithSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePoem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setIsLoading(true);
    try {
      const newPoem = await generatePoem({ topic });
      setPoems(prev => [newPoem, ...prev]);
      setTopic('');
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating poem',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizePoem = async (poemIndex: number) => {
    const poemToSummarize = poems[poemIndex];
    if (!poemToSummarize || poemToSummarize.summary) return;

    setPoems(prev => prev.map((p, i) => i === poemIndex ? { ...p, isSummaryLoading: true } : p));
    
    try {
      const { summary } = await summarizePoem({ poemText: poemToSummarize.text });
      setPoems(prev => prev.map((p, i) => i === poemIndex ? { ...p, summary, isSummaryLoading: false } : p));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error summarizing poem',
        description: 'Please try again.',
      });
      setPoems(prev => prev.map((p, i) => i === poemIndex ? { ...p, isSummaryLoading: false } : p));
    }
  };


  return (
    <section id="poems" className="py-20 lg:py-32">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-4 text-center">Sid's Starlit Verses</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Inspired by the cosmos, here are some verses generated with a little help from AI. What should I write about next?
        </p>

        <form onSubmit={handleGeneratePoem} className="flex gap-2 max-w-xl mx-auto mb-16">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'a lonely astronaut'"
            className="flex-grow text-base"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !topic} size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </form>

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
                 <Card className="mt-4 bg-secondary/50">
                  <CardContent className="p-4">
                    {poem.summary ? (
                      <p className="italic flex items-start gap-2"><Quote className="w-5 h-5 text-muted-foreground shrink-0 mt-1" /> {poem.summary}</p>
                    ) : (
                      <Button onClick={() => handleSummarizePoem(index)} disabled={poem.isSummaryLoading} size="sm">
                        {poem.isSummaryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Summarize
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {poems.length === 0 && !isLoading && (
           <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg">Your first poem is waiting to be written.</p>
          </div>
        )}
      </div>
    </section>
  );
}
