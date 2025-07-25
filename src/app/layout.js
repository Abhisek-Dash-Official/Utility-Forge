import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Utility Forge",
  description:
    "One place for all your useful tools — from calculators to converters. No ads, no nonsense.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gradient-to-br from-[#1a0033] to-[#0a001a] overscroll-none m-0 p-0 box-border">
        <NextTopLoader color="#9333ea" shadow={true} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
