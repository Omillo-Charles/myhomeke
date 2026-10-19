"use client";

import { useState } from "react";
import MaintenanceModal, { type MaintenanceFormData } from "./MaintenanceModal";
import { initialMaintenanceRecords, maintenanceProperties, type MaintenancePriority, type MaintenanceRecord, type MaintenanceStatus } from "./maintenanceData";

type StatusFilter = "All records" | MaintenanceStatus;
type SortOption = "Newest first" | "Oldest first" | "Highest cost";

const statusStyles: Record<MaintenanceStatus, string> = {
    Scheduled: "bg-blue-100 text-blue-800",
    "In progress": "bg-amber-100 text-amber-800",
    Completed: "bg-jade-100 text-jade-800",
    Cancelled: "bg-neutral-100 text-neutral-600",
};

const priorityStyles: Record<MaintenancePriority, string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-neutral-100 text-neutral-600",
};

function formatAmount(amount: number) {
    return `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;
}

function formatDate(dateString: string) {
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function WrenchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.47-2.47a6 6 0 0 1-7.94 7.94l-4.69 4.69a2.12 2.12 0 0 1-3-3l4.69-4.69A6 6 0 0 1 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function StatCard({ label, value, detail, color }: { label: string; value: string; detail: string; color: string }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-medium text-neutral-500">{label}</p>
            <p className={`mt-2 font-outfit text-2xl font-bold tracking-tight ${color}`}>{value}</p>
            <p className="mt-1 text-[11px] text-neutral-400">{detail}</p>
        </article>
    );
}

function MaintenanceCard({ record, onEdit, onStatusChange }: {
    record: MaintenanceRecord;
    onEdit: (record: MaintenanceRecord) => void;
    onStatusChange: (record: MaintenanceRecord, status: MaintenanceStatus) => void;
}) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-jade-50 text-jade-700"><WrenchIcon /></span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-ink">{record.title}</h3>
                            <span className="text-[10px] font-medium text-neutral-400">{record.id}</span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">{record.description}</p>
                    </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5 sm:pl-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[record.priority]}`}>{record.priority}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[record.status]}`}>{record.status}</span>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                    <span><span className="text-neutral-400">Property </span><span className="font-semibold text-neutral-700">{record.property} · {record.unit}</span></span>
                    <span><span className="text-neutral-400">Category </span><span className="font-semibold text-neutral-700">{record.category}</span></span>
                    <span><span className="text-neutral-400">Vendor </span><span className="font-semibold text-neutral-700">{record.vendor}</span></span>
                    {record.relatedTask && <span><span className="text-neutral-400">Task </span><span className="font-semibold text-jade-700">{record.relatedTask}</span></span>}
                    <span className="text-neutral-500">{formatDate(record.date)}</span>
                    <span className="font-semibold text-ink">{formatAmount(record.cost)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 sm:shrink-0 sm:justify-end">
                    <select aria-label={`Update status for ${record.id}`} value={record.status} onChange={(event) => onStatusChange(record, event.target.value as MaintenanceStatus)} className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-[10px] font-semibold text-neutral-700 outline-none focus:border-jade-600">
                        <option>Scheduled</option><option>In progress</option><option>Completed</option><option>Cancelled</option>
                    </select>
                    <button type="button" onClick={() => onEdit(record)} className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800">Edit record</button>
                </div>
            </div>
        </article>
    );
}

export default function MaintenanceView() {
    const [records, setRecords] = useState<MaintenanceRecord[]>(() => initialMaintenanceRecords);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All records");
    const [priorityFilter, setPriorityFilter] = useState<"All priorities" | MaintenancePriority>("All priorities");
    const [propertyFilter, setPropertyFilter] = useState("All properties");
    const [sortBy, setSortBy] = useState<SortOption>("Newest first");
    const [search, setSearch] = useState("");
    const [activeRecord, setActiveRecord] = useState<MaintenanceRecord | "new" | null>(null);

    const completed = records.filter((record) => record.status === "Completed");
    const active = records.filter((record) => record.status === "In progress");
    const scheduled = records.filter((record) => record.status === "Scheduled");
    const totalSpend = completed.reduce((sum, record) => sum + record.cost, 0);

    const query = search.trim().toLowerCase();
    const filteredRecords = records.filter((record) => {
        const matchesStatus = statusFilter === "All records" || record.status === statusFilter;
        const matchesPriority = priorityFilter === "All priorities" || record.priority === priorityFilter;
        const matchesProperty = propertyFilter === "All properties" || record.property === propertyFilter;
        const matchesSearch = !query || [record.id, record.title, record.description, record.property, record.unit, record.category, record.vendor, record.relatedTask ?? ""].some((value) => value.toLowerCase().includes(query));
        return matchesStatus && matchesPriority && matchesProperty && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "Highest cost") return b.cost - a.cost;
        const dateOrder = a.date.localeCompare(b.date);
        return sortBy === "Newest first" ? -dateOrder : dateOrder;
    });

    const handleSave = (data: MaintenanceFormData) => {
        if (activeRecord === "new") {
            const nextId = records.reduce((maxId, record) => Math.max(maxId, Number(record.id.replace(/\D/g, "")) || 0), 0) + 1;
            setRecords((current) => [{ ...data, id: `MNT-${nextId}` }, ...current]);
        } else if (activeRecord) {
            setRecords((current) => current.map((record) => record.id === activeRecord.id ? { ...data, id: record.id } : record));
        }
        setActiveRecord(null);
    };

    const handleDelete = (recordToDelete: MaintenanceRecord) => {
        setRecords((current) => current.filter((record) => record.id !== recordToDelete.id));
        setActiveRecord(null);
    };

    const handleStatusChange = (selected: MaintenanceRecord, status: MaintenanceStatus) => {
        setRecords((current) => current.map((record) => record.id === selected.id ? { ...record, status } : record));
    };

    const clearFilters = () => {
        setStatusFilter("All records");
        setPriorityFilter("All priorities");
        setPropertyFilter("All properties");
        setSortBy("Newest first");
        setSearch("");
    };

    return (
        <div className="space-y-6 pb-8">
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Property operations</p>
                    <h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Maintenance records</h2>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Keep a reliable history of repairs, servicing, inspections, and property upkeep.</p>
                </div>
                <button type="button" onClick={() => setActiveRecord("new")} className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-gold-400 px-4 py-2.5 text-xs font-semibold text-jade-950 shadow-sm transition hover:bg-gold-300 sm:self-center"><PlusIcon /> Add maintenance</button>
            </section>

            <section aria-label="Maintenance summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Completed work" value={String(completed.length)} detail="Logged as completed" color="text-jade-700" />
                <StatCard label="In progress" value={String(active.length)} detail="Currently being handled" color="text-amber-700" />
                <StatCard label="Scheduled" value={String(scheduled.length)} detail="Upcoming maintenance" color="text-blue-700" />
                <StatCard label="Completed spend" value={formatAmount(totalSpend)} detail="Across completed records" color="text-ink" />
            </section>

            <section aria-label="Maintenance history" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div><h3 className="font-outfit text-base font-bold text-ink">Maintenance log</h3><p className="mt-0.5 text-[11px] text-neutral-500">Repairs and services performed or planned across your portfolio.</p></div>
                        <p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filteredRecords.length}</span> records</p>
                    </div>
                    <div className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:max-w-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-[minmax(220px,1fr)_160px_160px_180px_160px]">
                        <label className="relative w-64 shrink-0 sm:w-auto sm:min-w-0"><span className="sr-only">Search maintenance records</span><span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><SearchIcon /></span><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search title, property, vendor..." className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" /></label>
                        <label className="w-40 shrink-0 sm:w-auto"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600"><option>All records</option>{(["Scheduled", "In progress", "Completed", "Cancelled"] as MaintenanceStatus[]).map((status) => <option key={status}>{status}</option>)}</select></label>
                        <label className="w-40 shrink-0 sm:w-auto"><span className="sr-only">Filter by priority</span><select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as "All priorities" | MaintenancePriority)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600"><option>All priorities</option>{(["Urgent", "High", "Medium", "Low"] as MaintenancePriority[]).map((priority) => <option key={priority}>{priority}</option>)}</select></label>
                        <label className="w-44 shrink-0 sm:w-auto"><span className="sr-only">Filter by property</span><select value={propertyFilter} onChange={(event) => setPropertyFilter(event.target.value)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600"><option>All properties</option>{maintenanceProperties.map((property) => <option key={property}>{property}</option>)}</select></label>
                        <label className="w-40 shrink-0 sm:w-auto"><span className="sr-only">Sort maintenance records</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600"><option>Newest first</option><option>Oldest first</option><option>Highest cost</option></select></label>
                    </div>
                </div>

                <div className="space-y-3 bg-neutral-50/50 p-3 sm:p-4">
                    {filteredRecords.length ? filteredRecords.map((record) => <MaintenanceCard key={record.id} record={record} onEdit={setActiveRecord} onStatusChange={handleStatusChange} />) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center"><p className="font-outfit text-sm font-semibold text-neutral-600">No maintenance records match these filters</p><p className="mt-1 text-xs text-neutral-400">Try another search, or add a maintenance record.</p><button type="button" onClick={clearFilters} className="mt-3 text-xs font-semibold text-jade-700 hover:underline">Clear filters</button></div>
                    )}
                </div>
            </section>

            <p className="text-center text-[10px] text-neutral-400">Sample maintenance records shown for preview. Live service history will appear here when the backend is connected.</p>

            {activeRecord && <MaintenanceModal key={activeRecord === "new" ? "new-maintenance" : activeRecord.id} record={activeRecord === "new" ? null : activeRecord} properties={maintenanceProperties} onClose={() => setActiveRecord(null)} onSave={handleSave} onDelete={handleDelete} />}
        </div>
    );
}
