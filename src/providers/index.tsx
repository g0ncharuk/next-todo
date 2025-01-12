"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Toaster } from "@/components/ui/sonner";

export interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const { theme } = useTheme();

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                {children}

                <Toaster
                    theme={theme === "dark" ? "dark" : "light"}
                    richColors
                    closeButton
                    position="top-right"
                />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <ConfirmationDialog />
        </NextThemesProvider>
    );
}
