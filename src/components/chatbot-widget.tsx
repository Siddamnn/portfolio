"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "model" | "system";
  text: string;
};

type Profile = Record<string, unknown> | null;

type ChatbotWidgetProps = {
  profileUrl?: string;
  className?: string;
};

// Minimal, poetic system instruction (kept short on purpose)
const SYSTEM_STYLE = `
You are Sid in AI form. Speak in short, complete sentences—poetic, warm, and clear. 
No rambling. If unsure, ask briefly. Keep it meaningful and concise.
`;

async function callChatAPI(opts: {
  userText: string;
  profileSummary?: string;
}): Promise<string> {
  const { userText, profileSummary } = opts;
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userText, profileSummary }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || `API error: ${res.status}`);
  }

  const data = await res.json();
  return String(data?.text || "").trim();
}

function safeSummarizeProfile(profile: Profile): string {
  try {
    if (!profile) return "";
    // Pick a few key-value pairs if shape is large
    const entries = Object.entries(profile).slice(0, 12);
    return entries
      .map(([k, v]) => `${k}: ${summarizeValue(v)}`)
      .join("; ");
  } catch {
    return "";
  }
}

function summarizeValue(v: unknown): string {
  if (v == null) return "null";
  if (typeof v === "string") return v.slice(0, 140);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return `[${v.slice(0, 5).map(summarizeValue).join(", ")}${v.length > 5 ? ", …" : ""}]`;
  // Object
  try {
    return JSON.stringify(v).slice(0, 140);
  } catch {
    return String(v);
  }
}

export function ChatbotWidget({
  profileUrl = "/me.json",
  className,
}: ChatbotWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState<Profile>(null);
  const [error, setError] = React.useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  // Fresh state each refresh (no persistence) – initialize greeting once per mount
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    {
      id: cryptoRandomId(),
      role: "model",
      text: "Hey—I'm Sid, in AI form. How can I help?",
    },
  ]);

  // Fetch profile JSON once (best-effort)
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(profileUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
        const data = (await res.json()) as Profile;
        if (mounted) setProfile(data);
      } catch {
        if (mounted) setProfile(null);
      }
    })();
    return () => {
      mounted = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, [profileUrl]);

  async function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: cryptoRandomId(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Build a minimal conversation summary to keep context small
    const lastFew = takeLast(messages.concat(userMsg), 6)
      .map((m) => `${m.role === "user" ? "User" : "Sid"}: ${m.text}`)
      .join("\n");

    const profileSummary = profile ? safeSummarizeProfile(profile).slice(0, 1200) : undefined;

    try {
      let reply = await callChatAPI({
        userText: lastFew,
        profileSummary,
      });
      reply = ensureSentence(reply);
      const modelMsg: ChatMessage = { id: cryptoRandomId(), role: "model", text: reply };
      setMessages((m) => [...m, modelMsg]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onToggle() {
    setOpen((v) => !v);
  }

  return (
    <div className={cn("fixed left-4 bottom-4 z-50", className)}>
      {/* Launcher button when closed */}
      {!open && (
        <Button
          onClick={onToggle}
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 p-0 flex items-center justify-center"
          aria-label="Open Sid chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {open && (
        <Card className="w-[20rem] sm:w-[22rem] md:w-[24rem] h-[26rem] bg-card text-card-foreground shadow-xl rounded-xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-primary/10 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              <h3 className="text-sm sm:text-base font-semibold">Sid • Chat</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close"
              onClick={onToggle}
              className="text-foreground/80 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 sm:px-4 py-3 space-y-3 overflow-y-auto bg-background/60">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}> 
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TypingDots />
                <span className="sr-only">Thinking…</span>
              </div>
            )}

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-2 py-1">
                {error}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSend} className="p-2 sm:p-3 border-t bg-card">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me, briefly…"
                className="text-sm"
                disabled={loading}
                aria-label="Type your message"
              />
              <Button type="submit" disabled={loading || !input.trim()}
                className="gap-1"
                aria-label="Send message"
                >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Local styles for Instagram-like typing dots */}
      <style jsx>{`
        @keyframes typingDot {
          0% { transform: translateY(0); opacity: 0.4; }
          25% { transform: translateY(-2px); opacity: 1; }
          50% { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(0); opacity: 0.4; }
        }
        .dot { width: 6px; height: 6px; border-radius: 9999px; background: hsl(var(--foreground)); margin-right: 6px; display: inline-block; animation: typingDot 1s infinite ease-in-out; }
        .dot:nth-child(1) { animation-delay: 0ms; }
        .dot:nth-child(2) { animation-delay: 160ms; }
        .dot:nth-child(3) { animation-delay: 320ms; }
      `}</style>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

function cryptoRandomId() {
  // Good enough for UI keys
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2);
}

function takeLast<T>(arr: T[], n: number) {
  return arr.slice(Math.max(0, arr.length - n));
}

function ensureSentence(text: string) {
  const t = (text || "").trim();
  if (!t) return t;
  const end = t.slice(-1);
  const terminal = ".!?…。";
  return terminal.includes(end) ? t : `${t}.`;
}

export default ChatbotWidget;
