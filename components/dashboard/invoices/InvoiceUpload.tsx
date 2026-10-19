"use client";

import { useRef, useState } from "react";

export default function InvoiceUpload({ onClose, onUpload }: { onClose: () => void; onUpload: (files: File[]) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState("");

    const addFiles = (incoming: FileList | null) => {
        if (!incoming?.length) return;
        const supported = Array.from(incoming).filter((file) => /\.(pdf|png|jpe?g)$/i.test(file.name));
        if (supported.length !== incoming.length) setMessage("Some files were skipped. Use PDF, PNG, or JPG files.");
        else setMessage("");
        setFiles((current) => [...current, ...supported]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="invoice-upload-title" className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-jade-700">Invoice library</p><h2 id="invoice-upload-title" className="mt-1 font-outfit text-xl font-bold text-ink">Upload invoice files</h2><p className="mt-1 text-xs text-neutral-500">Add existing invoice documents to your records.</p></div><button type="button" onClick={onClose} aria-label="Close upload dialog" className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink">✕</button></div>
                <div className="space-y-4 px-5 py-5 sm:px-6">
                    <input ref={inputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(event) => addFiles(event.target.files)} />
                    <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }} className="flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-jade-200 bg-jade-50/50 px-5 py-8 text-center transition hover:border-jade-400 hover:bg-jade-50">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-jade-700 shadow-sm" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" className="size-6"><path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        <span className="mt-3 text-sm font-semibold text-ink">Choose files or drag them here</span><span className="mt-1 text-[11px] text-neutral-500">PDF, PNG or JPG · up to 10 MB each</span>
                    </button>
                    {message && <p role="alert" className="text-xs text-amber-700">{message}</p>}
                    {files.length > 0 && <ul aria-label="Selected files" className="max-h-40 space-y-2 overflow-y-auto">{files.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2.5"><span className="min-w-0 truncate text-xs font-medium text-neutral-700">{file.name}</span><span className="shrink-0 text-[10px] text-neutral-400">{(file.size / 1024 / 1024).toFixed(1)} MB</span></li>)}</ul>}
                    <div className="rounded-xl bg-neutral-50 p-3 text-[10px] leading-5 text-neutral-500">This demo keeps selected file names in your browser only. Files are not sent to a server or attached to tenant records.</div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-neutral-200 px-5 py-4 sm:px-6"><span className="text-[10px] text-neutral-400">{files.length} {files.length === 1 ? "file" : "files"} selected</span><div className="flex gap-2"><button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Close</button><button type="button" onClick={() => {
                    if (!files.length) {
                        setMessage("Choose at least one file to continue.");
                        return;
                    }
                    onUpload(files);
                }} className="rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800">Add to library</button></div></div>
            </section>
        </div>
    );
}
