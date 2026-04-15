"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Clock, Monitor, CheckCircle2, Loader2, Briefcase, Lightbulb, Target } from "lucide-react";
import { MobileNav } from "@/components/landing/mobile-nav";
import { AnimateInView } from "@/components/landing/animate-in-view";
import { budouxWrap } from "@/lib/budoux-transform";

import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

// ─── Config ──────────────────────────────────────────────────────────────────
const SESSIONS = [
  { id: "fri-apr17", dayEn: "Friday",    dayJa: "金曜日",   dateEn: "April 17",  dateJa: "4月17日", timeEn: "2:00 PM JST",  timeJa: "14:00（日本時間）" },
  { id: "mon-apr20", dayEn: "Monday",   dayJa: "月曜日",   dateEn: "April 20",  dateJa: "4月20日", timeEn: "3:00 PM JST",  timeJa: "15:00（日本時間）" },
  { id: "wed-apr22", dayEn: "Wednesday",dayJa: "水曜日",   dateEn: "April 22",  dateJa: "4月22日", timeEn: "8:00 PM JST",  timeJa: "20:00（日本時間）" },
  { id: "thu-apr23", dayEn: "Thursday", dayJa: "木曜日",   dateEn: "April 23",  dateJa: "4月23日", timeEn: "2:00 PM JST",  timeJa: "14:00（日本時間）" },
];

