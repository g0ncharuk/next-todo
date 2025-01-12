"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TaskCreationForm } from "./task-creation-form";
import { Task } from "@prisma/client";
import { LuPlus, LuPen } from "react-icons/lu";

export function TaskCreation({ task }: { task?: Task }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 w-8 md:h-10 md:w-auto" variant="outline">
                    {task ? (
                        <LuPen className="md:mr-2" />
                    ) : (
                        <LuPlus className="md:mr-2" />
                    )}
                    <span className="hidden md:inline-block">
                        {task ? "Edit Task" : "Add Task"}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task profile</DialogTitle>
                </DialogHeader>
                <TaskCreationForm />
            </DialogContent>
        </Dialog>
    );
}
