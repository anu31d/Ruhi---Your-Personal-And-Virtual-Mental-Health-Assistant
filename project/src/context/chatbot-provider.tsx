'use client';

import { createContext, useState, type ReactNode } from 'react';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatbotContextType = {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "Hello! I'm RUHI, your AI companion. How are you feeling today?",
  },
];

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const value = {
    isOpen,
    messages,
    isLoading,
    toggleChat,
    addMessage,
    setMessages,
    setIsLoading,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}