const REFERRAL_OPTIONS = [
  { id: "kawamura", labelEn: "Kawamura san", labelJa: "河村さん" },
  { id: "ishikawa", labelEn: "Ishikawa san", labelJa: "石川さん" },
  { id: "fuji",     labelEn: "Fuji san",     labelJa: "藤井さん" },
  { id: "other",    labelEn: "Other",         labelJa: "その他" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Locale = "en" | "ja";
const dictionaries = { en, ja } as const;

// ─── Hero session cards (click → scroll to form + pre-select) ────────────────
function SessionCards({ locale, onSelect }: { locale: Locale; onSelect: (id: string) => void }) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium mb-4" style={{ color: "var(--lp-text-muted)" }}>
        {locale === "ja" ? "参加したい日程を選んでください" : "Choose your session to register"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SESSIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="group flex flex-col items-center gap-1 px-3 py-4 rounded-2xl text-center transition-all hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
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
              {locale === "ja" ? "登録する" : "Register"}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {[
          { icon: <Monitor className="size-3.5" />, label: locale === "ja" ? "Google Meet（無料）" : "Google Meet (free)" },
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

// ─── Registration form ────────────────────────────────────────────────────────
function RegistrationForm({ locale, preselectedDate }: { locale: Locale; preselectedDate: string }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    date: preselectedDate,
    referralSources: [] as string[],
    referralOther: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  // Sync preselected date when it changes (from session card clicks)
  useEffect(() => {
    if (preselectedDate) setForm((f) => ({ ...f, date: preselectedDate }));
  }, [preselectedDate]);

  const ja = locale === "ja";

  const labels = {
    firstName:   ja ? "名" : "First Name",
    lastName:    ja ? "姓" : "Last Name",
    email:       ja ? "メールアドレス" : "Email",
    company:     ja ? "会社名" : "Company Name",
    date:        ja ? "参加希望日程" : "Which session?",
    referral:    ja ? "どこでお知りになりましたか？" : "How did you hear about this?",
    otherLabel:  ja ? "その他（詳しくお聞かせください）" : "Other (please specify)",
    submit:      ja ? "参加登録する（無料）" : "Register Now — Free",
    submitting:  ja ? "送信中..." : "Submitting...",
    required:    ja ? "必須項目を入力してください" : "Please fill in all required fields",
  };

  function toggleReferral(id: string) {
    setForm((f) => ({
      ...f,
      referralSources: f.referralSources.includes(id)
        ? f.referralSources.filter((r) => r !== id)
        : [...f.referralSources, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.date) {
      setErrorMsg(labels.required);
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-request-id": `${Date.now()}-${Math.random()}` },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#B8860B] transition-shadow";
  const inputStyle = {
    backgroundColor: "#fff",
    border: "1px solid var(--lp-border)",
    color: "var(--lp-text-heading)",
  };

  if (status === "success") {
    return (
      <div ref={successRef} className="text-center py-12 px-6">
        <div className="size-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#B8860B15" }}>
          <CheckCircle2 className="size-8" style={{ color: "#B8860B" }} />
        </div>
        <h3
          className={`text-2xl font-bold mb-3 ${ja ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
          style={{ color: "var(--lp-text-heading)" }}
        >
          {ja ? "ご登録ありがとうございます！" : "You're registered!"}
        </h3>
        <p className="text-base leading-relaxed max-w-sm mx-auto" style={{ color: "var(--lp-text-body)" }}>
          {ja
            ? "Lewisより、ミーティングリンクと詳細をご連絡いたします。"
            : "Lewis will be in touch with your meeting link and session details."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--lp-text-muted)" }}>
            {labels.firstName} <span style={{ color: "#B8860B" }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className={inputClass}
            style={inputStyle}
            placeholder={ja ? "太郎" : "Taro"}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--lp-text-muted)" }}>
            {labels.lastName}
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className={inputClass}
            style={inputStyle}
            placeholder={ja ? "山田" : "Yamada"}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--lp-text-muted)" }}>
          {labels.email} <span style={{ color: "#B8860B" }}>*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputClass}
          style={inputStyle}
          placeholder="you@company.com"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--lp-text-muted)" }}>
          {labels.company}
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className={inputClass}
          style={inputStyle}
          placeholder={ja ? "株式会社〇〇" : "Company Inc."}
        />
      </div>

      {/* Date selection */}
      <div>
        <label className="block text-xs font-medium mb-3" style={{ color: "var(--lp-text-muted)" }}>
          {labels.date} <span style={{ color: "#B8860B" }}>*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SESSIONS.map((s) => {
            const selected = form.date === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, date: s.id }))}
                className="flex flex-col items-center gap-0.5 px-2 py-3 rounded-xl text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                style={{
                  backgroundColor: selected ? "#B8860B" : "var(--lp-bg-secondary, #F5F5F7)",
                  border: selected ? "1px solid #B8860B" : "1px solid var(--lp-border)",
                  color: selected ? "#fff" : "var(--lp-text-heading)",
                }}
              >
                <span className="text-[10px] font-medium opacity-80">
                  {locale === "ja" ? s.dayJa : s.dayEn}
                </span>
                <span className={`text-sm font-bold leading-tight ${ja ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}>
                  {locale === "ja" ? s.dateJa : s.dateEn}
                </span>
                <span className="text-[10px] opacity-80">
                  {locale === "ja" ? s.timeJa : s.timeEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Referral checkboxes */}
      <div>
        <label className="block text-xs font-medium mb-3" style={{ color: "var(--lp-text-muted)" }}>
          {labels.referral}
        </label>
        <div className="flex flex-col gap-2">
          {REFERRAL_OPTIONS.map((opt) => {
            const checked = form.referralSources.includes(opt.id);
            return (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className="size-5 rounded flex-shrink-0 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: checked ? "#B8860B" : "#fff",
                    border: checked ? "1px solid #B8860B" : "1px solid var(--lp-border)",
                  }}
                  onClick={() => toggleReferral(opt.id)}
                >
                  {checked && <CheckCircle2 className="size-3 text-white" />}
                </div>
                <span
                  className="text-sm select-none"
                  style={{ color: "var(--lp-text-body)" }}
                  onClick={() => toggleReferral(opt.id)}
                >
                  {locale === "ja" ? opt.labelJa : opt.labelEn}
                </span>
              </label>
            );
          })}
        </div>

        {/* Other free text */}
        {form.referralSources.includes("other") && (
          <div className="mt-3">
            <input
              type="text"
              value={form.referralOther}
              onChange={(e) => setForm((f) => ({ ...f, referralOther: e.target.value }))}
              className={inputClass}
              style={inputStyle}
              placeholder={labels.otherLabel}
            />
          </div>
        )}
      </div>

      {/* Error */}
      {(errorMsg || status === "error") && (
        <p className="text-sm" style={{ color: "#DC2626" }}>
          {status === "error"
            ? (ja ? "エラーが発生しました。もう一度お試しください。" : "Something went wrong. Please try again.")
            : errorMsg}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full rounded-full text-base py-6 font-semibold mt-2 hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#B8860B", color: "#fff" }}
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {labels.submitting}
          </span>
        ) : labels.submit}
      </Button>
    </form>
  );
}

// ─── Other sections ───────────────────────────────────────────────────────────
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
                <span className="text-sm font-bold flex-shrink-0 mt-0.5 w-7 text-center tabular-nums" style={{ color: "#B8860B" }}>{String(i + 1).padStart(2, "0")}</span>
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

const FOR_WHOM_ICONS = [Briefcase, Lightbulb, Target];

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
          {t.forWhomItems.map((item, i) => {
            const Icon = FOR_WHOM_ICONS[i];
            return (
            <AnimateInView key={i} delay={i * 80}>
              <div className="flex flex-col gap-3 p-6 rounded-2xl h-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon className="size-6" style={{ color: "#B8860B" }} />
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
          );
          })}
        </div>
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
                  style={{ color: "#B8860B", transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WebinarPage() {
  const locale: Locale = "ja";
  const [preselectedDate, setPreselectedDate] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const rawT = dictionaries[locale].webinar;
  const t = useMemo(
    () => budouxWrap(rawT) as unknown as typeof en.webinar,
    [rawT],
  );

  useEffect(() => {
    document.documentElement.lang = "ja";
  }, []);

  function handleSessionSelect(id: string) {
    setPreselectedDate(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
              Mottodigital
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="rounded-full text-sm px-5 py-2 font-semibold transition-colors hover:opacity-90"
                style={{ backgroundColor: "#B8860B", color: "#fff" }}
              >
                {t.registerCta}
              </button>
            </div>
            <div className="flex sm:hidden items-center gap-3">
              <MobileNav locale={locale} />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* 1. Hero */}
        <section className="pt-32 pb-20 text-center px-6">
          <div className="mx-auto max-w-3xl">
            <AnimateInView>
              <Badge variant="outline" className="mb-6 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5 font-medium px-4 py-1.5">
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
              <SessionCards locale={locale} onSelect={handleSessionSelect} />
            </AnimateInView>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 2. Agenda */}
        <AgendaSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 3. Who it's for */}
        <ForWhomSection t={t} locale={locale} />

        {/* 4. Registration form */}
        <section
          id="register"
          style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
        >
          <div className="mx-auto max-w-lg px-6" ref={formRef}>
            <AnimateInView className="text-center mb-8">
              <h2
                className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.registerTitle}
              </h2>
              <p className="text-base" style={{ color: "var(--lp-text-muted)" }}>
                {t.registerSubtitle}
              </p>
            </AnimateInView>
            <AnimateInView delay={60}>
              <div
                className="p-6 sm:p-8 rounded-3xl"
                style={{ backgroundColor: "#fff", border: "1px solid var(--lp-border)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <RegistrationForm locale={locale} preselectedDate={preselectedDate} />
              </div>
            </AnimateInView>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 5. Speaker */}
        <SpeakerSection t={t} locale={locale} />

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 6. FAQ */}
        <FaqSection t={t} locale={locale} />

        {/* 7. Final CTA */}
        <section style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)", backgroundColor: "#1D1D1F" }}>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <AnimateInView>
              <h2
                className={`text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
              >
                {t.finalCtaTitle}
              </h2>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="rounded-full text-base px-8 py-4 font-semibold hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: "#B8860B", color: "#fff" }}
              >
                {t.finalCtaButton}
              </button>
              <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {t.finalCtaContact}
              </p>
            </AnimateInView>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16" style={{ borderTop: "1px solid var(--lp-border)", backgroundColor: "#F5F5F7" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight font-[family-name:var(--font-dm-sans)]">
              Mottodigital
            </Link>
            <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: "var(--lp-text-muted)" }}>
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
            &copy; {new Date().getFullYear()} Mottodigital K.K. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
