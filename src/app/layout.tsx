import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Libre_Baskerville, Open_Sans } from "next/font/google";

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
  description: "The Generative Encyclopedia",
  metadataBase: new URL("https://ruliad.vercel.app"),
  openGraph: {
    images: ["/rldmet.png"],
  },
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
        <Analytics />
      </body>
    </html>
  );
}
