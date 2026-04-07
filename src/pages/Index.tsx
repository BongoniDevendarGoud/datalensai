import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/HeroSection";
import PlatformGrid from "@/components/PlatformGrid";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import AuthPage from "@/components/AuthPage";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) navigate("/dashboard");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (showAuth) return <AuthPage />;

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onStartAnalyzing={() => setShowAuth(true)} />
      <PlatformGrid />
      <FeaturesSection />
      <CTASection onGetStarted={() => setShowAuth(true)} />
    </main>
  );
};

export default Index;
