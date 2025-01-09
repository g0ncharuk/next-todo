import { Brand } from "@/components/layout/brand";
import { AuthButton } from "@/components/auth/auth-button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export function Header() {
    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div>
                    <Brand />
                </div>
                <div className="flex gap-4">
                    <DarkModeToggle />

                    <AuthButton />
                </div>
            </div>
        </header>
    );
}
