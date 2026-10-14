import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { DashboardNavProvider } from "@/components/dashboard/DashboardNavContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardNavProvider>
            <div className="flex h-screen overflow-hidden bg-neutral-100">
                <DashboardSidebar />
                <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                    {children}
                </div>
            </div>
        </DashboardNavProvider>
    );
}
