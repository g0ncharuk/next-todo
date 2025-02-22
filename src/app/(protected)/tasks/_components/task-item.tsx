"use client";
import { useState } from "react";

import {
    LuArrowDown,
    LuArrowUp,
    LuCalendar,
    LuCheck,
    LuLoader,
    LuTrash,
} from "react-icons/lu";

import { Priority, Status, Task } from "@prisma/client";
import { useDeleteTask, useUpdateStatus } from "@/queries/use-tasks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirmationDialogStore } from "@/stores/confirmation-dialogs.store";
import { cn, formatDate } from "@/lib/utils";

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
                    task.status === Status.TODO
                        ? Status.DOING
                        : task.status === Status.DOING
                        ? Status.DONE
                        : Status.TODO,
            },
            {
                onSettled: () => {
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
                task.status === Status.DONE && "bg-muted/30"
            )}
            data-testid={`task-item-${task.title}`}
        >
            <div className="flex flex-col items-center">
                <Button
                    className="h-8 w-8 md:h-10 md:w-10"
                    size={"icon"}
                    variant={"outline"}
                    onClick={handleStatusChange}
                    data-testid={`task-status-button-${task.title}`}
                >
                    {task.status === Status.DONE && <LuCheck data-testid={`task-status-icon-${task.title}`} />}
                    {isUpdating ||
                        (task.status === Status.DOING && (
                            <LuLoader className="animate-spin" data-testid={`task-loading-icon-${task.title}`} />
                        ))}
                </Button>
            </div>
            <div>
                <div className="text-xs text-muted-foreground" data-testid={`task-status-${task.title}`}>
                    Status:
                    {task.status === Status.DONE
                        ? " Completed"
                        : task.status === Status.DOING
                        ? " In Progress"
                        : " Todo"}
                </div>
                <h3
                    className={cn(
                        "text-lg font-semibold",
                        task.status === Status.DONE && "line-through"
                    )}
                    data-testid={`task-title-${task.title}`}
                >
                    {task.title}
                </h3>
                {task.content && (
                    <p
                        className={cn(
                            "text-sm text-muted-foreground",
                            task.status === Status.DONE && "line-through"
                        )}
                        data-testid={`task-content-${task.title}`}
                    >
                        {task.content}
                    </p>
                )}
                {task.updatedAt && (
                    <p
                        className={cn(
                            "text-sm text-muted-foreground inline-flex items-center mt-2",
                            task.status === Status.DONE && "line-through"
                        )}
                        data-testid={`task-updated-${task.title}`}
                    >
                        <LuCalendar className="size-4 inline mr-2" />
                        {formatDate(task.updatedAt)}
                    </p>
                )}
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-2 items-end md:items-baseline md:gap-4">
                <Button
                    className="h-8 w-8 md:h-10 md:w-10"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={handleDelete}
                    data-testid={`task-delete-button-${task.title}`}
                >
                    {isDeleting ? (
                        <LuLoader className="animate-spin size-5" data-testid={`task-delete-loading-${task.title}`} />
                    ) : (
                        <LuTrash data-testid={`task-delete-icon-${task.title}`} />
                    )}
                </Button>
                <Badge data-testid={`task-priority-${task.title}`}>
                    {task.priority === Priority.HIGH && (
                        <LuArrowUp className="size-4" data-testid={`priority-icon-${task.title}`} />
                    )}
                    {task.priority === Priority.LOW && (
                        <LuArrowDown className="size-4" data-testid={`priority-icon-${task.title}`} />
                    )}
                    {task.priority}
                </Badge>
            </div>
        </div>
    );
}
