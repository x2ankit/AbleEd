import {
  Volume2,
  Subtitles,
  BookOpen,
  Hand,
  Brain,
  Eye,
  Lightbulb,
  Heart,
  Accessibility,
  Box,
  ActivitySquare,
  Goal,
  Keyboard,
  Mic,
  MessageSquareText,
  Contrast,
  Layers
} from "lucide-react";

const features = [
  { icon: Volume2, title: "Text-to-Speech", description: "Natural voice narration for all content with customizable speed and voice options.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Subtitles, title: "Auto Captions", description: "Real-time captions with visual cues and multiple language support.", color: "text-accent", bgColor: "bg-accent/10" },
  { icon: BookOpen, title: "Lesson Summarizer", description: "AI-powered summaries that adapt to your learning style and pace.", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Accessibility, title: "UI Accessibility", description: "High-contrast, alt text, ARIA, consistent layouts.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Hand, title: "Gesture-Based Navigation", description: "Navigate with hand gestures - perfect for mobility challenges.", color: "text-success", bgColor: "bg-success/10" },
  { icon: Brain, title: "Emotion-Aware Tutor", description: "Adaptive tips based on engagement and focus.", color: "text-warning", bgColor: "bg-warning/10" },
  { icon: Box, title: "3D Interactive Lessons", description: "Manipulate models to learn by doing.", color: "text-accent", bgColor: "bg-accent/10" },
  { icon: ActivitySquare, title: "Haptic Feedback", description: "Feel cues for interactions & alerts.", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Layers, title: "Multi-Mode Delivery", description: "Video, text, audio, and 3D learning options.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Goal, title: "Daily Goal Tracker", description: "Stay on streak with gentle reminders.", color: "text-success", bgColor: "bg-success/10" },
  { icon: ActivitySquare, title: "Brain Breaks", description: "Short mindful breaks to recharge.", color: "text-warning", bgColor: "bg-warning/10" },
  { icon: Accessibility, title: "Screen Reader Support", description: "Optimized landmarks & labels.", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Contrast, title: "High-Contrast Mode", description: "Sharper colors for readability.", color: "text-accent", bgColor: "bg-accent/10" },
  { icon: Keyboard, title: "Keyboard Navigation", description: "Tab through all actions with clear focus.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Mic, title: "Voice Commands", description: "Control using your voice.", color: "text-success", bgColor: "bg-success/10" },
  { icon: MessageSquareText, title: "Visual Notifications", description: "On-screen alerts for sound events.", color: "text-warning", bgColor: "bg-warning/10" },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Accessibility-First Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature is designed with inclusivity in mind, ensuring all students can learn effectively regardless of their abilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card-hover p-8 group"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className={`${feature.bgColor} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-[var(--radius)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-glow -z-10" />
              </div>
            );
          })}
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-20 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Lightbulb className="h-8 w-8 text-warning animate-pulse" />
              <h3 className="text-2xl font-semibold text-foreground">Try Gesture Navigation</h3>
              <Heart className="h-8 w-8 text-destructive animate-pulse" />
            </div>
            <p className="text-muted-foreground mb-6">
              Wave your hand in front of your camera to see our gesture recognition in action!
            </p>
            <div className="bg-muted rounded-lg p-8 min-h-[200px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Hand className="h-16 w-16 text-primary animate-bounce" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Camera preview would appear here in production
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
