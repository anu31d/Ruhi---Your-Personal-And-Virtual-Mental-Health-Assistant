'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Chatbot } from '@/components/chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush, Shuffle, TrendingUp, Mail, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

const activities = [
  { icon: Paintbrush, title: 'Mood Color Picker', description: 'Choose a color that best represents your current mood.' },
  { icon: Shuffle, title: 'Thought Reframe', description: 'Write a worry, and let RUHI help you see it from a new perspective.' },
  { icon: TrendingUp, title: 'Emotion Meter', description: 'Use a simple slider to track how you are feeling, from calm to overwhelmed.' },
  { icon: Mail, title: 'Letter to Self', description: 'Write a private letter to yourself. Send it to the void or save it for later.' },
  { icon: Brain, title: 'Name the Feeling', description: 'Having trouble labeling an emotion? RUHI can help you explore and identify it.' },
];

export default function ActivitiesPage() {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const renderActiveActivity = () => {
    switch (activeActivity) {
      case 'Mood Color Picker':
        return <MoodColorPicker />;
      case 'Thought Reframe':
        return <ThoughtReframe />;
      case 'Emotion Meter':
        return <EmotionMeter />;
      case 'Letter to Self':
        return <LetterToSelf />;
      // The 'Name the Feeling' activity is disabled for static export as it requires AI.
      // case 'Name the Feeling':
      //   return <NameTheFeeling />;
      default:
        return null;
    }
  };
  
  // Filter out the 'Name the Feeling' activity for static site
  const availableActivities = activities.filter(a => a.title !== 'Name the Feeling');

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
                Creative Tools
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Express and understand yourself in new ways.
            </motion.p>
          </div>

          {activeActivity ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button variant="ghost" onClick={() => setActiveActivity(null)} className="mb-6">
                &larr; Back to Activities
              </Button>
              {renderActiveActivity()}
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableActivities.map((activity, i) => (
                <motion.div 
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card 
                    onClick={() => setActiveActivity(activity.title)}
                    className="h-full cursor-pointer shadow-lg border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <CardHeader className="items-center text-center">
                       <div className="bg-primary/20 p-4 rounded-lg w-fit">
                        <activity.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="font-headline text-xl pt-2 text-primary-foreground">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                      <p>{activity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}


function MoodColorPicker() {
  const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF", "#F1F1F1"];
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="font-headline text-primary-foreground">Mood Color Picker</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Select a color that represents your current mood.</p>
        <div className="flex flex-wrap gap-4">
          {colors.map(color => (
            <motion.div 
              key={color}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedColor(color)}
              className="h-16 w-16 rounded-full cursor-pointer border-4"
              style={{ backgroundColor: color, borderColor: selectedColor === color ? 'hsl(var(--primary))' : 'transparent' }}
            />
          ))}
        </div>
        {selectedColor && <p className="mt-6 font-medium text-center text-muted-foreground">You selected a color. It's a beautiful way to express yourself without words.</p>}
      </CardContent>
    </Card>
  );
}

function ThoughtReframe() {
  const [worry, setWorry] = useState("");
  const [reframe, setReframe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReframe = () => {
    if (!worry) return;
    setIsLoading(true);
    // Add your API call here for AI-powered thought reframing
    // This is a placeholder for the static site.
    setTimeout(() => {
      setReframe(`Instead of seeing it as "${worry}", what if you viewed it as an opportunity to practice resilience? Challenges often reveal our strengths.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="font-headline text-primary-foreground">Thought Reframe</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Write down a worry or a negative thought.</p>
        <Textarea 
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
          placeholder="e.g., I'm afraid I'll fail the presentation..." 
        />
        <Button onClick={handleReframe} disabled={isLoading || !worry} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? "Reframing..." : "Reframe my Thought"}
        </Button>
        {reframe && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="font-semibold text-primary-foreground">A new perspective:</p>
            <p className="text-muted-foreground italic mt-2">{reframe}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmotionMeter() {
  const [value, setValue] = useState([50]);
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="font-headline text-primary-foreground">Emotion Meter</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-8">Move the slider to where you are on the scale.</p>
        <Slider defaultValue={value} max={100} step={1} onValueChange={setValue} />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Calm</span>
          <span>Overwhelmed</span>
        </div>
        <p className="text-center mt-6 font-semibold text-muted-foreground">You've acknowledged your state. That's a great step.</p>
      </CardContent>
    </Card>
  );
}

function LetterToSelf() {
    const [letter, setLetter] = useState("");
    const [sent, setSent] = useState(false);

    const handleDiscard = () => {
        setLetter("");
        setSent(true);
    }
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="font-headline text-primary-foreground">Letter to Self</CardTitle>
      </CardHeader>
      <CardContent>
        {!sent ? (
            <>
                <p className="text-muted-foreground mb-4">Write anything on your mind. This is a private space. No one will see this.</p>
                <Textarea value={letter} onChange={(e) => setLetter(e.target.value)} rows={8} placeholder="Dear self..." />
                <Button onClick={handleDiscard} disabled={!letter} className="mt-4">
                    Discard Letter
                </Button>
                <p className="text-xs text-muted-foreground mt-2">This will permanently delete your words, sending them into the void.</p>
            </>
        ) : (
            <div className="text-center p-8">
                <p className="font-medium">Your letter has been released.</p>
                <p className="text-muted-foreground mt-2">Sometimes, letting go is all we need.</p>
                <Button variant="link" onClick={() => setSent(false)} className="mt-4">Write another</Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
