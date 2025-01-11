import Link from "next/link";
import LogoIcon from "../icons/logo";
import { cn } from "@/lib/utils";

export function Brand({
    name,
    className,
}: {
    name?: string;
    className?: string;
}) {
    return (
        <Link href="/" className="group flex gap-2 items-center">
            <LogoIcon />
            <p
                className={cn(
                    "hidden md:inline-block text-lg font-bold group-hover:underline",
                    className
                )}
            >
                {name}
            </p>
        </Link>
    );
}
