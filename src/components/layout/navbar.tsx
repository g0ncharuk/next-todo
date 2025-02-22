"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/layout/brand";
import { AuthButton } from "@/components/auth/auth-button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { siteConfig } from "@/config/site.config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";

export function Navbar({ session }: { session: Session | null }) {
    const pathname = usePathname();

    return (
        <div
            className="container mx-auto p-4 flex items-center justify-between gap-4"
            data-testid="navbar"
        >
            <div>
                <Brand className="text-lg lg:text-3xl" name="Todo App" />
            </div>
            {session?.user && (
                <nav
                    className="hidden md:flex items-center gap-4 text-sm lg:gap-6"
                    data-testid="nav-links"
                >
                    {siteConfig.siteItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-lg transition-colors hover:text-foreground/80 hover:underline",
                                pathname === item.href
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            )}
                            data-testid={`nav-link-${item.title.toLowerCase()}`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            )}

            <div className="flex gap-2 md:gap-4 items-center">
                <DarkModeToggle />
                <AuthButton />
                {session?.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            data-testid="dropdown-trigger"
                        >
                            <Button variant="outline" size={"icon"}>
                                <LuMenu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            data-testid="dropdown-content"
                        >
                            {siteConfig.siteItems.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link
                                        href={item.href}
                                        data-testid={`dropdown-link-${item.title.toLowerCase()}`}
                                    >
                                        {item.title}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
