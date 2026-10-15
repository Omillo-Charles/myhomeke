"use client";

import type { Payment } from "./paymentsData";

function formatAmount(amount: number) {
    return `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

export default function ReceiptModal({
    payment,
    onClose,
}: {
    payment: Payment;
    onClose: () => void;
}) {
    const handleGenerate = () => {
        console.info("Print payment receipt (preview only):", payment);
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
                aria-labelledby="receipt-modal-title"
                className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Payment receipt</p>
                        <h2 id="receipt-modal-title" className="mt-1 font-outfit text-xl font-bold text-ink">Receipt preview</h2>
                        <p className="mt-1 text-xs text-neutral-500">Review the receipt details before printing.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close receipt preview" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink">
                        <CloseIcon />
                    </button>
                </div>

                <div className="px-5 py-5 sm:px-6">
                    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                        <div className="bg-jade-800 px-5 py-4 text-white">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="font-outfit text-base font-bold">MyHome Ke</p>
                                    <p className="mt-0.5 text-[10px] text-jade-200">OFFICIAL PAYMENT RECEIPT</p>
                                </div>
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white">{payment.status}</span>
                            </div>
                        </div>
                        <div className="space-y-4 p-5">
                            <div className="flex items-end justify-between gap-4 border-b border-dashed border-neutral-200 pb-4">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Amount received</p>
                                    <p className="mt-1 font-outfit text-2xl font-bold text-jade-800">{formatAmount(payment.amount)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Receipt no.</p>
                                    <p className="mt-1 text-xs font-bold text-ink">R-{payment.id}</p>
                                </div>
                            </div>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                                <div>
                                    <dt className="text-[10px] text-neutral-400">Received from</dt>
                                    <dd className="mt-1 text-xs font-semibold text-ink">{payment.tenant}</dd>
                                </div>
                                <div>
                                    <dt className="text-[10px] text-neutral-400">Property / unit</dt>
                                    <dd className="mt-1 text-xs font-semibold text-ink">{payment.property}</dd>
                                </div>
                                <div>
                                    <dt className="text-[10px] text-neutral-400">Payment method</dt>
                                    <dd className="mt-1 text-xs font-semibold text-ink">{payment.channel}</dd>
                                </div>
                                <div>
                                    <dt className="text-[10px] text-neutral-400">Payment date</dt>
                                    <dd className="mt-1 text-xs font-semibold text-ink">{payment.paidAt}</dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-[10px] text-neutral-400">Transaction reference</dt>
                                    <dd className="mt-1 break-all text-xs font-semibold text-ink">{payment.reference}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="border-t border-dashed border-neutral-200 bg-neutral-50 px-5 py-3 text-center text-[10px] text-neutral-400">
                            Thank you. Keep this receipt for your records.
                        </div>
                    </article>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800"
                        >
                            Print Receipt
                        </button>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-neutral-400">Printing will be connected in a future update.</p>
                </div>
            </section>
        </div>
    );
}
