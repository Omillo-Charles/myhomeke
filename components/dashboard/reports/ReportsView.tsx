"use client";

import { useState } from "react";
import { tenantReports, type ReportPriority, type ReportStatus, type TenantReport } from "./reportsData";

type StatusFilter = "All reports" | ReportStatus;

const priorityStyles: Record<ReportPriority, string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-neutral-100 text-neutral-600",
};

const statusStyles: Record<ReportStatus, string> = {
    Open: "bg-blue-100 text-blue-800",
    "In progress": "bg-amber-100 text-amber-800",
    Resolved: "bg-jade-100 text-jade-800",
};

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function ReportIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M12 9v4m0 4h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function StatCard({ label, value, detail, tone }: { label: string; value: number; detail: string; tone: string }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-neutral-500">{label}</p>
                    <p className="mt-2 font-outfit text-2xl font-bold tracking-tight text-ink">{value}</p>
                    <p className="mt-1 text-[11px] text-neutral-400">{detail}</p>
                </div>
                <span className={`flex size-10 items-center justify-center rounded-xl ${tone}`}><ReportIcon /></span>
            </div>
        </article>
    );
}

function ReportCard({ report, onStatusChange }: { report: TenantReport; onStatusChange: (report: TenantReport, status: ReportStatus) => void }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${report.priority === "Urgent" || report.priority === "High" ? "bg-red-50 text-red-600" : "bg-gold-50 text-gold-700"}`}>
                        <ReportIcon />
                    </span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-ink">{report.title}</h3>
                            <span className="text-[10px] font-medium text-neutral-400">{report.id}</span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">{report.description}</p>
                    </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5 sm:pl-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[report.priority]}`}>{report.priority} priority</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[report.status]}`}>{report.status}</span>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                    <span><span className="text-neutral-400">Reported by </span><span className="font-semibold text-neutral-700">{report.tenant}</span></span>
                    <span><span className="text-neutral-400">Property </span><span className="font-semibold text-neutral-700">{report.property} · {report.unit}</span></span>
                    <span><span className="text-neutral-400">Category </span><span className="font-semibold text-neutral-700">{report.category}</span></span>
                    <span className="text-neutral-400">{report.reportedAt}</span>
                </div>
                <div className="flex items-center gap-2 sm:shrink-0">
                    <span className="text-[10px] text-neutral-400">Assigned: <span className="font-medium text-neutral-600">{report.assignee}</span></span>
                    <select
                        aria-label={`Update status for ${report.id}`}
                        value={report.status}
                        onChange={(event) => onStatusChange(report, event.target.value as ReportStatus)}
                        className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-[10px] font-semibold text-neutral-700 outline-none focus:border-jade-600"
                    >
                        <option>Open</option>
                        <option>In progress</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>
        </article>
    );
}

export default function ReportsView() {
    const [reports, setReports] = useState(tenantReports);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All reports");
    const [priorityFilter, setPriorityFilter] = useState<"All priorities" | ReportPriority>("All priorities");
    const [search, setSearch] = useState("");

    const openCount = reports.filter((report) => report.status === "Open").length;
    const progressCount = reports.filter((report) => report.status === "In progress").length;
    const urgentCount = reports.filter((report) => report.priority === "Urgent" && report.status !== "Resolved").length;
    const resolvedCount = reports.filter((report) => report.status === "Resolved").length;

    const query = search.trim().toLowerCase();
    const filteredReports = reports.filter((report) => {
        const matchesStatus = statusFilter === "All reports" || report.status === statusFilter;
        const matchesPriority = priorityFilter === "All priorities" || report.priority === priorityFilter;
        const matchesSearch = !query || [report.id, report.title, report.description, report.tenant, report.property, report.unit, report.category].some((value) => value.toLowerCase().includes(query));
        return matchesStatus && matchesPriority && matchesSearch;
    });

    const handleStatusChange = (selected: TenantReport, status: ReportStatus) => {
        setReports((current) => current.map((report) => report.id === selected.id ? { ...report, status } : report));
    };

    return (
        <div className="space-y-6 pb-8">
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Tenant support</p>
                    <h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Reported issues</h2>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Review tenant-reported issues across your properties and track each one through to resolution.</p>
                </div>
                <div className="flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-jade-100 sm:self-center">
                    <span className="size-2 rounded-full bg-gold-400" aria-hidden="true" />
                    {urgentCount} urgent {urgentCount === 1 ? "issue" : "issues"} need attention
                </div>
            </section>

            <section aria-label="Issue summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Open reports" value={openCount} detail="Awaiting review" tone="bg-blue-50 text-blue-700" />
                <StatCard label="In progress" value={progressCount} detail="Being worked on" tone="bg-amber-50 text-amber-700" />
                <StatCard label="Urgent issues" value={urgentCount} detail="Unresolved urgent items" tone="bg-red-50 text-red-700" />
                <StatCard label="Resolved" value={resolvedCount} detail="Closed reports" tone="bg-jade-50 text-jade-700" />
            </section>

            <section aria-label="Tenant issue reports" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-outfit text-base font-bold text-ink">All reported issues</h3>
                            <p className="mt-0.5 text-[11px] text-neutral-500">Issues submitted by tenants from managed properties.</p>
                        </div>
                        <p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filteredReports.length}</span> reports</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(220px,1fr)_180px_180px]">
                        <label className="relative min-w-0">
                            <span className="sr-only">Search issues</span>
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><SearchIcon /></span>
                            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search issue, tenant, property..." className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" />
                        </label>
                        <label>
                            <span className="sr-only">Filter by status</span>
                            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All reports</option>
                                <option>Open</option>
                                <option>In progress</option>
                                <option>Resolved</option>
                            </select>
                        </label>
                        <label>
                            <span className="sr-only">Filter by priority</span>
                            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as "All priorities" | ReportPriority)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All priorities</option>
                                <option>Urgent</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="space-y-3 bg-neutral-50/50 p-3 sm:p-4">
                    {filteredReports.length > 0 ? filteredReports.map((report) => (
                        <ReportCard key={report.id} report={report} onStatusChange={handleStatusChange} />
                    )) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center">
                            <p className="font-outfit text-sm font-semibold text-neutral-600">No reports match these filters</p>
                            <p className="mt-1 text-xs text-neutral-400">Try a different search term, status, or priority.</p>
                            <button type="button" onClick={() => { setSearch(""); setStatusFilter("All reports"); setPriorityFilter("All priorities"); }} className="mt-3 text-xs font-semibold text-jade-700 hover:underline">Clear filters</button>
                        </div>
                    )}
                </div>
            </section>
            <p className="text-center text-[10px] text-neutral-400">Sample issue reports shown for preview. Live tenant reports will appear here when the backend is connected.</p>
        </div>
    );
}
