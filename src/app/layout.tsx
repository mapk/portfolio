import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
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
        className={`${robotoMono.variable} font-mono antialiased bg-zinc-900 text-zinc-300`}
      >
        {children}
      </body>
    </html>
  );
}
