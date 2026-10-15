import type { Payment } from "./paymentsData";

interface MonthTotal {
    key: string;
    label: string;
    amount: number;
}

function getLastSixMonths(payments: Payment[]): MonthTotal[] {
    // Anchor this sample chart to the latest transaction instead of reading
    // the wall clock during prerendering. Backend data can supply the range later.
    const latestDate = payments.reduce((latest, payment) => {
        const date = new Date(payment.paidAt);
        return !Number.isNaN(date.getTime()) && date > latest ? date : latest;
    }, new Date("2026-10-01T00:00:00"));
    const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(latestDate.getFullYear(), latestDate.getMonth() - 5 + index, 1);
        return {
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
            amount: 0,
        };
    });
    const monthIndexes = new Map(months.map((month, index) => [month.key, index]));

    for (const payment of payments) {
        if (payment.status !== "Completed") continue;
        const date = new Date(payment.paidAt);
        if (Number.isNaN(date.getTime())) continue;
        const index = monthIndexes.get(`${date.getFullYear()}-${date.getMonth()}`);
        if (index !== undefined) months[index].amount += payment.amount;
    }

    return months;
}

function formatCompactAmount(amount: number) {
    if (amount >= 1_000_000) return `KSh ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `KSh ${Math.round(amount / 1_000)}K`;
    return `KSh ${amount}`;
}

export default function MonthlyPaymentsChart({ payments }: { payments: Payment[] }) {
    const data = getLastSixMonths(payments);
    const total = data.reduce((sum, month) => sum + month.amount, 0);
    const maxAmount = Math.max(...data.map((month) => month.amount), 1);
    const chartWidth = 680;
    const chartHeight = 230;
    const left = 66;
    const right = 18;
    const top = 20;
    const bottom = 34;
    const plotWidth = chartWidth - left - right;
    const plotHeight = chartHeight - top - bottom;
    const points = data.map((month, index) => ({
        ...month,
        x: left + (plotWidth / (data.length - 1)) * index,
        y: top + plotHeight - (month.amount / maxAmount) * plotHeight,
    }));
    const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${top + plotHeight} L ${points[0].x} ${top + plotHeight} Z`;

    return (
        <section aria-label="Monthly payment comparison" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-outfit text-base font-bold text-ink">Monthly payments</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-500">Completed payments received over the last 6 months</p>
                </div>
                <div className="sm:text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">6-month total</p>
                    <p className="mt-0.5 font-outfit text-base font-bold text-jade-800">{formatCompactAmount(total)}</p>
                </div>
            </div>
            <div className="overflow-x-auto px-4 py-5 sm:px-5">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[520px]" role="img" aria-label="Line chart comparing monthly completed payment amounts over the last six months">
                    {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                        const y = top + plotHeight - tick * plotHeight;
                        return (
                            <g key={tick}>
                                <line x1={left} y1={y} x2={chartWidth - right} y2={y} stroke="#E8E3D8" strokeDasharray="4 4" />
                                <text x={left - 9} y={y + 3} textAnchor="end" fontSize="9" fill="#918B7D">{formatCompactAmount(maxAmount * tick)}</text>
                            </g>
                        );
                    })}
                    <path d={areaPath} fill="#1F4F38" fillOpacity="0.08" />
                    <path d={linePath} fill="none" stroke="#1F4F38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((point) => (
                        <g key={point.key}>
                            <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#1F4F38" strokeWidth="2.5" />
                            <text x={point.x} y={chartHeight - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="#6E695F">{point.label}</text>
                            {point.amount > 0 && <text x={point.x} y={point.y - 11} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1F4F38">{formatCompactAmount(point.amount)}</text>}
                        </g>
                    ))}
                </svg>
            </div>
            <div className="flex items-center gap-2 border-t border-neutral-100 px-5 py-3">
                <span className="size-2.5 rounded-full bg-jade-700" aria-hidden="true" />
                <span className="text-[11px] font-medium text-neutral-600">Completed payments</span>
                <span className="ml-auto text-[10px] text-neutral-400">Sample data</span>
            </div>
        </section>
    );
}
