import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LANLAN STORE - Sewa Bot Whatsapp",
  description: "Dapatkan Bot Whatsapp dengan harga terjangkau. Pilih paket BIASA atau PREMIUM sesuai kebutuhan Anda.",
  keywords: ["LANLAN STORE", "Sewa", "Bot Whatsapp", "Paket Premium", "Akses Premium"],
  authors: [{ name: "LANLAN STORE" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "LANLAN STORE - Sewa Bot Whatsapp",
    description: "Dapatkan akses premium dengan harga terjangkau",
    siteName: "LANLAN STORE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LANLAN STORE - Sewa Bot Whatsapp",
    description: "Dapatkan akses premium dengan harga terjangkau",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
