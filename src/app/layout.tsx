import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
import AiChat from "@/components/AiChat";
import ScrollProgress from "@/components/ScrollProgress";
import DotsBackground from "@/components/DotsBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import { AppLoader } from "@/components/ui/app-loader";

export const metadata: Metadata = {
  title: "John Lester Fuertes — Portfolio",
  description:
    "Computer Engineering graduate building web applications and hardware circuits. Web developer, electronics hobbyist, and embedded systems enthusiast.",
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
      "Computer Engineering graduate building web applications and hardware circuits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppLoader>
            <ScrollProgress />
            <DotsBackground />
            <Navbar />
            {children}
            <AiChat />
          </AppLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
