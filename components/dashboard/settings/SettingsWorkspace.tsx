"use client";

import { useState } from "react";
import SettingsBilling from "@/components/dashboard/settings/SettingsBilling";
import SettingsInvoices from "@/components/dashboard/settings/SettingsInvoices";
import SettingsNotifications from "@/components/dashboard/settings/SettingsNotifications";
import SettingsProfile from "@/components/dashboard/settings/SettingsProfile";
import SettingsSecurity from "@/components/dashboard/settings/SettingsSecurity";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";

const sections: Record<string, { title: string; description: string }> = {
    "api-keys": { title: "API Keys", description: "Manage API access for your account." },
    team: { title: "Team & Permissions", description: "Manage your team members and their access." },
    appearance: { title: "Appearance", description: "Customize how your workspace looks." },
    locale: { title: "Language & Region", description: "Set your preferred language and regional formats." },
    quotes: { title: "Quotes", description: "View and manage your quotes." },
    integrations: { title: "Integrations", description: "Manage connected services and integrations." },
    logs: { title: "System Logs", description: "Review recent activity and system events." },
    data: { title: "Data & Privacy", description: "Manage your data and privacy preferences." },
};

export default function SettingsWorkspace() {
    const [activeSection, setActiveSection] = useState("profile");

    const renderSection = () => {
        switch (activeSection) {
            case "profile":
                return <SettingsProfile />;
            case "security":
                return <SettingsSecurity />;
            case "notifications":
                return <SettingsNotifications />;
            case "billing":
                return <SettingsBilling />;
            case "invoices":
                return <SettingsInvoices />;
            default: {
                const section = sections[activeSection];
                return (
                    <div className="space-y-2">
                        <h2 className="font-outfit text-lg font-bold text-ink">{section.title}</h2>
                        <p className="text-xs text-neutral-500">{section.description}</p>
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500">
                            This settings section is not available yet.
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <SettingsSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <div className="mx-auto w-full max-w-5xl">{renderSection()}</div>
            </main>
        </div>
    );
}