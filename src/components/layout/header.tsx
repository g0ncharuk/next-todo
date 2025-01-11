"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/layout/brand";
import { AuthButton } from "@/components/auth/auth-button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto p-4 flex items-center justify-between gap-4">
                <div>
                    <Brand className="text-lg lg:text-3xl" name="Todo App" />
                </div>
                {session?.user && (
                    <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "text-lg transition-colors hover:text-foreground/80 hover:underline",
                                pathname === "/dashboard"
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            )}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard"
                            className={cn(
                                "text-lg transition-colors hover:text-foreground/80 hover:underline",
                                pathname === "/tasks"
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            )}
                        >
                            Tasks
                        </Link>
                    </nav>
                )}

                <div className="flex gap-2 items-center">
                    <DarkModeToggle />
                    <AuthButton />
                </div>
            </div>
        </header>
    );
}
