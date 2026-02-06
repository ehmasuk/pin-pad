import { Geist_Mono, Inter } from "next/font/google";

import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";
import { Metadata } from "next";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: {
    default: "PinPad – Instantly Write and Share Notes",
    template: "%s | PinPad",
  },
  description:
    "PinPad lets you instantly create and share notes using custom links, no login required. Collaborate live, protect notes with a password, and share text or code effortlessly.",
  keywords: [
    "note sharing",
    "share notes online",
    "collaborative notes",
    "real-time notes",
    "no login notes",
    "paste notes online",
    "share code snippets",
    "pinpad",
  ],
  authors: [{ name: "PinPad" }],
  creator: "PinPad",
  publisher: "PinPad",

  metadataBase: new URL("https://pinpad.vercel.app"),

  openGraph: {
    title: "PinPad – Instantly Share Notes with Custom Links",
    description:
      "Create a note, share a custom link, collaborate live, and secure it with a password — all without signing up.",
    url: "https://pinpad.vercel.app",
    siteName: "PinPad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PinPad – Share Notes Instantly",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PinPad – Instantly Write and Share Notes",
    description:
      "No login. Custom links. Live collaboration. Password protection. Share notes instantly with PinPad.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
