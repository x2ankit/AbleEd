import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Box, Home, Settings2, User, LogOut, BarChart3, Type, Contrast, Volume2, Keyboard, Brain, ActivitySquare, MessageSquareText, Accessibility, Waves, Goal, Sparkles, Mic } from "lucide-react";
import logoPng from "../../assets/NoBGLogo.png";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { isAuthenticated, onAuthChange, logout as authLogout } from "@/lib/auth";

type UserType = "visual" | "hearing" | "motor" | "cognitive";

type Feature = {
  key: string;
  title: string;
  description: string;
  categories: UserType[];
  icon: ComponentType<{ className?: string }>;
};

const ALL_FEATURES: Feature[] = [
  { key: "tts", title: "Text-to-Speech", description: "Hear any lesson read aloud.", categories: ["visual", "cognitive"], icon: Volume2 },
  { key: "captions", title: "Captions", description: "Auto captions for videos and audio.", categories: ["hearing"], icon: MessageSquareText },
  { key: "summarizer", title: "Lesson Summarizer", description: "Concise bullet summaries for focus.", categories: ["cognitive"], icon: Sparkles },
  { key: "ui-accessibility", title: "UI Accessibility", description: "High contrast, alt text, ARIA, consistent layouts.", categories: ["visual", "motor"], icon: Accessibility },
  { key: "gesture-nav", title: "Gesture Navigation", description: "Navigate lessons with simple gestures.", categories: ["motor"], icon: Waves },
  { key: "emotion-tutor", title: "Emotion-Aware Tutor", description: "Adaptive tips based on engagement.", categories: ["cognitive"], icon: Brain },
  { key: "models-3d", title: "3D Interactive Lessons", description: "Manipulate models to learn by doing.", categories: ["visual", "motor", "cognitive"], icon: Box },
  { key: "haptics", title: "Haptic Feedback", description: "Feel cues for interactions & alerts.", categories: ["visual", "motor"], icon: ActivitySquare },
  { key: "multi-mode", title: "Multi‑Mode Delivery", description: "Video, text, audio, and 3D choices.", categories: ["visual", "hearing", "motor", "cognitive"], icon: Goal },
  { key: "daily-goal", title: "Daily Goal Tracker", description: "Stay on streak with gentle reminders.", categories: ["cognitive"], icon: Goal },
  { key: "breaks", title: "Brain Breaks", description: "Short resets to improve retention.", categories: ["cognitive"], icon: ActivitySquare },
  { key: "screen-reader", title: "Screen Reader Support", description: "Optimized landmarks & labels.", categories: ["visual"], icon: Accessibility },
  { key: "contrast", title: "High‑Contrast Mode", description: "Sharper colors for readability.", categories: ["visual"], icon: Contrast },
  { key: "keyboard", title: "Keyboard Navigation", description: "Tab through all actions.", categories: ["motor"], icon: Keyboard },
  { key: "voice", title: "Voice Commands", description: "Control using your voice.", categories: ["motor", "visual"], icon: Mic },
  { key: "visual-notifs", title: "Visual Notifications", description: "On‑screen alerts for sounds.", categories: ["hearing"], icon: MessageSquareText },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean>(isAuthenticated());
  const [types, setTypes] = useState<UserType[]>([]);
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(60);
  const [breakRunning, setBreakRunning] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(60);
  const [breakRunning, setBreakRunning] = useState(false);

  useEffect(() => onAuthChange(setAuthed), []);
  useEffect(() => { setAuthed(isAuthenticated()); }, []);
useEffect(() => {
  const id = setTimeout(() => setWeeklyProgress(72), 200);
  return () => clearTimeout(id);
}, []);
useEffect(() => {
  if (!breakRunning) return;
  const id = setInterval(() => setBreakSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
  return () => clearInterval(id);
}, [breakRunning]);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("high-contrast", highContrast);
    body.classList.toggle("text-[18px]", largeFont);
  }, [highContrast, largeFont]);

  const features = useMemo(() => {
    if (types.length === 0) return ALL_FEATURES;
    return ALL_FEATURES.filter((f) => f.categories.some((c) => types.includes(c)));
  }, [types]);

  function toggleType(t: UserType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function handleLogout() {
    authLogout();
    navigate("/");
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <img src={logoPng as string} alt="AbleEd logo" className="h-8 w-8 object-contain" />
            <span className="text-sm font-semibold">AbleEd</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link to="#home" aria-label="Home">
                      <Home /> <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="#lessons" aria-label="Lessons">
                      <BookOpen /> <span>Lessons</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="#models" aria-label="3D Models">
                      <Box /> <span>3D Models</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="#accessibility" aria-label="Accessibility Settings">
                      <Settings2 /> <span>Accessibility Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="#profile" aria-label="Profile">
                      <User /> <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="px-2">
            <Button variant="outline" className="w-full" aria-label="Logout">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-gradient-to-br from-rose-50 to-sky-50">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/70 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <div className="flex items-center gap-2">
            <img src={logoPng as string} alt="AbleEd logo" className="h-8 w-8 object-contain" />
            <span className="font-semibold">AbleEd Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="secondary" className="hidden sm:inline-flex" aria-label="Logout" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback aria-label="User avatar">AE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
          {/* Accessibility preferences */}
          <section aria-labelledby="prefs-title" className="grid grid-cols-1 gap-4">
            <Card className="glass-card-hover">
              <CardHeader>
                <CardTitle id="prefs-title">Your accessibility preferences</CardTitle>
                <CardDescription>Select needs to tailor features below.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2" role="group" aria-label="User accessibility types">
                  <Button variant={types.includes("visual") ? "default" : "outline"} size="sm" onClick={() => toggleType("visual")} aria-pressed={types.includes("visual")}>
                    <Accessibility className="mr-2 h-4 w-4" /> Visual
                  </Button>
                  <Button variant={types.includes("hearing") ? "default" : "outline"} size="sm" onClick={() => toggleType("hearing")} aria-pressed={types.includes("hearing")}>
                    <MessageSquareText className="mr-2 h-4 w-4" /> Hearing
                  </Button>
                  <Button variant={types.includes("motor") ? "default" : "outline"} size="sm" onClick={() => toggleType("motor")} aria-pressed={types.includes("motor")}>
                    <Keyboard className="mr-2 h-4 w-4" /> Motor
                  </Button>
                  <Button variant={types.includes("cognitive") ? "default" : "outline"} size="sm" onClick={() => toggleType("cognitive")} aria-pressed={types.includes("cognitive")}>
                    <Brain className="mr-2 h-4 w-4" /> Cognitive
                  </Button>
                </div>
                <Separator className="my-2 w-full" />
                <div className="flex flex-wrap gap-2" role="group" aria-label="Quick toggles">
                  <Button variant={highContrast ? "default" : "outline"} size="sm" onClick={() => setHighContrast((v) => !v)} aria-pressed={highContrast}>
                    <Contrast className="mr-2 h-4 w-4" /> High contrast
                  </Button>
                  <Button variant={largeFont ? "default" : "outline"} size="sm" onClick={() => setLargeFont((v) => !v)} aria-pressed={largeFont}>
                    <Type className="mr-2 h-4 w-4" /> Larger text
                  </Button>
                  <Button variant={ttsEnabled ? "default" : "outline"} size="sm" onClick={() => setTtsEnabled((v) => !v)} aria-pressed={ttsEnabled}>
                    <Volume2 className="mr-2 h-4 w-4" /> TTS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick stats */}
          <section aria-labelledby="stats-title" className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="glass-card-hover transition-transform hover:-translate-y-1" style={{ animation: "fadeInUp 0.4s ease-out both" }}>
              <CardHeader>
                <CardTitle className="text-base">Weekly Progress</CardTitle>
                <CardDescription>Keep up the great work</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={weeklyProgress} aria-label={`Weekly progress ${weeklyProgress}%`} />
                <p className="mt-2 text-sm text-muted-foreground">{weeklyProgress}% complete</p>
              </CardContent>
            </Card>
            <Card className="glass-card-hover transition-transform hover:-translate-y-1" style={{ animation: "fadeInUp 0.4s ease-out 0.08s both" }}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Active Streak</CardTitle>
                <CardDescription>Consistency pays off</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8 days</p>
                <p className="text-sm text-muted-foreground">You're on fire</p>
              </CardContent>
            </Card>
            <Card className="glass-card-hover transition-transform hover:-translate-y-1" style={{ animation: "fadeInUp 0.4s ease-out 0.16s both" }}>
              <CardHeader>
                <CardTitle className="text-base">Completed Lessons</CardTitle>
                <CardDescription>Total finished</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Great momentum</p>
              </CardContent>
            </Card>
          </section>

          {/* Feature grid */}
          <section aria-labelledby="features-title" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <Card key={f.key} className="glass-card-hover transition-transform hover:-translate-y-1 hover:shadow-glow" role="article" aria-label={f.title} style={{ animation: `fadeInUp 0.4s ease-out ${(idx * 60) / 1000}s both` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-4 w-4" /> {f.title}
                    </CardTitle>
                    <CardDescription>{f.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming lessons */}
            <section id="lessons" aria-labelledby="upcoming-title" className="lg:col-span-2">
              <Card className="glass-card-hover">
                <CardHeader>
                  <CardTitle id="upcoming-title">Upcoming lessons</CardTitle>
                  <CardDescription>Your next activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" role="list">
                    <li className="rounded-lg border p-3 hover:bg-accent/30 transition-colors" role="listitem">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Intro to Accessible Design</p>
                          <p className="text-sm text-muted-foreground">Due tomorrow</p>
                        </div>
                        <Button size="sm" variant="outline" aria-label="Start lesson">Start</Button>
                      </div>
                    </li>
                    <li className="rounded-lg border p-3 hover:bg-accent/30 transition-colors" role="listitem">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Keyboard Navigation Basics</p>
                          <p className="text-sm text-muted-foreground">In 3 days</p>
                        </div>
                        <Button size="sm" variant="outline" aria-label="Review lesson">Review</Button>
                      </div>
                    </li>
                    <li className="rounded-lg border p-3 hover:bg-accent/30 transition-colors" role="listitem">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Screen Reader Testing</p>
                          <p className="text-sm text-muted-foreground">Next week</p>
                        </div>
                        <Button size="sm" variant="outline" aria-label="Preview lesson">Preview</Button>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 3D preview placeholder */}
            <section id="models" aria-labelledby="preview-title" className="lg:col-span-1">
              <Card className="glass-card-hover overflow-hidden">
                <CardHeader>
                  <CardTitle id="preview-title">Interactive 3D preview</CardTitle>
                  <CardDescription>Placeholder area</CardDescription>
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={1}>
                    <div className="relative h-full w-full rounded-md bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30">
                      <div className="absolute inset-0 m-6 rounded-xl border border-dashed border-muted-foreground/40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Box className="h-12 w-12 animate-pulse" aria-hidden />
                        <span className="sr-only">3D model preview placeholder</span>
                      </div>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Brain Breaks */}
          <section aria-labelledby="brainbreaks-title" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="glass-card-hover lg:col-span-2" role="region" aria-labelledby="brainbreaks-title">
              <CardHeader>
                <CardTitle id="brainbreaks-title" className="flex items-center gap-2"><ActivitySquare className="h-4 w-4" /> Brain Break</CardTitle>
                <CardDescription>Take a short mindful break to recharge.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="size-24 rounded-full gradient-glow animate-pulse" aria-hidden />
                    <div className="absolute inset-0 m-2 rounded-full border-2 border-primary/50" aria-hidden />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold" aria-live="polite" aria-atomic="true">{breakSeconds}s</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { setBreakRunning(true); }} aria-pressed={breakRunning} aria-label="Start brain break">Start</Button>
                    <Button size="sm" variant="outline" onClick={() => { setBreakRunning(false); }} aria-label="Pause brain break">Pause</Button>
                    <Button size="sm" variant="secondary" onClick={() => { setBreakRunning(false); setBreakSeconds(60); }} aria-label="Reset brain break">Reset</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Breathe in for 4s, hold 4s, out 4s. Repeat.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card-hover">
              <CardHeader>
                <CardTitle className="text-base">Gamified Goals</CardTitle>
                <CardDescription>Complete daily targets to earn badges.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="progress-circle" aria-hidden />
                  <div>
                    <p className="text-sm">Daily Goal</p>
                    <p className="text-muted-foreground text-sm">Stay consistent to grow your streak.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Accessibility settings link */}
          <section id="accessibility" aria-labelledby="accessibility-title">
            <Card className="glass-card-hover">
              <CardHeader>
                <CardTitle id="accessibility-title">Accessibility Settings</CardTitle>
                <CardDescription>Adjust high contrast, fonts, and motion preferences.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" asChild>
                  <Link to="/">Open settings on Home</Link>
                </Button>
                <p className="text-sm text-muted-foreground">Tip: Press Ctrl/Cmd+B to collapse the sidebar.</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
