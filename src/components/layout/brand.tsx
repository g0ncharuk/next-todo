import Link from "next/link";
import LogoIcon from "../icons/logo";

export function Brand() {
    return (
        <Link href="/" className="group flex gap-2 items-center">
            <LogoIcon />
            <p className="text-lg font-bold group-hover:underline">Todo App</p>
        </Link>
    );
}
