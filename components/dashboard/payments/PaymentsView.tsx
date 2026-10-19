"use client";

import { useState } from "react";
import { payments, type Payment, type PaymentChannel, type PaymentStatus } from "./paymentsData";
import PaymentModal, { type PaymentFormData } from "./PaymentModal";
import PaymentMethodsChart from "./PaymentMethodsChart";
import MonthlyPaymentsChart from "./MonthlyPaymentsChart";
import ReceiptModal from "./ReceiptModal";

type ChannelFilter = "All channels" | PaymentChannel;
type StatusFilter = "All statuses" | PaymentStatus;

const channels: { name: PaymentChannel; description: string; tone: string }[] = [
    { name: "M-PESA", description: "Mobile money", tone: "bg-[#e6f4ec]" },
    { name: "Airtel Money", description: "Mobile money", tone: "bg-[#fff0f0]" },
    { name: "Bank", description: "All bank transfers", tone: "bg-[#eaf0f8]" },
    { name: "PayPal", description: "International", tone: "bg-[#eaf1ff]" },
];

const statusStyles: Record<PaymentStatus, string> = {
    Completed: "bg-jade-100 text-jade-800",
    Pending: "bg-amber-100 text-amber-800",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-neutral-100 text-neutral-600",
};

function formatAmount(amount: number) {
    return `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="m14 5 5 5M4 20l4.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ReceiptIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function PaymentChannelIcon({ channel }: { channel: PaymentChannel }) {
    if (channel === "M-PESA") {
        return (
            <svg viewBox="0 0 48 24" className="h-6 w-9" aria-hidden="true">
                <text x="1" y="18" fill="#e32932" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700">M</text>
                <text x="16" y="18" fill="#16834a" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700">PESA</text>
            </svg>
        );
    }

    if (channel === "Airtel Money") {
        return (
            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
                <path d="M12.4 2.4c-3.8 2.2-7.2 6.8-7.7 10.5-.3 2.2 1.2 3.7 3.1 3.4 2.9-.5 7.1-5.2 9.3-9.4 1.2-2.3.4-4.1-1.5-4.4-1-.2-2.1-.1-3.2-.1Z" fill="#e32932" />
                <path d="M8.2 18.2c2.7.8 6.3-.4 8.8-2.6" stroke="#e32932" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="18.7" cy="5.3" r="1.4" fill="#e32932" />
            </svg>
        );
    }

    if (channel === "Bank") {
        return (
            <svg viewBox="0 0 24 24" fill="none" className="size-6 text-[#315b8a]" aria-hidden="true">
                <path d="m3 9 9-5 9 5v1H3V9Z" fill="currentColor" />
                <path d="M5 11v7m4-7v7m6-7v7m4-7v7M3 20h18M2 22h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path d="M8.4 3.2H15c3.1 0 4.8 1.7 4.2 4.5-.6 3-2.6 4.7-5.8 4.7h-2.2l-.8 4.4H6.8L8.4 3.2Z" fill="#003087" />
            <path d="M5.4 6.1h6.2c3.1 0 4.7 1.6 4.2 4.3-.6 3-2.6 4.7-5.8 4.7H7.8L7 19.5H3.7L5.4 6.1Z" fill="#009cde" />
            <path d="M7 15.1h3.1c3.2 0 5.2-1.7 5.8-4.7.1-.4.1-.8.1-1.1 1.1.7 1.5 1.9 1.1 3.6-.6 3-2.6 4.7-5.8 4.7H9.1l-.4 2H5.4L7 15.1Z" fill="#012169" />
        </svg>
    );
}

function StatCard({ label, value, note, icon, accent }: { label: string; value: string; note: string; icon: string; accent: string }) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-neutral-500">{label}</p>
                    <p className="mt-2 font-outfit text-xl font-bold tracking-tight text-ink sm:text-2xl">{value}</p>
                    <p className="mt-1 text-[11px] text-neutral-400">{note}</p>
                </div>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${accent}`} aria-hidden="true">{icon}</span>
            </div>
        </article>
    );
}

