"use client";

import { useState } from "react";

const inputCls =
    "h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{title}</p>
            {children}
        </div>
    );
}

function Toggle({ label, description, enabled, onChange }: { label: string; description: string; enabled: boolean; onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-start justify-between gap-4">
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
                <span
                    className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
                />
            </button>
        </div>
    );
}

export default function SettingsSecurity() {
    const [current, setCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [twoFa, setTwoFa] = useState(false);
    const [sessionAlerts, setSessionAlerts] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-outfit text-lg font-bold text-ink">Security & Password</h2>
                <p className="mt-0.5 text-xs text-neutral-500">Keep your account safe with a strong password and two-factor authentication.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
                <Section title="Change Password">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Current Password</label>
                            <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">New Password</label>
                            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className={inputCls} placeholder="Min. 8 characters" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Confirm New Password</label>
                            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} placeholder="••••••••" />
                        </div>
                    </div>
                </Section>

                <Section title="Two-Factor Authentication">
                    <Toggle
                        label="Enable 2FA"
                        description="Require a verification code on each login via SMS or authenticator app."
                        enabled={twoFa}
                        onChange={setTwoFa}
                    />
                    {twoFa && (
                        <div className="rounded-lg bg-jade-50 border border-jade-200 p-3 text-xs text-jade-800">
                            2FA is enabled. You will be prompted for a code on your next login.
                        </div>
                    )}
                </Section>

                <Section title="Session Security">
                    <Toggle
                        label="Login alerts"
                        description="Send an email notification whenever a new device signs into your account."
                        enabled={sessionAlerts}
                        onChange={setSessionAlerts}
                    />
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                        <p className="text-xs font-semibold text-neutral-700">Active Sessions</p>
                        <p className="mt-0.5 text-xs text-neutral-500">Chrome • Nairobi, KE — <span className="text-jade-700 font-semibold">Current</span></p>
                        <button type="button" className="mt-2 text-[11px] font-semibold text-danger hover:underline">
                            Sign out all other sessions
                        </button>
                    </div>
                </Section>

                <div className="flex items-center justify-between">
                    {saved && <p className="text-xs font-semibold text-jade-700">✓ Password updated</p>}
                    <button type="submit" className="ml-auto rounded-lg bg-jade-700 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-jade-800">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
}

