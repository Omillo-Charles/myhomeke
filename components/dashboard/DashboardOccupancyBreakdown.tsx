import Link from "next/link";

interface PropertyOccupancy {
    id: string;
    name: string;
    location: string;
    totalUnits: number;
    occupiedUnits: number;
    type: "Apartment" | "Bungalow" | "Penthouse" | "Mansion";
}

const properties: PropertyOccupancy[] = [
    { id: "1", name: "Kilimani Heights", location: "Kilimani, Nairobi", totalUnits: 48, occupiedUnits: 44, type: "Apartment" },
    { id: "2", name: "Karen Gardens", location: "Karen, Nairobi", totalUnits: 20, occupiedUnits: 17, type: "Bungalow" },
    { id: "3", name: "Westlands Plaza", location: "Westlands, Nairobi", totalUnits: 60, occupiedUnits: 51, type: "Apartment" },
    { id: "4", name: "Runda Estate", location: "Runda, Nairobi", totalUnits: 12, occupiedUnits: 12, type: "Mansion" },
    { id: "5", name: "Skyline Tower", location: "CBD, Nairobi", totalUnits: 74, occupiedUnits: 58, type: "Penthouse" },
] as const;

const typeColors: Record<PropertyOccupancy["type"], string> = {
    Apartment: "bg-jade-100 text-jade-700",
    Bungalow: "bg-gold-100 text-gold-700",
    Penthouse: "bg-navy-100 text-navy-700",
    Mansion: "bg-neutral-200 text-neutral-700",
};

function getBarColor(pct: number) {
    if (pct >= 90) return "bg-success";
    if (pct >= 70) return "bg-jade-500";
    if (pct >= 50) return "bg-warning";
    return "bg-danger";
}

function LocationIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3 shrink-0" aria-hidden="true">
            <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

// Donut ring for overall occupancy
function OverallDonut({ pct }: { pct: number }) {
    const r = 28;
    const circ = 2 * Math.PI * r;
    const filled = circ * (pct / 100);
    return (
        <svg viewBox="0 0 72 72" className="size-16" aria-hidden="true">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#E8E3D8" strokeWidth="7" />
            <circle
                cx="36" cy="36" r={r}
                fill="none"
                stroke="#1F4F38"
                strokeWidth="7"
                strokeDasharray={`${filled} ${circ}`}
                strokeLinecap="round"
                transform="rotate(-90 36 36)"
            />
            <text x="36" y="39" textAnchor="middle" fontSize="12" fontWeight="700" fill="#171B18">{pct}%</text>
        </svg>
    );
}

export default function DashboardOccupancyBreakdown() {
    const totalUnits = properties.reduce((s, p) => s + p.totalUnits, 0);
    const totalOccupied = properties.reduce((s, p) => s + p.occupiedUnits, 0);
    const totalVacant = totalUnits - totalOccupied;
    const overallPct = Math.round((totalOccupied / totalUnits) * 100);

    return (
        <section aria-label="Occupancy breakdown" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-5 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Occupancy Breakdown</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-400">Unit occupancy across all properties</p>
                </div>
                <Link href="/account/dashboard/properties" className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900">
                    View All →
                </Link>
            </div>

            <div className="flex flex-col gap-0 sm:flex-row">
                {/* Overall donut summary */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b border-neutral-100 px-6 py-5 sm:border-b-0 sm:border-r">
                    <OverallDonut pct={overallPct} />
                    <div className="space-y-1.5 text-center">
                        <div className="flex items-center gap-2 text-[11px]">
                            <span className="size-2 rounded-full bg-jade-700" aria-hidden="true" />
                            <span className="text-neutral-500">Occupied</span>
                            <span className="font-semibold text-ink">{totalOccupied}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                            <span className="size-2 rounded-full bg-neutral-200" aria-hidden="true" />
                            <span className="text-neutral-500">Vacant</span>
                            <span className="font-semibold text-danger">{totalVacant}</span>
                        </div>
                    </div>
                </div>

                {/* Per-property bars */}
                <ul role="list" className="flex flex-1 flex-col divide-y divide-neutral-50 px-5 py-2">
                    {properties.map((p) => {
                        const pct = Math.round((p.occupiedUnits / p.totalUnits) * 100);
                        const vacant = p.totalUnits - p.occupiedUnits;
                        const barColor = getBarColor(pct);

                        return (
                            <li key={p.id} className="flex flex-col gap-1.5 py-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="truncate text-[13px] font-semibold text-ink">{p.name}</span>
                                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${typeColors[p.type]}`}>
                                                {p.type}
                                            </span>
                                        </div>
                                        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-400">
                                            <LocationIcon />
                                            {p.location}
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <span className="text-[13px] font-bold text-ink">{pct}%</span>
                                        {vacant > 0 && (
                                            <p className="text-[10px] text-danger">{vacant} vacant</p>
                                        )}
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.name} occupancy`}>
                                    <div
                                        className={`h-full rounded-full transition-all ${barColor}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>

                                <p className="text-[10px] text-neutral-400">
                                    {p.occupiedUnits} / {p.totalUnits} units occupied
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
