import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AI } from "@/components/layout/aibar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather API",
  description: "Weather API Chatbot",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        <AI>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </AI>
      </body>
    </html>
  );
}
