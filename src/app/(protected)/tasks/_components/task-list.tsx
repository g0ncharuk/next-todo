"use client";
import { useState } from "react";

import { LuCheck, LuLoader, LuTrash } from "react-icons/lu";

import { Task } from "@prisma/client";
import { useTasks, useDeleteTask, useUpdateStatus } from "@/queries/use-tasks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TaskCreation } from "./task-creation";
import { useConfirmationDialogStore } from "@/stores/confirmation-dialogs.store";
import { cn } from "@/lib/utils";

export function TaskList() {
    const { data: tasks, isLoading } = useTasks();

    return (
        <div className="flex flex-col md-f items-start gap-4">
            <Card className="w-full shadow-md">
                <CardHeader className="p-3 md:p-4 flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Tasks</h1>
                    </div>
                    <TaskCreation />
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
        </div>
    );
}

export function TaskItem({ task }: { task: Task }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const openDialog = useConfirmationDialogStore((state) => state.openDialog);

    const deleteTask = useDeleteTask();
    const updateTaskStatus = useUpdateStatus();

    const handleStatusChange = async () => {
        setIsUpdating(true);
        await updateTaskStatus.mutateAsync(
            {
                taskId: task.id,
                status:
                    task.status === "TODO"
                        ? "DONE"
                        : // TODO can use for mark in progress status
                          // : task.status === "DOING"
                          // ? "DONE"
                          "TODO",
            },
            {
                onSettled: (task) => {
                    if (task?.status === "DONE") {
                    }

                    setIsUpdating(false);
                },
            }
        );
    };

    const handleDelete = async () => {
        openDialog({
            title: "Delete Task",
            description: `Are you sure you want to delete the task "${task.title}"?`,
            onConfirm: async () => {
                setIsDeleting(true);
                await deleteTask.mutateAsync(task.id, {
                    onSettled: () => {
                        setIsDeleting(false);
                    },
                });
            },
        });
    };

    return (
        <div
            className={cn(
                "grid grid-cols-[auto_1fr_auto] border justify-between bg-muted/70 rounded-md p-2 gap-2 md:p-4 md:gap-4",
                task.status === "DONE" && "bg-muted/30"
            )}
        >
            <div className="flex flex-col item-center">
                <Button
                    className="h-8 w-8 md:h-10 md:w-10"
                    size={"icon"}
                    variant={"outline"}
                    onClick={handleStatusChange}
                >
                    {task.status === "DONE" && <LuCheck />}
                    {isUpdating ||
                        (task.status === "DOING" && (
                            <LuLoader className="animate-spin " />
                        ))}
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                    {task.status}
                </div>
            </div>
            <div>
                <h3
                    className={cn(
                        "text-lg font-semibold",
                        task.status === "DONE" && "line-through"
                    )}
                >
                    {task.title}
                </h3>
                {task.content && (
                    <p
                        className={cn(
                            "text-sm text-muted-foreground",
                            task.status === "DONE" && "line-through"
                        )}
                    >
                        {task.content}
                    </p>
                )}
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-2 items-end md:items-baseline md:gap-4">
                <Button
                    className="h-8 w-8 md:h-10 md:w-10"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={handleDelete}
                >
                    {isDeleting ? (
                        <LuLoader className="animate-spin sige-5 " />
                    ) : (
                        <LuTrash />
                    )}
                </Button>
                <Badge>
                    {task.priority === "HIGH" && <ArrowUp className="size-4" />}
                    {task.priority === "LOW" && (
                        <ArrowDown className="size-4" />
                    )}
                    {task.priority}
                </Badge>
            </div>
        </div>
    );
}
