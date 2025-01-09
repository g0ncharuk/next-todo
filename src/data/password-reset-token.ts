import { prisma } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        return resetToken;
    } catch {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const resetToken = await prisma.passwordResetToken.findFirst({
            where: { email },
        });
        return resetToken;
    } catch {
        return null;
    }
};
