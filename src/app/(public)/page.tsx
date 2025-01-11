import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Welcome to Todo
                    </h1>
                    <p className="text-lg text-foreground/60 sm:text-xl md:text-2xl lg:text-3xl">
                        The ultimate task management tool you&apos;ve never seen
                        before..
                    </p>

                    <Button asChild>
                        <Link href="/auth/login">Get started</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
