'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { placeholderImages } from '@/lib/placeholder-images';
import { Wind, MessageSquareHeart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/hooks/use-chatbot';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'ruhi-hero');
  const { toggleChat } = useChatbot();

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
           <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[40rem] h-[40rem] bg-secondary/30 rounded-full blur-3xl opacity-50"></div>
           <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col justify-center space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="font-headline text-5xl font-semibold tracking-tight sm:text-6xl xl:text-7xl/none text-primary-foreground">
                    A voice that listens.
                    <br />
                    A soul that heals.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Non-judgmental mental health support, anytime.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={toggleChat} size="lg" className="shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 w-full min-[400px]:w-auto">
                      Start Chat
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="secondary" size="lg" className="shadow-lg w-full min-[400px]:w-auto">
                    <Link href="/breathing">
                      Try a Breathing Exercise
                    </Link>
                  </Button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative h-[350px] w-full lg:h-auto"
              >
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="rounded-2xl object-cover shadow-xl"
                    priority
                  />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full bg-background py-16 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="font-headline text-4xl font-semibold tracking-tight">
                What RUHI Does
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                RUHI offers simple, effective tools to support your mental well-being.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12">
              {[
                { icon: MessageSquareHeart, title: "Talk it out", description: "Engage in empathetic conversations with an AI that's here to listen without judgment." },
                { icon: Wind, title: "Calm your body", description: "Follow simple, animated exercises to calm your mind and regulate stress." },
                { icon: Sparkles, title: "Ground your mind", description: "Ground yourself with daily affirmations and short, guided mindfulness prompts." }
              ].map((feature, i) => (
                <motion.div key={feature.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={featureVariants}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-0 shadow-md">
                    <CardHeader>
                      <div className="bg-primary/20 p-4 rounded-lg w-fit mx-auto">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="bg-muted/50 p-6 text-center shadow-none border-0">
              <h3 className="font-semibold text-muted-foreground">Mental Health Disclaimer</h3>
              <p className="text-sm text-muted-foreground/80 mt-2 max-w-2xl mx-auto">
                RUHI supports well-being but does not replace professional care. If you are in a crisis, please contact a local emergency service or a mental health professional immediately.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Chatbot />
    </div>
  );
}
