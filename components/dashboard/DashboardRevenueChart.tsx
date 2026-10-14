import Link from "next/link";

interface MonthData {
    month: string;
    collected: number;   // KSh thousands
    outstanding: number; // KSh thousands
}

const data: MonthData[] = [
    { month: "Jul", collected: 720,  outstanding: 80  },
    { month: "Aug", collected: 810,  outstanding: 65  },
    { month: "Sep", collected: 760,  outstanding: 110 },
    { month: "Oct", collected: 890,  outstanding: 55  },
    { month: "Nov", collected: 830,  outstanding: 95  },
    { month: "Dec", collected: 987,  outstanding: 124 },
];

const MAX_VALUE = 1200; // axis ceiling in thousands
const BAR_W = 18;
const GAP = 10;
const CHART_H = 120;
const CHART_W = data.length * (BAR_W * 2 + GAP + 8);

function formatK(v: number) {
    return v >= 1000 ? `${(v / 1000).toFixed(1)}M` : `${v}K`;
}

export default function DashboardRevenueChart() {
    const totalCollected  = data.reduce((s, d) => s + d.collected, 0);
    const totalOutstanding = data.reduce((s, d) => s + d.outstanding, 0);
    const latestMonth = data[data.length - 1];
    const prevMonth   = data[data.length - 2];
    const momChange   = (((latestMonth.collected - prevMonth.collected) / prevMonth.collected) * 100).toFixed(1);
    const momUp       = latestMonth.collected >= prevMonth.collected;

    return (
        <section aria-label="Revenue overview" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-4">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Revenue Overview</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-400">Monthly rent collected vs outstanding — last 6 months</p>
                </div>
                <Link href="/account/invoices" className="shrink-0 text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900">
                    Invoices →
                </Link>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
                <div className="px-3 py-2.5 sm:px-5 sm:py-3">
                    <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-400 sm:text-[10px]">6-Month Collected</p>
                    <p className="mt-1 font-outfit text-sm font-bold text-ink sm:text-base">KSh {formatK(totalCollected)}</p>
                </div>
                <div className="px-3 py-2.5 sm:px-5 sm:py-3">
                    <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-400 sm:text-[10px]">Total Outstanding</p>
                    <p className="mt-1 font-outfit text-sm font-bold text-danger sm:text-base">KSh {formatK(totalOutstanding)}</p>
                </div>
                <div className="px-3 py-2.5 sm:px-5 sm:py-3">
                    <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-400 sm:text-[10px]">MoM Change</p>
                    <p className={`mt-1 font-outfit text-sm font-bold sm:text-base ${momUp ? "text-success" : "text-danger"}`}>
                        {momUp ? "+" : ""}{momChange}%
                    </p>
                </div>
            </div>

            {/* Bar chart */}
            <div className="overflow-x-auto px-5 py-5">
                <svg
                    viewBox={`0 0 ${CHART_W + 32} ${CHART_H + 32}`}
                    className="w-full min-w-[320px]"
                    aria-label="Revenue bar chart"
                    role="img"
                >
                    {/* Y-axis grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                        const y = CHART_H - t * CHART_H;
                        const label = formatK(MAX_VALUE * t);
                        return (
                            <g key={t}>
                                <line
                                    x1="32" y1={y} x2={CHART_W + 32} y2={y}
                                    stroke="#E8E3D8" strokeWidth="1" strokeDasharray="4 3"
                                />
                                <text x="28" y={y + 4} textAnchor="end" fontSize="8" fill="#918B7D">{label}</text>
                            </g>
                        );
                    })}

                    {/* Bars */}
                    {data.map((d, i) => {
                        const x = 32 + i * (BAR_W * 2 + GAP + 8);
                        const collH = (d.collected / MAX_VALUE) * CHART_H;
                        const outstH = (d.outstanding / MAX_VALUE) * CHART_H;

                        return (
                            <g key={d.month}>
                                {/* Collected bar — jade */}
                                <rect
                                    x={x}
                                    y={CHART_H - collH}
                                    width={BAR_W}
                                    height={collH}
                                    rx="3"
                                    fill="#1F4F38"
                                    fillOpacity="0.85"
                                />
                                {/* Outstanding bar — gold */}
                                <rect
                                    x={x + BAR_W + 4}
                                    y={CHART_H - outstH}
                                    width={BAR_W}
                                    height={outstH}
                                    rx="3"
                                    fill="#C5A052"
                                    fillOpacity="0.8"
                                />
                                {/* Month label */}
                                <text
                                    x={x + BAR_W + 2}
                                    y={CHART_H + 14}
                                    textAnchor="middle"
                                    fontSize="9"
                                    fill="#6E695F"
                                    fontWeight="500"
                                >
                                    {d.month}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 border-t border-neutral-100 px-5 py-3">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-jade-700" aria-hidden="true" />
                    <span className="text-[11px] font-medium text-neutral-600">Collected</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-gold-500" aria-hidden="true" />
                    <span className="text-[11px] font-medium text-neutral-600">Outstanding</span>
                </div>
            </div>
        </section>
    );
}
