import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MaintenanceView from "@/components/dashboard/maintenance/MaintenanceView";

export const metadata: Metadata = {
    title: `Maintenance | ${BRAND_NAME}`,
    description: "Track repairs, servicing, and maintenance records across your properties.",
};

export default function MaintenancePage() {
    return (
        <>
            <DashboardHeader title="Maintenance" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <MaintenanceView />
            </main>
        </>
    );
}
