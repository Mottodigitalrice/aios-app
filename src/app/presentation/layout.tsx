import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "資料 — AIOS Presentation | Mottodigital",
  description:
    "AIOS presentation deck: AI Operating System for Japanese businesses. Learn about our 6-month hands-on program to build, deploy, and own your AI infrastructure.",
  alternates: {
    canonical: "https://aios.mottodigital.jp/presentation",
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: "資料 — AIOS Presentation | Mottodigital",
    description:
      "AI Operating System for Japanese businesses. 6-month hands-on program by Mottodigital.",
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
