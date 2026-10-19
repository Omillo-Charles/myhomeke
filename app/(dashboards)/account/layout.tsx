import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { DashboardNavProvider } from "@/components/dashboard/DashboardNavContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardNavProvider>
            <div className="fixed inset-0 flex min-h-0 overflow-hidden bg-neutral-100">
                <DashboardSidebar />
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </DashboardNavProvider>
    );
}
