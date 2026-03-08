"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  Check,
  FileText,
  CalendarCheck,
  Share2,
  Copy,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Timeline data
// ---------------------------------------------------------------------------

const TIMELINE_STEPS = [
  {
    icon: Check,
    title: "Submission received",
    description: "Your answers are in. You're already ahead of 90% of companies.",
    status: "complete" as const,
    color: "emerald",
  },
  {
    icon: FileText,
    title: "Lewis reviews your answers",
    description:
      "He'll go through your tools, challenges, and vision to prepare a personalized AI readiness audit.",
    status: "active" as const,
    color: "indigo",
  },
  {
    icon: CalendarCheck,
    title: "Walk-through call",
    description:
      "Lewis shares the full audit report on a video call, explains every recommendation, and answers your questions.",
    status: "upcoming" as const,
    color: "indigo",
  },
  {
    icon: Sparkles,
    title: "Report is yours to keep",
    description:
      "After the call, the complete audit report is yours. No obligations, completely free.",
    status: "upcoming" as const,
    color: "indigo",
  },
];

// ---------------------------------------------------------------------------
// Confetti particle component (CSS-only)
// ---------------------------------------------------------------------------

function ConfettiParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; duration: number; color: string; size: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const colors = [
      "bg-indigo-400",
      "bg-indigo-500",
      "bg-violet-400",
      "bg-emerald-400",
      "bg-amber-400",
      "bg-rose-400",
      "bg-sky-400",
    ];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.color} rounded-sm opacity-0 confetti-particle`}
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sparkle background
// ---------------------------------------------------------------------------

function SparkleBackground() {
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: 2 + Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-indigo-400/40 sparkle-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Share popover
// ---------------------------------------------------------------------------

function ShareSection() {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/audit` : "";
  const shareText = "I just signed up for a free AI readiness audit from MOTTO Digital. Check it out!";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-zinc-500">Know someone who would benefit?</p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied!" : "Copy link"}
        </Button>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
          >
            <Linkedin className="size-3.5" />
          </Button>
        </Link>
        <Link
          href={`mailto:?subject=${encodeURIComponent("Free AI Readiness Audit")}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}
        >
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
          >
            <Mail className="size-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AuditSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern relative">
      {showConfetti && <ConfettiParticles />}
      <SparkleBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Layers className="size-6 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
        </div>
      </nav>

      {/* Success Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 radial-glow">
        <div className="max-w-lg w-full text-center pt-24 pb-12">
          {/* Celebration checkmark */}
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 animate-fade-in-up success-check-pulse">
            <Check className="size-10 text-emerald-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 animate-fade-in-up animation-delay-100">
            You&apos;re In &mdash; Thank You
          </h1>

          <p className="text-zinc-400 text-lg mb-3 leading-relaxed animate-fade-in-up animation-delay-200">
            Lewis will personally review your answers and put together a custom
            audit report for your business.
          </p>

          {/* Estimated timeline */}
          <p className="text-sm text-indigo-400 mb-10 animate-fade-in-up animation-delay-200">
            Lewis will reach out within 48 hours.
          </p>

          {/* Timeline stepper */}
          <div className="text-left mb-8 animate-fade-in-up animation-delay-300">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              What happens next
            </h3>
            <div className="relative">
              {TIMELINE_STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-4 pb-6 last:pb-0">
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 ${
                        step.status === "complete"
                          ? "bg-emerald-500/20 border-emerald-500/50"
                          : step.status === "active"
                            ? "bg-indigo-500/20 border-indigo-500/50 animate-pulse"
                            : "bg-zinc-800/50 border-zinc-700/50"
                      }`}
                    >
                      <step.icon
                        className={`size-4 ${
                          step.status === "complete"
                            ? "text-emerald-400"
                            : step.status === "active"
                              ? "text-indigo-400"
                              : "text-zinc-500"
                        }`}
                      />
                    </div>
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 my-1 ${
                          step.status === "complete"
                            ? "bg-emerald-500/30"
                            : "bg-zinc-800"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1 pb-2">
                    <p
                      className={`font-semibold text-sm ${
                        step.status === "complete"
                          ? "text-emerald-300"
                          : step.status === "active"
                            ? "text-zinc-100"
                            : "text-zinc-400"
                      }`}
                    >
                      {step.title}
                      {step.status === "active" && (
                        <span className="ml-2 text-xs text-indigo-400 font-normal">
                          In progress
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Meeting CTA */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-6 mb-8 animate-fade-in-up animation-delay-400">
            <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
              Go ahead and pick a time that works for you. Lewis will have your
              audit ready by the call.
            </p>
            <Link
              href="https://tidycal.com/mottodigital/aios-audit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow"
              >
                <CalendarCheck className="size-5" />
                Book Your Free Audit Call
              </Button>
            </Link>
            <p className="mt-3 text-xs text-zinc-500">
              30 minutes &middot; Video call &middot; No sales pressure
            </p>
          </div>

          {/* Share */}
          <div className="mb-8 animate-fade-in-up animation-delay-400">
            <ShareSection />
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
