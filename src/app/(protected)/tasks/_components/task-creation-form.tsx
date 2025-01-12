"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TaskFormValues, taskSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/queries/use-tasks";
import { Priority, Task } from "@prisma/client";

export function TaskCreationForm({
    task,
    shortForm = false,
}: {
    task?: Task;
    shortForm?: boolean;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createTask = useCreateTask();

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id: undefined,
            title: "",
            content: "",
            priority: Priority.MEDIUM,
        },
    });

    useEffect(() => {
        if (task) {
            form.reset({
                id: task.id ?? undefined,
                title: task.title,
                content: task.content ?? "",
                priority: task.priority,
            });
        }
    }, [task, form]);

    const onSubmit = async (values: TaskFormValues) => {
        setIsSubmitting(true);
        await createTask.mutateAsync(
            {
                title: values.title,
                content: values.content ?? null,
                priority: values.priority!,
            },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                    form.reset();
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 md:space-y-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!shortForm && (
                    <>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter content"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Priority.LOW}>
                                                Low
                                            </SelectItem>
                                            <SelectItem value={Priority.MEDIUM}>
                                                Medium
                                            </SelectItem>
                                            <SelectItem value={Priority.HIGH}>
                                                High
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
            </form>
        </Form>
    );
}
