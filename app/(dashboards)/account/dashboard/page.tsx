import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DashboardStatCards from "@/components/dashboard/DashboardStatCards";
import DashboardQuickStats from "@/components/dashboard/DashboardQuickStats";
import DashboardGeneralOverview from "@/components/dashboard/DashboardGeneralOverview";
import DashboardPropertyBalance from "@/components/dashboard/DashboardPropertyBalance";
import DashboardRevenueChart from "@/components/dashboard/DashboardRevenueChart";
import DashboardOccupancyBreakdown from "@/components/dashboard/DashboardOccupancyBreakdown";
import DashboardRecentTenants from "@/components/dashboard/DashboardRecentTenants";
import DashboardUpcomingTasks from "@/components/dashboard/DashboardUpcomingTasks";
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity";
import DashboardCompliance from "@/components/dashboard/DashboardCompliance";

export const metadata: Metadata = {
    title: `Overview — ${BRAND_NAME}`,
    description: "Manage your rental properties, tenants, leases, and payments.",
};

// Hardcoded for now — replace with real session data
const USER_FIRST_NAME = "Jane";

export default function DashboardPage() {
    return (
        <>
            {/* Top header bar */}
            <DashboardHeader />

            {/* Scrollable main content */}
            <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-7">

                {/* ── Greeting ───────────────────────────────────────────── */}
                <DashboardGreeting firstName={USER_FIRST_NAME} />

                {/* ── Row 1: Primary stat cards ───────────────────────────── */}
                <DashboardStatCards />

                {/* ── Row 2: Quick secondary KPIs ─────────────────────────── */}
                <div className="mt-5">
                    <DashboardQuickStats />
                </div>

                {/* ── Row 3: General Overview + Property Balance ───────────── */}
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
                    <DashboardGeneralOverview />
                    <DashboardPropertyBalance />
                </div>

                {/* ── Row 4: Revenue Chart + Upcoming Tasks ────────────────── */}
                <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
                    <DashboardRevenueChart />
                    <DashboardUpcomingTasks />
                </div>

                {/* ── Row 5: Occupancy Breakdown + Recent Activity ─────────── */}
                <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
                    <DashboardOccupancyBreakdown />
                    <DashboardRecentActivity />
                </div>

                {/* ── Row 6: Recent Tenants — full width ───────────────────── */}
                <div className="mt-6">
                    <DashboardRecentTenants />
                </div>

                {/* ── Row 7: Compliance — full width ───────────────────────── */}
                <div className="mt-6 pb-8">
                    <DashboardCompliance />
                </div>

            </main>
        </>
    );
}
