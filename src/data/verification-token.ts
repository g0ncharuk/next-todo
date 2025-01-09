import { prisma } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const vereficationToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        return vereficationToken;
    } catch {
        return null;
    }
};

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const vereficationToken = await prisma.verificationToken.findFirst({
            where: { email },
        });
        return vereficationToken;
    } catch {
        return null;
    }
};
