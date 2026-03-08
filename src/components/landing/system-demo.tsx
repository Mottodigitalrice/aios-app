"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Terminal, CheckCircle2 } from "lucide-react";

const demoSequence = [
  { type: "input" as const, text: '> "What\'s overdue this week?"', delay: 60 },
  {
    type: "output" as const,
    text: "Scanning 26 projects... 3 overdue tasks found:",
    delay: 30,
  },
  {
    type: "result" as const,
    lines: [
      "  1. Client proposal (Palemo) — 2 days overdue",
      "  2. Invoice follow-up (EDF) — 1 day overdue",
      "  3. Weekly report (internal) — due today",
    ],
    delay: 40,
  },
  { type: "input" as const, text: '> "Assign 1 and 3 to Claude"', delay: 60 },
  {
    type: "output" as const,
    text: "Done. 2 tasks assigned to AI agent.",
    delay: 30,
  },
  {
    type: "status" as const,
    text: "Claude is drafting the Palemo proposal...",
    delay: 50,
  },
  {
    type: "status" as const,
    text: "Weekly report generated and sent to Notion.",
    delay: 50,
  },
  {
    type: "input" as const,
    text: '> "Schedule the EDF follow-up for tomorrow morning"',
    delay: 60,
  },
  {
    type: "output" as const,
    text: "Scheduled: EDF invoice follow-up → Tomorrow 9:00 AM (Deep Focus block skipped, 15min task)",
    delay: 30,
  },
  {
    type: "input" as const,
    text: '> "What does my week look like?"',
    delay: 60,
  },
  {
    type: "output" as const,
    text: "12 tasks scheduled, 3 meetings, 2 AI tasks running. You have a 2-hour open block Thursday afternoon.",
    delay: 30,
  },
];

type VisibleLine = {
  type: "input" | "output" | "result" | "status";
  text: string;
  complete: boolean;
};

export function SystemDemo() {
  const [visibleLines, setVisibleLines] = useState<VisibleLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Run the demo sequence
  useEffect(() => {
    if (!started || sequenceIndex >= demoSequence.length) return;

    const step = demoSequence[sequenceIndex];
    let timeout: NodeJS.Timeout;

    if (step.type === "result") {
      // Add result lines one by one
      let lineIdx = 0;
      const addLine = () => {
        if (lineIdx < step.lines.length) {
          setVisibleLines((prev) => [
            ...prev,
            { type: "result", text: step.lines[lineIdx], complete: true },
          ]);
          lineIdx++;
          timeout = setTimeout(addLine, 200);
        } else {
          timeout = setTimeout(() => setSequenceIndex((i) => i + 1), 800);
        }
      };
      timeout = setTimeout(addLine, 300);
    } else {
      // Type out the text character by character
      const fullText = step.text;
      let charIdx = 0;

      if (step.type === "input") setIsTyping(true);

      setVisibleLines((prev) => [
        ...prev,
        { type: step.type, text: "", complete: false },
      ]);

      const typeChar = () => {
        if (charIdx < fullText.length) {
          charIdx++;
          setVisibleLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: fullText.slice(0, charIdx),
            };
            return updated;
          });
          timeout = setTimeout(typeChar, step.delay);
        } else {
          setVisibleLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              complete: true,
            };
            return updated;
          });
          setIsTyping(false);
          timeout = setTimeout(
            () => setSequenceIndex((i) => i + 1),
            step.type === "input" ? 600 : 400
          );
        }
      };
      timeout = setTimeout(typeChar, step.type === "input" ? 500 : 200);
    }

    return () => clearTimeout(timeout);
  }, [started, sequenceIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div ref={sectionRef} className="mt-12">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <Monitor className="size-4 text-indigo-400" />
        <span className="text-sm font-medium text-zinc-400">
          Live system interaction
        </span>
      </div>
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-950 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/50">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/60" />
            <div className="size-2.5 rounded-full bg-amber-500/60" />
            <div className="size-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Terminal className="size-3 text-zinc-600" />
            <span className="text-[11px] text-zinc-600 font-mono">
              aios — lewis@motto-digital
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="p-4 h-[280px] sm:h-[320px] overflow-y-auto font-mono text-[13px] leading-relaxed space-y-1.5 scrollbar-thin"
        >
          {visibleLines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              {line.type === "input" && (
                <span className="text-emerald-400 shrink-0">$</span>
              )}
              {line.type === "status" && (
                <CheckCircle2 className="size-3.5 text-indigo-400 mt-0.5 shrink-0" />
              )}
              <span
                className={
                  line.type === "input"
                    ? "text-emerald-300"
                    : line.type === "output"
                      ? "text-zinc-300"
                      : line.type === "status"
                        ? "text-indigo-300"
                        : "text-zinc-500"
                }
              >
                {line.text}
                {!line.complete && (
                  <span className="inline-block w-1.5 h-4 bg-zinc-400 ml-0.5 animate-pulse align-middle" />
                )}
              </span>
            </div>
          ))}
          {isTyping && visibleLines.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">$</span>
              <span className="inline-block w-1.5 h-4 bg-zinc-400 animate-pulse" />
            </div>
          )}
          {!started && (
            <div className="flex items-center gap-2 text-zinc-600">
              <span>$</span>
              <span className="inline-block w-1.5 h-4 bg-zinc-600 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
