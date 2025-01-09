"use client";

import Providers from "@/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "./footer";

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <Header />
            <main className="min-h-svh h-full bg-background flex flex-col">
                <div className="grow container p-4">{children}</div>
            </main>
            <Footer />
        </Providers>
    );
}
