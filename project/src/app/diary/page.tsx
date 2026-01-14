'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookCheck } from 'lucide-react';
import Link from 'next/link';

const DiaryEntrySchema = z.object({
  content: z.string().min(10, { message: 'Your entry must be at least 10 characters long.' }),
});

type DiaryEntryForm = z.infer<typeof DiaryEntrySchema>;

// Mock function for saving data
const saveDiaryEntry = (userId: string, content: string) => {
    console.log(`Saving for user ${userId}: ${content}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

export default function DiaryPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<DiaryEntryForm>({
    resolver: zodResolver(DiaryEntrySchema),
  });

  const onSubmit: SubmitHandler<DiaryEntryForm> = async (data) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await saveDiaryEntry(user.uid, data.content);
      toast({
        title: 'Entry Saved',
        description: 'Your thoughts have been recorded.',
      });
      setSubmitted(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save your diary entry.',
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
                        <CardDescription>You need to be logged in to keep a diary.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/login">Login to Keep a Diary</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
             <Chatbot />
        </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-semibold tracking-tight sm:text-6xl text-primary-foreground">
              Your Private Diary
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              A space to reflect, unwind, and understand your thoughts.
            </p>
          </div>

          {submitted ? (
             <Card className="text-center p-8 shadow-lg border-0">
                <CardHeader>
                    <BookCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <CardTitle className="font-headline text-primary-foreground">Thank you for sharing</CardTitle>
                    <CardDescription>Your entry has been saved. Come back tomorrow to write again.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setSubmitted(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">Write another entry</Button>
                </CardContent>
            </Card>
          ) : (
             <Card className="shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="font-headline text-primary-foreground">How are you feeling today?</CardTitle>
                    <CardDescription>Let it all out. This is a safe space.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Textarea 
                            {...register('content')}
                            rows={10}
                            placeholder="Start writing..."
                            className="w-full text-base bg-muted border-0 focus-visible:ring-1 ring-primary"
                        />
                        {errors.content && <p className="text-sm text-destructive mt-2">{errors.content.message}</p>}
                        <div className="mt-6 flex justify-end">
                            <Button type="submit" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Entry
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
          )}

        </div>
      </main>
      <Chatbot />
    </div>
  );
}
