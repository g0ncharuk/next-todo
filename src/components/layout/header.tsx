import { auth } from "@/lib/auth";
import { Navbar } from "./navbar";

export async function Header() {
    const session = await auth();

    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Navbar session={session} />
        </header>
    );
}
