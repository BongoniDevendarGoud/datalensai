import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = ({ onStartAnalyzing }: { onStartAnalyzing?: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card glow-border mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-body text-muted-foreground">Multimodel Intelligence Platform</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6"
        >
          <span className="gradient-text">DataLens</span>{" "}
          <span className="text-foreground">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          Natural language data analysis powered by the world's leading AI models.
          One platform, every model, infinite insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={onStartAnalyzing} className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300">
            Start Analyzing
          </button>
          <button className="px-8 py-3.5 rounded-lg glass-card glow-border text-foreground font-heading font-semibold text-sm tracking-wide hover:bg-secondary/80 transition-all duration-300">
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
