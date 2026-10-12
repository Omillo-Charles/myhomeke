import Link from "next/link";

function BarChart() {
    // Decorative revenue bar chart — gold + jade
    const bars = [
        { h: 45, color: "#C5A052" },
        { h: 60, color: "#1F4F38" },
        { h: 38, color: "#C5A052" },
        { h: 72, color: "#1F4F38" },
        { h: 55, color: "#C5A052" },
        { h: 80, color: "#1F4F38" },
        { h: 65, color: "#C5A052" },
    ];
    return (
        <svg viewBox="0 0 80 48" className="h-12 w-20" aria-hidden="true">
            {bars.map(({ h, color }, i) => (
                <rect
                    key={i}
                    x={i * 12}
                    y={48 - h * 0.48}
                    width="8"
                    height={h * 0.48}
                    rx="2"
                    fill={color}
                    fillOpacity="0.85"
                />
            ))}
        </svg>
    );
}

function ArrowUpIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const balance = {
    total: "KSh 5,428,900",
    outstanding: "KSh 124,500",
    monthlyRevenue: "KSh 987,500",
} as const;

export default function DashboardPropertyBalance() {
    return (
        <section
            aria-label="Property balance overview"
            className="flex flex-col gap-4 rounded-xl bg-jade-800 p-5 text-white shadow-sm"
        >
            {/* Title row */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-white">Property Balance Overview</h3>
                <Link
                    href="/account/invoices"
                    className="text-[11px] font-semibold text-jade-300 transition-colors hover:text-white"
                >
                    View All →
                </Link>
            </div>

            {/* Balance figures */}
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-jade-300">Total Balance</p>
                    <p className="mt-1 font-outfit text-2xl font-bold text-white">{balance.total}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-jade-300">Outstanding</p>
                        <p className="mt-0.5 font-outfit text-sm font-semibold text-gold-400">{balance.outstanding}</p>
                    </div>
                    <div className="h-8 w-px bg-jade-700" aria-hidden="true" />
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-jade-300">Monthly Revenue</p>
                        <p className="mt-0.5 font-outfit text-sm font-semibold text-white">{balance.monthlyRevenue}</p>
                    </div>
                </div>
            </div>

            {/* Chart + trend row */}
            <div className="flex items-end justify-between gap-3 border-t border-jade-700 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-jade-300">
                    <span className="flex items-center gap-0.5 text-success font-semibold">
                        <ArrowUpIcon />
                        12%
                    </span>
                    <span>vs last month</span>
                </div>
                <BarChart />
            </div>
        </section>
    );
}
