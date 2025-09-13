import { useState } from "react";
import { 
  Type, 
  Contrast, 
  Eye, 
  Settings,
  X,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessibilityToggleBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  const adjustFontSize = (direction: 'increase' | 'decrease') => {
    const newSize = direction === 'increase' 
      ? Math.min(fontSize + 10, 150) 
      : Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    
    // Apply font size to document
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast', !highContrast);
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    document.documentElement.classList.toggle('dyslexia-font', !dyslexiaFont);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full glass-card-hover shadow-lg bg-primary text-primary-foreground hover:scale-110 transition-all duration-300"
          aria-label="Open accessibility settings"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
        </Button>
      </div>

      {/* Accessibility Panel */}
      <div className={`fixed bottom-24 right-6 z-40 transition-all duration-300 ${
        isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'
      }`}>
        <div className="glass-card p-6 w-80 shadow-2xl">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-lg font-semibold text-foreground">Accessibility Settings</h3>
          </div>

          <div className="space-y-6">
            {/* Font Size Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Type className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium text-foreground">Font Size</span>
                </div>
                <span className="text-sm text-muted-foreground">{fontSize}%</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustFontSize('decrease')}
                  disabled={fontSize <= 80}
                  className="w-10 h-10 p-0"
                  aria-label="Decrease font size"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 bg-muted rounded-full h-2 relative">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300"
                    style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                  />
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustFontSize('increase')}
                  disabled={fontSize >= 150}
                  className="w-10 h-10 p-0"
                  aria-label="Increase font size"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Contrast className="h-5 w-5 text-primary mr-2" />
                <div>
                  <span className="font-medium text-foreground block">High Contrast</span>
                  <span className="text-sm text-muted-foreground">Enhanced visibility</span>
                </div>
              </div>
              
              <button
                onClick={toggleHighContrast}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  highContrast ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label="Toggle high contrast mode"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Dyslexia-Friendly Font */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Type className="h-5 w-5 text-primary mr-2" />
                <div>
                  <span className="font-medium text-foreground block">Dyslexia Font</span>
                  <span className="text-sm text-muted-foreground">Easier reading</span>
                </div>
              </div>
              
              <button
                onClick={toggleDyslexiaFont}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  dyslexiaFont ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label="Toggle dyslexia-friendly font"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  dyslexiaFont ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Live Preview Text */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-glass-border/50">
            <p className="text-sm text-foreground">
              <strong>Live Preview:</strong> This text updates as you adjust settings to show how changes affect readability.
            </p>
          </div>

          {/* Reset Button */}
          <div className="mt-6 pt-4 border-t border-glass-border/50">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setFontSize(100);
                setHighContrast(false);
                setDyslexiaFont(false);
                document.documentElement.style.fontSize = '100%';
                document.documentElement.classList.remove('high-contrast', 'dyslexia-font');
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AccessibilityToggleBar;