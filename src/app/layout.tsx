import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});
import dynamic from "next/dynamic";
const AiChat = dynamic(() => import("@/components/AiChat"));
import DotsBackground from "@/components/DotsBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import { AppLoader } from "@/components/ui/app-loader";
import { SoundEffectsProvider } from "@/components/SoundEffectsProvider";

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
  verification: {
    google: "G44CczSUsBYNaA_LxBUWUesC3pizbmi2wqvZQ8x-Y-s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SoundEffectsProvider>
            <AppLoader>
              <DotsBackground />
              <Navbar />
              {children}
              <AiChat />
            </AppLoader>
          </SoundEffectsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
