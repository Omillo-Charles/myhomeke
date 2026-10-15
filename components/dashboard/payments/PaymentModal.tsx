"use client";

import { useState } from "react";
import type { Payment, PaymentChannel, PaymentStatus } from "./paymentsData";

export type PaymentFormData = Omit<Payment, "id">;

const channels: PaymentChannel[] = ["M-PESA", "Airtel Money", "Bank", "PayPal"];
const statuses: PaymentStatus[] = ["Completed", "Pending", "Failed", "Refunded"];

function toDateTimeInput(value?: string) {
    if (value) {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            const localDate = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60_000);
            return localDate.toISOString().slice(0, 16);
        }
    }

    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return localDate.toISOString().slice(0, 16);
}

function toDisplayDate(value: string) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(parsed);
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

const inputClass = "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

export default function PaymentModal({
    payment,
    onClose,
    onSave,
    onDelete,
}: {
    payment: Payment | null;
    onClose: () => void;
    onSave: (data: PaymentFormData) => void;
    onDelete: (id: string) => void;
}) {
    const [tenant, setTenant] = useState(payment?.tenant ?? "");
    const [property, setProperty] = useState(payment?.property ?? "");
    const [channel, setChannel] = useState<PaymentChannel>(payment?.channel ?? "M-PESA");
    const [paymentDetail, setPaymentDetail] = useState(payment?.paymentDetail ?? "");
    const [reference, setReference] = useState(payment?.reference ?? "");
    const [amount, setAmount] = useState(payment ? String(payment.amount) : "");
    const [paidAt, setPaidAt] = useState(toDateTimeInput(payment?.paidAt));
    const [status, setStatus] = useState<PaymentStatus>(payment?.status ?? "Completed");
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
            tenant: tenant.trim(),
            property: property.trim(),
            channel,
            paymentDetail: paymentDetail.trim(),
            reference: reference.trim(),
            amount: Number(amount),
            paidAt: toDisplayDate(paidAt),
            status,
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="payment-modal-title"
                className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Payments</p>
                        <h2 id="payment-modal-title" className="mt-1 font-outfit text-xl font-bold text-ink">
                            {payment ? "Edit payment record" : "Create payment record"}
                        </h2>
                        <p className="mt-1 text-xs text-neutral-500">
                            {payment ? `Update details for ${payment.id}.` : "Enter the tenant payment details below."}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close payment form" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink">
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid max-h-[min(65vh,620px)] grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
                        <label>
                            <span className={labelClass}>Tenant name</span>
                            <input required autoFocus value={tenant} onChange={(event) => setTenant(event.target.value)} placeholder="e.g. Amara Osei" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Property / unit</span>
                            <input required value={property} onChange={(event) => setProperty(event.target.value)} placeholder="e.g. Kilimani Heights · A-04" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Payment channel</span>
                            <select value={channel} onChange={(event) => setChannel(event.target.value as PaymentChannel)} className={inputClass}>
                                {channels.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className={labelClass}>{channel === "Bank" ? "Bank / account detail" : channel === "PayPal" ? "PayPal account" : "Phone number"}</span>
                            <input required value={paymentDetail} onChange={(event) => setPaymentDetail(event.target.value)} placeholder={channel === "Bank" ? "e.g. KCB Bank ·•• 4821" : channel === "PayPal" ? "name@example.com" : "+254 7XX XXX XXX"} className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Transaction reference</span>
                            <input required value={reference} onChange={(event) => setReference(event.target.value)} placeholder="e.g. QK72M9R4X1" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Amount (KSh)</span>
                            <input required type="number" min="1" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Payment date & time</span>
                            <input required type="datetime-local" value={paidAt} onChange={(event) => setPaidAt(event.target.value)} className={inputClass} />
                        </label>
                        <label>
                            <span className={labelClass}>Status</span>
                            <select value={status} onChange={(event) => setStatus(event.target.value as PaymentStatus)} className={inputClass}>
                                {statuses.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                    </div>

                    {confirmDelete && (
                        <div role="alert" className="mx-5 mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-red-800">Delete this payment record?</p>
                                <p className="mt-0.5 text-xs text-red-700">This removes {payment?.id} from the sample list.</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">Keep record</button>
                                <button type="button" onClick={() => payment && onDelete(payment.id)} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">Delete</button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            {payment && !confirmDelete && (
                                <button type="button" onClick={() => setConfirmDelete(true)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                                    Delete payment
                                </button>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Cancel</button>
                            <button type="submit" className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">
                                {payment ? "Save changes" : "Create payment"}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
