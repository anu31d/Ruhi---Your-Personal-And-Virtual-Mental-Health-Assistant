'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting trigger words in user messages and providing crisis support resources.
 *
 * - crisisSafeResponse - A function that processes user input and returns a safe response with crisis resources if needed.
 * - CrisisSafeResponseInput - The input type for the crisisSafeResponse function.
 * - CrisisSafeResponseOutput - The return type for the crisisSafeResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { CrisisSafeResponseInputSchema, CrisisSafeResponseOutputSchema } from '@/ai/schemas';

export type CrisisSafeResponseInput = z.infer<typeof CrisisSafeResponseInputSchema>;
export type CrisisSafeResponseOutput = z.infer<typeof CrisisSafeResponseOutputSchema>;

export async function crisisSafeResponse(input: CrisisSafeResponseInput): Promise<CrisisSafeResponseOutput> {
  return crisisSafeResponseFlow(input);
}

const crisisSafePrompt = ai.definePrompt({
  name: 'crisisSafePrompt',
  input: {schema: CrisisSafeResponseInputSchema},
  output: {schema: CrisisSafeResponseOutputSchema},
  prompt: `You are an AI assistant designed to detect potential crisis situations in user messages and provide appropriate resources.

  If the user's message contains trigger words related to suicide, self-harm, or severe distress, respond with a message that includes the suicide prevention hotline number and encourages the user to seek help.
  Do not provide a recommendation, but include a call to action, or encourage the user to take specific actions.

  If no trigger words are detected, respond with a supportive and empathetic message.

  User Message: {{{message}}}

  Example trigger words: suicide, kill myself, I want to die, overdose, self-harm, cutting, hopeless, worthless

  CRISIS_HOTLINE: "You can call the Suicide Prevention Lifeline at 988."
  `,
});

const crisisSafeResponseFlow = ai.defineFlow(
  {
    name: 'crisisSafeResponseFlow',
    inputSchema: CrisisSafeResponseInputSchema,
    outputSchema: CrisisSafeResponseOutputSchema,
  },
  async input => {
    const {output} = await crisisSafePrompt(input);
    return output!;
  }
);
