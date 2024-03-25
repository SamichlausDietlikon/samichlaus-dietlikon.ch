"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Header from "@/components/partials/header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/partials/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          {children}
          <Toaster closeButton richColors />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
