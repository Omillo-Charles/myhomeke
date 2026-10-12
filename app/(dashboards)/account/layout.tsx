import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-neutral-100">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
