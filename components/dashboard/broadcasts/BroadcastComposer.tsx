"use client";

import { useState } from "react";
import { broadcastAudiences, broadcastProperties, type BroadcastChannel } from "./broadcastsData";

export interface BroadcastDraft {
    title: string;
    message: string;
    property: string;
    audience: string;
    channels: BroadcastChannel[];
    imageName?: string;
}

const channels: { id: BroadcastChannel; description: string; color: string; bg: string }[] = [
    { id: "WhatsApp", description: "Rich messages & images", color: "text-[#128C7E]", bg: "bg-[#E8F7F2]" },
    { id: "SMS", description: "Reach any mobile phone", color: "text-[#3478F6]", bg: "bg-[#EDF3FF]" },
    { id: "Email", description: "Detailed updates", color: "text-[#D44638]", bg: "bg-[#FFF0EE]" },
];

const inputClass = "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

function ImageIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ChannelIcon({ channel }: { channel: BroadcastChannel }) {
    if (channel === "WhatsApp") {
        return (
            <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
                <path fill="currentColor" d="M16 3.2A12.5 12.5 0 0 0 5.3 22.2L3.7 28l6-1.6A12.5 12.5 0 1 0 16 3.2Zm0 22.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.5.9.9-3.4-.3-.5a10.2 10.2 0 1 1 9 4.8Z" />
                <path fill="currentColor" d="M21.6 18.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.6s1.2 3 1.4 3.2c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.3 1.5.2 2.1.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z" />
            </svg>
        );
    }

    if (channel === "SMS") {
        return (
            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
                <path d="M20.5 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 2v-6a8.5 8.5 0 1 1 17.5-4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 48 32" className="h-5 w-7" aria-hidden="true">
            <path fill="#4285F4" d="M4 6.5A4.5 4.5 0 0 1 8.5 2h31A4.5 4.5 0 0 1 44 6.5v2.2L24 23 4 8.7V6.5Z" />
            <path fill="#34A853" d="M4 8.7 24 23 44 8.7v16.8a4.5 4.5 0 0 1-4.5 4.5h-31A4.5 4.5 0 0 1 4 25.5V8.7Z" />
            <path fill="#EA4335" d="M8.5 2h31A4.5 4.5 0 0 1 44 6.5v2.2L24 23 4 8.7V6.5A4.5 4.5 0 0 1 8.5 2Z" />
            <path fill="#C5221F" d="M4 8.7 24 23v7H8.5A4.5 4.5 0 0 1 4 25.5V8.7Z" />
            <path fill="#FBBC04" d="m44 8.7-20 14.3v7h15.5a4.5 4.5 0 0 0 4.5-4.5V8.7Z" />
            <path fill="#F1F3F4" d="m4 6.5 20 14.3L44 6.5v2.2L24 23 4 8.7V6.5Z" />
        </svg>
    );
}

export default function BroadcastComposer({ onSend }: { onSend: (draft: BroadcastDraft, action: "send" | "schedule" | "draft") => void }) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [property, setProperty] = useState(broadcastProperties[0]);
    const [audience, setAudience] = useState(broadcastAudiences[0]);
    const [selectedChannels, setSelectedChannels] = useState<BroadcastChannel[]>(["WhatsApp"]);
    const [imageName, setImageName] = useState("");

    const toggleChannel = (channel: BroadcastChannel) => {
        setSelectedChannels((current) => current.includes(channel)
            ? current.filter((item) => item !== channel)
            : [...current, channel]);
    };

    const submit = (action: "send" | "schedule" | "draft") => {
        if (!title.trim() || !message.trim() || selectedChannels.length === 0) return;
        onSend({ title: title.trim(), message: message.trim(), property, audience, channels: selectedChannels, ...(imageName ? { imageName } : {}) }, action);
        setTitle("");
        setMessage("");
        setProperty(broadcastProperties[0]);
        setAudience(broadcastAudiences[0]);
        setSelectedChannels(["WhatsApp"]);
        setImageName("");
    };

    return (
        <section aria-label="Compose a broadcast" className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-5 sm:px-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">New campaign</p>
                    <h3 className="mt-1 font-outfit text-lg font-bold text-ink">Compose a broadcast</h3>
                    <p className="mt-1 text-xs text-neutral-500">Write an update, choose who receives it, and select delivery channels.</p>
                </div>
                <div className="hidden size-10 items-center justify-center rounded-xl bg-jade-50 text-jade-700 sm:flex"><ImageIcon /></div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5 p-5 sm:p-6">
                    <label className="block">
                        <span className={labelClass}>Campaign title</span>
                        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. November rent reminder" maxLength={80} className={inputClass} />
                    </label>
                    <label className="block">
                        <span className={labelClass}>Message</span>
                        <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a clear message for your tenants..." rows={6} maxLength={1200} className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" />
                        <span className="mt-1 block text-right text-[10px] text-neutral-400">{message.length}/1200</span>
                    </label>

                    <div>
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <span className={labelClass}>Attach images <span className="font-normal text-neutral-400">(optional)</span></span>
                            <span className="text-[10px] text-neutral-400">For WhatsApp & Email</span>
                        </div>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3.5 transition hover:border-jade-400 hover:bg-jade-50/50">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-jade-700 shadow-sm"><ImageIcon /></span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-semibold text-neutral-700">{imageName || "Choose image files"}</span>
                                <span className="mt-0.5 block text-[10px] text-neutral-400">JPG, PNG or WEBP · Max 5 MB each</span>
                            </span>
                            <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-neutral-600">Browse</span>
                            <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(event) => setImageName(Array.from(event.target.files ?? []).map((file) => file.name).join(", "))} />
                        </label>
                    </div>
                </div>

                <aside className="space-y-5 border-t border-neutral-100 bg-neutral-50/70 p-5 sm:p-6 lg:border-l lg:border-t-0">
                    <div>
                        <p className={labelClass}>Recipients</p>
                        <label className="mb-3 block">
                            <span className="sr-only">Select property</span>
                            <select value={property} onChange={(event) => setProperty(event.target.value)} className={inputClass}>
                                {broadcastProperties.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className="sr-only">Select audience</span>
                            <select value={audience} onChange={(event) => setAudience(event.target.value)} className={inputClass}>
                                {broadcastAudiences.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-jade-100 bg-white px-3.5 py-3">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-jade-50 text-jade-700"><span className="text-xs font-bold">214</span></span>
                            <span><span className="block text-xs font-semibold text-ink">Estimated audience</span><span className="text-[10px] text-neutral-400">Sample recipient count</span></span>
                        </div>
                    </div>

                    <div>
                        <p className={labelClass}>Delivery channels</p>
                        <p className="mb-2 text-[10px] text-neutral-400">Choose one or more channels.</p>
                        <div className="space-y-2">
                            {channels.map((channel) => {
                                const selected = selectedChannels.includes(channel.id);
                                return (
                                    <button key={channel.id} type="button" aria-pressed={selected} onClick={() => toggleChannel(channel.id)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${selected ? "border-jade-300 bg-white ring-2 ring-jade-600/10" : "border-neutral-200 bg-white hover:border-neutral-300"}`}>
                                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${channel.bg} ${channel.color}`}><ChannelIcon channel={channel.id} /></span>
                                        <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-ink">{channel.id}</span><span className="mt-0.5 block text-[10px] text-neutral-400">{channel.description}</span></span>
                                        <span className={`flex size-5 items-center justify-center rounded-md border text-[11px] font-bold ${selected ? "border-jade-700 bg-jade-700 text-white" : "border-neutral-300 bg-white text-transparent"}`}>✓</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gold-200 bg-gold-50 p-3.5">
                        <p className="text-[11px] font-semibold text-gold-900">Before you send</p>
                        <p className="mt-1 text-[10px] leading-4 text-gold-800">Messages are sample-only for now. No tenants will be contacted until delivery is connected.</p>
                    </div>
                </aside>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-[10px] text-neutral-400">{selectedChannels.length} channel{selectedChannels.length === 1 ? "" : "s"} selected</p>
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button type="button" disabled={!title.trim() || !message.trim()} onClick={() => submit("draft")} className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">Save draft</button>
                    <button type="button" disabled={!title.trim() || !message.trim() || selectedChannels.length === 0} onClick={() => submit("schedule")} className="rounded-xl bg-jade-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800 disabled:cursor-not-allowed disabled:opacity-50">Schedule broadcast</button>
                    <button type="button" disabled={!title.trim() || !message.trim() || selectedChannels.length === 0} onClick={() => submit("send")} className="rounded-xl bg-gold-400 px-5 py-2.5 text-xs font-semibold text-jade-950 shadow-sm transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-50">Send broadcast</button>
                </div>
            </div>
        </section>
    );
}
