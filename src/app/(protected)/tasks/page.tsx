import { Metadata } from "next";
import { TaskList } from "./_components/task-list";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
    title:
        siteConfig.siteItems.find((i) => i.href === "/tasks")?.meta.title ||
        siteConfig.name,
    description:
        siteConfig.siteItems.find((i) => i.href === "/tasks")?.meta
            .description || siteConfig.description,
};

export default function TasksPage() {
    return <TaskList />;
}
