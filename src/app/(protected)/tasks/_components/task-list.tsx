"use client";

import { useTasks } from "@/queries/use-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "./task-item";
import { TaskCreation } from "./task-creation";
import { TaskCreationForm } from "./task-creation-form";

export function TaskList() {
    const { data: tasks, isLoading } = useTasks();

    return (
        <div className="flex items-start gap-4">
            <Card className="w-full shadow-md">
                <CardHeader className="p-3 md:p-4 flex flex-row justify-between items-center">
                    <CardTitle>
                        <h1 className="text-xl md:text-2xl font-bold">Tasks</h1>
                    </CardTitle>
                    <div className="md:hidden">
                        <TaskCreation />
                    </div>
                </CardHeader>
                <CardContent className="p-2 md:p-4">
                    <div className="grid grid-cols-1 gap-2 md:gap-4">
                        {isLoading && (
                            <div className="text-center text-muted-foreground">
                                Loading tasks...
                            </div>
                        )}
                        {tasks?.length === 0 && (
                            <div className="text-center text-muted-foreground">
                                No tasks found
                            </div>
                        )}
                        {tasks?.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="hidden md:block w-1/3 sticky top-24">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-xl md:text-2xl font-bold">
                            Quick Task
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TaskCreationForm />
                </CardContent>
            </Card>
        </div>
    );
}
