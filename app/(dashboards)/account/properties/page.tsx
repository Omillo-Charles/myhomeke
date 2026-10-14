import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PropertiesView from "@/components/dashboard/properties/PropertiesView";

export const metadata: Metadata = {
    title: `Properties | ${BRAND_NAME}`,
    description: "Manage your rental property portfolio, track occupied and vacant units, and review revenue.",
};

export default function PropertiesPage() {
    return (
        <>
            {/* Top header bar */}
            <DashboardHeader title="Properties" />

            {/* Scrollable content area */}
            <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <PropertiesView />
            </main>
        </>
    );
}

