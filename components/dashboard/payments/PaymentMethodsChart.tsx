import type { Payment, PaymentChannel } from "./paymentsData";

const methodStyles: Record<PaymentChannel, { color: string; label: string }> = {
    "M-PESA": { color: "#1F4F38", label: "M-PESA" },
    "Airtel Money": { color: "#C63B42", label: "Airtel Money" },
    Bank: { color: "#52749B", label: "Bank transfers" },
    PayPal: { color: "#2474A8", label: "PayPal" },
};

function formatCompactAmount(amount: number) {
    if (amount >= 1_000_000) return `KSh ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `KSh ${Math.round(amount / 1_000)}K`;
    return `KSh ${amount}`;
}

export default function PaymentMethodsChart({ payments }: { payments: Payment[] }) {
    const data = (Object.keys(methodStyles) as PaymentChannel[]).map((channel) => {
        const completed = payments.filter((payment) => payment.channel === channel && payment.status === "Completed");
        return {
            channel,
            label: methodStyles[channel].label,
            amount: completed.reduce((total, payment) => total + payment.amount, 0),
            count: completed.length,
            color: methodStyles[channel].color,
        };
    });
    const totalAmount = data.reduce((total, item) => total + item.amount, 0);
    const totalCount = data.reduce((total, item) => total + item.count, 0);
    const radius = 78;
    const circumference = 2 * Math.PI * radius;
    let consumed = 0;

    return (
        <section aria-label="Payment method comparison" className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-outfit text-base font-bold text-ink">Payment method comparison</h3>
                    <p className="mt-0.5 text-[11px] text-neutral-500">Completed payment value by channel</p>
                </div>
                <div className="sm:text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Total collected</p>
                    <p className="mt-0.5 font-outfit text-base font-bold text-jade-800">{formatCompactAmount(totalAmount)}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-6 px-5 py-6 sm:grid-cols-[minmax(220px,0.9fr)_1.1fr] sm:gap-8 sm:px-8">
                <div className="flex justify-center">
                    <svg viewBox="0 0 220 220" className="w-full max-w-[240px]" role="img" aria-label={`Donut chart showing collected payment value by method; total ${formatCompactAmount(totalAmount)}`}>
                        <circle cx="110" cy="110" r={radius} fill="none" stroke="#F1F0EC" strokeWidth="24" />
                        {totalAmount > 0 && data.map((item) => {
                            const segmentLength = (item.amount / totalAmount) * circumference;
                            const offset = -consumed;
                            consumed += segmentLength;
                            return (
                                <circle
                                    key={item.channel}
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth="24"
                                    strokeDasharray={`${Math.max(segmentLength - 3, 0)} ${circumference}`}
                                    strokeDashoffset={offset}
                                    transform="rotate(-90 110 110)"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                        <text x="110" y="103" textAnchor="middle" fontSize="11" fontWeight="500" fill="#918B7D">Collected</text>
                        <text x="110" y="127" textAnchor="middle" fontSize="19" fontWeight="700" fill="#1F4F38">{formatCompactAmount(totalAmount)}</text>
                    </svg>
                </div>

                <div className="space-y-2">
                    {data.map((item) => {
                        const share = totalAmount > 0 ? Math.round((item.amount / totalAmount) * 100) : 0;
                        return (
                            <div key={item.channel} className="rounded-xl border border-neutral-100 px-4 py-3 transition-colors hover:bg-neutral-50/70">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                                        <span className="truncate text-xs font-semibold text-ink">{item.label}</span>
                                    </div>
                                    <span className="shrink-0 text-[11px] font-bold text-ink">{formatCompactAmount(item.amount)}</span>
                                </div>
                                <div className="ml-5 mt-2 flex items-center justify-between gap-3">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                                        <div className="h-full rounded-full transition-all" style={{ width: `${share}%`, backgroundColor: item.color }} />
                                    </div>
                                    <span className="w-8 text-right text-[10px] font-semibold text-neutral-400">{share}%</span>
                                </div>
                                <p className="ml-5 mt-1 text-[10px] text-neutral-400">{item.count} completed {item.count === 1 ? "payment" : "payments"}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-neutral-100 px-5 py-3">
                <p className="text-[10px] text-neutral-400">Bank transfer totals combine all supported banks.</p>
                <p className="shrink-0 text-[10px] font-medium text-neutral-500">{totalCount} completed transactions</p>
            </div>
        </section>
    );
}
