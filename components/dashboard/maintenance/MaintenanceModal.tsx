"use client";

import { useState } from "react";
import type { MaintenancePriority, MaintenanceRecord, MaintenanceStatus } from "./maintenanceData";

export type MaintenanceFormData = Omit<MaintenanceRecord, "id">;

const priorities: MaintenancePriority[] = ["Urgent", "High", "Medium", "Low"];
const statuses: MaintenanceStatus[] = ["Scheduled", "In progress", "Completed", "Cancelled"];
const inputClass = "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

export default function MaintenanceModal({
    record,
    properties,
    onClose,
    onSave,
    onDelete,
}: {
    record: MaintenanceRecord | null;
    properties: string[];
    onClose: () => void;
    onSave: (data: MaintenanceFormData) => void;
    onDelete: (record: MaintenanceRecord) => void;
}) {
    const [title, setTitle] = useState(record?.title ?? "");
    const [description, setDescription] = useState(record?.description ?? "");
    const [property, setProperty] = useState(record?.property ?? properties[0] ?? "");
    const [unit, setUnit] = useState(record?.unit ?? "");
    const [category, setCategory] = useState(record?.category ?? "Repair");
    const [priority, setPriority] = useState<MaintenancePriority>(record?.priority ?? "Medium");
    const [status, setStatus] = useState<MaintenanceStatus>(record?.status ?? "Scheduled");
    const [date, setDate] = useState(record?.date ?? "2026-10-20");
    const [cost, setCost] = useState(record ? String(record.cost) : "");
    const [vendor, setVendor] = useState(record?.vendor ?? "");
    const [relatedTask, setRelatedTask] = useState(record?.relatedTask ?? "");
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
            title: title.trim(),
            description: description.trim(),
            property,
            unit: unit.trim() || "Common area",
            category: category.trim() || "General",
            priority,
            status,
            date,
            cost: Number(cost) || 0,
            vendor: vendor.trim() || "Not assigned",
            ...(relatedTask.trim() ? { relatedTask: relatedTask.trim() } : {}),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="maintenance-modal-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Maintenance log</p>
                        <h2 id="maintenance-modal-title" className="mt-1 font-outfit text-xl font-bold text-ink">{record ? "Edit maintenance record" : "Add maintenance record"}</h2>
                        <p className="mt-1 text-xs text-neutral-500">Keep a clear record of property work and service costs.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close maintenance form" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid max-h-[min(65vh,620px)] grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
                        <label className="sm:col-span-2"><span className={labelClass}>Maintenance title</span><input required autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Repair leaking kitchen sink" className={inputClass} /></label>
                        <label className="sm:col-span-2"><span className={labelClass}>Work performed / notes</span><textarea required rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the repair, service, findings, and follow-up..." className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" /></label>
                        <label><span className={labelClass}>Property</span><select value={property} onChange={(event) => setProperty(event.target.value)} className={inputClass}>{properties.map((item) => <option key={item}>{item}</option>)}</select></label>
                        <label><span className={labelClass}>Unit / location</span><input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="e.g. A-04 or Main entrance" className={inputClass} /></label>
                        <label><span className={labelClass}>Category</span><input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Plumbing, electrical, inspection..." className={inputClass} /></label>
                        <label><span className={labelClass}>Date</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className={inputClass} /></label>
                        <label><span className={labelClass}>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value as MaintenancePriority)} className={inputClass}>{priorities.map((item) => <option key={item}>{item}</option>)}</select></label>
                        <label><span className={labelClass}>Status</span><select value={status} onChange={(event) => setStatus(event.target.value as MaintenanceStatus)} className={inputClass}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
                        <label><span className={labelClass}>Cost (KSh)</span><input type="number" min="0" step="0.01" value={cost} onChange={(event) => setCost(event.target.value)} placeholder="0.00" className={inputClass} /></label>
                        <label><span className={labelClass}>Vendor / technician</span><input value={vendor} onChange={(event) => setVendor(event.target.value)} placeholder="Company or staff member" className={inputClass} /></label>
                        <label><span className={labelClass}>Related task (optional)</span><input value={relatedTask} onChange={(event) => setRelatedTask(event.target.value)} placeholder="e.g. TSK-1084" className={inputClass} /></label>
                    </div>

                    {confirmDelete && record && (
                        <div role="alert" className="mx-5 mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
                            <div><p className="text-sm font-semibold text-red-800">Delete this maintenance record?</p><p className="mt-0.5 text-xs text-red-700">This removes “{record.title}” from the sample log.</p></div>
                            <div className="flex shrink-0 gap-2"><button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">Keep record</button><button type="button" onClick={() => onDelete(record)} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">Delete record</button></div>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>{record && !confirmDelete && <button type="button" onClick={() => setConfirmDelete(true)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">Delete record</button>}</div>
                        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Cancel</button><button type="submit" className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">{record ? "Save changes" : "Add record"}</button></div>
                    </div>
                </form>
            </section>
        </div>
    );
}
