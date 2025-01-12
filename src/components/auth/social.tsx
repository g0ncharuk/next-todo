"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div
            className="flex w-full items-center gap-x-2"
            data-testid="social-buttons"
        >
            <Button
                className="w-full"
                size={"lg"}
                variant={"outline"}
                onClick={() => onClick("google")}
                data-testid="social-google-button"
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                size={"lg"}
                variant={"outline"}
                onClick={() => onClick("github")}
                data-testid="social-github-button"
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
}
