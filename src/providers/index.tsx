import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <ConfirmationDialog />
        </NextThemesProvider>
    );
}
