"use client";

import { useState } from "react";
import type { Invoice, InvoiceLineItem, InvoiceStatus } from "./invoicesData";

type InvoiceDraft = Omit<Invoice, "id">;

const inputClass = "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-neutral-700";

function SparklesIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

function UploadIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function InvoiceComposer({ onSave, onAi, onUpload }: { onSave: (data: InvoiceDraft) => void; onAi: () => void; onUpload: () => void }) {
    const [tenant, setTenant] = useState("");
    const [email, setEmail] = useState("");
    const [property, setProperty] = useState("");
    const [unit, setUnit] = useState("");
    const [dueAt, setDueAt] = useState("");
    const [description, setDescription] = useState("Monthly rent");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const save = (status: InvoiceStatus) => {
        if (!tenant.trim() || !email.trim() || !property.trim() || !unit.trim() || !dueAt.trim() || !description.trim() || Number(amount) <= 0) return;
        const item: InvoiceLineItem = { description: description.trim(), quantity: 1, unitPrice: Number(amount) };
        onSave({
            tenant: tenant.trim(), email: email.trim(), property: property.trim(), unit: unit.trim(), owner: "MyHome Property Management",
            issuedAt: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
            dueAt: dueAt.trim(), status, items: [item], note: note.trim(), attachmentName: file?.name,
        });
        setTenant(""); setEmail(""); setProperty(""); setUnit(""); setDueAt(""); setDescription("Monthly rent"); setAmount(""); setNote(""); setFile(null);
    };

    const complete = Boolean(tenant.trim() && email.trim() && property.trim() && unit.trim() && dueAt.trim() && description.trim() && Number(amount) > 0);

    return (
        <section aria-label="Compose an invoice" className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-5 sm:px-6">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">New invoice</p><h3 className="mt-1 font-outfit text-lg font-bold text-ink">Create and share an invoice</h3><p className="mt-1 text-xs text-neutral-500">Add the tenant and charge details, then save a draft or mark it as sent.</p></div>
                <span className="hidden size-10 items-center justify-center rounded-xl bg-jade-50 text-jade-700 sm:flex"><svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
            </div>
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                    <label><span className={labelClass}>Tenant name</span><input value={tenant} onChange={(event) => setTenant(event.target.value)} placeholder="e.g. Amara Osei" className={inputClass} /></label>
                    <label><span className={labelClass}>Tenant email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tenant@email.com" className={inputClass} /></label>
                    <label><span className={labelClass}>Property</span><input value={property} onChange={(event) => setProperty(event.target.value)} placeholder="e.g. Kilimani Heights" className={inputClass} /></label>
                    <label><span className={labelClass}>Unit</span><input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="e.g. Apartment A-04" className={inputClass} /></label>
                    <label className="sm:col-span-2"><span className={labelClass}>Invoice item</span><input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Monthly rent · November 2026" className={inputClass} /></label>
                    <label><span className={labelClass}>Amount (KSh)</span><input type="number" min="1" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className={inputClass} /></label>
                    <label><span className={labelClass}>Due date</span><input type="date" value={dueAt} onChange={(event) => setDueAt(event.target.value)} className={inputClass} /></label>
                    <label className="sm:col-span-2"><span className={labelClass}>Note to tenant <span className="font-normal text-neutral-400">(optional)</span></span><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Payment instructions or a short note..." className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" /></label>
                </div>
                <aside className="space-y-5 border-t border-neutral-100 bg-neutral-50/70 p-5 sm:p-6 lg:border-l lg:border-t-0">
                    <div><p className={labelClass}>Create faster</p><div className="space-y-2"><button type="button" onClick={onAi} className="flex w-full items-center gap-3 rounded-xl border border-jade-200 bg-white p-3 text-left transition hover:border-jade-400 hover:shadow-sm"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-jade-50 text-jade-700"><SparklesIcon /></span><span><span className="block text-xs font-semibold text-ink">Generate with AI</span><span className="mt-0.5 block text-[10px] text-neutral-400">Turn a description into a draft</span></span></button><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-white p-3 transition hover:border-jade-400"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-600"><UploadIcon /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-ink">{file?.name ?? "Attach supporting file"}</span><span className="mt-0.5 block text-[10px] text-neutral-400">PDF, PNG or JPG</span></span><input type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label><button type="button" onClick={onUpload} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-[11px] font-semibold text-neutral-700 transition hover:bg-neutral-50"><UploadIcon />Import existing invoice</button></div></div>
                    <div className="rounded-xl border border-gold-200 bg-gold-50 p-3.5"><p className="text-[11px] font-semibold text-gold-900">Review before sharing</p><p className="mt-1 text-[10px] leading-4 text-gold-800">Invoices are saved in this page only for the design preview. No tenant will be contacted.</p></div>
                </aside>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><p className="text-[10px] text-neutral-400">{file ? `Attachment: ${file.name}` : "Tenant, property, amount and due date are required."}</p><div className="flex flex-col-reverse gap-2 sm:flex-row"><button type="button" disabled={!complete} onClick={() => save("Draft")} className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">Save draft</button><button type="button" disabled={!complete} onClick={() => save("Sent")} className="rounded-xl bg-jade-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800 disabled:cursor-not-allowed disabled:opacity-50">Mark as sent</button></div></div>
        </section>
    );
}
