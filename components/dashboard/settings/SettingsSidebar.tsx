"use client";

// ── Icons ──────────────────────────────────────────────────────────────────

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CreditCardIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function InvoiceIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function QuoteIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LogIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function PlugIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 6v4m4-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 16l2 2a4 4 0 0 0 5.66 0l4.68-4.68a4 4 0 0 0 0-5.66L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function PaletteIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="10" r="1.5" fill="currentColor" />
            <circle cx="12" cy="7" r="1.5" fill="currentColor" />
            <circle cx="16" cy="10" r="1.5" fill="currentColor" />
            <path d="M12 22a3 3 0 0 1-3-3c0-1.5 3-4 3-4s3 2.5 3 4a3 3 0 0 1-3 3Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function TeamIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 20a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 11a3 3 0 1 1 0-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 20a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function KeyIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <circle cx="7.5" cy="15.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M21 8.5l-8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 5.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.5 8l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── Nav structure ──────────────────────────────────────────────────────────

interface SettingsNavItem {
    label: string;
    section: string;
    icon: () => React.ReactElement;
}

interface SettingsNavGroup {
    title: string;
    items: SettingsNavItem[];
}

const navGroups: SettingsNavGroup[] = [
    {
        title: "Account",
        items: [
            { label: "Profile", section: "profile", icon: UserIcon },
            { label: "Security & Password", section: "security", icon: ShieldIcon },
            { label: "API Keys", section: "api-keys", icon: KeyIcon },
            { label: "Team & Permissions", section: "team", icon: TeamIcon },
        ],
    },
    {
        title: "Preferences",
        items: [
            { label: "Notifications", section: "notifications", icon: BellIcon },
            { label: "Appearance", section: "appearance", icon: PaletteIcon },
            { label: "Language & Region", section: "locale", icon: GlobeIcon },
        ],
    },
    {
        title: "Billing & Finance",
        items: [
            { label: "Billing & Plans", section: "billing", icon: CreditCardIcon },
            { label: "Invoices", section: "invoices", icon: InvoiceIcon },
            { label: "Quotes", section: "quotes", icon: QuoteIcon },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Integrations", section: "integrations", icon: PlugIcon },
            { label: "System Logs", section: "logs", icon: LogIcon },
            { label: "Data & Privacy", section: "data", icon: TrashIcon },
        ],
    },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function SettingsSidebar({
    activeSection,
    onSectionChange,
}: {
    activeSection: string;
    onSectionChange: (section: string) => void;
}) {

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden w-[220px] shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
                <div className="flex h-[60px] shrink-0 items-center border-b border-neutral-200 px-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                        Settings
                    </p>
                </div>
                <nav aria-label="Settings navigation" className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="space-y-4" role="list">
                        {navGroups.map((group) => (
                            <li key={group.title}>
                                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                                    {group.title}
                                </p>
                                <ul className="space-y-0.5" role="list">
                                    {group.items.map(({ label, section, icon: Icon }) => {
                                        const active = activeSection === section;
                                        return (
                                            <li key={label}>
                                                <button
                                                    type="button"
                                                    aria-pressed={active}
                                                    onClick={() => onSectionChange(section)}
                                                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] font-medium transition-colors ${active
                                                            ? "bg-jade-700 text-white"
                                                            : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                                                        }`}
                                                >
                                                    <Icon />
                                                    {label}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Mobile horizontal scroll nav */}
            <div className="shrink-0 border-b border-neutral-200 bg-white lg:hidden">
                <div className="flex gap-1 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {navGroups.flatMap((g) => g.items).map(({ label, section, icon: Icon }) => {
                        const active = activeSection === section;
                        return (
                            <button
                                key={section}
                                type="button"
                                aria-pressed={active}
                                onClick={() => onSectionChange(section)}
                                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors ${active
                                        ? "border-jade-600 bg-jade-700 text-white"
                                        : "border-neutral-200 bg-white text-neutral-600 hover:border-jade-300 hover:text-jade-700"
                                    }`}
                            >
                                <Icon />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

