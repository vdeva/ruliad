import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

const lb = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lb",
});
const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Ruliad",
  description: "The infinite wiki.",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <body className={`${lb.variable} ${opensans.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
