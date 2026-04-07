import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { streamChat, type Msg } from "@/lib/streamChat";
import DynamicChart from "./DynamicChart";

interface AIChatPanelProps {
  dataContext: string;
}

function extractChartConfigs(content: string) {
  const configs: any[] = [];
  const regex = /```chart\s*([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      configs.push(JSON.parse(match[1]));
    } catch { /* skip invalid */ }
  }
  return configs;
}

function stripChartBlocks(content: string) {
  return content.replace(/```chart\s*[\s\S]*?```/g, "").trim();
}

const AIChatPanel = ({ dataContext }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-analyze on mount
  useEffect(() => {
    if (dataContext && messages.length === 0) {
      handleSend("Analyze this dataset. Give me a comprehensive overview: key statistics, data quality assessment, patterns, and suggest 2-3 visualizations with chart configs.");
    }
  }, [dataContext]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Msg = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        dataContext,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (e: any) {
      upsertAssistant(`\n\n⚠️ Error: ${e.message}`);
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Show top 5 trends in this data",
    "Create a bar chart of the key metrics",
    "What anomalies do you see?",
    "Summarize this data for a business report",
  ];

  return (
    <div className="glass-card flex flex-col h-[600px]">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          DataLens AI Analyst
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <Bot className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Ask me anything about your data
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-xs px-3 py-1.5 rounded-full glass-card hover:bg-secondary/50 text-muted-foreground transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          const charts = msg.role === "assistant" ? extractChartConfigs(msg.content) : [];
          const cleanContent = msg.role === "assistant" ? stripChartBlocks(msg.content) : msg.content;

          return (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2"
                    : "space-y-3"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="text-sm">{cleanContent}</p>
                ) : (
                  <>
                    <div className="prose prose-sm prose-invert max-w-none text-foreground">
                      <ReactMarkdown>{cleanContent}</ReactMarkdown>
                    </div>
                    {charts.map((config, ci) => (
                      <DynamicChart key={ci} config={config} />
                    ))}
                  </>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground">Analyzing...</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your data..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChatPanel;
