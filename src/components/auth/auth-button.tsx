"use client";

// import Link from "next/link";
// import useSessionData from "@/hooks/use-session-data";
// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LuChevronDown, LuLoader2, LuSettings } from "react-icons/lu";
// import { logout } from "@/actions/auth/logout";
// import { LoginButton } from "./login-button";
// import { RegisterButton } from "./register-button";
// import { usePathname } from "next/navigation";

export function AuthButton() {
    // const pathname = usePathname();

    // const isLoginPage = pathname.includes("/login");
    // const isRegisterPage = pathname.includes("/register");
    // // const { user, loading } = useSessionData();

    // const onLogout = () => {
    //     // logout();
    // };

    return (
        <>
            Auth button
            {/* {loading && (
                <Button disabled variant={"outline"}>
                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </Button>
            )}
            {!user && !loading && (
                <div className="flex gap-2">
                    {!isLoginPage && (
                        <LoginButton>
                            <Button variant={"secondary"}>Login</Button>
                        </LoginButton>
                    )}
                    {!isRegisterPage && (
                        <RegisterButton>
                            <Button variant={"outline"}>Registration</Button>
                        </RegisterButton>
                    )}
                </div>
            )}
            {user && (
                <div className="flex">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 rounded-r-none border-r-0 px-2 py-1"
                    >
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@johndoe" />
                            <AvatarFallback className="text-xs">JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-l-none px-2">
                                <LuChevronDown className="h-4 w-4" />
                                <span className="sr-only">Open user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem asChild>
                                <Link href="/settings">
                                    <div className="flex items-center gap-2">
                                        <LuSettings className="h-4 w-4" />
                                        Settings
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onLogout()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )} */}
        </>
    );
}
