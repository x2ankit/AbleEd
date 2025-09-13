import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EngagementSection from "@/components/EngagementSection";
import AccessibilityToggleBar from "@/components/AccessibilityToggleBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <EngagementSection />
      <Footer />
      <AccessibilityToggleBar />
    </div>
  );
};

export default Index;
