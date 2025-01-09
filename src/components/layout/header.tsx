import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Brand } from "./brand";

export function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div>
            <Brand />
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
