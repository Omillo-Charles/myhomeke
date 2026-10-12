import Link from "next/link";

type ComplianceStatus = "ok" | "pending" | "overdue" | "na";

interface ComplianceItem {
    id: string;
    label: string;
    status: ComplianceStatus;
    lastChecked: string;
}

const statusConfig: Record<ComplianceStatus, { label: string; color: string; bg: string; dot: string }> = {
    ok:      { label: "OK",      color: "text-success", bg: "bg-success/10", dot: "bg-success"  },
    pending: { label: "Pending", color: "text-warning", bg: "bg-warning/10", dot: "bg-warning"  },
    overdue: { label: "Overdue", color: "text-danger",  bg: "bg-danger/10",  dot: "bg-danger"   },
    na:      { label: "N/A",     color: "text-neutral-500", bg: "bg-neutral-100", dot: "bg-neutral-400" },
};

function FireIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-danger" aria-hidden="true">
            <path d="M12 2C6.5 7 4 10.5 4 14a8 8 0 0 0 16 0c0-2.5-1.5-5.5-4-8-1 2.5-2.5 3-4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function DropIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-info" aria-hidden="true">
            <path d="M12 2C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function GasIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-warning" aria-hidden="true">
            <path d="M12 22V12M12 12C10 9 6 8 6 5a6 6 0 0 1 12 0c0 3-4 4-6 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ElectricalIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-gold-600" aria-hidden="true">
            <path d="M13 2 4.09 12.26A1 1 0 0 0 5 14h6l-2 8 8.91-10.26A1 1 0 0 0 17 10h-6l2-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function PlumbingIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-navy-600" aria-hidden="true">
            <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="6" cy="9" r="1.5" fill="currentColor" />
            <circle cx="6" cy="15" r="1.5" fill="currentColor" />
        </svg>
    );
}

function ElevatorIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-jade-600" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 9l3-3 3 3M9 15l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const complianceItems: (ComplianceItem & { icon: React.FC })[] = [
    { id: "1", label: "Fire Safety",   status: "ok",      lastChecked: "12 Dec 2025", icon: FireIcon       },
    { id: "2", label: "Water Systems", status: "pending", lastChecked: "30 Nov 2025", icon: DropIcon       },
    { id: "3", label: "Gas Lines",     status: "overdue", lastChecked: "15 Nov 2025", icon: GasIcon        },
    { id: "4", label: "Electrical",    status: "ok",      lastChecked: "10 Dec 2025", icon: ElectricalIcon },
    { id: "5", label: "Plumbing",      status: "ok",      lastChecked: "08 Dec 2025", icon: PlumbingIcon   },
    { id: "6", label: "Elevators",     status: "na",      lastChecked: "N/A",         icon: ElevatorIcon   },
];

export default function DashboardCompliance() {
    const overdueCount = complianceItems.filter((i) => i.status === "overdue").length;
    const pendingCount = complianceItems.filter((i) => i.status === "pending").length;

    return (
        <section aria-label="Compliance" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-5 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Compliance</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-400">Monitoring building safety and maintenance</p>
                </div>
                <div className="flex items-center gap-2">
                    {overdueCount > 0 && (
                        <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-semibold text-danger">
                            {overdueCount} Overdue
                        </span>
                    )}
                    {pendingCount > 0 && (
                        <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-semibold text-warning">
                            {pendingCount} Pending
                        </span>
                    )}
                    <Link
                        href="/account/reports"
                        className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900"
                    >
                        Overview →
                    </Link>
                </div>
            </div>

            {/* Grid of compliance items */}
            <div className="grid grid-cols-2 gap-px bg-neutral-100 sm:grid-cols-3 lg:grid-cols-6">
                {complianceItems.map(({ id, label, status, lastChecked, icon: Icon }) => {
                    const cfg = statusConfig[status];
                    return (
                        <div key={id} className="flex flex-col gap-2.5 bg-white p-4">
                            <div className="flex items-center gap-2">
                                <Icon />
                                <span className="text-xs font-semibold text-ink">{label}</span>
                            </div>
                            <span
                                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.bg} ${cfg.color}`}
                            >
                                <span className={`size-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
                                {cfg.label}
                            </span>
                            <p className="text-[10px] text-neutral-400">
                                Last checked: {lastChecked}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
