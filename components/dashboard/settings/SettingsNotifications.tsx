"use client";

import { useState } from "react";

function Toggle({ label, description, enabled, onChange }: { label: string; description: string; enabled: boolean; onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 last:border-0">
            <div>
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => onChange(!enabled)}
                className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${enabled ? "bg-jade-700" : "bg-neutral-300"}`}
            >
                <span className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
            </button>
        </div>
    );
}

export default function SettingsNotifications() {
    const [rent, setRent] = useState(true);
    const [maintenance, setMaintenance] = useState(true);
    const [lease, setLease] = useState(true);
    const [vacancy, setVacancy] = useState(false);
    const [system, setSystem] = useState(true);
    const [newsletter, setNewsletter] = useState(false);
    const [smsRent, setSmsRent] = useState(true);
    const [smsMaint, setSmsMaint] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-outfit text-lg font-bold text-ink">Notifications</h2>
                <p className="mt-0.5 text-xs text-neutral-500">Choose what updates you receive and how you receive them.</p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="mb-3 text-xs font-bold uppercase text-neutral-400">Email Notifications</p>
                <Toggle label="Rent Payments" description="Notify me when a tenant makes or misses a payment." enabled={rent} onChange={setRent} />
                <Toggle label="Maintenance Requests" description="Notify me when a new maintenance ticket is opened." enabled={maintenance} onChange={setMaintenance} />
                <Toggle label="Lease Renewals & Expirations" description="Alerts 30, 14, and 7 days before a lease expires." enabled={lease} onChange={setLease} />
                <Toggle label="Vacancy Updates" description="Notify me when a unit becomes vacant or is re-occupied." enabled={vacancy} onChange={setVacancy} />
                <Toggle label="System & Security Alerts" description="Important account security events and platform updates." enabled={system} onChange={setSystem} />
                <Toggle label="Newsletter & Tips" description="Occasional property management tips from the MyHome Ke team." enabled={newsletter} onChange={setNewsletter} />
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="mb-3 text-xs font-bold uppercase text-neutral-400">SMS Notifications</p>
                <Toggle label="Rent Reminders (SMS)" description="Send SMS reminders to you when rent is due or overdue." enabled={smsRent} onChange={setSmsRent} />
                <Toggle label="Maintenance Alerts (SMS)" description="Receive an SMS when an urgent maintenance ticket is raised." enabled={smsMaint} onChange={setSmsMaint} />
            </div>

            <div className="flex justify-end">
                <button type="button" className="rounded-lg bg-jade-700 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-jade-800">
                    Save Preferences
                </button>
            </div>
        </div>
    );
}

