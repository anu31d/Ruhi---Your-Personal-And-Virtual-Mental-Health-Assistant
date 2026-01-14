import type { Metadata } from 'next';
import { AuthProvider } from '@/context/auth-provider';
import { ChatbotProvider } from '@/context/chatbot-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { MotionProvider } from '@/context/motion-provider';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'RUHI: Your AI Companion',
  description: 'A voice that listens. A soul that heals. AI-powered mental health support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-body antialiased', quicksand.variable, 'min-h-screen bg-background')}>
        <AuthProvider>
          <ChatbotProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
            <Toaster />
          </ChatbotProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
