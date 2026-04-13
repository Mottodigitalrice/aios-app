"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Clock, Monitor, Users, CheckCircle2 } from "lucide-react";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { MobileNav } from "@/components/landing/mobile-nav";
import { AnimateInView } from "@/components/landing/animate-in-view";
import { budouxWrap } from "@/lib/budoux-transform";

import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

// ─── Config ──────────────────────────────────────────────────────────────────
const TIDYCAL_URL = "https://tidycal.com/rice/aios-webinar";

const SESSIONS = [
  { dayEn: "Friday",    dayJa: "金曜日",  dateEn: "April 17",  dateJa: "4月17日", timeEn: "2:00 PM JST",  timeJa: "14:00（日本時間）" },
  { dayEn: "Monday",   dayJa: "月曜日",  dateEn: "April 20",  dateJa: "4月20日", timeEn: "3:00 PM JST",  timeJa: "15:00（日本時間）" },
  { dayEn: "Wednesday",dayJa: "水曜日",  dateEn: "April 22",  dateJa: "4月22日", timeEn: "8:00 PM JST",  timeJa: "20:00（日本時間）" },
  { dayEn: "Thursday", dayJa: "木曜日",  dateEn: "April 23",  dateJa: "4月23日", timeEn: "2:00 PM JST",  timeJa: "14:00（日本時間）" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Locale = "en" | "ja";
const dictionaries = { en, ja } as const;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ja";
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  if (urlLocale === "ja" || urlLocale === "en") return urlLocale;
  return "ja"; // Japanese default
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SessionPicker({ locale }: { locale: Locale }) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium mb-4" style={{ color: "var(--lp-text-muted)" }}>
        {locale === "ja" ? "参加したい日程を選んでください" : "Choose your session"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SESSIONS.map((s, i) => (
          <a
            key={i}
            href={TIDYCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1 px-3 py-4 rounded-2xl text-center transition-all hover:scale-[1.03]"
            style={{
              backgroundColor: "var(--lp-bg-secondary, #F5F5F7)",
              border: "1px solid var(--lp-border)",
            }}
          >
            <span className="text-xs font-medium" style={{ color: "#B8860B" }}>
              {locale === "ja" ? s.dayJa : s.dayEn}
            </span>
            <span
              className={`text-base font-bold leading-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
              style={{ color: "var(--lp-text-heading)" }}
            >
              {locale === "ja" ? s.dateJa : s.dateEn}
            </span>
            <span className="text-xs" style={{ color: "var(--lp-text-muted)" }}>
              {locale === "ja" ? s.timeJa : s.timeEn}
            </span>
            <span
              className="mt-2 text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: "#B8860B", color: "#fff" }}
            >
              {locale === "ja" ? "登録" : "Register"}
            </span>
          </a>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {[
          { icon: <Monitor className="size-3.5" />, label: locale === "ja" ? "Zoomオンライン（無料）" : "Zoom (free)" },
          { icon: <Users className="size-3.5" />, label: locale === "ja" ? "定員50名" : "50 seats" },
          { icon: <Clock className="size-3.5" />, label: locale === "ja" ? "60分" : "60 minutes" },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--lp-text-muted)" }}>
            <span style={{ color: "#B8860B" }}>{d.icon}</span>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <AnimateInView className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.agendaTitle}
          </h2>
        </AnimateInView>
        <div className="flex flex-col gap-4">
          {t.agendaItems.map((item, i) => (
            <AnimateInView key={i} delay={i * 60}>
              <div
                className="flex gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "var(--lp-bg-secondary, #F5F5F7)", border: "1px solid var(--lp-border)" }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5 w-7 text-center">{item.icon}</span>
                <div>
                  <h3
                    className={`font-semibold mb-1 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                    style={{ color: "var(--lp-text-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--lp-text-body)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWhomSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)", backgroundColor: "#1D1D1F" }}>
      <div className="mx-auto max-w-4xl px-6">
        <AnimateInView className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight text-white ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
          >
            {t.forWhomTitle}
          </h2>
        </AnimateInView>
        <div className="grid sm:grid-cols-3 gap-6">
          {t.forWhomItems.map((item, i) => (
            <AnimateInView key={i} delay={i * 80}>
              <div className="flex flex-col gap-3 p-6 rounded-2xl h-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-3xl">{item.icon}</span>
                <h3
                  className={`font-semibold text-white ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {item.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}>
      <div className="mx-auto max-w-xl px-6 text-center">
        <AnimateInView>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.registerTitle}
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--lp-text-muted)" }}>
            {t.registerSubtitle}
          </p>
          <a href={TIDYCAL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="rounded-full text-base px-8 py-6 font-semibold shadow-lg hover:scale-[1.02] transition-transform"
              style={{ backgroundColor: "#B8860B", color: "#fff" }}
            >
              {t.registerButtonLabel}
            </Button>
          </a>
          <p className="mt-4 text-sm" style={{ color: "var(--lp-text-muted)" }}>
            {t.recordingNote}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}

function SpeakerSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)", backgroundColor: "var(--lp-bg-secondary, #F5F5F7)" }}>
      <div className="mx-auto max-w-3xl px-6">
        <AnimateInView className="text-center mb-10">
          <h2
            className={`text-3xl font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.speakerTitle}
          </h2>
        </AnimateInView>
        <AnimateInView>
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <Image
              src="/lewis-rice.jpg"
              alt="Lewis Rice"
              width={96}
              height={96}
              className="flex-shrink-0 size-24 rounded-full object-cover"
            />
            <div>
              <h3
                className={`text-xl font-bold mb-1 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.speakerName}
              </h3>
              <p className="text-sm mb-4" style={{ color: "#B8860B" }}>
                {t.speakerRole}
              </p>
              <ul className="flex flex-col gap-2">
                {t.speakerBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--lp-text-body)" }}>
                    <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}

function FaqSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}>
      <div className="mx-auto max-w-3xl px-6">
        <AnimateInView className="text-center mb-10">
          <h2
            className={`text-3xl font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.faqTitle}
          </h2>
        </AnimateInView>
        <div className="flex flex-col divide-y" style={{ borderTop: "1px solid var(--lp-border)", borderBottom: "1px solid var(--lp-border)" }}>
          {t.faqItems.map((item, i) => (
            <AnimateInView key={i} delay={i * 60}>
              <button
                className="w-full text-left py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] rounded-sm"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className={`font-medium ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                  style={{ color: "var(--lp-text-heading)" }}
                >
                  {item.question}
                </span>
                <span
                  className="text-lg flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: "#B8860B",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--lp-text-body)" }}>
                  {item.answer}
                </p>
              )}
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ t, locale }: { t: typeof en.webinar; locale: Locale }) {
  return (
    <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)", backgroundColor: "#1D1D1F" }}>
      <div className="mx-auto max-w-2xl px-6 text-center">
        <AnimateInView>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
          >
            {t.finalCtaTitle}
          </h2>
          <a href={TIDYCAL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="rounded-full text-base px-8 py-6 font-semibold hover:scale-[1.02] transition-transform"
              style={{ backgroundColor: "#B8860B", color: "#fff" }}
            >
              {t.finalCtaButton}
            </Button>
          </a>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {t.finalCtaContact}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebinarPage() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const rawT = dictionaries[locale].webinar;
  const t = useMemo(
    () => (locale === "ja" ? budouxWrap(rawT) : rawT) as unknown as typeof en.webinar,
    [locale, rawT],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLocaleToggle = (newLocale: Locale) => {
    setLocale(newLocale);
    const url = new URL(window.location.href);
    if (newLocale === "ja") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", newLocale);
    }
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen text-[#1D1D1F]" style={{ backgroundColor: "var(--lp-bg-primary)" }}>
      {/* Nav */}
      <header>
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight font-[family-name:var(--font-dm-sans)]">
              MOTTO Digital
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="/#proof" className="nav-link-hover text-sm transition-colors" style={{ color: "var(--lp-text-body)" }}>
                Proof
              </Link>
              <Link href="/#program" className="nav-link-hover text-sm transition-colors" style={{ color: "var(--lp-text-body)" }}>
                Program
              </Link>
              <Link href="/#pricing" className="nav-link-hover text-sm transition-colors" style={{ color: "var(--lp-text-body)" }}>
                Pricing
              </Link>
              <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
              <a href={TIDYCAL_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="rounded-full text-sm px-5 py-2" style={{ backgroundColor: "#B8860B", color: "#fff" }}>
                  {t.registerCta}
                </Button>
              </a>
            </div>
            <div className="flex sm:hidden items-center gap-3">
              <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
              <MobileNav locale={locale} />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* 1. Hero */}
        <section
          className="pt-32 pb-20 text-center"
          style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
        >
          <div className="mx-auto max-w-3xl">
            <AnimateInView>
              <Badge
                variant="outline"
                className="mb-6 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5 font-medium px-4 py-1.5"
              >
                {t.badge}
              </Badge>
            </AnimateInView>

            <AnimateInView delay={60}>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.title}
              </h1>
              <p
                className={`text-2xl sm:text-3xl font-semibold mb-6 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "#B8860B" }}
              >
                {t.titleHighlight}
              </p>
            </AnimateInView>

            <AnimateInView delay={120}>
              <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: "var(--lp-text-body)" }}>
                {t.subtitle}
              </p>
            </AnimateInView>

            <AnimateInView delay={160}>
              <SessionPicker locale={locale} />
            </AnimateInView>

            <AnimateInView delay={200}>
              <p className="mt-5 text-sm" style={{ color: "var(--lp-text-muted)" }}>
                {t.recordingNote}
              </p>
            </AnimateInView>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 2. Agenda */}
        <AgendaSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 3. Who it's for (dark section) */}
        <ForWhomSection t={t} locale={locale} />

        {/* 4. Register CTA */}
        <RegisterSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 5. Speaker bio */}
        <SpeakerSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 6. FAQ */}
        <FaqSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 7. Final CTA (dark) */}
        <FinalCtaSection t={t} locale={locale} />
      </main>

      {/* Footer */}
      <footer className="py-16" style={{ borderTop: "1px solid var(--lp-border)", backgroundColor: "#F5F5F7" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight font-[family-name:var(--font-dm-sans)]">
              MOTTO Digital
            </Link>
            <div className="flex items-center gap-6 text-sm" style={{ color: "var(--lp-text-muted)" }}>
              <Link href="/" className="hover:text-[#1D1D1F] transition-colors">Home</Link>
              <Link href="/audit" className="hover:text-[#1D1D1F] transition-colors">Free AI Audit</Link>
              <Link href="/privacy" className="hover:text-[#1D1D1F] transition-colors">Privacy</Link>
              <a href="mailto:rice@mottodigital.jp" className="flex items-center gap-1.5 hover:text-[#1D1D1F] transition-colors">
                <Mail className="size-3.5" />
                rice@mottodigital.jp
              </a>
              <a href="https://www.linkedin.com/in/ricelewis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#1D1D1F] transition-colors">
                <Linkedin className="size-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs" style={{ color: "var(--lp-text-muted)" }}>
            &copy; {new Date().getFullYear()} MOTTO Digital Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
