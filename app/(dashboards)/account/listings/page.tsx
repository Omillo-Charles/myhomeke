import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ListingsView from "@/components/dashboard/listings/ListingsView";

export const metadata: Metadata = {
    title: `Listings | ${BRAND_NAME}`,
    description:
        "Manage which properties are publicly listed on the home feed for prospective tenants to discover.",
};

export default function ListingsPage() {
    return (
        <>
            {/* Top header bar */}
            <DashboardHeader title="Listings" />

            {/* Scrollable content area */}
            <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <ListingsView />
            </main>
        </>
    );
}

