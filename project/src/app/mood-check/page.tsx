'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Smile, Frown, Meh, Laugh, Angry, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const moods = [
  { name: 'Happy', icon: Laugh, color: 'text-yellow-500', bgColor: 'hover:bg-yellow-500/10', borderColor: 'border-yellow-500' },
  { name: 'Good', icon: Smile, color: 'text-green-500', bgColor: 'hover:bg-green-500/10', borderColor: 'border-green-500' },
  { name: 'Okay', icon: Meh, color: 'text-blue-500', bgColor: 'hover:bg-blue-500/10', borderColor: 'border-blue-500' },
  { name: 'Sad', icon: Frown, color: 'text-indigo-500', bgColor: 'hover:bg-indigo-500/10', borderColor: 'border-indigo-500' },
  { name: 'Angry', icon: Angry, color: 'text-red-500', bgColor: 'hover:bg-red-500/10', borderColor: 'border-red-500' },
];

const saveMood = (userId: string, mood: string) => {
    console.log(`Saving mood for user ${userId}: ${mood}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

export default function MoodCheckPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (!user || !selectedMood) return;
    setIsSubmitting(true);
    try {
      await saveMood(user.uid, selectedMood);
      toast({
        title: 'Mood Recorded',
        description: `Thank you for checking in. We've logged that you're feeling ${selectedMood.toLowerCase()}.`,
      });
      setSubmitted(true);
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save your mood.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
     return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-secondary/20 flex items-center justify-center">
                 <Card className="text-center p-8 max-w-md shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary-foreground">Please Log In</CardTitle>
                        <CardDescription>Log in to track your mood over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/login">Login to Track Mood</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
             <Chatbot />
        </div>
    )
  }

  if (submitted) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-secondary/20 flex items-center justify-center">
                 <Card className="text-center p-8 max-w-md shadow-lg border-0">
                    <CardHeader>
                        <TrendingUp className="mx-auto h-16 w-16 text-green-500 mb-4"/>
                        <CardTitle className="font-headline text-primary-foreground">Check-in Complete</CardTitle>
                        <CardDescription>Your mood has been logged. Consistency is key to understanding your emotional patterns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => { setSubmitted(false); setSelectedMood(null); }} className="bg-accent text-accent-foreground hover:bg-accent/90">Check-in Again</Button>
                    </CardContent>
                </Card>
            </main>
             <Chatbot />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-semibold tracking-tight sm:text-6xl text-primary-foreground">
              Daily Mood Check-in
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Take a moment to acknowledge how you're feeling right now.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="font-headline text-primary-foreground">How would you describe your overall mood today?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => handleMoodSelect(mood.name)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 transform
                      ${selectedMood === mood.name ? `${mood.borderColor} bg-opacity-20 scale-110` : 'border-transparent'} 
                      ${mood.bgColor}
                    `}
                  >
                    <mood.icon className={`h-12 w-12 transition-colors ${selectedMood === mood.name ? mood.color : 'text-muted-foreground/60'}`} />
                    <span className={`font-medium text-sm transition-colors ${selectedMood === mood.name ? mood.color : 'text-muted-foreground'}`}>{mood.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button size="lg" onClick={handleSubmit} disabled={!selectedMood || isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Mood
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
