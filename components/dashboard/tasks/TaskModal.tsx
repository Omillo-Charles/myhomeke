"use client";

import { useState } from "react";
import type { OwnerTask, TaskPriority, TaskStatus } from "./tasksData";

export type TaskFormData = Omit<OwnerTask, "id">;

const priorities: TaskPriority[] = ["Urgent", "High", "Medium", "Low"];
const statuses: TaskStatus[] = ["Planned", "In progress", "Completed"];
const inputClass = "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

export default function TaskModal({
    task,
    properties,
    onClose,
    onSave,
    onDelete,
}: {
    task: OwnerTask | null;
    properties: string[];
    onClose: () => void;
    onSave: (data: TaskFormData) => void;
    onDelete: (task: OwnerTask) => void;
}) {
    const [title, setTitle] = useState(task?.title ?? "");
    const [description, setDescription] = useState(task?.description ?? "");
    const [property, setProperty] = useState(task?.property ?? properties[0] ?? "");
    const [unit, setUnit] = useState(task?.unit ?? "");
    const [category, setCategory] = useState(task?.category ?? "Maintenance");
    const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "Medium");
    const [status, setStatus] = useState<TaskStatus>(task?.status ?? "Planned");
    const [dueDate, setDueDate] = useState(task?.dueDate ?? "2026-10-20");
    const [assignee, setAssignee] = useState(task?.assignee ?? "Unassigned");
    const [relatedReport, setRelatedReport] = useState(task?.relatedReport ?? "");
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
            title: title.trim(),
            description: description.trim(),
            property,
            unit: unit.trim() || "—",
            category: category.trim() || "General",
            priority,
            status,
            dueDate,
            assignee: assignee.trim() || "Unassigned",
            ...(relatedReport.trim() ? { relatedReport: relatedReport.trim() } : {}),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="task-modal-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Task planner</p>
                        <h2 id="task-modal-title" className="mt-1 font-outfit text-xl font-bold text-ink">{task ? "Edit task" : "Create a task"}</h2>
                        <p className="mt-1 text-xs text-neutral-500">Record the work, reminder, owner, and target date.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close task form" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid max-h-[min(65vh,620px)] grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
                        <label className="sm:col-span-2">
                            <span className={labelClass}>Task title</span>
                            <input required autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Repair the leaking kitchen sink" className={inputClass} />
                        </label>
                        <label className="sm:col-span-2">
                            <span className={labelClass}>Plan / notes</span>
                            <textarea required rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the work to complete, reminder, or expected outcome..." className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" />
                        </label>
                        <label>
                            <span className={labelClass}>Property</span>
                            <select value={property} onChange={(event) => setProperty(event.target.value)} className={inputClass}>
                                {properties.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className={labelClass}>Unit / location</span>
                            <input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="e.g. A-04 or Common area" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Category</span>
                            <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Maintenance, inspection, follow-up..." className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Due date</span>
                            <input required type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Priority</span>
                            <select value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)} className={inputClass}>
                                {priorities.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className={labelClass}>Status</span>
                            <select value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)} className={inputClass}>
                                {statuses.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className={labelClass}>Assigned to</span>
                            <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="Staff member or Unassigned" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Related tenant report (optional)</span>
                            <input value={relatedReport} onChange={(event) => setRelatedReport(event.target.value)} placeholder="e.g. RPT-2408" className={inputClass} />
                        </label>
                    </div>

                    {confirmDelete && task && (
                        <div role="alert" className="mx-5 mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
                            <div><p className="text-sm font-semibold text-red-800">Delete this task?</p><p className="mt-0.5 text-xs text-red-700">This removes “{task.title}” from this sample list.</p></div>
                            <div className="flex shrink-0 gap-2">
                                <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">Keep task</button>
                                <button type="button" onClick={() => onDelete(task)} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">Delete task</button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>{task && !confirmDelete && <button type="button" onClick={() => setConfirmDelete(true)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">Delete task</button>}</div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Cancel</button>
                            <button type="submit" className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">{task ? "Save changes" : "Create task"}</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
