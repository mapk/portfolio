import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const berkeleyMono = localFont({
  src: [
    { path: "../../public/fonts/BerkeleyMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/BerkeleyMono-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/BerkeleyMono-Oblique.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/BerkeleyMono-Bold-Oblique.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-berkeley-mono",
  display: "swap",
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
        className={`${berkeleyMono.variable} ${robotoMono.variable} font-mono antialiased bg-zinc-900 text-zinc-400`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
