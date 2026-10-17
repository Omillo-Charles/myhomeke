"use client";

import { useState } from "react";
import TaskModal, { type TaskFormData } from "./TaskModal";
import { initialTasks, taskProperties, type OwnerTask, type TaskPriority, type TaskStatus } from "./tasksData";

type StatusFilter = "All tasks" | TaskStatus;

type TaskSort = "Due date" | "Priority" | "Recently added";

const statusStyles: Record<TaskStatus, string> = {
    Planned: "bg-blue-100 text-blue-800",
    "In progress": "bg-amber-100 text-amber-800",
    Completed: "bg-jade-100 text-jade-800",
};

const priorityStyles: Record<TaskPriority, string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-neutral-100 text-neutral-600",
};

const priorityOrder: Record<TaskPriority, number> = { Urgent: 0, High: 1, Medium: 2, Low: 3 };

function formatDueDate(dateString: string) {
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function isOverdue(task: OwnerTask) {
    return task.status !== "Completed" && task.dueDate < "2026-10-16";
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M16 2v4M8 2v4M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function StatCard({ label, value, note, color }: { label: string; value: number; note: string; color: string }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-medium text-neutral-500">{label}</p>
            <p className={`mt-2 font-outfit text-2xl font-bold tracking-tight ${color}`}>{value}</p>
            <p className="mt-1 text-[11px] text-neutral-400">{note}</p>
        </article>
    );
}

function TaskCard({ task, onEdit, onStatusChange }: {
    task: OwnerTask;
    onEdit: (task: OwnerTask) => void;
    onStatusChange: (task: OwnerTask, status: TaskStatus) => void;
}) {
    const overdue = isOverdue(task);
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl ${overdue ? "bg-red-50 text-red-600" : "bg-jade-50 text-jade-700"}`}><CalendarIcon /></span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-ink">{task.title}</h3>
                            <span className="text-[10px] font-medium text-neutral-400">{task.id}</span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">{task.description}</p>
                    </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5 sm:pl-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[task.status]}`}>{task.status}</span>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
                    <span><span className="text-neutral-400">Property </span><span className="font-semibold text-neutral-700">{task.property} · {task.unit}</span></span>
                    <span><span className="text-neutral-400">Category </span><span className="font-semibold text-neutral-700">{task.category}</span></span>
                    <span><span className="text-neutral-400">Assigned </span><span className="font-semibold text-neutral-700">{task.assignee}</span></span>
                    {task.relatedReport && <span><span className="text-neutral-400">Related report </span><span className="font-semibold text-jade-700">{task.relatedReport}</span></span>}
                    <span className={overdue ? "font-semibold text-red-600" : "text-neutral-500"}>{overdue ? "Overdue · " : "Due · "}{formatDueDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 sm:shrink-0 sm:justify-end">
                    <select aria-label={`Update status for ${task.id}`} value={task.status} onChange={(event) => onStatusChange(task, event.target.value as TaskStatus)} className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-[10px] font-semibold text-neutral-700 outline-none focus:border-jade-600">
                        <option>Planned</option>
                        <option>In progress</option>
                        <option>Completed</option>
                    </select>
                    <button type="button" onClick={() => onEdit(task)} className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800">Edit task</button>
                </div>
            </div>
        </article>
    );
}

