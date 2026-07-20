import type { Metadata } from "next";
import {
  Geist_Mono,
  Montserrat,
  Poppins,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

/**
 * Poppins covers Latin only; Montserrat (geometrically similar) provides the
 * Cyrillic glyphs for Mongolian text via the font-family fallback chain.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MODULESOFT — Таны бизнесийг өсгөх вэбсайтууд",
    template: "%s · MODULESOFT",
  },
  description:
    "MODULESOFT бол дээд зэрэглэлийн вэбсайтын платформ. Мэргэжлийн загваруудаас сонгож, визуал бүтээгчээр өөрчилж, эсвэл манай студиэс бүрэн захиалгат вэбсайт захиалаарай.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="dark">
      <body
        className={`${poppins.variable} ${montserrat.variable} ${sourceSerif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
