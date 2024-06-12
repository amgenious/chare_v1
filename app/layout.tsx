import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chare",
  description: "Share files faster with CHARE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
        >
          <Toaster />
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
