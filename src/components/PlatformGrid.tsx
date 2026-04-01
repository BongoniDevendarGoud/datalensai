import { motion } from "framer-motion";

const platforms = [
  { name: "Claude", desc: "Anthropic's reasoning model", icon: "🧠" },
  { name: "Google Gemini", desc: "Multimodal intelligence", icon: "✦" },
  { name: "Ollama", desc: "Local model inference", icon: "🦙" },
  { name: "Cursor", desc: "AI-native code editor", icon: "⌘" },
  { name: "Windsurf", desc: "Agentic IDE platform", icon: "🌊" },
  { name: "Trae", desc: "Adaptive AI engine", icon: "◈" },
  { name: "Antigravity", desc: "Next-gen AI runtime", icon: "⬡" },
];

const PlatformGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Cross-Platform <span className="glow-text">Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Seamlessly connect to the models you already use. One unified interface for all.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card glow-border p-6 text-center cursor-default group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformGrid;
