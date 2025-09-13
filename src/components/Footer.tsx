import { Github, Twitter, Linkedin, Heart, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8">
          {/* Hackathon Badge */}
          <div className="glass-card bg-white/10 backdrop-blur-md border-white/20 p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Zap className="h-6 w-6 text-warning" />
              <span className="text-xl font-bold text-white">Built for Hackathon 2024</span>
              <Zap className="h-6 w-6 text-warning" />
            </div>
            <p className="text-white/80 text-sm">
              Crafted with passion for accessible education
            </p>
          </div>

          {/* AbleEd Logo/Brand */}
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-white">
              Able<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-accent-light">Ed</span>
            </h3>
            <p className="text-white/70 max-w-md mx-auto">
              Empowering learners of all abilities through innovative, accessible technology.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/ableed-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 glass-card bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Visit our GitHub repository"
            >
              <Github className="h-6 w-6 text-white group-hover:text-accent-light transition-colors" />
            </a>
            
            <a
              href="https://twitter.com/ableed_platform"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 glass-card bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="h-6 w-6 text-white group-hover:text-accent-light transition-colors" />
            </a>
            
            <a
              href="https://linkedin.com/company/ableed"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 glass-card bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-white group-hover:text-accent-light transition-colors" />
            </a>
          </div>

          {/* Copyright & Credits */}
          <div className="pt-8 border-t border-white/20 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-destructive animate-pulse" />
              <span>for accessible education</span>
            </div>
            
            <p className="text-white/50 text-sm">
              © {currentYear} AbleEd Platform. Building the future of inclusive learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#features" className="text-white/70 hover:text-white transition-colors">
              Features
            </a>
            <a href="#engagement" className="text-white/70 hover:text-white transition-colors">
              Engagement
            </a>
            <a href="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/accessibility" className="text-white/70 hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;