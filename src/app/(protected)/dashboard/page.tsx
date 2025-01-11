import { TaskSummary } from "./_components/task-summary";

export default function DashboardPage() {
    return (
        <div className="h-full grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TaskSummary />
            <TaskSummary />
            <TaskSummary />
            <TaskSummary />
        </div>
    );
}
