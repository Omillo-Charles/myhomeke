import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import SettingsWorkspace from "@/components/dashboard/settings/SettingsWorkspace";

export const metadata: Metadata = {
    title: `Settings | ${BRAND_NAME}`,
    description: "Manage your account profile, security, notifications, and billing preferences.",
};

export default function SettingsPage() {
    return <SettingsWorkspace />;
}
