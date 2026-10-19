"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_NAME, BRAND_WORDMARK } from "@/components/config/brand";
import { useDashboardNav } from "@/components/dashboard/DashboardNavContext";

// Icons

function DashboardIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function PropertiesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function ListingsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function TenantsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <circle cx="9" cy="7" r="3.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 11a3 3 0 1 1 0-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21.5 20a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LeasesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function InvoicesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function QuotationsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function MaintenanceIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.47-2.47a6 6 0 0 1-7.94 7.94l-4.69 4.69a2.12 2.12 0 0 1-3-3l4.69-4.69A6 6 0 0 1 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function ReportsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function PaymentsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function BroadcastsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M22 8.5a10 10 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18.5 10.5a5 5 0 0 1 0 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 14.5V9.5a1 1 0 0 1 1-1h3l4-3v13l-4-3H3a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function TasksIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ApplicationsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function NoticesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function MoveInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="10 17 15 12 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// Nav Data

interface NavItem {
    label: string;
    href: string;
    icon: () => React.ReactElement;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        items: [
            { label: "Overview", href: "/account/dashboard", icon: DashboardIcon },
            { label: "Properties", href: "/account/properties", icon: PropertiesIcon },
            { label: "Listings", href: "/account/listings", icon: ListingsIcon },
        ],
    },
    {
        title: "Tenants",
        items: [
            { label: "All Tenants", href: "/account/tenants", icon: TenantsIcon },
            { label: "Applications", href: "/account/tenants/applications", icon: ApplicationsIcon },
            { label: "Move-ins", href: "/account/tenants/move-ins", icon: MoveInIcon },
            { label: "Notices", href: "/account/tenants/notices", icon: NoticesIcon },
            { label: "Leases", href: "/account/leases", icon: LeasesIcon },
        ],
    },
    {
        items: [
            { label: "Payments", href: "/account/payments", icon: PaymentsIcon },
            { label: "Invoices", href: "/account/invoices", icon: InvoicesIcon },
            { label: "Quotations", href: "/account/quotations", icon: QuotationsIcon },
            { label: "Maintenance", href: "/account/maintenance", icon: MaintenanceIcon },
            { label: "Tasks", href: "/account/tasks", icon: TasksIcon },
            { label: "Broadcasts", href: "/account/broadcasts", icon: BroadcastsIcon },
            { label: "Reports", href: "/account/reports", icon: ReportsIcon },
        ],
    },
];

const bottomNav: NavItem[] = [
    { label: "Settings", href: "/account/settings", icon: SettingsIcon },
];

// Component 

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { isMobileNavOpen, closeMobileNav } = useDashboardNav();

    const isActive = (href: string) => {
        if (href === "/account/dashboard") {
            return pathname === "/account/dashboard";
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const renderNavContent = (isMobile: boolean = false) => (
        <>
            {/* Brand */}
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-neutral-200 px-5">
                <Link
                    href="/"
                    onClick={isMobile ? closeMobileNav : undefined}
                    aria-label={`${BRAND_NAME} home`}
                    className="flex items-center gap-2.5"
                >
                    <Image
                        src="/logoassets/jadelogo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="size-9 object-contain"
                    />
                    <span className="flex flex-col leading-none">
                        <span className="font-outfit text-[16px] font-semibold text-ink">{BRAND_WORDMARK.primary}</span>
                        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-500">{BRAND_WORDMARK.secondary}</span>
                    </span>
                </Link>
                {isMobile && (
                    <button
                        type="button"
                        onClick={closeMobileNav}
                        aria-label="Close navigation"
                        className="flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-ink"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Main nav */}
            <nav aria-label="Dashboard navigation" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-0.5" role="list">
                    {navSections.map((section, si) => (
                        <React.Fragment key={si}>
                            {/* Section divider + title */}
                            {si > 0 && (
                                <li className="pt-3">
                                    <div className={`mb-1 ${section.title ? "flex items-center gap-2" : "border-t border-neutral-100"}`}>
                                        {section.title && (
                                            <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                                                {section.title}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            )}
                            {section.items.map(({ label, href, icon: Icon }) => {
                                const active = isActive(href);
                                return (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            onClick={isMobile ? closeMobileNav : undefined}
                                            aria-current={active ? "page" : undefined}
                                            className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${active
                                                ? "bg-jade-700 text-white"
                                                : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                                                }`}
                                        >
                                            <Icon />
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>

            {/* Bottom nav */}
            <div className="shrink-0 border-t border-neutral-200 px-3 py-3">
                <ul className="space-y-0.5" role="list">
                    {bottomNav.map(({ label, href, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <li key={label}>
                                <Link
                                    href={href}
                                    onClick={isMobile ? closeMobileNav : undefined}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${active
                                        ? "bg-jade-700 text-white"
                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                                        }`}
                                >
                                    <Icon />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium text-danger transition-colors hover:bg-danger/8 hover:text-danger"
                        >
                            <LogoutIcon />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop static sidebar */}
            <aside className="hidden h-full w-[230px] shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
                {renderNavContent(false)}
            </aside>

            {/* Mobile slide-out drawer */}
            {isMobileNavOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={closeMobileNav}
                        aria-hidden="true"
                    />
                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile Navigation Drawer"
                        className="relative z-10 flex h-full w-[260px] max-w-[80vw] flex-col border-r border-neutral-200 bg-white shadow-2xl"
                    >
                        {renderNavContent(true)}
                    </aside>
                </div>
            )}
        </>
    );
}
