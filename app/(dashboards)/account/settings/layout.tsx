import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardHeader title="Settings" />
            {children}
        </>
    );
}
