export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex md:h-full md:items-center justify-center">
            {children}
        </div>
    );
}
