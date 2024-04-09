import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviders from "./providers/AuthProvider";
import { Session, getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import ExpiredAlert from "./components/ExpiredAlert";
import { ThemeProvider } from "./providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProviders>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <main>{children}</main>
            <Toaster richColors position="top-center" closeButton />
          </ThemeProvider>
        </body>
      </html>
    </AuthProviders>
  );
}
