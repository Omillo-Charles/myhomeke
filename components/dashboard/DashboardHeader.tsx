"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function BellIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[15px]" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ExportIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[15px]" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// Hardcoded for now — will be replaced with real session data
const USER = {
    name: "Jane Wanjiku",
    role: "Property Manager",
    avatar: null,
} as const;

function formatDate(d: Date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(d);
}

export default function DashboardHeader() {
    const [date, setDate] = useState<string | null>(null);

    useEffect(() => {
        setDate(formatDate(new Date()));
    }, []);

    return (
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:px-8">
            {/* Left — page title */}
            <h1 className="font-outfit text-xl font-semibold text-ink">Overview</h1>

            {/* Right — date, export, notifications, user */}
            <div className="flex items-center gap-3">
                {/* Date badge */}
                <div className="hidden items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 sm:flex">
                    <CalendarIcon />
                    {date ? (
                        <span className="text-xs font-medium text-neutral-600">{date}</span>
                    ) : (
                        <span className="h-3 w-28 animate-pulse rounded bg-neutral-200" aria-hidden="true" />
                    )}
                </div>

                {/* Export button */}
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md bg-jade-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-jade-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade-700"
                >
                    <ExportIcon />
                    Export Report
                </button>

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-ink"
                >
                    <BellIcon />
                    {/* Unread dot */}
                    <span
                        aria-hidden="true"
                        className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold-500 ring-2 ring-white"
                    />
                </button>

                {/* User pill */}
                <div className="flex items-center gap-2.5">
                    {/* Avatar */}
                    <div className="relative size-9 overflow-hidden rounded-full bg-jade-100 ring-2 ring-jade-200">
                        {USER.avatar ? (
                            <Image
                                src={USER.avatar}
                                alt={USER.name}
                                fill
                                className="object-cover"
                                sizes="36px"
                            />
                        ) : (
                            <span
                                aria-hidden="true"
                                className="flex size-full items-center justify-center font-outfit text-sm font-semibold text-jade-700"
                            >
                                {USER.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                        )}
                        {/* Online indicator */}
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 right-0 size-2.5 rounded-full bg-success ring-2 ring-white"
                        />
                    </div>

                    {/* Name + role */}
                    <div className="hidden flex-col leading-none lg:flex">
                        <span className="text-[13px] font-semibold text-ink">{USER.name}</span>
                        <span className="mt-0.5 text-[11px] text-neutral-500">{USER.role}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
