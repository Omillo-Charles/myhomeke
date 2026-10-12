import React from "react";
import Link from "next/link";

interface QuickStat {
    label: string;
    value: string | number;
    sub: string;
    icon: () => React.ReactElement;
    iconBg: string;
    iconColor: string;
    valueColor: string;
    href: string;
}

function VacantIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="10" y1="10" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="10" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LeasesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function InvoiceIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function MaintenanceIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.47-2.47a6 6 0 0 1-7.94 7.94l-4.69 4.69a2.12 2.12 0 0 1-3-3l4.69-4.69A6 6 0 0 1 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function TenantsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <circle cx="9" cy="7" r="3.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 11a3 3 0 1 1 0-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21.5 20a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const stats: QuickStat[] = [
    {
        label: "Vacant Units",
        value: 32,
        sub: "across 5 properties",
        icon: VacantIcon,
        iconBg: "bg-danger/10",
        iconColor: "text-danger",
        valueColor: "text-danger",
        href: "/account/properties",
    },
    {
        label: "Active Leases",
        value: 182,
        sub: "of 214 total units",
        icon: LeasesIcon,
        iconBg: "bg-jade-100",
        iconColor: "text-jade-700",
        valueColor: "text-ink",
        href: "/account/leases",
    },
    {
        label: "Overdue Invoices",
        value: "KSh 124K",
        sub: "across 11 tenants",
        icon: InvoiceIcon,
        iconBg: "bg-warning/10",
        iconColor: "text-warning",
        valueColor: "text-warning",
        href: "/account/invoices",
    },
    {
        label: "Open Requests",
        value: 7,
        sub: "3 marked urgent",
        icon: MaintenanceIcon,
        iconBg: "bg-gold-100",
        iconColor: "text-gold-700",
        valueColor: "text-ink",
        href: "/account/maintenance",
    },
    {
        label: "Total Tenants",
        value: 214,
        sub: "+4 this month",
        icon: TenantsIcon,
        iconBg: "bg-navy-100",
        iconColor: "text-navy-700",
        valueColor: "text-ink",
        href: "/account/tenants",
    },
] as const;

export default function DashboardQuickStats() {
    return (
        <section aria-label="Quick stats">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {stats.map(({ label, value, sub, icon: Icon, iconBg, iconColor, valueColor, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                        {/* Icon */}
                        <span className={`flex size-9 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                            <Icon />
                        </span>

                        {/* Value + label */}
                        <div>
                            <p className={`font-outfit text-xl font-bold ${valueColor}`}>{value}</p>
                            <p className="mt-0.5 text-[12px] font-semibold text-ink">{label}</p>
                            <p className="mt-0.5 text-[11px] text-neutral-400">{sub}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
