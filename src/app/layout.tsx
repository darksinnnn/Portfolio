import type { Metadata } from "next";
import { Syncopate, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ashish Singh — Software Engineer",
  description:
    "Portfolio of Ashish Singh — Java Backend & Cloud Applications Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syncopate.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#0a0a08] text-[#f0ece4] overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
