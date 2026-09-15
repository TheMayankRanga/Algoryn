import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeAmbience } from "@/components/theme-ambience";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algoryn | DSA Learning Platform",
  description: "See algorithms. Understand patterns. Solve problems with Algoryn, an interactive Data Structures and Algorithms learning platform.",
  openGraph: {
    title: "Algoryn | DSA Learning Platform",
    description: "See algorithms. Understand patterns. Solve problems.",
    siteName: "Algoryn",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100"><ThemeAmbience />{children}</body>
    </html>
  );
}
