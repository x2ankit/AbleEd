import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import logoPng from "../../assets/NoBGLogo.png";
import {
  Accessibility,
  Cog,
  Eye,
  Ear,
  Box,
  Wand2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

type Mode = "text" | "simple" | "audio" | "3d";

type Emotion = "happy" | "neutral" | "confused";

export default function Classroom() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("text");
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [emotion, setEmotion] = useState<Emotion>("neutral");
  const [breakSeconds, setBreakSeconds] = useState(90);
  const [breakRunning, setBreakRunning] = useState(false);

  useEffect(() => {
    const id = breakRunning
      ? setInterval(() => setBreakSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
      : undefined;
    return () => {
      if (id) clearInterval(id);
    };
  }, [breakRunning]);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("high-contrast", highContrast);
    body.classList.toggle("text-[18px]", largeFont);
    return () => {
      body.classList.remove("high-contrast");
      body.classList.remove("text-[18px]");
    };
  }, [highContrast, largeFont]);

  const captionText = useMemo(
    () =>
      "The human heart pumps blood throughout the body. It has four chambers: two atria and two ventricles.",
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-teal-50 to-blue-50" role="main" aria-label="AbleEd Classroom Page">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-20 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2" aria-label="AbleEd Home">
            <img src={logoPng as string} alt="AbleEd logo" className="h-8 w-8 object-contain" />
            <span className="sr-only">AbleEd</span>
          </Link>

          <Separator orientation="vertical" className="mx-3 hidden h-6 sm:inline-flex" />

          <div className="flex-1 text-center font-semibold sm:text-lg" aria-live="polite">
            Science – The Human Heart
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Cog className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback aria-label="User avatar">AE</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[320px_1fr_320px] md:gap-6 md:p-6 lg:gap-8">
        {/* Left Panel – Lesson Controls */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          aria-labelledby="lesson-controls-title"
        >
          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle id="lesson-controls-title">Lesson Controls</CardTitle>
              <CardDescription>
                Explore the human heart with multiple learning modes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <TabsList aria-label="Select learning mode" className="grid w-full grid-cols-4">
                  <TabsTrigger value="text" aria-label="Text Mode">
                    <Eye className="mr-2 h-4 w-4" /> Text
                  </TabsTrigger>
                  <TabsTrigger value="simple" aria-label="Simplified Text Mode">
                    <Wand2 className="mr-2 h-4 w-4" /> Simple
                  </TabsTrigger>
                  <TabsTrigger value="audio" aria-label="Audio Mode">
                    <Ear className="mr-2 h-4 w-4" /> Audio
                  </TabsTrigger>
                  <TabsTrigger value="3d" aria-label="3D/AR Mode">
                    <Box className="mr-2 h-4 w-4" /> 3D
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={mode} />
              </Tabs>

              <div className="mt-4 space-y-3" role="group" aria-label="Quick accessibility toggles">
                <div className="flex items-center justify-between rounded-md border p-2">
                  <Label htmlFor="hc" className="flex items-center gap-2">
                    <ContrastIcon /> High Contrast
                  </Label>
                  <Switch id="hc" checked={highContrast} onCheckedChange={setHighContrast} aria-label="Toggle high contrast mode" />
                </div>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <Label htmlFor="lf" className="flex items-center gap-2">
                    <Accessibility className="h-4 w-4" /> Larger Text
                  </Label>
                  <Switch id="lf" checked={largeFont} onCheckedChange={setLargeFont} aria-label="Toggle larger text" />
                </div>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <Label htmlFor="cc" className="flex items-center gap-2">
                    <span className="inline-block rounded bg-muted px-1.5 text-xs font-semibold">CC</span> Enable Captions
                  </Label>
                  <Switch id="cc" checked={captions} onCheckedChange={setCaptions} aria-label="Toggle captions" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Center Panel – Lesson Viewer */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          aria-labelledby="lesson-viewer-title"
        >
          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle id="lesson-viewer-title">Lesson Viewer</CardTitle>
              <CardDescription>Interactive content updates by mode.</CardDescription>
            </CardHeader>
            <CardContent>
              {mode === "text" && (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-foreground">
                    The human heart is a muscular organ responsible for pumping blood throughout the body. It has four
                    chambers – two atria and two ventricles – that work in a coordinated rhythm.
                  </p>
                  <ul className="mt-3 list-disc pl-6 text-foreground/90">
                    <li>Atria receive blood; ventricles pump blood out.</li>
                    <li>Valves prevent backflow and keep blood moving forward.</li>
                    <li>Average resting rate for adults is 60–100 beats per minute.</li>
                  </ul>
                </div>
              )}

              {mode === "simple" && (
                <div className="space-y-3">
                  <p className="rounded-md bg-muted/60 p-3 text-base">
                    The heart moves blood around your body like a pump. It has four rooms that help it push blood the
                    right way.
                  </p>
                  <ul className="space-y-2">
                    <li className="rounded-md bg-muted/40 p-2">Top rooms take blood in. Bottom rooms push blood out.</li>
                    <li className="rounded-md bg-muted/40 p-2">Doors called valves stop blood from going backward.</li>
                    <li className="rounded-md bg-muted/40 p-2">A calm heartbeat is about 60–100 beats each minute.</li>
                  </ul>
                </div>
              )}

              {mode === "audio" && (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-sm font-medium">Audio Player</div>
                    <div className="h-16 w-full rounded-md bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
                      <div className="h-full w-1/2 animate-pulse bg-primary/30" aria-hidden />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" aria-label="Play">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" aria-label="Pause">
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                    {captions && (
                      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
                        {captionText}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {mode === "3d" && (
                <div>
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative h-full w-full rounded-md bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30">
                      <div className="absolute inset-0 m-6 rounded-xl border border-dashed border-muted-foreground/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Box className="h-12 w-12 animate-pulse" aria-hidden />
                        <span className="sr-only">Interactive 3D model placeholder</span>
                      </div>
                    </div>
                  </AspectRatio>
                  <p className="mt-3 text-sm text-muted-foreground">
                    3D/AR coming soon. This area will show an interactive heart model using React Three Fiber.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* Right Panel – Assistive Tools */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          aria-labelledby="assistive-tools-title"
        >
          <Card className="glass-card-hover" role="region" aria-labelledby="assistive-tools-title">
            <CardHeader>
              <CardTitle id="assistive-tools-title">Assistive Tools</CardTitle>
              <CardDescription>Learn comfortably with helpful aids.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Emotion Meter */}
              <div>
                <div className="mb-2 text-sm font-medium">Emotion Meter</div>
                <div className="flex gap-2" role="tablist" aria-label="Emotion selector">
                  <Button
                    variant={emotion === "happy" ? "default" : "outline"}
                    size="sm"
                    aria-pressed={emotion === "happy"}
                    onClick={() => setEmotion("happy")}
                  >
                    <Smile className="mr-1 h-4 w-4" /> Happy
                  </Button>
                  <Button
                    variant={emotion === "neutral" ? "default" : "outline"}
                    size="sm"
                    aria-pressed={emotion === "neutral"}
                    onClick={() => setEmotion("neutral")}
                  >
                    <Meh className="mr-1 h-4 w-4" /> Neutral
                  </Button>
                  <Button
                    variant={emotion === "confused" ? "default" : "outline"}
                    size="sm"
                    aria-pressed={emotion === "confused"}
                    onClick={() => setEmotion("confused")}
                  >
                    <Frown className="mr-1 h-4 w-4" /> Confused
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Gesture Guide */}
              <div>
                <div className="mb-2 text-sm font-medium">Gesture Guide</div>
                <ul className="space-y-2 text-sm" aria-label="Gesture instructions">
                  <li className="rounded-md border p-2">✋ Raise hand = Next</li>
                  <li className="rounded-md border p-2">🖐️ Palm = Read Aloud</li>
                </ul>
              </div>

              <Separator />

              {/* Brain Break Reminder */}
              <div>
                <div className="mb-2 text-sm font-medium">Brain Break Reminder</div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="size-16 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 animate-pulse" aria-hidden />
                    <div className="absolute inset-0 m-1 rounded-full border-2 border-primary/50" aria-hidden />
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold" aria-live="polite" aria-atomic="true">
                      {breakSeconds}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setBreakRunning(true)} aria-label="Start break timer">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setBreakRunning(false)} aria-label="Pause break timer">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => { setBreakRunning(false); setBreakSeconds(90); }} aria-label="Reset break timer">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {breakSeconds === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground" role="status">Take a short break</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Footer / Bottom Navigation */}
      <footer className="sticky bottom-0 z-10 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="contentinfo">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild aria-label="Previous Lesson">
              <Link to="#prev">
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Link>
            </Button>
            <Button className="gradient-button" asChild aria-label="Next Lesson">
              <Link to="#next">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4" role="group" aria-label="Accessibility options">
            <TogglePill active={largeFont} onClick={() => setLargeFont((v) => !v)} label="Increase Font Size" />
            <TogglePill active={highContrast} onClick={() => setHighContrast((v) => !v)} label="High Contrast Mode" />
            <TogglePill active={captions} onClick={() => setCaptions((v) => !v)} label="Enable Captions" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function TogglePill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent/40"
      )}
    >
      {label}
    </button>
  );
}

function ContrastIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3v18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
