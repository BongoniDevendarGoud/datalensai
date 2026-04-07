import { motion } from "framer-motion";

const CTASection = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-glow-purple/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to unlock your data?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start asking questions in natural language and get answers from any model, instantly.
            </p>
            <button className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold tracking-wide hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground border-t border-border pt-8">
          <span className="font-heading font-semibold text-foreground">DataLens AI</span>
          <span>© 2026 DataLens AI. All rights reserved.</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
