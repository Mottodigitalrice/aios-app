import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "資料 — AIOS Presentation | MOTTO Digital",
  description:
    "AIOS presentation deck: AI Operating System for Japanese businesses. Learn about our 6-month hands-on program to build, deploy, and own your AI infrastructure.",
  alternates: {
    canonical: "https://aios.mottodigital.jp/presentation",
  },
  openGraph: {
    title: "資料 — AIOS Presentation | MOTTO Digital",
    description:
      "AI Operating System for Japanese businesses. 6-month hands-on program by MOTTO Digital.",
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
