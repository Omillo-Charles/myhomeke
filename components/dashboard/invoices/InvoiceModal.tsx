"use client";

import { useState } from "react";
import type { Invoice, InvoiceLineItem, InvoiceStatus } from "./invoicesData";

type InvoiceFormData = Omit<Invoice, "id">;

const inputClass = "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

export default function InvoiceModal({
    invoice,
    onClose,
    onSave,
}: {
    invoice: Invoice | null;
    onClose: () => void;
    onSave: (data: InvoiceFormData) => void;
}) {
    const [tenant, setTenant] = useState(invoice?.tenant ?? "");
    const [email, setEmail] = useState(invoice?.email ?? "");
    const [property, setProperty] = useState(invoice?.property ?? "");
    const [unit, setUnit] = useState(invoice?.unit ?? "");
    const [owner, setOwner] = useState(invoice?.owner ?? "MyHome Property Management");
    const [dueAt, setDueAt] = useState(invoice?.dueAt ?? "1 Nov 2026");
    const [status, setStatus] = useState<InvoiceStatus>(invoice?.status ?? "Draft");
    const [description, setDescription] = useState(invoice?.items[0]?.description ?? "Monthly rent");
    const [amount, setAmount] = useState(String(invoice?.items[0]?.unitPrice ?? ""));
    const [note, setNote] = useState(invoice?.note ?? "");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const item: InvoiceLineItem = { description: description.trim(), quantity: 1, unitPrice: Number(amount) };
        onSave({
            tenant: tenant.trim(), email: email.trim(), property: property.trim(), unit: unit.trim(), owner: owner.trim(),
            issuedAt: invoice?.issuedAt ?? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
            dueAt: dueAt.trim(), status, items: [item], note: note.trim(), attachmentName: file?.name ?? invoice?.attachmentName,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="invoice-modal-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Invoice workspace</p>
                        <h2 id="invoice-modal-title" className="mt-1 font-outfit text-xl font-bold text-ink">{invoice ? `Edit ${invoice.id}` : "Create an invoice"}</h2>
                        <p className="mt-1 text-xs text-neutral-500">Prepare a rent or service charge invoice for a tenant.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close invoice form" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink">✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid max-h-[min(65vh,620px)] grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
                        <label><span className={labelClass}>Tenant name</span><input required value={tenant} onChange={(event) => setTenant(event.target.value)} placeholder="e.g. Amara Osei" className={inputClass} /></label>
                        <label><span className={labelClass}>Tenant email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tenant@email.com" className={inputClass} /></label>
                        <label><span className={labelClass}>Property</span><input required value={property} onChange={(event) => setProperty(event.target.value)} placeholder="e.g. Kilimani Heights" className={inputClass} /></label>
                        <label><span className={labelClass}>Unit</span><input required value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="e.g. Apartment A-04" className={inputClass} /></label>
                        <label><span className={labelClass}>Owner / manager</span><input required value={owner} onChange={(event) => setOwner(event.target.value)} className={inputClass} /></label>
                        <label><span className={labelClass}>Due date</span><input required value={dueAt} onChange={(event) => setDueAt(event.target.value)} placeholder="e.g. 1 Nov 2026" className={inputClass} /></label>
                        <label className="sm:col-span-2"><span className={labelClass}>Invoice line item</span><input required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Monthly rent · November 2026" className={inputClass} /></label>
                        <label><span className={labelClass}>Amount (KSh)</span><input required type="number" min="1" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className={inputClass} /></label>
                        <label><span className={labelClass}>Status</span><select value={status} onChange={(event) => setStatus(event.target.value as InvoiceStatus)} className={inputClass}><option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option></select></label>
                        <label className="sm:col-span-2"><span className={labelClass}>Note to tenant</span><textarea rows={2} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add payment instructions or a short note..." className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" /></label>
                        <label className="sm:col-span-2"><span className={labelClass}>Supporting file (optional)</span><input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="block w-full text-xs text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-jade-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-jade-800 hover:file:bg-jade-100" /><span className="mt-1 block text-[10px] text-neutral-400">PDF or image · up to 10 MB. Files are not uploaded in this preview.</span></label>
                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <p className="text-[10px] text-neutral-400">This preview saves invoice details locally in this page only.</p>
                        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Cancel</button><button type="submit" className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">{invoice ? "Save changes" : "Create invoice"}</button></div>
                    </div>
                </form>
            </section>
        </div>
    );
}
