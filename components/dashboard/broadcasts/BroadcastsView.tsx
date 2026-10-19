"use client";

import { useState } from "react";
import BroadcastComposer, { type BroadcastDraft } from "./BroadcastComposer";
import { initialBroadcasts, type Broadcast, type BroadcastChannel, type BroadcastStatus } from "./broadcastsData";

type StatusFilter = "All messages" | BroadcastStatus;

const statusStyles: Record<BroadcastStatus, string> = {
    Sent: "bg-jade-100 text-jade-800",
    Scheduled: "bg-blue-100 text-blue-800",
    Draft: "bg-neutral-100 text-neutral-600",
};

const channelStyles: Record<BroadcastChannel, string> = {
    WhatsApp: "bg-[#E8F7F2] text-[#128C7E]",
    SMS: "bg-[#EDF3FF] text-[#3478F6]",
    Email: "bg-[#FFF0EE] text-[#D44638]",
};

function BroadcastIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="m3 11 18-8-7 18-3-7-8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="m11 14 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function StatCard({ label, value, detail, color }: { label: string; value: number; detail: string; color: string }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-medium text-neutral-500">{label}</p>
            <p className={`mt-2 font-outfit text-2xl font-bold tracking-tight ${color}`}>{value}</p>
            <p className="mt-1 text-[11px] text-neutral-400">{detail}</p>
        </article>
    );
}

function BroadcastCard({ broadcast }: { broadcast: Broadcast }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-jade-50 text-jade-700"><BroadcastIcon /></span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-ink">{broadcast.title}</h3>
                            <span className="text-[10px] font-medium text-neutral-400">{broadcast.id}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{broadcast.message}</p>
                        {broadcast.imageName && <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-neutral-50 px-2 py-1 text-[10px] font-medium text-neutral-500">▧ {broadcast.imageName}</p>}
                    </div>
                </div>
                <span className={`self-start rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[broadcast.status]}`}>{broadcast.status}</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
                    <span><span className="text-neutral-400">Property </span><span className="font-semibold text-neutral-700">{broadcast.property}</span></span>
                    <span><span className="text-neutral-400">Audience </span><span className="font-semibold text-neutral-700">{broadcast.audience}</span></span>
                    <span className="text-neutral-500">{broadcast.sentAt}</span>
                    <div className="flex items-center gap-1.5">
                        {broadcast.channels.map((channel) => <span key={channel} className={`rounded-md px-2 py-1 text-[10px] font-semibold ${channelStyles[channel]}`}>{channel}</span>)}
                    </div>
                </div>
                <p className="shrink-0 text-[11px] font-semibold text-neutral-600">{broadcast.recipients} <span className="font-normal text-neutral-400">recipients</span></p>
            </div>
        </article>
    );
}

export default function BroadcastsView() {
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>(() => initialBroadcasts);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All messages");
    const [search, setSearch] = useState("");
    const sentCount = broadcasts.filter((broadcast) => broadcast.status === "Sent").length;
    const scheduledCount = broadcasts.filter((broadcast) => broadcast.status === "Scheduled").length;
    const draftCount = broadcasts.filter((broadcast) => broadcast.status === "Draft").length;
    const reachedCount = broadcasts.filter((broadcast) => broadcast.status === "Sent").reduce((total, broadcast) => total + broadcast.recipients, 0);

    const query = search.trim().toLowerCase();
    const filteredBroadcasts = broadcasts.filter((broadcast) => {
        const matchesStatus = statusFilter === "All messages" || broadcast.status === statusFilter;
        const matchesSearch = !query || [broadcast.id, broadcast.title, broadcast.message, broadcast.property, broadcast.audience, ...broadcast.channels].some((value) => value.toLowerCase().includes(query));
        return matchesStatus && matchesSearch;
    });

    const handleSubmit = (draft: BroadcastDraft, action: "send" | "schedule" | "draft") => {
        const status: BroadcastStatus = action === "draft" ? "Draft" : action === "schedule" ? "Scheduled" : "Sent";
        const nextId = broadcasts.reduce((maxId, broadcast) => Math.max(maxId, Number(broadcast.id.replace(/\D/g, "")) || 0), 0) + 1;
        const recipients = draft.property === "All properties" ? 214 : draft.property === "Kilimani Heights" ? 44 : draft.property === "Karen Gardens" ? 17 : 28;
        const newBroadcast: Broadcast = {
            ...draft,
            title: draft.title,
            id: `BRD-${nextId}`,
            recipients: status === "Draft" ? 0 : recipients,
            sentAt: status === "Draft" ? "Just now" : status === "Scheduled" ? "20 Oct 2026, 9:00 AM" : "Just now",
            status,
        };
        setBroadcasts((current) => [newBroadcast, ...current]);
        setStatusFilter("All messages");
    };

    const handleComposerSend = (draft: BroadcastDraft, action: "send" | "schedule" | "draft") => handleSubmit(draft, action);

    return (
        <div className="space-y-6 pb-8">
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Tenant communications</p>
                    <h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Broadcasts</h2>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Send important property updates, reminders, and images to tenants through their preferred channels.</p>
                </div>
                <div className="flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-jade-100 sm:self-center">
                    <span className="size-2 rounded-full bg-gold-400" aria-hidden="true" />
                    Sample mode · no messages are sent
                </div>
            </section>

            <section aria-label="Broadcast summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Sent campaigns" value={sentCount} detail="Successfully sent (sample)" color="text-jade-700" />
                <StatCard label="Recipients reached" value={reachedCount} detail="Across sent messages" color="text-ink" />
                <StatCard label="Scheduled" value={scheduledCount} detail="Queued for later" color="text-blue-700" />
                <StatCard label="Drafts" value={draftCount} detail="Saved for later" color="text-neutral-600" />
            </section>

            <BroadcastComposer onSend={handleComposerSend} />

            <section aria-label="Broadcast history" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div><h3 className="font-outfit text-base font-bold text-ink">Broadcast history</h3><p className="mt-0.5 text-[11px] text-neutral-500">Sent messages, scheduled campaigns, and saved drafts.</p></div>
                        <p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filteredBroadcasts.length}</span> campaigns</p>
                    </div>
                    <div className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:max-w-none sm:grid-cols-[minmax(220px,1fr)_180px] sm:overflow-visible sm:px-0 sm:pb-0">
                        <label className="relative w-64 shrink-0 sm:w-auto sm:min-w-0">
                            <span className="sr-only">Search broadcast history</span>
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" /><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
                            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search campaigns, properties..." className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" />
                        </label>
                        <label className="w-40 shrink-0 sm:w-auto">
                            <span className="sr-only">Filter broadcast by status</span>
                            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600">
                                <option>All messages</option><option>Sent</option><option>Scheduled</option><option>Draft</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="space-y-3 bg-neutral-50/50 p-3 sm:p-4">
                    {filteredBroadcasts.length ? filteredBroadcasts.map((broadcast) => <BroadcastCard key={broadcast.id} broadcast={broadcast} />) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center"><p className="font-outfit text-sm font-semibold text-neutral-600">No broadcasts match these filters</p><p className="mt-1 text-xs text-neutral-400">Try another search or status filter.</p></div>
                    )}
                </div>
            </section>
            <p className="text-center text-[10px] text-neutral-400">Broadcasts are stored in this page only for the design preview. No actual messages or images are sent.</p>
        </div>
    );
}
