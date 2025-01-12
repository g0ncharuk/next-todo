import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Providers from "@/providers";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/config/site.config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body
                className={`bg-background flex flex-col min-h-svh ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProvider session={session}>
                    <Providers>
                        <main className="grid min-h-screen grid-rows-[auto_1fr] gap-y-4" data-testid="main-content">
                            <Header />
                            <div className="grow container px-4 md:py-4">
                                {children}
                            </div>
                        </main>
                        <Footer />
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
