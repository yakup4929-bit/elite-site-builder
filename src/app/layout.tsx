import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // A template keeps the brand in the tab on every route without repeating it
  // in each page's own title.
  title: {
    default: "Aeltay Studio — Çok dilli site üretici",
    template: "%s · Aeltay Studio",
  },
  description:
    "İşini bir cümleyle anlat, yayına hazır bir web sitesi al — istediğin kadar dilde, hepsi tek seferde üretilir ve her biri o dilde yazılır. Çeviri değil, üretim.",
  keywords: [
    "çok dilli web sitesi",
    "yapay zeka site kurucu",
    "multilingual website builder",
    "AI website generator",
  ],
  openGraph: {
    title: "Aeltay Studio — Çok dilli site üretici",
    description:
      "Bir cümle yaz, dünyanın konuştuğu dillerde bir site çıksın. Çeviri eklentisi değil; her dil o dilde yazılır.",
    siteName: "Aeltay Studio",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
