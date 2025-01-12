"use client";

import { useCallback, useMemo } from "react";
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
    doing: {
        label: "In Progress",
        color: "hsl(var(--chart-2))",
    },
    done: {
        label: "Completed",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function ProgressChart() {
    const { data: tasks, isLoading, error } = useTasks();

    const renderFallback = useCallback(() => {
        if (isLoading) return "Loading...";
        if (error) return "Error loading tasks";
        if (!tasks || tasks.length === 0) return "No tasks found";
        return null;
    }, [isLoading, error, tasks]);

    const fallbackContent = renderFallback();

    const [todoCount, doneCount, doingCount, totalCount = 0] = useMemo(() => {
        if (!tasks) {
            return [0, 0, 0];
        }
        let todo = 0;
        let done = 0;
        let doing = 0;
        for (const task of tasks) {
            if (task.status === Status.TODO) todo++;
            if (task.status === Status.DOING) doing++;
            if (task.status === Status.DONE) done++;
        }
        return [todo, done, doing, tasks.length];
    }, [tasks]);

    const chartData = useMemo(
        () => [
            { type: "todo", count: todoCount, fill: chartConfig.todo.color },
            { type: "doing", count: doingCount, fill: chartConfig.doing.color },
            { type: "done", count: doneCount, fill: chartConfig.done.color },
        ],
        [todoCount, doneCount, doingCount]
    );

    if (fallbackContent) {
        return (
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Task Progress</CardTitle>
                </CardHeader>
                <CardContent>{fallbackContent}</CardContent>
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
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
