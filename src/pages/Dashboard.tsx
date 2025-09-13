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
import { Link } from "react-router-dom";
import { BookOpen, Box, Home, Settings2, User, LogOut, GraduationCap, BarChart3 } from "lucide-react";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-primary to-secondary text-primary-foreground">
              <GraduationCap className="h-4 w-4" aria-hidden />
            </div>
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

      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/70 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-primary to-secondary text-primary-foreground">
              <GraduationCap className="h-4 w-4" aria-hidden />
            </div>
            <span className="font-semibold">AbleEd Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/signup">Create account</Link>
            </Button>
            <Button variant="secondary" className="hidden sm:inline-flex" aria-label="Logout">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback aria-label="User avatar">AE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
          {/* Quick stats */}
          <section aria-labelledby="stats-title" className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="glass-card-hover transition-transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-base">Weekly Progress</CardTitle>
                <CardDescription>Keep up the great work</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={72} aria-label="Weekly progress 72%" />
                <p className="mt-2 text-sm text-muted-foreground">72% complete</p>
              </CardContent>
            </Card>
            <Card className="glass-card-hover transition-transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Active Streak</CardTitle>
                <CardDescription>Consistency pays off</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8 days</p>
                <p className="text-sm text-muted-foreground">You're on fire</p>
              </CardContent>
            </Card>
            <Card className="glass-card-hover transition-transform hover:-translate-y-1">
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
