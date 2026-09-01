import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";
import { baseUrl } from "@/content/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Marcus Kwan · Selected Works",
  description: "An archive of systems, benchmarks, and visual experiments.",
  authors: [{ name: "Marcus Kwan", url: baseUrl }],
  creator: "Marcus Kwan",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1012" },
  ],
};

const themeScript = `(function(){try{var s=localStorage.getItem('data-theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(_){document.documentElement.setAttribute('data-theme','light')}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body><SiteFrame>{children}</SiteFrame></body>
    </html>
  );
}
