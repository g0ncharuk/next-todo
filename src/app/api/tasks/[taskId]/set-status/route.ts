import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ taskId: string }> }
) {
    const { taskId } = await context.params;

    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { status } = await request.json();

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId: session.user.id,
            },
        });

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status,
            },
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
