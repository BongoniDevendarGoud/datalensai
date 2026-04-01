import HeroSection from "@/components/HeroSection";
import PlatformGrid from "@/components/PlatformGrid";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PlatformGrid />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};

export default Index;