export default function TasksView() {
    const [tasks, setTasks] = useState<OwnerTask[]>(() => initialTasks);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All tasks");
    const [priorityFilter, setPriorityFilter] = useState<"All priorities" | TaskPriority>("All priorities");
    const [propertyFilter, setPropertyFilter] = useState("All properties");
    const [sortBy, setSortBy] = useState<TaskSort>("Due date");
    const [search, setSearch] = useState("");
    const [activeTask, setActiveTask] = useState<OwnerTask | "new" | null>(null);

    const openTasks = tasks.filter((task) => task.status === "Planned").length;
    const inProgressTasks = tasks.filter((task) => task.status === "In progress").length;
    const overdueTasks = tasks.filter(isOverdue).length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;

    const query = search.trim().toLowerCase();
    const filteredTasks = tasks.filter((task) => {
        const matchesStatus = statusFilter === "All tasks" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "All priorities" || task.priority === priorityFilter;
        const matchesProperty = propertyFilter === "All properties" || task.property === propertyFilter;
        const matchesSearch = !query || [task.id, task.title, task.description, task.property, task.unit, task.category, task.assignee, task.relatedReport ?? ""].some((value) => value.toLowerCase().includes(query));
        return matchesStatus && matchesPriority && matchesProperty && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "Priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
        if (sortBy === "Recently added") return b.id.localeCompare(a.id);
        return a.dueDate.localeCompare(b.dueDate);
    });

    const handleSave = (data: TaskFormData) => {
        if (activeTask === "new") {
            const nextId = tasks.reduce((maxId, task) => Math.max(maxId, Number(task.id.replace(/\D/g, "")) || 0), 0) + 1;
            setTasks((current) => [{ ...data, id: `TSK-${nextId}` }, ...current]);
        } else if (activeTask) {
            setTasks((current) => current.map((task) => task.id === activeTask.id ? { ...data, id: task.id } : task));
        }
        setActiveTask(null);
    };

    const handleDelete = (taskToDelete: OwnerTask) => {
        setTasks((current) => current.filter((task) => task.id !== taskToDelete.id));
        setActiveTask(null);
    };

    const handleStatusChange = (selected: OwnerTask, status: TaskStatus) => {
        setTasks((current) => current.map((task) => task.id === selected.id ? { ...task, status } : task));
    };

    const clearFilters = () => {
        setStatusFilter("All tasks");
        setPriorityFilter("All priorities");
        setPropertyFilter("All properties");
        setSearch("");
        setSortBy("Due date");
    };

    return (
        <div className="space-y-6 pb-8">
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Owner planner</p>
                    <h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Tasks & reminders</h2>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Plan property work, assign follow-ups, and keep important dates in one place.</p>
                </div>
                <button type="button" onClick={() => setActiveTask("new")} className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-gold-400 px-4 py-2.5 text-xs font-semibold text-jade-950 shadow-sm transition hover:bg-gold-300 sm:self-center">
                    <PlusIcon /> Create task
                </button>
            </section>

            <section aria-label="Task summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Planned" value={openTasks} note="Work waiting to start" color="text-blue-700" />
                <StatCard label="In progress" value={inProgressTasks} note="Currently being handled" color="text-amber-700" />
                <StatCard label="Overdue" value={overdueTasks} note="Needs a follow-up" color="text-red-700" />
                <StatCard label="Completed" value={completedTasks} note="Tasks marked done" color="text-jade-700" />
            </section>

            <section aria-label="Task list" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-outfit text-base font-bold text-ink">Work plan</h3>
                            <p className="mt-0.5 text-[11px] text-neutral-500">Property tasks, tenant follow-ups, and owner reminders.</p>
                        </div>
                        <p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filteredTasks.length}</span> tasks</p>
                    </div>
                    <div className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:max-w-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-[minmax(220px,1fr)_160px_160px_180px_160px]">
                        <label className="relative w-64 shrink-0 sm:w-auto sm:min-w-0">
                            <span className="sr-only">Search tasks</span>
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><SearchIcon /></span>
                            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search tasks, property, assignee..." className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" />
                        </label>
                        <label className="w-40 shrink-0 sm:w-auto">
                            <span className="sr-only">Filter by status</span>
                            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All tasks</option><option>Planned</option><option>In progress</option><option>Completed</option>
                            </select>
                        </label>
                        <label className="w-40 shrink-0 sm:w-auto">
                            <span className="sr-only">Filter by priority</span>
                            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as "All priorities" | TaskPriority)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All priorities</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
                            </select>
                        </label>
                        <label className="w-44 shrink-0 sm:w-auto">
                            <span className="sr-only">Filter by property</span>
                            <select value={propertyFilter} onChange={(event) => setPropertyFilter(event.target.value)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All properties</option>{taskProperties.map((property) => <option key={property}>{property}</option>)}
                            </select>
                        </label>
                        <label className="w-40 shrink-0 sm:w-auto">
                            <span className="sr-only">Sort tasks</span>
                            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as TaskSort)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>Due date</option><option>Priority</option><option>Recently added</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="space-y-3 bg-neutral-50/50 p-3 sm:p-4">
                    {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={setActiveTask} onStatusChange={handleStatusChange} />
                    )) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center">
                            <p className="font-outfit text-sm font-semibold text-neutral-600">No tasks match these filters</p>
                            <p className="mt-1 text-xs text-neutral-400">Try another search or create a new task.</p>
                            <button type="button" onClick={clearFilters} className="mt-3 text-xs font-semibold text-jade-700 hover:underline">Clear filters</button>
                        </div>
                    )}
                </div>
            </section>

            <p className="text-center text-[10px] text-neutral-400">Sample task records shown for preview. Tasks will be saved to your account when the backend is connected.</p>

            {activeTask && (
                <TaskModal
                    key={activeTask === "new" ? "new-task" : activeTask.id}
                    task={activeTask === "new" ? null : activeTask}
                    properties={taskProperties}
                    onClose={() => setActiveTask(null)}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
