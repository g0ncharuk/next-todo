export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full items-center justify-center">
            {children}
        </div>
    );
}
