import { Metadata } from "next";
import { ProgressChart } from "./_components/progress-chart";
import { TaskSummary } from "./_components/task-summary";
import { siteConfig } from "@/config/site.config";
import { QuickTask } from "./_components/quick-task";

export const metadata: Metadata = {
    title:
        siteConfig.siteItems.find((i) => i.href === "/dashboard")?.meta.title ||
        siteConfig.name,
    description:
        siteConfig.siteItems.find((i) => i.href === "/dashboard")?.meta
            .description || siteConfig.description,
};

export default function DashboardPage() {
    return (
        <div className="h-full grid auto-rows-min grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TaskSummary />
            <ProgressChart />
            <QuickTask />
        </div>
    );
}
