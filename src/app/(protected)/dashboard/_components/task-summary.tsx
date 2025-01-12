"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/queries/use-tasks";
import { Status } from "@prisma/client";

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
    const totalCount = tasks?.length ?? 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Todo
                        </dt>
                        <dd className="text-2xl font-semibold">{todoCount}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Completed
                        </dt>
                        <dd className="text-2xl font-semibold">{doneCount}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Total Tasks
                        </dt>
                        <dd className="text-2xl font-semibold">{totalCount}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}
