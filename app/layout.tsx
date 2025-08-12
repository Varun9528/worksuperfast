// File: app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import 'leaflet/dist/leaflet.css';

// Google Fonts
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Page Metadata (title, description, icons, remixicon css)
export const metadata: Metadata = {
  title: "WorkSuperFast - Find & Post Work Instantly",
  description: "Connect with skilled contractors and find work opportunities across India. Fast, secure, and reliable work platform.",
  icons: {
    icon: "/favicon.ico",
  },
  // 👇 Remix Icon stylesheet loaded via metadata (Next.js will inject it)
  other: {
    "remixicon-css": "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css",
  },
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* 👉 Safe fallback for Remixicon if metadata doesn't inject */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
