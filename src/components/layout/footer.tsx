import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { Brand } from "@/components/layout/brand";

export function Footer() {
    return (
        <footer data-testid="site-footer" className="bg-background">
            <div className="container mx-auto p-4 flex items-center justify-between gap-4">
                <Brand />

                <div>
                    <p className="text-sm text-center text-foreground/60 flex-wrap-reverse">
                        &copy; 2025 Todo App. All rights not reserved.
                    </p>
                </div>
                <div>
                    <Link
                        className=" flex gap-2 items-centerhover:underline"
                        href="https://github.com/g0ncharuk"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <FaGithub className="size-5" />
                        <span className="hidden md:inline-block">
                            g0ncharuk
                        </span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
