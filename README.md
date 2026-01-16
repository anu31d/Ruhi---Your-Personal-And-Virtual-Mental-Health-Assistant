# RUHI - Your Personal AI Mental Health Companion

An AI-powered mental health assistant that provides empathetic, accessible, and non-judgmental emotional support anytime, anywhere. Built with Next.js and Firebase.

---

## 1. Live Demo / Video / Screenshots

**Live Demo:** [Coming Soon]

**Local Development:** `http://localhost:9002`

Screenshots showcasing RUHI's interface and interactions are available in the `screenshots/` folder of this repository.

---

## 2. Problem Statement

### AI for Mental Health Screening and Intervention

Mental health challenges such as stress, anxiety, and emotional distress are increasingly prevalent in today's fast-paced world. However:

- Access to affordable and timely mental health support is limited  
- Social stigma prevents individuals from seeking help  
- Traditional mental health services are not always available 24/7  

### Why This Matters

- Suicide is among the leading causes of death among young adults  
- Millions of individuals silently struggle with mental health challenges each year  

There is an urgent need for accessible, stigma-free, and immediate mental health support.

---

## 3. Solution Overview

RUHI is an AI-powered conversational assistant designed to bridge the mental health accessibility gap by providing:

- A safe, non-judgmental space for users to express emotions  
- Empathetic, AI-driven responses powered by Google Gemini  
- Continuous availability without fear of stigma  
- Evidence-based mental wellness tools and exercises  

RUHI is not a replacement for professional therapy, but a supportive first step toward emotional well-being and mindfulness.

---

## 4. Key Features

### 🤖 AI-Powered Chatbot
- Real-time conversations with empathetic, therapist-style responses
- Powered by AI
- Context-aware responses with background knowledge retrieval
- Crisis-safe responses with trigger word detection
- Suicide prevention hotline resources when needed

### 🧘 Wellness Tools
- **Guided Breathing Exercises**: Animated breathing exercises with visual timers and calming UI
- **Mindfulness Prompts**: Short guided mindfulness sessions and daily affirmations
- **Mood Check-In**: Track your emotional state over time
- **Personal Diary**: Private journaling space for self-reflection
- **Activities Dashboard**: Centralized access to all wellness features

### 🔐 Secure Authentication
- Firebase Authentication with email/password and Google OAuth
- Privacy-focused session management
- Secure user data storage with Firestore

### 🎨 Calming Design
- Soft lavender and muted blue color palette
- Gentle animations and micro-interactions with Framer Motion
- Responsive design built with Tailwind CSS and shadcn/ui components
- Accessibility-focused interface

---

## 5. Tech Stack

### Frontend
- **Framework:** Next.js 15.5.9 (with Turbopack)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS with shadcn/ui components
- **Animations:** Framer Motion
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts

### Backend & AI
- **AI Framework:** Google Genkit 1.20.0
- **AI Model:** Google Gemini (via @genkit-ai/google-genai)
- **Authentication:** Firebase Auth
- **Database:** Cloud Firestore
- **API Routes:** Next.js App Router API

### Development Tools
- TypeScript
- ESLint
- PostCSS

---

## 6. Architecture Overview

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐  ┌──▼────────┐
│Firebase│  │ Genkit AI │
│ Auth & │  │  Flows    │
│Firestore│  │ (Gemini)  │
└────────┘  └───────────┘
```

The application follows a modern JAMstack architecture:
- Next.js handles routing, server-side rendering, and API routes
- Firebase provides authentication and real-time database
- Genkit AI flows process chat interactions with context-aware responses
- All data flows securely with privacy-focused design

---

## 7. Project Structure

```
project/
├── src/
│   ├── ai/                    # Genkit AI flows and configuration
│   │   ├── flows/
│   │   │   ├── crisis-safe-responses.ts
│   │   │   └── therapist-style-chatbot.ts
│   │   ├── genkit.ts
│   │   └── schemas.ts
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/
│   │   ├── activities/
│   │   ├── breathing/
│   │   ├── dashboard/
│   │   ├── diary/
│   │   ├── login/
│   │   ├── mindfulness/
│   │   ├── mood-check/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── chatbot.tsx
│   │   └── header.tsx
│   ├── context/              # React Context providers
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and configurations
└── docs/                     # Project documentation
```

---

## 8. Features Deep Dive

### AI Chatbot
The chatbot uses Google's Gemini AI through Genkit flows:
- **Therapist-Style Responses**: Trained to provide empathetic, non-judgmental support
- **Crisis Detection**: Automatically detects crisis keywords and provides appropriate resources
- **Context Awareness**: Maintains conversation context for more meaningful interactions

### Wellness Activities
- **Breathing Exercises**: Box breathing, 4-7-8 technique, and more
- **Mindfulness**: Guided meditation prompts and grounding exercises
- **Mood Tracking**: Visual mood history with charts
- **Diary**: Encrypted personal journal entries

### Privacy & Security
- All authentication handled by Firebase
- User data stored securely in Firestore
- No third-party analytics or tracking
- Private conversations (not stored or analyzed)

---

## 9. Results & Impact

- Successfully developed and deployed an AI-based mental health assistant  
- Empathetic AI responses powered by state-of-the-art Google Gemini model  
- Comprehensive wellness toolkit with breathing, mindfulness, and mood tracking  
- Crisis-safe design with suicide prevention resources  
- Privacy-first architecture protecting user data  

---

## 10. Future Roadmap

- [ ] Multi-language support for global accessibility
- [ ] Voice interaction capabilities
- [ ] Integration with wearable devices for wellness data
- [ ] Professional therapist referral system
- [ ] Community support groups (moderated)
- [ ] Progressive Web App (PWA) for mobile devices

---

## 11. Contributing

This project is currently maintained privately. For collaboration inquiries, please reach out to the project maintainers.

---

## 12. License

This project is licensed under the terms specified in the LICENSE file.

---

## 13. Acknowledgments

- Firebase for authentication and database services
- shadcn/ui for beautiful, accessible components
- The mental health community for inspiring this work

---

## Final Note

When we are alone, hope can be hard to find.  
But when we stand together, hope is all around us.

RUHI represents a step toward a future where seeking help is strength, not stigma.

**If you or someone you know is in crisis, please call:**
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
