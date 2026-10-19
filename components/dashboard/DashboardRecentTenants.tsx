import Link from "next/link";

type LeaseStatus = "active" | "expiring" | "overdue";

interface Tenant {
    id: string;
    name: string;
    initials: string;
    unit: string;
    property: string;
    rent: string;
    leaseStatus: LeaseStatus;
    leaseEnds: string;
    avatarColor: string;
}

const statusConfig: Record<LeaseStatus, { label: string; color: string; bg: string; dot: string }> = {
    active: { label: "Active", color: "text-success", bg: "bg-success/10", dot: "bg-success" },
    expiring: { label: "Expiring", color: "text-warning", bg: "bg-warning/10", dot: "bg-warning" },
    overdue: { label: "Overdue", color: "text-danger", bg: "bg-danger/10", dot: "bg-danger" },
};

const tenants: Tenant[] = [
    {
        id: "1",
        name: "Amara Osei",
        initials: "AO",
        unit: "Unit 12B",
        property: "Kilimani Heights",
        rent: "KSh 45,000",
        leaseStatus: "active",
        leaseEnds: "Mar 2026",
        avatarColor: "bg-jade-100 text-jade-700",
    },
    {
        id: "2",
        name: "Brian Kamau",
        initials: "BK",
        unit: "Unit 8C",
        property: "Karen Gardens",
        rent: "KSh 78,000",
        leaseStatus: "expiring",
        leaseEnds: "Jan 2026",
        avatarColor: "bg-gold-100 text-gold-700",
    },
    {
        id: "3",
        name: "Cynthia Mwangi",
        initials: "CM",
        unit: "Unit 3A",
        property: "Westlands Plaza",
        rent: "KSh 32,000",
        leaseStatus: "active",
        leaseEnds: "Jun 2026",
        avatarColor: "bg-navy-100 text-navy-700",
    },
    {
        id: "4",
        name: "David Otieno",
        initials: "DO",
        unit: "Unit 15D",
        property: "Runda Estate",
        rent: "KSh 95,000",
        leaseStatus: "overdue",
        leaseEnds: "Dec 2025",
        avatarColor: "bg-danger/10 text-danger",
    },
    {
        id: "5",
        name: "Esther Njeri",
        initials: "EN",
        unit: "Unit 6F",
        property: "Kilimani Heights",
        rent: "KSh 38,500",
        leaseStatus: "active",
        leaseEnds: "Sep 2026",
        avatarColor: "bg-jade-100 text-jade-700",
    },
] as const;

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function MessageIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function DashboardRecentTenants() {
    return (
        <section aria-label="Recent tenants" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-5 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Recent Tenants</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-400">Latest tenant activity and lease status</p>
                </div>
                <Link
                    href="/account/tenants"
                    className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900"
                >
                    View All →
                </Link>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto] items-center gap-3 sm:gap-4 border-b border-neutral-100 px-4 sm:px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
                <span>Tenant</span>
                <span className="hidden sm:block">Rent</span>
                <span className="hidden md:block">Lease Ends</span>
                <span>Status</span>
            </div>

            {/* Tenant rows */}
            <ul role="list" className="divide-y divide-neutral-50">
                {tenants.map((tenant) => {
                    const status = statusConfig[tenant.leaseStatus];
                    return (
                        <li key={tenant.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 transition-colors hover:bg-neutral-50/60">
                            {/* Avatar + name */}
                            <div className="flex min-w-0 items-center gap-3">
                                <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${tenant.avatarColor}`}>
                                    {tenant.initials}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-semibold text-ink">{tenant.name}</p>
                                    <p className="truncate text-[11px] text-neutral-400">{tenant.unit} · {tenant.property}</p>
                                </div>
                            </div>

                            {/* Rent */}
                            <span className="hidden text-[13px] font-semibold text-ink sm:block">{tenant.rent}</span>

                            {/* Lease end */}
                            <span className="hidden text-[12px] text-neutral-500 md:block">{tenant.leaseEnds}</span>

                            {/* Status + actions */}
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.bg} ${status.color}`}>
                                    <span className={`size-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                                    {status.label}
                                </span>
                                <div className="hidden items-center gap-1 sm:flex">
                                    <button type="button" aria-label={`Call ${tenant.name}`} className="flex size-6 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-jade-300 hover:bg-jade-50 hover:text-jade-700">
                                        <PhoneIcon />
                                    </button>
                                    <button type="button" aria-label={`Message ${tenant.name}`} className="flex size-6 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-jade-300 hover:bg-jade-50 hover:text-jade-700">
                                        <MessageIcon />
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Footer */}
            <div className="border-t border-neutral-100 px-5 py-3">
                <p className="text-[11px] text-neutral-400">
                    Showing 5 of 214 tenants ·{" "}
                    <Link href="/account/tenants" className="font-semibold text-jade-700 hover:text-jade-900">
                        Manage all tenants
                    </Link>
                </p>
            </div>
        </section>
    );
}
