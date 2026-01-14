// This file is intended for server-side actions.
// Since this is a static export, these functions will not work.
// You would need to host this on a platform with a Node.js environment.

// 'use server';

// import { therapistStyleChatbot, type TherapistStyleChatbotInput } from '@/ai/flows/therapist-style-chatbot';

// export async function generateChatResponse(input: TherapistStyleChatbotInput) {
//   try {
//     // Add your API call here
//     const output = await therapistStyleChatbot(input);
//     return { success: true, response: output.response };
//   } catch (error) {
//     console.error('AI chat error:', error);
//     return { success: false, error: 'I am having trouble responding right now. Please try again later.' };
//   }
// }
'use client';
import { type TherapistStyleChatbotInput } from '@/ai/flows/therapist-style-chatbot';

export async function generateChatResponse(input: TherapistStyleChatbotInput) {
  console.log("Static site - AI response generation is disabled.", input);
  return new Promise(resolve => {
    setTimeout(() => {
        resolve({ success: true, response: "This is a static version of RUHI. Chat functionality is not available, but I'm here to listen." });
    }, 500);
  });
}
