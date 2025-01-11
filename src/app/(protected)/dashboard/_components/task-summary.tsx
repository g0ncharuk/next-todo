import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskSummary() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Total Tasks
                        </dt>
                        <dd className="text-2xl font-semibold">25</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Completed
                        </dt>
                        <dd className="text-2xl font-semibold">12</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            In Progress
                        </dt>
                        <dd className="text-2xl font-semibold">8</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                            Todo
                        </dt>
                        <dd className="text-2xl font-semibold">5</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}
