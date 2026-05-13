import type { Metadata } from "next";
import "./globals.css";
import AiChat from "@/components/AiChat";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ui/scroll-to-top";
import DotsBackground from "@/components/DotsBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "John Lester Fuertes — Portfolio",
  description:
    "Computer Engineering student bridging software and hardware. Web developer, electronics hobbyist, and embedded systems enthusiast.",
  keywords: [
    "John Lester Fuertes",
    "portfolio",
    "computer engineering",
    "web developer",
    "electronics",
    "robotics",
    "React",
    "Next.js",
  ],
  authors: [{ name: "John Lester Fuertes" }],
  openGraph: {
    title: "John Lester Fuertes — Portfolio",
    description:
      "Computer Engineering student bridging software and hardware.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <DotsBackground />
          <Navbar />
          {children}
          <AiChat />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
