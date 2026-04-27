import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, DM_Sans, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-noto-sans-jp", preload: false });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans" });
const shipporiMincho = Shippori_Mincho({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-shippori-mincho", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://aios.mottodigital.jp"),
  title: "AIOS — Build an AI Team That Actually Works | Mottodigital",
  description:
    "Stop being the bottleneck. 6-month AI build program from ¥30,000/month — we build your AI operating system with you and train your team to run it. You own everything.",
  keywords: [
    "AI operating system",
    "AI consulting Japan",
    "AI agent development",
    "business automation Tokyo",
    "Mottodigital",
    "AIエージェント",
    "業務自動化",
    "AI導入支援",
  ],
  authors: [{ name: "Lewis Rice", url: "https://mottodigital.jp" }],
  alternates: {
    canonical: "https://aios.mottodigital.jp",
  },
  openGraph: {
    title: "AIOS — Build an AI Team That Actually Works",
    description:
      "Stop being the bottleneck. 6-month AI build program — we build your AI operating system with you and train your team to run it. You own everything.",
    url: "https://aios.mottodigital.jp",
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
    siteName: "Mottodigital",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIOS — Build an AI Team That Actually Works",
    description:
      "Stop being the bottleneck. 6-month AI build program — we build your AI operating system with you and train your team to run it. You own everything.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${dmSans.variable} ${shipporiMincho.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Mottodigital K.K.",
              description:
                "Build an AI team that actually works. 6-month hands-on program for Japanese SMBs — we build your AI operating system with you and train your team to run it.",
              url: "https://aios.mottodigital.jp",
              founder: {
                "@type": "Person",
                name: "Lewis Rice",
                jobTitle: "CEO",
              },
              priceRange: "¥30,000–¥200,000/月",
              areaServed: {
                "@type": "Country",
                name: "Japan",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "4F Orix Honmachi Building, 1-4-1 Nishihonmachi",
                addressLocality: "Osaka",
                postalCode: "550-0005",
                addressCountry: "JP",
              },
              knowsLanguage: ["en", "ja"],
              serviceType: [
                "AI Consulting",
                "AI Agent Development",
                "Business Automation",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${notoSansJP.className} antialiased font-sans`}>
        <ClerkClientProvider>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
