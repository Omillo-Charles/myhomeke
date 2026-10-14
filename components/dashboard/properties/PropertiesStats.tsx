import { Property } from "./types";
import { formatCompactKSh } from "./propertiesData";

interface PropertiesStatsProps {
    properties: Property[];
}

function PropertiesIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function OccupancyIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function RevenueIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function ArrowUpIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-success" aria-hidden="true">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function PropertiesStats({ properties }: PropertiesStatsProps) {
    const totalProperties = properties.length;
    const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);
    const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
    const vacantUnits = properties.reduce((sum, p) => sum + p.vacantUnits, 0);
    const totalRevenue = properties.reduce((sum, p) => sum + p.monthlyRevenue, 0);
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
    const underMaintenance = properties.filter((p) => p.status === "maintenance").length;

    const cards = [
        {
            title: "Total Portfolio Properties",
            value: totalProperties,
            sub: "Active managed estates",
            badge: "+2 added this quarter",
            badgeType: "positive",
            icon: PropertiesIcon,
            iconBg: "bg-jade-100 text-jade-700",
        },
        {
            title: "Units & Occupancy Rate",
            value: `${occupancyRate}%`,
            sub: `${occupiedUnits} occupied of ${totalUnits} units`,
            badge: `${vacantUnits} vacant available`,
            badgeType: vacantUnits > 0 ? "neutral" : "positive",
            icon: OccupancyIcon,
            iconBg: "bg-navy-100 text-navy-700",
        },
        {
            title: "Monthly Rent Roll",
            value: formatCompactKSh(totalRevenue),
            sub: "Expected monthly collections",
            badge: "+6.8% vs last quarter",
            badgeType: "positive",
            icon: RevenueIcon,
            iconBg: "bg-gold-100 text-gold-700",
        },
        {
            title: "Vacancies & Maintenance",
            value: `${vacantUnits} Units`,
            sub: `${underMaintenance} ${underMaintenance === 1 ? "property" : "properties"} undergoing work`,
            badge: "3 pending viewings",
            badgeType: "warning",
            icon: AlertIcon,
            iconBg: "bg-warning/10 text-warning",
        },
    ];

    return (
        <section aria-label="Properties overview statistics">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-medium text-neutral-500">{card.title}</p>
                                    <p className="mt-1 font-outfit text-2xl font-bold text-ink">{card.value}</p>
                                    <p className="mt-1 text-[11px] text-neutral-400">{card.sub}</p>
                                </div>
                                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                                    <Icon />
                                </span>
                            </div>

                            <div className="mt-4 flex items-center gap-1.5 border-t border-neutral-100 pt-3 text-xs">
                                {card.badgeType === "positive" && <ArrowUpIcon />}
                                <span
                                    className={`font-semibold ${
                                        card.badgeType === "positive"
                                            ? "text-success"
                                            : card.badgeType === "warning"
                                            ? "text-warning"
                                            : "text-neutral-600"
                                    }`}
                                >
                                    {card.badge}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

