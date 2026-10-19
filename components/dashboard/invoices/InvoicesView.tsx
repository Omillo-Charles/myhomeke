"use client";

import { useMemo, useRef, useState } from "react";
import { invoices as sampleInvoices, getInvoiceTotal, type Invoice, type InvoiceStatus } from "./invoicesData";
import InvoiceModal from "./InvoiceModal";
import InvoiceAIAssistant from "./InvoiceAIAssistant";
import InvoiceUpload from "./InvoiceUpload";
import InvoiceDetailModal from "./InvoiceDetailModal";
import InvoiceComposer from "./InvoiceComposer";

type StatusFilter = "All invoices" | InvoiceStatus;

type InvoiceAction = "ai" | "upload" | null;

const statusStyles: Record<InvoiceStatus, string> = {
    Paid: "bg-jade-100 text-jade-800",
    Sent: "bg-blue-100 text-blue-800",
    Overdue: "bg-red-100 text-red-700",
    Draft: "bg-neutral-100 text-neutral-600",
};

const money = (amount: number) => `KSh ${new Intl.NumberFormat("en-KE").format(amount)}`;

function SearchIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" /><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

function InvoiceIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function InvoicedIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><path d="M4 19V5m0 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="m7 15 4-4 3 2 5-6m-4 0h4v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CollectedIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="m8 12.2 2.5 2.5L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function OverdueIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 4.5 20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function DraftIcon() {
    return <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true"><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M13 3v6h6M8 13h5m-5 4h4m6.5-12.5 2 2L14 15l-3 .8.8-3 6.7-6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SummaryCard({ label, value, note, tone, icon: Icon }: { label: string; value: string; note: string; tone: string; icon: () => React.ReactElement }) {
    return <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-neutral-500">{label}</p><p className="mt-2 font-outfit text-xl font-bold tracking-tight text-ink sm:text-2xl">{value}</p><p className="mt-1 text-[11px] text-neutral-400">{note}</p></div><span className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 ${tone}`}><Icon /></span></div></article>;
}

