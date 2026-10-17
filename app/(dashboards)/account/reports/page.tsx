import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ReportsView from "@/components/dashboard/reports/ReportsView";

export const metadata: Metadata = {
    title: `Reported Issues | ${BRAND_NAME}`,
    description: "Review and track issues reported by tenants across your properties.",
};

export default function ReportsPage() {
    return (
        <>
            <DashboardHeader title="Reports" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <ReportsView />
            </main>
        </>
    );
}
