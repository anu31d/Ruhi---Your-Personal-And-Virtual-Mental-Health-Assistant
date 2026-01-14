'use client';

import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const aboutImage = placeholderImages.find(p => p.id === 'ruhi-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-headline text-5xl font-semibold tracking-tight sm:text-6xl text-primary-foreground">
                Our Mission
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
                To create a world where everyone has a safe space to explore their feelings, find calm, and feel understood—anytime, anywhere.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl mb-16"
          >
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt="Calm abstract image representing RUHI's spirit"
                data-ai-hint="calm abstract"
                fill
                className="object-cover"
              />
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="bg-primary/20 p-4 rounded-lg w-fit mx-auto mb-4">
                    <HeartPulse className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-primary-foreground">Empathy First</h3>
                <p className="text-muted-foreground mt-2">RUHI is designed to be a non-judgmental, empathetic listener, offering a gentle presence in moments of need.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                 <div className="bg-primary/20 p-4 rounded-lg w-fit mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-primary-foreground">Safe & Private</h3>
                <p className="text-muted-foreground mt-2">Your conversations are your own. We are committed to your privacy and data security.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                 <div className="bg-primary/20 p-4 rounded-lg w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-primary-foreground">Accessible to All</h3>
                <p className="text-muted-foreground mt-2">We believe mental well-being tools should be available to everyone, which is why RUHI's core features are free to use.</p>
            </motion.div>
          </div>

        </div>
      </main>
      <Chatbot />
    </div>
  );
}