export default function InvoicesView() {
    const [records, setRecords] = useState<Invoice[]>(() => sampleInvoices);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All invoices");
    const [search, setSearch] = useState("");
    const [action, setAction] = useState<InvoiceAction>(null);
    const [editing, setEditing] = useState<Invoice | null>(null);
    const [viewing, setViewing] = useState<Invoice | null>(null);
    const [notice, setNotice] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const totals = useMemo(() => ({
        billed: records.filter((invoice) => invoice.status !== "Draft").reduce((sum, invoice) => sum + getInvoiceTotal(invoice), 0),
        paid: records.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + getInvoiceTotal(invoice), 0),
        overdue: records.filter((invoice) => invoice.status === "Overdue").reduce((sum, invoice) => sum + getInvoiceTotal(invoice), 0),
        drafts: records.filter((invoice) => invoice.status === "Draft").length,
        outstanding: records.filter((invoice) => invoice.status === "Sent" || invoice.status === "Overdue").length,
    }), [records]);

    const query = search.trim().toLowerCase();
    const filtered = records.filter((invoice) => {
        const matchesStatus = statusFilter === "All invoices" || invoice.status === statusFilter;
        const matchesSearch = !query || [invoice.id, invoice.tenant, invoice.email, invoice.property, invoice.unit, invoice.owner].some((value) => value.toLowerCase().includes(query));
        return matchesStatus && matchesSearch;
    });

    const saveInvoice = (data: Omit<Invoice, "id">) => {
        if (editing) {
            setRecords((current) => current.map((invoice) => invoice.id === editing.id ? { ...data, id: editing.id } : invoice));
            setNotice(`${editing.id} updated in this preview.`);
        } else {
            const next = records.reduce((max, invoice) => Math.max(max, Number(invoice.id.slice(-4)) || 0), 1040) + 1;
            const invoice = { ...data, id: `INV-2026-${next}` };
            setRecords((current) => [invoice, ...current]);
            setNotice(`${invoice.id} saved in this preview.`);
        }
        setEditing(null);
        setAction(null);
        setStatusFilter("All invoices");
    };

    const exportCsv = () => {
        const header = ["Invoice", "Tenant", "Email", "Property", "Unit", "Owner/Manager", "Issue date", "Due date", "Amount (KES)", "Status"];
        const rows = filtered.map((invoice) => [invoice.id, invoice.tenant, invoice.email, invoice.property, invoice.unit, invoice.owner, invoice.issuedAt, invoice.dueAt, getInvoiceTotal(invoice), invoice.status]);
        const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "myhome-invoices.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleFiles = (files: FileList | File[] | null) => {
        const selectedFiles = files ? Array.from(files) : [];
        if (selectedFiles.length === 0) return;
        const now = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
        const imported = selectedFiles
            .filter((selected) => /\.(pdf|png|jpe?g)$/i.test(selected.name))
            .map((selected, index): Invoice => ({
                id: `FILE-${Date.now().toString().slice(-6)}-${index + 1}`, tenant: "Unassigned document", email: "—", property: "Needs review", unit: "—", owner: "MyHome Property Management",
                issuedAt: now, dueAt: "Not extracted", status: "Draft", items: [{ description: "Uploaded invoice · amount needs review", quantity: 1, unitPrice: 0 }], note: "Document uploaded for review. Invoice details have not been extracted.", attachmentName: selected.name,
            }));
        if (!imported.length) {
            setNotice("Choose a PDF, PNG, or JPG invoice file.");
            return;
        }
        setRecords((current) => [...imported, ...current]);
        setNotice(`${imported.length} file${imported.length === 1 ? "" : "s"} added to drafts for review. File storage is not connected in this preview.`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setAction(null);
    };

    const editInvoice = (invoice: Invoice) => { setViewing(null); setEditing(invoice); };

    const createAiDraft = (prompt: string) => {
        const now = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
        const next = records.reduce((max, invoice) => Math.max(max, Number(invoice.id.slice(-4)) || 0), 1040) + 1;
        const draft: Invoice = {
            id: `INV-2026-${next}`, tenant: "Complete tenant details", email: "tenant@example.com", property: "Select property", unit: "Select unit", owner: "MyHome Property Management",
            issuedAt: now, dueAt: "Set due date", status: "Draft", items: [{ description: "AI prompt · review and add amount", quantity: 1, unitPrice: 0 }], note: `AI request: ${prompt}`,
        };
        setRecords((current) => [draft, ...current]);
        setNotice(`${draft.id} saved as a prompt-based draft. Verify the tenant, property, amount, and due date before use.`);
        setAction(null);
        setEditing(draft);
        setStatusFilter("All invoices");
    };

    return (
        <div className="space-y-6 pb-8">
            <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(event) => handleFiles(event.target.files)} />
            <section className="flex flex-col gap-4 rounded-2xl bg-jade-800 px-5 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-jade-200">Billing & documents</p><h2 className="mt-1 font-outfit text-2xl font-bold tracking-tight sm:text-3xl">Invoices</h2><p className="mt-1.5 max-w-xl text-xs leading-5 text-jade-100 sm:text-sm">Review invoices shared by property owners and managers, create tenant charges, and follow up on outstanding balances.</p></div>
                <div className="flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-jade-100 sm:self-center"><span className="size-2 rounded-full bg-gold-400" aria-hidden="true" />Sample mode · invoices are not sent</div>
            </section>

            {notice && <div role="status" className="flex items-start justify-between gap-3 rounded-xl border border-jade-200 bg-jade-50 px-4 py-3 text-xs text-jade-900"><span>{notice}</span><button type="button" onClick={() => setNotice("")} aria-label="Dismiss notification" className="shrink-0 text-jade-700 hover:text-jade-950">✕</button></div>}

            <section aria-label="Invoice summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><SummaryCard label="Invoiced" value={money(totals.billed)} note="Sent invoices in this preview" tone="text-jade-700" icon={InvoicedIcon} /><SummaryCard label="Collected" value={money(totals.paid)} note="Marked as paid" tone="text-ink" icon={CollectedIcon} /><SummaryCard label="Overdue" value={money(totals.overdue)} note="Needs follow-up" tone="text-red-700" icon={OverdueIcon} /><SummaryCard label="Drafts" value={String(totals.drafts)} note="Saved for later" tone="text-neutral-600" icon={DraftIcon} /></section>

            <InvoiceComposer onAi={() => setAction("ai")} onUpload={() => setAction("upload")} onSave={saveInvoice} />

            <section aria-label="Invoice history" className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-outfit text-base font-bold text-ink">Invoice history</h3><p className="mt-0.5 text-[11px] text-neutral-500">Owner and manager invoices, uploaded documents, and drafts.</p></div><div className="flex items-center gap-3"><p className="text-[11px] text-neutral-500"><span className="font-semibold text-ink">{filtered.length}</span> invoices</p><button type="button" onClick={exportCsv} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[11px] font-semibold text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800">Export</button></div></div>
                    <div className="-mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:max-w-none sm:grid-cols-[minmax(220px,1fr)_180px] sm:overflow-visible sm:px-0 sm:pb-0">
                        <label className="relative w-64 shrink-0 sm:w-auto sm:min-w-0"><span className="sr-only">Search invoices</span><span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"><SearchIcon /></span><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search invoices, tenants, properties..." className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/10" /></label>
                        <label className="w-40 shrink-0 sm:w-auto"><span className="sr-only">Filter invoices by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-jade-600"><option>All invoices</option><option>Paid</option><option>Sent</option><option>Overdue</option><option>Draft</option></select></label>
                    </div>
                </div>
                <div className="space-y-3 bg-neutral-50/50 p-3 sm:p-4">
                    {filtered.length ? filtered.map((invoice) => <article key={invoice.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 gap-3"><span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-jade-50 text-jade-700"><InvoiceIcon /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold text-ink">{invoice.id}</h3><span className="text-[10px] font-medium text-neutral-400">{invoice.tenant}</span></div><p className="mt-1 text-xs leading-5 text-neutral-500">{invoice.property} · {invoice.unit} · {money(getInvoiceTotal(invoice))}</p>{invoice.attachmentName && <p className="mt-2 inline-flex max-w-full items-center gap-1.5 truncate rounded-md bg-neutral-50 px-2 py-1 text-[10px] font-medium text-neutral-500">▧ {invoice.attachmentName}</p>}</div></div><span className={`self-start rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[invoice.status]}`}>{invoice.status}</span></div><div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]"><span><span className="text-neutral-400">Owner </span><span className="font-semibold text-neutral-700">{invoice.owner}</span></span><span><span className="text-neutral-400">Issued </span><span className="font-semibold text-neutral-700">{invoice.issuedAt}</span></span><span><span className="text-neutral-400">Due </span><span className="font-semibold text-neutral-700">{invoice.dueAt}</span></span><span className="font-medium text-neutral-500">{invoice.email}</span></div><div className="flex shrink-0 items-center gap-2"><button type="button" onClick={() => setViewing(invoice)} className="rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-jade-700 transition hover:bg-jade-50">View details</button><button type="button" onClick={() => editInvoice(invoice)} className="rounded-md border border-neutral-200 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:bg-neutral-50">Edit</button></div></div></article>) : <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-14 text-center"><p className="font-outfit text-sm font-semibold text-neutral-600">No invoices match these filters</p><p className="mt-1 text-xs text-neutral-400">Try another search or status filter.</p></div>}
                </div>
            </section>
            <p className="text-center text-[10px] text-neutral-400">Sample invoice activity is stored in this page only. AI generation and file storage are not connected.</p>

            {editing && <InvoiceModal key={editing.id} invoice={editing} onClose={() => { setAction(null); setEditing(null); }} onSave={saveInvoice} />}
            {action === "ai" && <InvoiceAIAssistant onClose={() => setAction(null)} onGenerate={createAiDraft} />}
            {action === "upload" && <InvoiceUpload onClose={() => setAction(null)} onUpload={handleFiles} />}
            {viewing && <InvoiceDetailModal invoice={viewing} onClose={() => setViewing(null)} onEdit={() => editInvoice(viewing)} />}
        </div>
    );
}
