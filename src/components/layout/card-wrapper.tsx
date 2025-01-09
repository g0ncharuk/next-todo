import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
// import { Social } from "@/components/auth/social";
// import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}
export const CardWrapper = ({
    children,
    headerLabel,
    // backButtonLabel,
    // backButtonHref,
    showSocial = false,
}: CardWrapperProps) => {
    return (
        <Card className="max-w-[400px] shadow-md md:min-w-[400px]">
            <CardHeader>
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                    <h1 className={"text-3xl font-semibold"}>🔐 Auth</h1>
                    <p className="text-sm text-muted-foreground">
                        {headerLabel}
                    </p>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && <CardFooter>{/* <Social /> */}</CardFooter>}
            <CardFooter>
                {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
            </CardFooter>
        </Card>
    );
};
