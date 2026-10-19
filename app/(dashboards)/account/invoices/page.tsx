import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InvoicesView from "@/components/dashboard/invoices/InvoicesView";

export const metadata: Metadata = {
    title: `Invoices | ${BRAND_NAME}`,
    description: "Review, organize, and manage invoices from property owners and managers.",
};

export default function InvoicesPage() {
    return (
        <>
            <DashboardHeader title="Invoices" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <InvoicesView />
            </main>
        </>
    );
}
