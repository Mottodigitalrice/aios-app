import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "AIOS — AI Operating System for Business | MOTTO Digital",
  description:
    "Build an AI Operating System for your business. Connected to your data, owned by you, locked into nobody. 6-month hands-on program by MOTTO Digital.",
  openGraph: {
    title: "AIOS — AI Operating System for Business",
    description:
      "Connected to your data. Owned by you. Locked into nobody. A systematic approach to AI infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${notoSansJP.className} antialiased`}>
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
