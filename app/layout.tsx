import type React from "react";
import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "عطور عمران | Omran Perfume",
  description: "عطور عمران - عطور فاخرة بجودة عالية",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body
        className={`${amiri.variable} font-arial min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-grow ">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
