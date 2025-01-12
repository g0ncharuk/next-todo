"use client";

import { useTasks } from "@/queries/use-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "./task-item";
import { TaskCreation } from "./task-creation";
import { TaskCreationForm } from "./task-creation-form";

export function TaskList() {
    const { data: tasks, isLoading } = useTasks();

    return (
        <div className="flex items-start gap-4" data-testid="task-list">
            <Card className="w-full shadow-md">
                <CardHeader className="p-3 md:p-4 flex flex-row justify-between items-center">
                    <CardTitle>
                        <h1 className="text-xl md:text-2xl font-bold" data-testid="tasks-title">Tasks</h1>
                    </CardTitle>
                    <div className="md:hidden">
                        <TaskCreation data-testid="task-creation-button" />
                    </div>
                </CardHeader>
                <CardContent className="p-2 md:p-4">
                    <div className="grid grid-cols-1 gap-2 md:gap-4">
                        {isLoading && (
                            <div className="text-center text-muted-foreground" data-testid="loading-tasks">
                                Loading tasks...
                            </div>
                        )}
                        {tasks?.length === 0 && (
                            <div className="text-center text-muted-foreground" data-testid="no-tasks-message">
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
                        <h1 className="text-xl md:text-2xl font-bold" data-testid="quick-task-title">
                            Create Task
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardContent data-testid="quick-task-form">
                    <TaskCreationForm />
                </CardContent>
            </Card>
        </div>
    );
}
