'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquareHeart, Send, Bot, User, X, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useChatbot, type Message } from '@/hooks/use-chatbot';
import { generateChatResponse } from '@/app/actions';
import { cn } from '@/lib/utils';

export function Chatbot() {
  const {
    isOpen,
    toggleChat,
    messages,
    addMessage,
    isLoading,
    setIsLoading,
  } = useChatbot();
  const [input, setInput] = useState('');
  const scrollAreaViewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaViewport.current) {
      scrollAreaViewport.current.scrollTo({
        top: scrollAreaViewport.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [isOpen, messages, isLoading, scrollToBottom]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    const chatHistory = [...messages, userMessage];

    try {
        // Add your API call here. The current function is a placeholder for static sites.
      const res = await generateChatResponse({
        message: input,
        sessionHistory: chatHistory,
      });
      
      if (res.success && res.response) {
        addMessage({ role: 'assistant', content: res.response });
      } else {
        addMessage({
          role: 'assistant',
          content: res.error || "I'm having trouble responding. Let's take a breath together.",
        });
      }
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: "I'm having trouble responding. Let's take a breath together.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-accent/50 blur-lg"
        />
        <Button onClick={toggleChat} size="icon" className="relative h-16 w-16 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-110">
          <AnimatePresence>
            {isOpen ? <X size={28} /> : <MessageSquareHeart size={28} />}
          </AnimatePresence>
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 right-0 z-40 w-full h-full md:h-auto md:max-h-[80vh] md:w-[400px] md:bottom-24 md:right-6 overflow-hidden rounded-none md:rounded-2xl border-t md:border bg-background shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary"><Bot /></AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-headline font-semibold text-primary-foreground">RUHI</h2>
                    <p className="text-xs text-muted-foreground">Your AI Companion</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="md:hidden">
                  <X className="h-4 w-4" />
                </Button>
              </header>
              <ScrollArea className="flex-1" viewportRef={scrollAreaViewport}>
                <div className="p-4 space-y-6">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={cn(
                        'flex items-start gap-3',
                        message.role === 'user' && 'flex-row-reverse'
                      )}
                    >
                      <Avatar className="h-8 w-8">
                        {message.role === 'assistant' ? (
                           <AvatarFallback className="bg-primary/20 text-primary"><Bot size={18}/></AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-secondary/80 text-secondary-foreground"><User size={18}/></AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={cn(
                          'max-w-[80%] rounded-xl px-4 py-2.5',
                          'font-body',
                          message.role === 'assistant'
                            ? 'bg-muted text-foreground'
                            : 'bg-primary text-primary-foreground'
                        )}
                        style={{ lineHeight: 1.6 }}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20 text-primary"><Bot size={18}/></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl px-4 py-3 text-sm flex items-center space-x-1">
                            <motion.div className="w-2 h-2 bg-primary/50 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} />
                            <motion.div className="w-2 h-2 bg-primary/50 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
                            <motion.div className="w-2 h-2 bg-primary/50 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                        </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <footer className="border-t p-4 bg-background">
                 <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Take your time..."
                    className="flex-1 resize-none bg-muted border-0 focus-visible:ring-1 ring-primary"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
