"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Database,
  Zap,
  Check,
  ArrowRight,
  Calendar,
  ShieldCheck,
  User,
  Mail,
  Linkedin,
  Brain,
  TrendingUp,
  Clock,
  Users,
  FileText,
  X,
  Timer,
} from "lucide-react";
import { MobileNav } from "@/components/landing/mobile-nav";
import { FAQSection } from "@/components/landing/faq-section";
import { HeroVisual } from "@/components/landing/hero-visual";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { AnimateInView, CountUp } from "@/components/landing/animate-in-view";
import { BrainBodySection } from "@/components/landing/brain-body-section";
import { AgentOrgChart } from "@/components/landing/agent-org-chart";
import { ShiryoDialog } from "@/components/landing/shiryo-dialog";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";

import { METRICS } from "@/lib/constants";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

export default function HomePage() {
  const [locale, setLocale] = useState<"en" | "ja">("en");
  const t = dictionaries[locale].landing;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern">
      {/* Skip to main content — a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Fixed Navigation */}
      <header>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Layers className="size-6 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="#proof" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.proof}
            </Link>
            <Link href="#program" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.program}
            </Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.pricing}
            </Link>
            <LanguageToggle locale={locale} onToggle={setLocale} />
            <Link href="/audit">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                {t.nav.cta}
              </Button>
            </Link>
          </div>
          <div className="flex sm:hidden items-center gap-3">
            <LanguageToggle locale={locale} onToggle={setLocale} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </nav>
      </header>

      <main id="main-content">
      {/* ===============================================
          SECTION 1: HERO -- Dream Outcome, Not the Vehicle
          =============================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 radial-glow overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-up">
                <Badge variant="outline" className="mb-6 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                  {t.hero.badge}
                </Badge>
              </div>
              <h1 className="animate-fade-in-up animation-delay-100 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                {t.hero.title}{" "}
                <span className="gradient-text">{t.hero.titleHighlight}</span>
              </h1>
              <p className="animate-fade-in-up animation-delay-200 mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Trust indicators above the fold */}
              <div className="animate-fade-in-up animation-delay-200 mt-6 flex flex-col sm:flex-row items-center lg:items-start gap-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {[
                    "bg-indigo-500",
                    "bg-violet-500",
                    "bg-emerald-500",
                    "bg-amber-500",
                    "bg-teal-500",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`size-8 rounded-full ${bg} border-2 border-zinc-950 flex items-center justify-center`}
                    >
                      <User className="size-3.5 text-white/80" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-zinc-400">
                  <span className="text-zinc-200 font-medium">{t.hero.trust}</span>
                </div>
              </div>

              {/* Single-line testimonial */}
              <p className="animate-fade-in-up animation-delay-200 mt-4 text-sm text-zinc-500 italic max-w-lg mx-auto lg:mx-0">
                {t.hero.testimonial}
              </p>

              <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/audit">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow w-full sm:w-auto">
                    {t.hero.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="#proof">
                  <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100 gap-2 w-full sm:w-auto">
                    {t.hero.ctaSecondary}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>

              {/* ShiryoDialog trigger link below CTAs */}
              <div className="animate-fade-in-up animation-delay-300 mt-4 flex justify-center lg:justify-start">
                <ShiryoDialog locale={locale} />
              </div>

              {/* Guarantee hint — elevated per competitor analysis */}
              <p className="animate-fade-in-up animation-delay-300 mt-5 text-xs text-emerald-400/70 flex items-center gap-1.5 justify-center lg:justify-start">
                <ShieldCheck className="size-3.5 shrink-0" />
                {t.hero.guaranteeHint}
              </p>

              <p className="animate-fade-in-up animation-delay-300 mt-4 text-sm text-zinc-500">
                {t.hero.stats}
              </p>
            </div>

            {/* Right: Hero visual */}
            <div className="animate-fade-in-up animation-delay-300 hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 2: BEFORE / AFTER -- The Emotional Contrast
          =============================================== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <AnimateInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.beforeAfter.title}{" "}
              <span className="gradient-text">{t.beforeAfter.titleHighlight}</span>
            </h2>
          </AnimateInView>
          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT */}
            <AnimateInView delay={100}>
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="size-2 rounded-full bg-red-400" />
                  <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">{t.beforeAfter.withoutLabel}</span>
                </div>
                <ul className="space-y-4">
                  {t.beforeAfter.without.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                      <X className="size-4 text-red-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            {/* WITH */}
            <AnimateInView delay={200}>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">{t.beforeAfter.withLabel}</span>
                </div>
                <ul className="space-y-4">
                  {t.beforeAfter.with.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 3: BRAIN & BODY -- The Paradigm Shift (NEW)
          =============================================== */}
      <BrainBodySection locale={locale} />

      {/* ===============================================
          SECTION 4: THE AIOS STACK / PYRAMID -- What You Own
          =============================================== */}
      <section id="stack" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
              {t.stack.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.stack.title}{" "}
              <span className="gradient-text">{t.stack.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.stack.subtitle}
            </p>
          </AnimateInView>

          {/* Simple 3-step overview */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {t.stack.steps.map((step, i) => (
              <AnimateInView key={step.num} delay={i * 100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center h-full">
                  <div className="text-3xl font-bold gradient-text mb-2">{step.num}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.desc}</p>
                </div>
              </AnimateInView>
            ))}
          </div>

          {/* AIOS Pyramid Diagram */}
          <AIOSPyramid locale={locale} />

        </div>
      </section>

      {/* ===============================================
          SECTION 5: LIVE SYSTEM SHOWCASE (Proof)
          =============================================== */}
      <section id="proof" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
              {t.caseStudy.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.caseStudy.title}{" "}
              <span className="gradient-text">{t.caseStudy.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.caseStudy.subtitle}
            </p>
          </AnimateInView>

          {/* Metrics Grid with CountUp — values from constants.ts for easy updates */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[METRICS.activeProjects, METRICS.tasksInProgress, METRICS.pipelineDeals, METRICS.locationsManaged].map((value, i) => {
              const metric = t.caseStudy.metrics[i];
              return (
                <AnimateInView key={metric.label} delay={i * 100}>
                  <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5 text-center">
                    <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                      <CountUp end={value} />
                    </div>
                    <div className="text-sm font-medium text-zinc-200">{metric.label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{metric.sublabel}</div>
                  </div>
                </AnimateInView>
              );
            })}
          </div>

          {/* Agent Org Chart (NEW) */}
          <AgentOrgChart locale={locale} />

          {/* How it works in practice */}
          <AnimateInView>
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-8 mt-10">
              <h3 className="text-xl font-semibold mb-6 text-center">{t.caseStudy.howItWorksTitle}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: <Brain className="size-6 text-indigo-400" /> },
                  { icon: <Zap className="size-6 text-amber-400" /> },
                  { icon: <TrendingUp className="size-6 text-emerald-400" /> },
                  { icon: <Database className="size-6 text-blue-400" /> },
                  { icon: <Clock className="size-6 text-violet-400" /> },
                  { icon: <Users className="size-6 text-teal-400" /> },
                ].map((item, i) => {
                  const content = t.caseStudy.howItWorks[i];
                  return { ...item, title: content.title, description: content.description };
                }).map((item, i) => (
                  <AnimateInView key={item.title} delay={i * 80}>
                    <div className="flex flex-col gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        {item.icon}
                      </div>
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                    </div>
                  </AnimateInView>
                ))}
              </div>
            </div>
          </AnimateInView>

          {/* Lewis's quote */}
          <AnimateInView className="mt-8 text-center">
            <p className="text-zinc-400 text-sm italic">
              {t.caseStudy.testimonial}
            </p>
            <p className="mt-3 text-sm font-medium text-zinc-300">{t.caseStudy.testimonialAuthor}</p>
          </AnimateInView>
        </div>
      </section>

      {/* ===============================================
          MID-PAGE CTA -- Catch interested readers
          =============================================== */}
      <AnimateInView as="section" className="py-14 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {t.midCta.title}
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            {t.midCta.subtitle}
          </p>
          <Link href="/audit">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow">
              {t.cta.title}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </AnimateInView>

      {/* ===============================================
          SECTION 5b: PROBLEMS -- Why most AI adoption fails
          =============================================== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-red-500/30 text-red-300 bg-red-500/10">
              {t.problems.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.problems.title}{" "}
              <span className="text-zinc-500">{t.problems.titleMuted}</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
              {t.problems.subtitle}
            </p>
          </AnimateInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="size-5 text-red-400" /> },
              { icon: <ShieldCheck className="size-5 text-red-400" /> },
              { icon: <Brain className="size-5 text-red-400" /> },
              { icon: <Users className="size-5 text-red-400" /> },
              { icon: <Timer className="size-5 text-red-400" /> },
              { icon: <Database className="size-5 text-red-400" /> },
            ].map((item, i) => {
              const content = t.problems.items[i];
              return (
                <AnimateInView key={content.title} delay={i * 80}>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-semibold">{content.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{content.description}</p>
                  </div>
                </AnimateInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 6: THE OFFER -- Program Timeline + Pricing
          =============================================== */}
      <section id="program" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
              {t.program.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.program.title}{" "}
              <span className="gradient-text">{t.program.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.program.subtitle}
            </p>
          </AnimateInView>

          <div className="space-y-6">
            {/* Month 1: Mapping & Planning */}
            <AnimateInView>
              <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t.program.month1.title}</h3>
                    <p className="text-sm text-zinc-500">{t.program.month1.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.program.month1.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Month 2 */}
              <AnimateInView delay={100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month2.title}</h3>
                      <p className="text-sm text-zinc-500">{t.program.month2.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month2.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
              {/* Month 3 */}
              <AnimateInView delay={200}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month3.title}</h3>
                      <p className="text-sm text-zinc-500">{t.program.month3.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month3.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
              {/* Months 4-6 */}
              <AnimateInView delay={300}>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm">
                      4-6
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month4.title}</h3>
                      <p className="text-sm text-emerald-400">{t.program.month4.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month4.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
            </div>
          </div>

          {/* By Month 6 */}
          <AnimateInView className="mt-8">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">{t.program.byMonth6.title}</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {t.program.byMonth6.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {i === 0 ? <CountUp end={10} /> : i === 1 ? <CountUp end={100} suffix="%" /> : metric.value}
                    </div>
                    <div className="text-sm font-medium text-zinc-200">{metric.label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>

          {/* Divider between program and pricing */}
          <div className="border-t border-zinc-800/50 my-16" />

          {/* ===============================================
              PRICING -- Group Cohort + Corporate Build
              =============================================== */}
          <div id="pricing">
            <AnimateInView className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                {t.pricing.badge}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {t.pricing.title}
              </h2>
              <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
                {t.pricing.subtitle}
              </p>
            </AnimateInView>

            {/* Two pricing columns */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

              {/* Left: Group Cohort */}
              <AnimateInView delay={100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 flex flex-col h-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.cohort.label}</span>
                  <h3 className="text-2xl font-bold mb-3">{t.pricing.cohort.title}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold">{t.pricing.cohort.price}</span>
                    <span className="text-zinc-500">{t.pricing.cohort.pricePer}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-1">{t.pricing.cohort.commitment}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <Timer className="size-4 text-amber-400 shrink-0" />
                    <p className="text-sm font-medium text-amber-300">{t.pricing.cohort.spots}</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {t.pricing.cohort.features.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mb-2">{t.pricing.cohort.bestFor}</p>
                  <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.cohort.guarantee}</p>
                  <Link href="/audit" className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                      {t.pricing.cohort.cta}
                    </Button>
                  </Link>
                </div>
              </AnimateInView>

              {/* Right: Corporate Build */}
              <AnimateInView delay={200}>
                <div className="rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 p-8 flex flex-col h-full relative">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.corporate.label}</span>
                  <h3 className="text-2xl font-bold mb-3">{t.pricing.corporate.title}</h3>

                  {/* Monthly option */}
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-4xl font-bold">{t.pricing.corporate.monthlyPrice}</span>
                    <span className="text-zinc-500">{t.pricing.corporate.monthlyPer}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{t.pricing.corporate.monthlyTotal}</p>

                  {/* Pay-in-full option */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">{t.pricing.corporate.payInFull}</span>
                      <span className="ml-2 text-sm text-emerald-400">{t.pricing.corporate.payInFullSave}</span>
                    </div>
                    <Badge className="bg-indigo-600 text-white border-0 shrink-0">{t.pricing.corporate.bestValue}</Badge>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {t.pricing.corporate.features.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mb-2">{t.pricing.corporate.bestFor}</p>
                  <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.corporate.guarantee}</p>
                  <div className="space-y-3">
                    <Link href="/audit" className="w-full block">
                      <Button variant="outline" className="w-full border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100">
                        {t.pricing.corporate.monthlyCta}
                      </Button>
                    </Link>
                    <Link href="/audit" className="w-full block">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                        {t.pricing.corporate.payInFullCta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimateInView>
            </div>

            <AnimateInView className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <Timer className="size-4 text-amber-400 shrink-0" />
                <p className="text-sm font-medium text-amber-300">
                  {t.pricing.launchNote}
                </p>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ===============================================
          GUARANTEE -- Risk Reversal
          =============================================== */}
      <AnimateInView as="section" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="size-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 uppercase">
              {t.guarantee.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-xl mx-auto">
              {t.guarantee.description}
            </p>
            <div className="border-t border-emerald-500/20 pt-6 mt-6 space-y-2">
              <p className="text-sm text-zinc-400">
                {t.guarantee.cohortNote}
              </p>
              <p className="text-sm text-zinc-400">
                {t.guarantee.corporateNote}
              </p>
            </div>
          </div>
        </div>
      </AnimateInView>

      {/* ===============================================
          SECTION 7: FAQ -- Common Questions
          =============================================== */}
      <FAQSection locale={locale} />

      {/* ===============================================
          SECTION 8: FREE AUDIT CTA
          =============================================== */}
      <AnimateInView as="section" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6 text-center" id="audit">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t.auditCta.title}{" "}
            <span className="gradient-text">{t.auditCta.titleHighlight}</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            {t.auditCta.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-left">
            {[
              <ShieldCheck key="shield" className="size-5 text-indigo-400 shrink-0" />,
              <User key="user" className="size-5 text-indigo-400 shrink-0" />,
              <Calendar key="cal" className="size-5 text-indigo-400 shrink-0" />,
              <FileText key="file" className="size-5 text-indigo-400 shrink-0" />,
            ].map((icon, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                {icon}
                <span>{t.auditCta.benefits[i]}</span>
              </div>
            ))}
          </div>
          <Link href="/audit">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow">
              {t.cta.title}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </AnimateInView>

      {/* ===============================================
          CONSULTANT BIO -- Lewis Rice (with real headshot)
          =============================================== */}
      <AnimateInView as="section" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/lewis-rice.jpg"
                alt="Lewis Rice"
                width={80}
                height={80}
                className="rounded-full border border-indigo-500/20 object-cover shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">{t.bio.name}</h3>
                <p className="text-sm text-zinc-500 mb-4">{t.bio.title}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {t.bio.bio1}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {t.bio.bio2}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.bio.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateInView>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight mb-3">
                <Layers className="size-5 text-indigo-400" />
                <span>MOTTO Digital</span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.footer.tagline}
                <br />
                {t.footer.tagline2}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-zinc-300">{t.footer.navigate}</h4>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <Link href="#proof" className="hover:text-zinc-300 transition-colors">{t.footer.caseStudyLink}</Link>
                <Link href="#program" className="hover:text-zinc-300 transition-colors">{t.footer.programLink}</Link>
                <Link href="#pricing" className="hover:text-zinc-300 transition-colors">{t.footer.pricingLink}</Link>
                <Link href="/audit" className="hover:text-zinc-300 transition-colors">{t.footer.auditLink}</Link>
                <Link href="/privacy" className="hover:text-zinc-300 transition-colors">{t.footer.privacyLink}</Link>
                <Link href="/presentation" className="hover:text-zinc-300 transition-colors">{t.footer.presentationLink}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-zinc-300">{t.footer.contact}</h4>
              <address className="flex flex-col gap-2 text-sm text-zinc-500 not-italic">
                <a href="mailto:lewis@mottodigital.jp" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                  <Mail className="size-4" />
                  lewis@mottodigital.jp
                </a>
                <a href="https://www.linkedin.com/in/ricelewis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <p className="text-zinc-500 mt-1">{t.footer.contactCta}</p>
              </address>
            </div>
          </div>
          {/* Company legitimacy signals */}
          <div className="border-t border-zinc-800/50 pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-zinc-600">
            <span>{t.footer.company.representative}</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>{t.footer.company.location}</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>{t.footer.company.founded}</span>
          </div>
          <div className="border-t border-zinc-800/30 mt-4 pt-4 text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
