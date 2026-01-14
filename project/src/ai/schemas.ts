import { z } from 'genkit';

export const CrisisSafeResponseInputSchema = z.object({
  message: z.string().describe('The user message to be checked for trigger words.'),
});

export const CrisisSafeResponseOutputSchema = z.object({
  response: z.string().describe('The AI response, including crisis resources if trigger words are detected.'),
});

export const TherapistStyleChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  sessionHistory: z.array(z.object({role: z.enum(['user', 'assistant']), content: z.string()})).optional().describe('The history of the conversation.'),
});

export const TherapistStyleChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
