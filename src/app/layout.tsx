import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hacker House Goa 2026 — HHG.26 Builder Mark & ID Generator",
  description: "Official Decentralized Builder Mark and ID Pass Generator for Hacker House Goa 2026 #FrameInGoa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;700;800&family=Fira+Code:wght@400;600;700&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDF9F0] text-[#151B2B] selection:bg-[#9F452D] selection:text-[#F5F1E8]">
        {children}
      </body>
    </html>
  );
}
