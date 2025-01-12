"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasks } from "@/queries/use-tasks";
import { Status } from "@prisma/client";

const chartConfig = {
    todo: {
        label: "ToDo",
        color: "hsl(var(--chart-1))",
    },
    done: {
        label: "Done",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ProgressChart() {
    const { data: tasks, isLoading, error } = useTasks();

    const todoCount =
        tasks?.filter((task) => task.status === Status.TODO).length ?? 0;
    const doneCount =
        tasks?.filter((task) => task.status === Status.DONE).length ?? 0;
    const totalCount = tasks?.length ?? 0;

    const chartData = React.useMemo(
        () => [
            { type: "todo", count: todoCount, fill: "var(--color-todo)" },
            { type: "done", count: doneCount, fill: "var(--color-done)" },
        ],
        [todoCount, doneCount]
    );

    if (isLoading) {
        return (
            <Card className="flex flex-col">
                <CardContent>Loading...</CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="flex flex-col">
                <CardContent>Error loading tasks</CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Task Progress</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[120px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="type"
                            innerRadius={35}
                            strokeWidth={4}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalCount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
