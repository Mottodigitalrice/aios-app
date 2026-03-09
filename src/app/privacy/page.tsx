import type { Metadata } from "next";
import { Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
import en from "@/lib/i18n/dictionaries/en";

export const metadata: Metadata = {
  title: "Privacy Policy | AIOS — MOTTO Digital",
  description:
    "Privacy policy for AIOS by MOTTO Digital. How we collect, use, and protect your data.",
};

const { privacy } = en;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern">
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
          <Link
            href="/audit"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Audit</span>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {privacy.title}
        </h1>
        <p className="text-zinc-500 text-sm mb-10">{privacy.lastUpdated}</p>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.intro.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {privacy.sections.intro.content}
            </p>
          </section>

          {/* Data Collected */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.dataCollected.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {privacy.sections.dataCollected.content}
            </p>
          </section>

          {/* How Used */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.howUsed.title}
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 leading-relaxed">
              {privacy.sections.howUsed.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.sharing.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {privacy.sections.sharing.content}
            </p>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.retention.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {privacy.sections.retention.content}
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.rights.title}
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 leading-relaxed">
              {privacy.sections.rights.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              {privacy.sections.contact.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {privacy.sections.contact.content}
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-400"
          >
            <Layers className="size-5 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link
              href="/"
              className="hover:text-zinc-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/audit"
              className="hover:text-zinc-300 transition-colors"
            >
              Free Audit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
