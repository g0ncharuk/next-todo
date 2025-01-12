"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCreationForm } from "../../tasks/_components/task-creation-form";
import { Button } from "@/components/ui/button";
import { LuMoveUpRight } from "react-icons/lu";

export function QuickTask() {
    return (
        <Card>
            <CardHeader>
            <CardTitle className="flex justify-between items-center">

                    <h1 className="text-xl md:text-2xl font-bold">
                        Quick Task
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
                <TaskCreationForm shortForm />
            </CardContent>
        </Card>
    );
}
