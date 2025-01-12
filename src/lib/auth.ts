import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/db";
import { getUserById } from "@/data/user";
import authConfig from "@/lib/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        // error: "/auth/error",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            if (!existingUser) return false;

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
});
