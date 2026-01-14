'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-secondary/30">
                <div className="container mx-auto max-w-5xl px-4 py-12 md:py-24">
                     <div className="mb-8">
                        <h1 className="font-headline text-4xl font-bold tracking-tighter">Welcome back, {user.displayName?.split(' ')[0] || 'friend'}!</h1>
                        <p className="text-muted-foreground">This is your personal space for wellness.</p>
                     </div>

                     <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Diary Entries</CardTitle>
                                <CardDescription>A look back at your thoughts.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                                    <p>Your diary entries will appear here.</p>
                                    <p className="text-sm">This feature is coming soon.</p>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Monthly Mood Overview</CardTitle>
                                <CardDescription>Visualize your emotional patterns.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                                    <p>Your mood chart will appear here.</p>
                                    <p className="text-sm">This feature is coming soon.</p>
                                </div>
                            </CardContent>
                        </Card>
                     </div>
                </div>
            </main>
            <Chatbot />
        </div>
    );
}
