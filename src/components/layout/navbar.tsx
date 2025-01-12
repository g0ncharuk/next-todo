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
        <div className="container mx-auto p-4 flex items-center justify-between gap-4">
            <div>
                <Brand className="text-lg lg:text-3xl" name="Todo App" />
            </div>

            <div className="flex gap-2 md:gap-4 items-center">
                <DarkModeToggle />
                <AuthButton />
                {session?.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size={"icon"}>
                                <LuMenu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 space-y-1">
                            {siteConfig.siteItems.map((item) => (
                                <DropdownMenuItem
                                    className={cn(
                                        pathname === item.href && "bg-muted/70"
                                    )}
                                    key={item.href}
                                    asChild
                                >
                                    <Link href={item.href}>{item.title}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
