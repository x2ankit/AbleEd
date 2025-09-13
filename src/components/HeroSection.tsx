import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/30 rounded-full blur-2xl float-animation" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
  <span className="text-white">Able</span>
  <span className="text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-accent-light">
    Ed
  </span>
  <br />
  <span className="text-2xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-accent-light">
    Beyond Barriers
  </span>
  <span className="ml-2">🚀</span>
</h1>


              <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
                Accessible, interactive lessons for everyone. Experience the future of education with AI-powered learning.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="btn-primary group"
                aria-label="Start your learning journey"
              >
                <Link to="/signup">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-secondary group"
                aria-label="Explore interactive 3D lessons"
              >
                <Link to="/dashboard">
                  <Play className="mr-2 h-5 w-5" />
                  Explore 3D Lessons
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/70">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-white/70">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-white/70">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative glass-card p-4 pulse-glow">
              <img
                src={heroImage as string}
                alt="Futuristic 3D educational models including solar system and anatomy"
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10 rounded-lg" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 glass-card p-3 float-animation">
              <span className="text-2xl">🧠</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card p-3 float-delayed">
              <span className="text-2xl">⚛️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
