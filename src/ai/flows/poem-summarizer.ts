'use server';

/**
 * @fileOverview A poem summarization AI agent.
 *
 * - summarizePoem - A function that handles the poem summarization process.
 * - SummarizePoemInput - The input type for the summarizePoem function.
 * - SummarizePoemOutput - The return type for the summarizePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePoemInputSchema = z.object({
  poemText: z.string().describe('The text of the poem to summarize.'),
});
export type SummarizePoemInput = z.infer<typeof SummarizePoemInputSchema>;

const SummarizePoemOutputSchema = z.object({
  summary: z.string().describe('A one-sentence summary of the poem.'),
});
export type SummarizePoemOutput = z.infer<typeof SummarizePoemOutputSchema>;

export async function summarizePoem(input: SummarizePoemInput): Promise<SummarizePoemOutput> {
  return summarizePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePoemPrompt',
  input: {schema: SummarizePoemInputSchema},
  output: {schema: SummarizePoemOutputSchema},
  prompt: `Summarize the following poem in one sentence:\n\n{{{poemText}}}`,
});

const summarizePoemFlow = ai.defineFlow(
  {
    name: 'summarizePoemFlow',
    inputSchema: SummarizePoemInputSchema,
    outputSchema: SummarizePoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
