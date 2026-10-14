"use client";

const PLANS = [
    {
        name: "Starter",
        price: "KSh 2,500",
        period: "/ month",
        features: ["Up to 10 units", "Basic reports", "Email support"],
        current: false,
    },
    {
        name: "Growth",
        price: "KSh 7,500",
        period: "/ month",
        features: ["Up to 100 units", "Advanced analytics", "Priority support", "Listings on feed"],
        current: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Unlimited units", "Dedicated account manager", "API access", "Custom integrations"],
        current: false,
    },
];

const INVOICES = [
    { id: "INV-2026-10", date: "1 Oct 2026", amount: "KSh 7,500", status: "Paid" },
    { id: "INV-2026-09", date: "1 Sep 2026", amount: "KSh 7,500", status: "Paid" },
    { id: "INV-2026-08", date: "1 Aug 2026", amount: "KSh 7,500", status: "Paid" },
];

export default function SettingsBilling() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-outfit text-lg font-bold text-ink">Billing & Plans</h2>
                <p className="mt-0.5 text-xs text-neutral-500">Manage your subscription plan and payment method.</p>
            </div>

            {/* Current card */}
            <div className="rounded-xl border border-jade-200 bg-jade-50/60 p-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-jade-600">Current Plan</p>
                    <p className="mt-1 font-outfit text-xl font-bold text-ink">Growth</p>
                    <p className="mt-0.5 text-xs text-neutral-500">Next billing: <span className="font-semibold text-ink">1 Nov 2026</span> — KSh 7,500</p>
                </div>
                <button type="button" className="shrink-0 rounded-lg border border-danger/30 px-4 py-2 text-xs font-semibold text-danger hover:bg-danger/8">
                    Cancel Plan
                </button>
            </div>

            {/* Plans grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-xl border p-5 ${plan.current ? "border-jade-600 bg-white ring-2 ring-jade-600/20" : "border-neutral-200 bg-white"}`}
                    >
                        {plan.current && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-jade-700 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                Current
                            </span>
                        )}
                        <p className="font-outfit text-base font-bold text-ink">{plan.name}</p>
                        <p className="mt-1">
                            <span className="font-outfit text-xl font-bold text-jade-700">{plan.price}</span>
                            <span className="ml-1 text-xs text-neutral-500">{plan.period}</span>
                        </p>
                        <ul className="mt-3 space-y-1.5">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-neutral-600">
                                    <span className="size-1.5 shrink-0 rounded-full bg-jade-600" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {!plan.current && (
                            <button type="button" className="mt-4 w-full rounded-lg bg-jade-700 py-2 text-xs font-semibold text-white hover:bg-jade-800">
                                Upgrade
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Payment method */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Payment Method</p>
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold text-white">VISA</div>
                        <div>
                            <p className="text-sm font-semibold text-ink">•••• •••• •••• 4242</p>
                            <p className="text-xs text-neutral-500">Expires 08/28</p>
                        </div>
                    </div>
                    <button type="button" className="text-xs font-semibold text-jade-700 hover:underline">Change</button>
                </div>
            </div>

            {/* Recent invoices */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400">Recent Invoices</p>
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-left text-neutral-400">
                            <th className="pb-2 font-semibold">Invoice</th>
                            <th className="pb-2 font-semibold">Date</th>
                            <th className="pb-2 font-semibold">Amount</th>
                            <th className="pb-2 font-semibold">Status</th>
                            <th className="pb-2" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {INVOICES.map((inv) => (
                            <tr key={inv.id}>
                                <td className="py-2.5 font-semibold text-ink">{inv.id}</td>
                                <td className="py-2.5 text-neutral-500">{inv.date}</td>
                                <td className="py-2.5 font-semibold text-ink">{inv.amount}</td>
                                <td className="py-2.5">
                                    <span className="rounded-full bg-jade-100 px-2 py-0.5 text-[10px] font-bold text-jade-800">{inv.status}</span>
                                </td>
                                <td className="py-2.5 text-right">
                                    <button type="button" className="text-jade-700 hover:underline font-semibold">Download</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

