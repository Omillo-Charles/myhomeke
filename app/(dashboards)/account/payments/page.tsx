import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PaymentsView from "@/components/dashboard/payments/PaymentsView";

export const metadata: Metadata = {
    title: `Payments | ${BRAND_NAME}`,
    description: "View tenant payments received through M-PESA, Airtel Money, bank transfers, and PayPal.",
};

export default function PaymentsPage() {
    return (
        <>
            <DashboardHeader title="Payments" />
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <PaymentsView />
            </main>
        </>
    );
}
