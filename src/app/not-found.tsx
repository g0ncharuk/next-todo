import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="grow grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                    404
                </h1>
                <p className="text-base font-semibold t">Page not found</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/">
                        <Button>Go back home</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
