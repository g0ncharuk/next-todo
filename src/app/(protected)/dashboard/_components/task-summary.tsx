"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/queries/use-tasks";
import { Status } from "@prisma/client";
import Link from "next/link";
import { LuMoveUpRight } from "react-icons/lu";

export function TaskSummary() {
    const { data: tasks, isLoading, error } = useTasks();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Task Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Loading task summary...</p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Task Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Error loading task summary. Please try again later.</p>
                </CardContent>
            </Card>
        );
    }

    const todoCount =
        tasks?.filter((task) => task.status === Status.TODO).length ?? 0;
    const doneCount =
        tasks?.filter((task) => task.status === Status.DONE).length ?? 0;
    const doingCount =
        tasks?.filter((task) => task.status === Status.DOING).length ?? 0;
    const totalCount = tasks?.length ?? 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Task Summary
                    </h1>
                    <Button
                        asChild
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <Link href={"/tasks"}>
                            <LuMoveUpRight />
                        </Link>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-4 gap-4 text-center items-end ">
                    <div>
                        <dt className="text-sm md:text-md md:mb-2 font-medium text-muted-foreground">
                            Todo
                        </dt>
                        <dd className="text-2xl md:text-5xl font-semibold">
                            {todoCount}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm md:text-md md:mb-2 font-medium text-muted-foreground">
                            In Progress
                        </dt>
                        <dd className="text-2xl md:text-5xl font-semibold">
                            {doingCount}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm md:text-md md:mb-2 font-medium text-muted-foreground">
                            Completed
                        </dt>
                        <dd className="text-2xl md:text-5xl font-semibold">
                            {doneCount}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm md:text-md md:mb-2 font-medium text-muted-foreground">
                            Total Tasks
                        </dt>
                        <dd className="text-2xl md:text-5xl font-semibold">
                            {totalCount}
                        </dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}
