import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BroadcastsView from "@/components/dashboard/broadcasts/BroadcastsView";

export const metadata: Metadata = {
    title: `Broadcasts | ${BRAND_NAME}`,
    description: "Send property updates, reminders, and images to tenants through multiple channels.",
};

export default function BroadcastsPage() {
    return (
        <>
            <DashboardHeader title="Broadcasts" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <BroadcastsView />
            </main>
        </>
    );
}
