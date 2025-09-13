import { useState } from "react";
import { 
  Target, 
  Flame, 
  Trophy, 
  Zap, 
  Wind, 
  Heart,
  CheckCircle,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EngagementSection = () => {
  const [selectedActivity, setSelectedActivity] = useState(0);

  const dailyGoals = [
    { label: "Lessons Completed", progress: 75, icon: CheckCircle, color: "text-success" },
    { label: "Minutes Studied", progress: 60, icon: Target, color: "text-primary" },
    { label: "Streak Days", progress: 90, icon: Flame, color: "text-warning" },
    { label: "Achievements", progress: 45, icon: Trophy, color: "text-secondary" }
  ];

  const brainBreaks = [
    {
      title: "Quick Quiz",
      subtitle: "Test your knowledge",
      icon: Zap,
      color: "from-primary to-accent",
      emoji: "🧩"
    },
    {
      title: "Breathing Exercise",
      subtitle: "Relax and recharge",
      icon: Wind,
      color: "from-secondary to-primary",
      emoji: "🧘‍♀️"
    },
    {
      title: "Memory Game",
      subtitle: "Boost concentration",
      icon: Heart,
      color: "from-accent to-secondary",
      emoji: "🎯"
    }
  ];

  return (
    <section className="py-24 bg-muted/50" id="engagement">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Stay Engaged & Motivated
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your progress and take regular breaks to maintain optimal learning performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Daily Goals Tracker */}
          <div className="glass-card p-8">
            <div className="flex items-center mb-8">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Daily Goal Tracker</h3>
            </div>

            <div className="space-y-6">
              {dailyGoals.map((goal, index) => {
                const Icon = goal.icon;
                return (
                  <div key={goal.label} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 ${goal.color} mr-2`} />
                        <span className="font-medium text-foreground">{goal.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{goal.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${goal.progress}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      />
                    </div>

                    {goal.progress >= 80 && (
                      <div className="flex items-center mt-2 text-sm text-success">
                        <Flame className="h-4 w-4 mr-1" />
                        <span>On fire! 🔥</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Streak Display */}
            <div className="mt-8 text-center glass-card p-6 bg-gradient-to-r from-warning/10 to-success/10">
              <div className="flex items-center justify-center mb-2">
                <Flame className="h-6 w-6 text-warning mr-2" />
                <span className="text-2xl font-bold text-foreground">7 Day Streak!</span>
                <Flame className="h-6 w-6 text-warning ml-2" />
              </div>
              <p className="text-sm text-muted-foreground">Keep it up! You're doing amazing! 🎉</p>
            </div>
          </div>

          {/* Brain Breaks */}
          <div className="glass-card p-8">
            <div className="flex items-center mb-8">
              <Heart className="h-8 w-8 text-destructive mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Brain Breaks</h3>
            </div>

            <div className="space-y-4">
              {brainBreaks.map((activity, index) => {
                const Icon = activity.icon;
                const isSelected = selectedActivity === index;
                
                return (
                  <div
                    key={activity.title}
                    className={`glass-card-hover p-6 cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-primary scale-105' : ''
                    }`}
                    onClick={() => setSelectedActivity(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center mr-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-2xl">{activity.emoji}</div>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-glass-border/50">
                        <Button 
                          size="sm" 
                          className="btn-primary w-full group"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Activity would launch here
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Activity
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center glass-card p-4 bg-primary/5">
                <div className="text-lg font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Breaks Today</div>
              </div>
              <div className="text-center glass-card p-4 bg-success/5">
                <div className="text-lg font-bold text-success">98%</div>
                <div className="text-xs text-muted-foreground">Focus Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;