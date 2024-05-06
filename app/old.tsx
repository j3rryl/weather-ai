import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AI } from "@/components/layout/aibar";
import { WeatherAI } from "./server-actions/weather";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
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
          <WeatherAI>
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </WeatherAI>
        </AI>
      </body>
    </html>
  );
}
