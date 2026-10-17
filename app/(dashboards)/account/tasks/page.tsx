import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TasksView from "@/components/dashboard/tasks/TasksView";

export const metadata: Metadata = {
    title: `Tasks & Reminders | ${BRAND_NAME}`,
    description: "Plan, assign, and track property work and owner reminders.",
};

export default function TasksPage() {
    return (
        <>
            <DashboardHeader title="Tasks" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <TasksView />
            </main>
        </>
    );
}
