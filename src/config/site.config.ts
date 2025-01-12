export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Todo App",
    description: "A simple todo app",
    siteItems: [
        {
            title: "Dashboard",
            href: "/dashboard",
            meta: {
                title: "Todo App | Dashboard",
                description: "Dashboard page for the todo app",
            },
        },
        {
            title: "Tasks",
            href: "/tasks",
            meta: {
                title: "Todo App | Tasks",
                description: "Tasks page for the todo app",
            },
        },
    ],
};
