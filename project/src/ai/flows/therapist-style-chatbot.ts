'use server';

/**
 * @fileOverview An AI-powered chatbot that emulates a therapist, providing empathetic and non-judgmental support.
 *
 * - therapistStyleChatbot - A function that handles the chatbot interaction.
 * - TherapistStyleChatbotInput - The input type for the therapistStyleChatbot function.
 * - TherapistStyleChatbotOutput - The return type for the therapistStyleChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { crisisSafeResponse, type CrisisSafeResponseInput } from './crisis-safe-responses';
import { TherapistStyleChatbotInputSchema, TherapistStyleChatbotOutputSchema, CrisisSafeResponseInputSchema, CrisisSafeResponseOutputSchema } from '@/ai/schemas';


export type TherapistStyleChatbotInput = z.infer<typeof TherapistStyleChatbotInputSchema>;
export type TherapistStyleChatbotOutput = z.infer<typeof TherapistStyleChatbotOutputSchema>;

export async function therapistStyleChatbot(input: TherapistStyleChatbotInput): Promise<TherapistStyleChatbotOutput> {
  return therapistStyleChatbotFlow(input);
}

const crisisSafeResponseTool = ai.defineTool({
  name: 'crisisSafeResponse',
  description: "Detects trigger words and offers resources, such as the suicide prevention hotline number. Use this tool if the user's message contains any indication of suicide, self-harm, or severe emotional distress.",
  inputSchema: CrisisSafeResponseInputSchema,
  outputSchema: CrisisSafeResponseOutputSchema,
}, async (input: CrisisSafeResponseInput) => {
    return await crisisSafeResponse(input);
});

const therapistStyleChatbotPrompt = ai.definePrompt({
  name: 'therapistStyleChatbotPrompt',
  input: {schema: TherapistStyleChatbotInputSchema},
  output: {schema: TherapistStyleChatbotOutputSchema},
  tools: [crisisSafeResponseTool],
  prompt: `You are RUHI, a therapist-style AI chatbot. Your goal is to provide a safe, empathetic, and non-judgmental space for users to express their feelings.
- Listen actively and reflect on what the user is saying.
- Validate their emotions.
- Ask gentle, open-ended questions to encourage deeper reflection.
- **Do not give advice, diagnoses, or medical opinions.** You are a supportive listener, not a clinician.
- If the user's message contains any language related to suicide, self-harm, or immediate crisis, you **must** use the \`crisisSafeResponse\` tool. For all other messages, respond conversationally.

Conversation History:
{{#each sessionHistory}}
- {{this.role}}: {{this.content}}
{{/each}}

New User Message: {{message}}

Your Response:
`,
  config: {
    temperature: 0.7,
  },
});

const therapistStyleChatbotFlow = ai.defineFlow({
    name: 'therapistStyleChatbotFlow',
    inputSchema: TherapistStyleChatbotInputSchema,
    outputSchema: TherapistStyleChatbotOutputSchema,
  },
  async (input) => {
    let promptResponse = await therapistStyleChatbotPrompt(input);
    
    while(true) {
        const toolRequest = promptResponse.toolRequest();
        if (!toolRequest) {
            break;
        }
        const toolOutput = await toolRequest.run();
        promptResponse = await promptResponse.continue(toolOutput);
    }
    
    const output = promptResponse.output();
    if (!output) {
      return { response: "I'm sorry, I'm having a little trouble understanding. Could you please rephrase?" };
    }
    return output;
  }
);
