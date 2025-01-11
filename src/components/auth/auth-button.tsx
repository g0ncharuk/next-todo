"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useConfirmationDialogStore } from "@/stores/confirmation-dialogs.store";

export const AuthButton = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { data: session, status } = useSession();

    const isLoginPage = pathname.includes("auth/login");
    const isRegisterPage = pathname.includes("auth/registration");
    const openDialog = useConfirmationDialogStore((state) => state.openDialog);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        openDialog({
            title: "Logout",
            description: "Are you sure you want to logout?",
            confirmLabel: "Logout",
            onConfirm: () => signOut({ redirectTo: "/", redirect: true }),
        });
    };

    if (mounted && status !== "loading" && status === "unauthenticated") {
        return (
            <div className="flex gap-4">
                {!isLoginPage && (
                    <Button asChild>
                        <Link href="auth/login">Login</Link>
                    </Button>
                )}
                {!isRegisterPage && (
                    <Button asChild variant={"outline"}>
                        <Link href="auth/registration">Registration</Link>
                    </Button>
                )}
            </div>
        );
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex gap-2 md:gap-4 items-center">
            <Button variant={"ghost"} className="flex items-center gap-2 h-10 w-10 md:w-auto">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                        {session?.user.name ? session?.user.name[0] : "U"}
                    </AvatarFallback>
                </Avatar>
                <span className="hidden md:flex">{session?.user.name}</span>
            </Button>
            <Button onClick={() => handleLogout()} variant={"outline"}>
                Logout
            </Button>
        </div>
    );
};
