'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Minimize, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';

const phases = [
  { duration: 4000, text: 'Breathe In' },
  { duration: 4000, text: 'Hold' },
  { duration: 4000, text: 'Breathe Out' },
  { duration: 4000, text: 'Hold' },
];

export default function BreathingPage() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    if (isRunning) {
      const currentPhaseDuration = phases[phaseIndex].duration;
      timer = setTimeout(() => {
        setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
      }, currentPhaseDuration);

      setCountdown(currentPhaseDuration / 1000);
      countdownTimer = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

    } else {
      setPhaseIndex(0);
      setCountdown(4);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [phaseIndex, isRunning]);
  
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const handleStart = () => {
    if (!isRunning) {
      setPhaseIndex(0);
      setCountdown(4);
    }
    setIsRunning(!isRunning);
  }

  const handleReset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setCountdown(4);
  }
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  };

  const currentPhase = isRunning ? phases[phaseIndex] : { text: 'Ready?', duration: 4000 };
  const isBreathingIn = currentPhase.text.includes('In');

  return (
    <div className={cn("flex min-h-screen flex-col transition-colors duration-500", isFullScreen ? 'bg-background' : 'bg-secondary/20')}>
      {!isFullScreen && <Header />}
      <main className="flex flex-1 flex-col items-center justify-center p-4 text-center relative">
         <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-20" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize /> : <Maximize />}
        </Button>
        <div className="relative flex h-80 w-80 items-center justify-center">
          <motion.div
            className="absolute h-full w-full rounded-full bg-primary/30 blur-xl"
            animate={{ scale: isRunning && isBreathingIn ? 1.5 : 1 }}
            transition={{ duration: 4, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            className="absolute h-full w-full rounded-full border-2 border-primary/50"
            animate={{ scale: isRunning && isBreathingIn ? 1.2 : 0.8, opacity: isRunning ? 1 : 0 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />

          <motion.div
            className="z-10 h-32 w-32 rounded-full bg-primary/90 shadow-2xl"
            animate={{ scale: isRunning && isBreathingIn ? 1.5 : 1 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
           />

          <div className="absolute z-20 flex flex-col items-center justify-center text-primary-foreground">
             <AnimatePresence mode="wait">
                <motion.p 
                    key={currentPhase.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-2 text-3xl font-headline font-medium"
                >
                    {currentPhase.text}
                </motion.p>
             </AnimatePresence>
            {isRunning && (
                <p className="text-7xl font-bold font-headline">{countdown}</p>
            )}
          </div>
        </div>
        <div className="mt-16 flex gap-4">
            <Button onClick={handleStart} size="lg" className="w-36">
                {isRunning ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset} size="lg" variant="outline" className="w-36 bg-background/50">
                <RefreshCw className="mr-2"/>
                Reset
            </Button>
        </div>
        {!isFullScreen && <div className="absolute bottom-6 right-6"><Chatbot /></div>}
      </main>
    </div>
  );
}
