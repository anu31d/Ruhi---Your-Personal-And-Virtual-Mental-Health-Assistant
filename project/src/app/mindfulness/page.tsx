'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { affirmations } from '@/lib/affirmations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Clock, BookOpen, Music, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function getRandomItem<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

const activities = [
    {
        icon: Clock,
        title: "1-Minute Reset",
        description: "Close your eyes. Take three deep breaths. Notice how you feel without judgment. (1 min)",
        color: "bg-blue-100",
        textColor: "text-blue-700"
    },
    {
        icon: Brain,
        title: "Body Scan",
        description: "Bring awareness to your feet. Slowly scan up to your head. Notice any sensations. (3 min)",
        color: "bg-purple-100",
        textColor: "text-purple-700"
    },
    {
        icon: BookOpen,
        title: "Gratitude Drop",
        description: "Think of one small thing you're grateful for right now. Hold that feeling. (1 min)",
        color: "bg-green-100",
        textColor: "text-green-700"
    },
    {
        icon: Music,
        title: "Sound Focus",
        description: "Listen to the sounds around you. Can you identify three distinct noises? (2 min)",
        color: "bg-yellow-100",
        textColor: "text-yellow-700"
    }
];

export default function MindfulnessPage() {
    const [affirmationIndex, setAffirmationIndex] = useState(0);

    useEffect(() => {
        // Hydration safety for initial random item
        setAffirmationIndex(Math.floor(Math.random() * affirmations.length));
    }, []);

    const rotateAffirmation = () => {
        setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
    }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-headline text-5xl font-semibold tracking-tight sm:text-6xl text-primary-foreground">
                    Slow down. Be here.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                    Ground your mind through short, achievable practices.
                </motion.p>
            </div>
          
            <div className="grid gap-8 md:grid-cols-2">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <Card className="flex flex-col h-full shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-primary-foreground">
                                <Sparkles className="text-accent"/>
                                Affirmation Wheel
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1 justify-center items-center text-center p-8">
                            <div className="relative h-40 flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={affirmationIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="text-2xl font-medium leading-relaxed font-body text-foreground"
                                    >
                                        “{affirmations[affirmationIndex]}”
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                            <button onClick={rotateAffirmation} className="mt-4 text-sm text-accent font-semibold hover:underline">
                                Tap to rotate
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="space-y-6">
                    {activities.map((activity, i) => (
                        <motion.div 
                            key={activity.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                        >
                            <Card className="shadow-lg border-0 transition-transform hover:-translate-y-1">
                                <CardContent className="flex items-start gap-4 p-5">
                                    <div className={`p-3 rounded-lg ${activity.color}`}>
                                        <activity.icon className={`h-6 w-6 ${activity.textColor}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-semibold text-primary-foreground">{activity.title}</h3>
                                        <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
      </main>
      <Chatbot />
    </div>
  );
}
