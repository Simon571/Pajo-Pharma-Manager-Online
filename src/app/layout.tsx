import type { Metadata } from 'next';
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from "@/lib/utils"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Gestionnaire PajoPharma',
  description: 'Système de Gestion de Pharmacie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
