"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    label: string;
    href: string;
}

export function BackButton({ label, href }: BackButtonProps) {
    return (
        <Button className="w-full font-normal" variant={"link"} asChild  data-testid="back-button">
            <Link href={href} data-testid="back-button-link">{label}</Link>
        </Button>
    );
}
