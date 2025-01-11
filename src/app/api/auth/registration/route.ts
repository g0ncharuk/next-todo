import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { RegistrationSchema } from "@/schemas";

export async function POST(request: Request) {
    const payload = await request.json();

    const validatedFields = RegistrationSchema.safeParse(payload);

    if (!validatedFields.success) {
        return NextResponse.json(
            { errors: validatedFields.error.errors },
            { status: 400 }
        );
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return NextResponse.json(
            {
                errors: [
                    {
                        field: "email",
                        message: "User already exists",
                    },
                ],
            },
            { status: 400 }
        );
    }

    const createdUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    createdUser.password = null;

    return NextResponse.json(createdUser);
}
