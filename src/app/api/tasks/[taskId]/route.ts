import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ taskId: string }> }
) {
    const { taskId } = await context.params;

    if (!taskId) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
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

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ taskId: string }> }
) {
    const { taskId } = await context.params;

    if (!taskId) {
        return NextResponse.json(
            { error: "Task ID is required" },
            { status: 400 }
        );
    }

    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
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

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
