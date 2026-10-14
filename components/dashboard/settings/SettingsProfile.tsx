"use client";

import { useState } from "react";

function FormRow({
    label,
    id,
    children,
    hint,
}: {
    label: string;
    id: string;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-4">
            <label htmlFor={id} className="pt-2 text-xs font-semibold text-neutral-700">
                {label}
            </label>
            <div>
                {children}
                {hint && <p className="mt-1 text-[11px] text-neutral-400">{hint}</p>}
            </div>
        </div>
    );
}

const inputCls =
    "h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15";

const textareaCls =
    "w-full rounded-lg border border-neutral-200 p-3 text-sm text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15";

export default function SettingsProfile() {
    const [firstName, setFirstName] = useState("Jane");
    const [lastName, setLastName] = useState("Wanjiku");
    const [email, setEmail] = useState("jane.wanjiku@myhome.ke");
    const [phone, setPhone] = useState("+254 711 778 899");
    const [role, setRole] = useState("Property Manager");
    const [bio, setBio] = useState("Experienced property manager overseeing a premium Nairobi portfolio.");
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="font-outfit text-lg font-bold text-ink">Profile</h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                    Manage your personal information and public-facing profile.
                </p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-5 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex size-16 items-center justify-center rounded-full bg-jade-700 font-outfit text-xl font-bold text-white shadow">
                    JW
                </div>
                <div>
                    <p className="text-sm font-semibold text-ink">Profile Photo</p>
                    <p className="mt-0.5 text-xs text-neutral-500">JPG or PNG, max 2 MB</p>
                    <button
                        type="button"
                        className="mt-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                        Upload Photo
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
                <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Personal Info</p>

                    <FormRow label="First Name" id="first-name">
                        <input id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />
                    </FormRow>

                    <FormRow label="Last Name" id="last-name">
                        <input id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />
                    </FormRow>

                    <FormRow label="Email" id="email" hint="Used for login and system notifications.">
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                    </FormRow>

                    <FormRow label="Phone" id="phone">
                        <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                    </FormRow>

                    <FormRow label="Role / Title" id="role">
                        <input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} />
                    </FormRow>

                    <FormRow label="Bio" id="bio" hint="Brief description shown on your public profile.">
                        <textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className={textareaCls} />
                    </FormRow>
                </div>

                <div className="flex items-center justify-between">
                    {saved && (
                        <p className="text-xs font-semibold text-jade-700">✓ Changes saved</p>
                    )}
                    <div className="ml-auto flex gap-3">
                        <button type="button" className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">
                            Discard
                        </button>
                        <button type="submit" className="rounded-lg bg-jade-700 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-jade-800">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

