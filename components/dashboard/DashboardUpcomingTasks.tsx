import React from "react";
import Link from "next/link";

type TaskType = "lease" | "rent" | "inspection" | "maintenance";
type TaskPriority = "high" | "medium" | "low";

interface UpcomingTask {
    id: string;
    type: TaskType;
    title: string;
    detail: string;
    dueDate: string;
    daysLeft: number;
    priority: TaskPriority;
    href: string;
}

const typeConfig: Record<TaskType, { icon: () => React.ReactElement; color: string; bg: string }> = {
    lease: { icon: LeaseIcon, color: "text-navy-700", bg: "bg-navy-100" },
    rent: { icon: RentIcon, color: "text-jade-700", bg: "bg-jade-100" },
    inspection: { icon: InspectionIcon, color: "text-gold-700", bg: "bg-gold-100" },
    maintenance: { icon: WrenchIcon, color: "text-warning", bg: "bg-warning/10" },
};

const priorityConfig: Record<TaskPriority, { label: string; color: string; bg: string }> = {
    high: { label: "High", color: "text-danger", bg: "bg-danger/10" },
    medium: { label: "Medium", color: "text-warning", bg: "bg-warning/10" },
    low: { label: "Low", color: "text-success", bg: "bg-success/10" },
};

function LeaseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function RentIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function InspectionIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function WrenchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.47-2.47a6 6 0 0 1-7.94 7.94l-4.69 4.69a2.12 2.12 0 0 1-3-3l4.69-4.69A6 6 0 0 1 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

const tasks: UpcomingTask[] = [
    {
        id: "1",
        type: "lease",
        title: "Lease Renewal",
        detail: "Unit 8C · Karen Gardens · Brian Kamau",
        dueDate: "20 Jan 2026",
        daysLeft: 9,
        priority: "high",
        href: "/account/leases",
    },
    {
        id: "2",
        type: "rent",
        title: "Rent Collection Due",
        detail: "Unit 15D · Runda Estate · 4 tenants overdue",
        dueDate: "15 Jan 2026",
        daysLeft: 4,
        priority: "high",
        href: "/account/invoices",
    },
    {
        id: "3",
        type: "inspection",
        title: "Annual Inspection",
        detail: "Westlands Plaza · Floors 2–4",
        dueDate: "28 Jan 2026",
        daysLeft: 17,
        priority: "medium",
        href: "/account/maintenance",
    },
    {
        id: "4",
        type: "maintenance",
        title: "Boiler Servicing",
        detail: "Kilimani Heights · Scheduled service",
        dueDate: "5 Feb 2026",
        daysLeft: 25,
        priority: "medium",
        href: "/account/maintenance",
    },
    {
        id: "5",
        type: "lease",
        title: "New Lease Start",
        detail: "Unit 6F · Kilimani Heights · Esther Njeri",
        dueDate: "1 Feb 2026",
        daysLeft: 21,
        priority: "low",
        href: "/account/leases",
    },
] as const;

function DaysLeftBadge({ days }: { days: number }) {
    const urgent = days <= 7;
    const moderate = days <= 21;
    return (
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${urgent ? "bg-danger/10 text-danger" :
                moderate ? "bg-warning/10 text-warning" :
                    "bg-neutral-100 text-neutral-600"
            }`}>
            {days}d left
        </span>
    );
}

export default function DashboardUpcomingTasks() {
    return (
        <section aria-label="Upcoming tasks" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-5 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Upcoming Tasks</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-400">Lease renewals, rent due dates & scheduled work</p>
                </div>
                <Link href="/account/tasks" className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900">
                    View All →
                </Link>
            </div>

            {/* Task list */}
            <ul role="list" className="divide-y divide-neutral-50">
                {tasks.map((task) => {
                    const tCfg = typeConfig[task.type];
                    const pCfg = priorityConfig[task.priority];
                    const Icon = tCfg.icon;

                    return (
                        <li key={task.id}>
                            <Link
                                href={task.href}
                                className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-neutral-50/60"
                            >
                                {/* Type icon */}
                                <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${tCfg.bg} ${tCfg.color}`}>
                                    <Icon />
                                </span>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-semibold text-ink">{task.title}</span>
                                        <span className={`hidden shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide sm:inline ${pCfg.bg} ${pCfg.color}`}>
                                            {pCfg.label}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 truncate text-[11px] text-neutral-400">{task.detail}</p>
                                </div>

                                {/* Due info */}
                                <div className="shrink-0 text-right">
                                    <DaysLeftBadge days={task.daysLeft} />
                                    <p className="mt-1 text-[10px] text-neutral-400">{task.dueDate}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Footer CTA */}
            <div className="border-t border-neutral-100 px-5 py-3">
                <Link
                    href="/account/tasks"
                    className="flex items-center justify-center gap-1.5 rounded-md border border-jade-200 bg-jade-50 py-2 text-xs font-semibold text-jade-700 transition-colors hover:bg-jade-100"
                >
                    View full task calendar →
                </Link>
            </div>
        </section>
    );
}
