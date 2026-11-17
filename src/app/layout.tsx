import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GlitchScramble from "@/components/GlitchScramble";
import "./globals.css";

const berkeleyMono = localFont({
  src: [
    {
      path: "../../public/fonts/BerkeleyMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BerkeleyMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/BerkeleyMono-Oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/BerkeleyMono-Bold-Oblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-berkeley-mono",
  display: "swap",
});

// Display typefaces shown in the Typefaces project specimen.
const cyberPlate = localFont({
  src: "../../public/fonts/CyberPlate-Regular.woff2",
  variable: "--font-cyber-plate",
  display: "block",
});

const fatPixel = localFont({
  src: "../../public/fonts/FatPixel-Regular.woff2",
  variable: "--font-fat-pixel",
  display: "block",
});

const level = localFont({
  src: "../../public/fonts/Level-Regular.woff2",
  variable: "--font-level",
  display: "block",
});

const shashki = localFont({
  src: "../../public/fonts/Shashki.woff2",
  variable: "--font-shashki",
  display: "block",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mark Uraine",
  description:
    "Design Leader building teams that build products. Experience at Automattic, WordPress, and Shopmonkey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${berkeleyMono.variable} ${robotoMono.variable} ${cyberPlate.variable} ${fatPixel.variable} ${level.variable} ${shashki.variable} font-mono antialiased bg-zinc-950 text-zinc-400`}
      >
        {children}
        <div className="crt" aria-hidden="true" />
        <GlitchScramble />
        <Analytics />
        <script
          src="https://getreactions.app/embed.js"
          data-org-token="97d2118dc505478ab3333218b6f4d764"
          defer
        ></script>
      </body>
    </html>
  );
}
