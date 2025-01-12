import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Task } from "@prisma/client";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const tasks = await prisma.$queryRaw<Task[]>`
        SELECT *
        FROM "tasks"
        WHERE "user_id" = ${session.user.id}
        ORDER BY
          CASE
            WHEN status = 'DOING' THEN 1
            WHEN status = 'TODO' THEN 2
            WHEN status = 'DONE' THEN 3
            ELSE 4
          END,
          CASE
            WHEN priority = 'HIGH' THEN 1
            WHEN priority = 'MEDIUM' THEN 2
            WHEN priority = 'LOW' THEN 3
            ELSE 4
          END,
          "createdAt" DESC
      `;

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { title, content, priority } = body;
        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }
        const newTask = await prisma.task.create({
            data: {
                title,
                content: content || null,
                priority: priority || "MEDIUM",
                userId: session.user.id,
            },
        });

        return NextResponse.json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
