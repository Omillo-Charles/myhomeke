"use client";

import type { Invoice } from "./invoicesData";
import { getInvoiceTotal } from "./invoicesData";

const money = (amount: number) => `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;

export default function InvoiceDetailModal({ invoice, onClose, onEdit }: { invoice: Invoice; onClose: () => void; onEdit: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="invoice-detail-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Invoice details</p><h2 id="invoice-detail-title" className="mt-1 font-outfit text-xl font-bold text-ink">{invoice.id}</h2><p className="mt-1 text-xs text-neutral-500">Issued {invoice.issuedAt} · Due {invoice.dueAt}</p></div><button type="button" onClick={onClose} aria-label="Close invoice details" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink">✕</button></div>
                <div className="px-5 py-5 sm:px-6">
                    <div className="grid gap-5 sm:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Billed to</p><p className="mt-2 text-sm font-semibold text-ink">{invoice.tenant}</p><p className="mt-0.5 text-xs text-neutral-500">{invoice.email}</p><p className="mt-0.5 text-xs text-neutral-500">{invoice.property} · {invoice.unit}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">From</p><p className="mt-2 text-sm font-semibold text-ink">{invoice.owner}</p><span className="mt-2 inline-flex rounded-full bg-jade-100 px-2.5 py-1 text-[10px] font-bold text-jade-800">{invoice.status}</span></div></div>
                    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200"><div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-neutral-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400"><span>Description</span><span>Qty</span><span className="text-right">Amount</span></div>{invoice.items.map((item, index) => <div key={`${item.description}-${index}`} className="grid grid-cols-[1fr_auto_auto] gap-4 border-t border-neutral-100 px-4 py-3 text-xs"><span className="text-neutral-700">{item.description}</span><span className="text-neutral-500">{item.quantity}</span><span className="text-right font-semibold text-ink">{money(item.quantity * item.unitPrice)}</span></div>)}<div className="flex justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-bold text-ink"><span>Total due</span><span>{money(getInvoiceTotal(invoice))}</span></div></div>
                    {invoice.note && <p className="mt-4 rounded-lg bg-jade-50 px-4 py-3 text-xs leading-5 text-jade-900">{invoice.note}</p>}{invoice.attachmentName && <p className="mt-3 text-[11px] text-neutral-500">Attachment: <span className="font-medium text-ink">{invoice.attachmentName}</span></p>}
                </div>
                <div className="flex justify-end gap-2 border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:px-6"><button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Close</button><button type="button" onClick={onEdit} className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">Edit invoice</button></div>
            </section>
        </div>
    );
}