function ChannelCard({ channel, amount, count, active, onClick }: {
    channel: (typeof channels)[number];
    amount: number;
    count: number;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`flex w-full items-center gap-3 rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-jade-300 hover:shadow-md ${active ? "border-jade-600 ring-2 ring-jade-600/10" : "border-neutral-200"}`}
        >
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${channel.tone}`}>
                <PaymentChannelIcon channel={channel.name} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink">{channel.name === "Bank" ? "Bank transfers" : channel.name}</span>
                <span className="mt-0.5 block text-[11px] text-neutral-400">{channel.description} · {count} payments</span>
            </span>
            <span className="shrink-0 text-right">
                <span className="block text-xs font-bold text-ink">{formatAmount(amount)}</span>
                <span className="mt-0.5 block text-[10px] text-neutral-400">received</span>
            </span>
        </button>
    );
}

function exportPayments(rows: Payment[]) {
    const header = ["Payment ID", "Reference", "Tenant", "Property", "Channel", "Payment detail", "Amount (KES)", "Date", "Status"];
    const csvRows = rows.map((payment) => [
        payment.id,
        payment.reference,
        payment.tenant,
        payment.property,
        payment.channel,
        payment.paymentDetail,
        payment.amount,
        payment.paidAt,
        payment.status,
    ]);
    const csv = [header, ...csvRows]
        .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myhome-payments.csv";
    link.click();
    URL.revokeObjectURL(url);
}

export default function PaymentsView() {
    const [channelFilter, setChannelFilter] = useState<ChannelFilter>("All channels");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All statuses");
    const [search, setSearch] = useState("");
    const [paymentRecords, setPaymentRecords] = useState<Payment[]>(() => payments);
    const [activePayment, setActivePayment] = useState<Payment | "new" | null>(null);
    const [receiptPayment, setReceiptPayment] = useState<Payment | null>(null);

    const completedPayments = paymentRecords.filter((payment) => payment.status === "Completed");
    const pendingPayments = paymentRecords.filter((payment) => payment.status === "Pending");
    const failedPayments = paymentRecords.filter((payment) => payment.status === "Failed");
    const totalReceived = completedPayments.reduce((total, payment) => total + payment.amount, 0);
    const pendingAmount = pendingPayments.reduce((total, payment) => total + payment.amount, 0);

    const query = search.trim().toLowerCase();
    const filteredPayments = paymentRecords.filter((payment) => {
        const matchesChannel = channelFilter === "All channels" || payment.channel === channelFilter;
        const matchesStatus = statusFilter === "All statuses" || payment.status === statusFilter;
        const matchesSearch = !query || [
            payment.id,
            payment.reference,
            payment.tenant,
            payment.property,
            payment.channel,
            payment.paymentDetail,
        ].some((value) => value.toLowerCase().includes(query));
        return matchesChannel && matchesStatus && matchesSearch;
    });

    const channelTotals = channels.map((channel) => {
        const received = paymentRecords.filter((payment) => payment.channel === channel.name && payment.status === "Completed");
        return {
            ...channel,
            amount: received.reduce((total, payment) => total + payment.amount, 0),
            count: paymentRecords.filter((payment) => payment.channel === channel.name).length,
        };
    });

    const handleSavePayment = (data: PaymentFormData) => {
        if (activePayment === "new") {
            const nextId = paymentRecords.reduce((maxId, payment) => {
                const numericId = Number(payment.id.replace(/\D/g, "")) || 0;
                return Math.max(maxId, numericId);
            }, 0) + 1;
            setPaymentRecords((current) => [{ ...data, id: `PAY-${nextId}` }, ...current]);
        } else if (activePayment) {
            setPaymentRecords((current) => current.map((payment) =>
                payment.id === activePayment.id ? { ...data, id: payment.id } : payment
            ));
        }
        setActivePayment(null);
    };

    const handleDeletePayment = (id: string) => {
        setPaymentRecords((current) => current.filter((payment) => payment.id !== id));
        setActivePayment(null);
    };

    return (
        <div className="space-y-6 pb-8">
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Finance overview</p>
                    <h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Tenant payments</h2>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Track rent and other payments received through mobile money, bank transfers, and PayPal.</p>
                </div>
                <div className="flex flex-wrap gap-2 self-start sm:self-center">
                    <button
                        type="button"
                        onClick={() => setActivePayment("new")}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-xs font-semibold text-jade-950 shadow-sm transition hover:bg-gold-300"
                    >
                        <PlusIcon />
                        Create payment
                    </button>
                    <button
                        type="button"
                        onClick={() => exportPayments(filteredPayments)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-jade-800 shadow-sm transition hover:bg-jade-50"
                    >
                        <DownloadIcon />
                        Export payments
                    </button>
                </div>
            </section>

            <section aria-label="Payment summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Payments received" value={formatAmount(totalReceived)} note="Completed transactions" icon="↗" accent="bg-jade-100 text-jade-700" />
                <StatCard label="Transactions" value={String(paymentRecords.length)} note="Across all channels" icon="↔" accent="bg-blue-100 text-blue-700" />
                <StatCard label="Awaiting confirmation" value={formatAmount(pendingAmount)} note={`${pendingPayments.length} pending ${pendingPayments.length === 1 ? "payment" : "payments"}`} icon="◷" accent="bg-amber-100 text-amber-700" />
                <StatCard label="Failed payments" value={String(failedPayments.length)} note="May need follow-up" icon="!" accent="bg-red-100 text-red-700" />
            </section>

            <section aria-label="Payments by channel" className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h3 className="font-outfit text-base font-bold text-ink">Payment channels</h3>
                        <p className="mt-0.5 text-[11px] text-neutral-500">Bank transfers are grouped together across all supported banks.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                    {channelTotals.map((channel) => (
                        <ChannelCard
                            key={channel.name}
                            channel={channel}
                            amount={channel.amount}
                            count={channel.count}
                            active={channelFilter === channel.name}
                            onClick={() => setChannelFilter((current) => current === channel.name ? "All channels" : channel.name)}
                        />
                    ))}
                </div>
            </section>

            <section aria-label="Payment transactions" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-outfit text-base font-bold text-ink">Recent transactions</h3>
                            <p className="mt-0.5 text-[11px] text-neutral-500">A record of tenant payments across your portfolio.</p>
                        </div>
                        <p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filteredPayments.length}</span> transactions</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <label className="relative min-w-0 flex-1">
                            <span className="sr-only">Search payments</span>
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><SearchIcon /></span>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search tenant, property, reference..."
                                className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10"
                            />
                        </label>
                        <label>
                            <span className="sr-only">Filter by payment channel</span>
                            <select
                                value={channelFilter}
                                onChange={(event) => setChannelFilter(event.target.value as ChannelFilter)}
                                className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600 sm:w-40"
                            >
                                <option>All channels</option>
                                {channels.map((channel) => <option key={channel.name} value={channel.name}>{channel.name === "Bank" ? "Bank transfers" : channel.name}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className="sr-only">Filter by payment status</span>
                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                                className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600 sm:w-40"
                            >
                                <option>All statuses</option>
                                {(["Completed", "Pending", "Failed", "Refunded"] as PaymentStatus[]).map((status) => <option key={status}>{status}</option>)}
                            </select>
                        </label>
                    </div>
                </div>

                {filteredPayments.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                        <p className="font-outfit text-sm font-semibold text-neutral-600">No payments match these filters</p>
                        <p className="mt-1 text-xs text-neutral-400">Try adjusting your search or selecting a different channel or status.</p>
                        <button
                            type="button"
                            onClick={() => { setSearch(""); setChannelFilter("All channels"); setStatusFilter("All statuses"); }}
                            className="mt-4 text-xs font-semibold text-jade-700 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-xs">
                            <thead className="bg-neutral-50 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                                <tr>
                                    <th className="px-5 py-3">Tenant / property</th>
                                    <th className="px-4 py-3">Payment channel</th>
                                    <th className="px-4 py-3">Reference</th>
                                    <th className="px-4 py-3">Date & time</th>
                                    <th className="px-4 py-3 text-right">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filteredPayments.map((payment) => {
                                    const channel = channels.find((item) => item.name === payment.channel)!;
                                    return (
                                        <tr key={payment.id} className="transition-colors hover:bg-neutral-50/70">
                                            <td className="px-5 py-3.5">
                                                <p className="font-semibold text-ink">{payment.tenant}</p>
                                                <p className="mt-0.5 text-[10px] text-neutral-400">{payment.property}</p>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${channel.tone}`}>
                                                        <PaymentChannelIcon channel={channel.name} />
                                                    </span>
                                                    <span>
                                                        <span className="block font-medium text-neutral-700">{payment.channel === "Bank" ? "Bank transfer" : payment.channel}</span>
                                                        <span className="mt-0.5 block text-[10px] text-neutral-400">{payment.paymentDetail}</span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 font-medium text-neutral-600">{payment.reference}</td>
                                            <td className="px-4 py-3.5 text-neutral-500">{payment.paidAt}</td>
                                            <td className="px-4 py-3.5 text-right font-semibold text-ink">{formatAmount(payment.amount)}</td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[payment.status]}`}>
                                                    <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setReceiptPayment(payment)}
                                                        aria-label={`Generate receipt for payment ${payment.id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800"
                                                    >
                                                        <ReceiptIcon />
                                                        <span>Receipt</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setActivePayment(payment)}
                                                        aria-label={`Edit payment ${payment.id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800"
                                                    >
                                                        <EditIcon />
                                                        <span>Edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <div className="space-y-5">
                <PaymentMethodsChart payments={paymentRecords} />
                <MonthlyPaymentsChart payments={paymentRecords} />
            </div>

            <p className="text-center text-[10px] text-neutral-400">Sample payment activity shown for design preview. Live transactions will appear here when payments are connected.</p>

            {activePayment && (
                <PaymentModal
                    key={activePayment === "new" ? "new-payment" : activePayment.id}
                    payment={activePayment === "new" ? null : activePayment}
                    onClose={() => setActivePayment(null)}
                    onSave={handleSavePayment}
                    onDelete={handleDeletePayment}
                />
            )}

            {receiptPayment && (
                <ReceiptModal
                    payment={receiptPayment}
                    onClose={() => setReceiptPayment(null)}
                />
            )}
        </div>
    );
}
