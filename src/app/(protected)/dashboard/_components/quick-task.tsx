"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCreationForm } from "../../tasks/_components/task-creation-form";

export function QuickTask() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Task</CardTitle>
            </CardHeader>
            <CardContent>
                <TaskCreationForm shortForm />
            </CardContent>
        </Card>
    );
}
