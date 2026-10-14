"use client";

const INVOICES = [
    { id: "INV-2026-010", tenant: "Amara Osei", property: "Kilimani Heights", date: "5 Oct 2026", due: "15 Oct 2026", amount: "KSh 65,000", status: "Sent" },
    { id: "INV-2026-009", tenant: "Brian Kamau", property: "Karen Gardens", date: "3 Oct 2026", due: "10 Oct 2026", amount: "KSh 180,000", status: "Paid" },
    { id: "INV-2026-008", tenant: "Cynthia Mwangi", property: "Skyline Tower", date: "1 Oct 2026", due: "8 Oct 2026", amount: "KSh 320,000", status: "Overdue" },
    { id: "INV-2026-007", tenant: "David Otieno", property: "Grandview Estate", date: "28 Sep 2026", due: "5 Oct 2026", amount: "KSh 350,000", status: "Paid" },
    { id: "INV-2026-006", tenant: "Esther Njeri", property: "Azure Heights", date: "25 Sep 2026", due: "2 Oct 2026", amount: "KSh 60,000", status: "Draft" },
];

const statusBadge: Record<string, string> = {
    Paid: "bg-jade-100 text-jade-800",
    Sent: "bg-blue-100 text-blue-800",
    Overdue: "bg-red-100 text-red-700",
    Draft: "bg-neutral-200 text-neutral-600",
};

export default function SettingsInvoices() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-outfit text-lg font-bold text-ink">Invoices</h2>
                    <p className="mt-0.5 text-xs text-neutral-500">View and manage all tenant invoices across your portfolio.</p>
                </div>
                <button type="button" className="self-start rounded-lg bg-jade-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-jade-800 sm:self-auto">
                    + New Invoice
                </button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { label: "Total Invoiced", value: "KSh 975,000", color: "text-ink" },
                    { label: "Collected", value: "KSh 530,000", color: "text-jade-700" },
                    { label: "Overdue", value: "KSh 320,000", color: "text-danger" },
                    { label: "Draft", value: "KSh 60,000", color: "text-neutral-500" },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{s.label}</p>
                        <p className={`mt-1 font-outfit text-lg font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="border-b border-neutral-200 bg-neutral-50">
                            <tr className="text-left text-neutral-400">
                                <th className="px-4 py-3 font-semibold">Invoice</th>
                                <th className="px-4 py-3 font-semibold">Tenant</th>
                                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Property</th>
                                <th className="px-4 py-3 font-semibold hidden md:table-cell">Due Date</th>
                                <th className="px-4 py-3 font-semibold">Amount</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {INVOICES.map((inv) => (
                                <tr key={inv.id} className="hover:bg-neutral-50/60">
                                    <td className="px-4 py-3 font-semibold text-ink">{inv.id}</td>
                                    <td className="px-4 py-3 text-neutral-700">{inv.tenant}</td>
                                    <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{inv.property}</td>
                                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">{inv.due}</td>
                                    <td className="px-4 py-3 font-semibold text-ink">{inv.amount}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusBadge[inv.status]}`}>{inv.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button type="button" className="font-semibold text-jade-700 hover:underline">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

