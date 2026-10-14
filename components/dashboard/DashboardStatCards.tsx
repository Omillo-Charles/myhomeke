function TrendUpIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 text-success" aria-hidden="true">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function TrendDownIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 text-danger" aria-hidden="true">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 18 23 18 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function PropertiesBarChart() {
    // Decorative mini bar chart — jade tones
    const bars = [40, 65, 50, 80, 60, 90, 75];
    return (
        <svg viewBox="0 0 56 32" className="h-8 w-14" aria-hidden="true">
            {bars.map((h, i) => (
                <rect
                    key={i}
                    x={i * 8}
                    y={32 - h * 0.32}
                    width="5"
                    height={h * 0.32}
                    rx="1.5"
                    fill={i === bars.length - 1 ? "#1F4F38" : "#B8D6C3"}
                />
            ))}
        </svg>
    );
}

function UnitsLineChart() {
    // Decorative mini line chart — gold tones
    return (
        <svg viewBox="0 0 56 32" className="h-8 w-14" aria-hidden="true">
            <polyline
                points="0,28 8,22 16,25 24,15 32,18 40,8 48,12 56,6"
                fill="none"
                stroke="#C5A052"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <polyline
                points="0,28 8,22 16,25 24,15 32,18 40,8 48,12 56,6 56,32 0,32"
                fill="#C5A052"
                fillOpacity="0.12"
                stroke="none"
            />
        </svg>
    );
}

function OccupancyDonut() {
    // 85% occupancy donut ring — jade
    const r = 11;
    const circ = 2 * Math.PI * r;
    const filled = circ * 0.85;
    return (
        <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
            <circle cx="16" cy="16" r={r} fill="none" stroke="#B8D6C3" strokeWidth="4" />
            <circle
                cx="16"
                cy="16"
                r={r}
                fill="none"
                stroke="#1F4F38"
                strokeWidth="4"
                strokeDasharray={`${filled} ${circ}`}
                strokeLinecap="round"
                transform="rotate(-90 16 16)"
            />
        </svg>
    );
}

const stats = [
    {
        label: "Total Properties",
        value: "48",
        trend: "+3",
        trendLabel: "+3 from last month",
        trendUp: true,
        chart: <PropertiesBarChart />,
        link: "/account/dashboard/properties",
    },
    {
        label: "Total Units",
        value: "214",
        trend: "+7",
        trendLabel: "+7 from last month",
        trendUp: true,
        chart: <UnitsLineChart />,
        link: "/account/dashboard/properties",
    },
    {
        label: "Occupancy Rate",
        value: "85%",
        trend: "+2%",
        trendLabel: "+2% this month",
        trendUp: true,
        chart: <OccupancyDonut />,
        link: "/account/tenants",
    },
] as const;

export default function DashboardStatCards() {
    return (
        <section aria-label="Property summary">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Property Summary</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, trend, trendLabel, trendUp, chart, link }) => (
                    <div
                        key={label}
                        className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-xs font-medium text-neutral-500">{label}</p>
                                <p className="mt-1.5 font-outfit text-2xl font-bold text-ink">{value}</p>
                            </div>
                            <div className="shrink-0 pt-0.5">{chart}</div>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                            <div className="flex items-center gap-1">
                                {trendUp ? <TrendUpIcon /> : <TrendDownIcon />}
                                <span
                                    className={`text-xs font-semibold ${trendUp ? "text-success" : "text-danger"}`}
                                >
                                    {trend}
                                </span>
                                <span className="text-xs text-neutral-400">{trendLabel.replace(trend, "").trim()}</span>
                            </div>
                            <a
                                href={link}
                                className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900"
                            >
                                View More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
