"use client";

import { useState } from "react";

const promptIdeas = ["Create October rent invoice for Amara Osei, Kilimani Heights A-04, KSh 65,000 due 1 November.", "Add a KSh 2,500 water and waste charge to the next invoice."];

export default function InvoiceAIAssistant({ onClose, onGenerate }: { onClose: () => void; onGenerate: (prompt: string) => void }) {
    const [prompt, setPrompt] = useState("");
    const [generated, setGenerated] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="invoice-ai-title" className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="bg-gradient-to-br from-jade-800 via-jade-700 to-[#337965] px-6 py-6 text-white sm:px-7">
                    <div className="flex items-start justify-between gap-4">
                        <div><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-jade-50"><span aria-hidden="true">✦</span> AI invoice assistant</span><h2 id="invoice-ai-title" className="mt-3 font-outfit text-2xl font-bold">Describe the invoice.<br />We’ll draft the details.</h2><p className="mt-2 max-w-md text-xs leading-5 text-jade-100">Start with a plain-language request. Review every amount and recipient before sharing.</p></div>
                        <button type="button" onClick={onClose} aria-label="Close AI invoice assistant" className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white">✕</button>
                    </div>
                </div>
                <div className="space-y-5 px-6 py-6 sm:px-7">
                    <label className="block"><span className="mb-2 block text-xs font-semibold text-neutral-700">What should this invoice include?</span><textarea autoFocus rows={4} value={prompt} onChange={(event) => { setPrompt(event.target.value); setGenerated(false); }} placeholder="For example: October rent for Amara at Kilimani Heights, apartment A-04, due 1 November..." className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-neutral-400 focus:border-jade-600 focus:bg-white focus:ring-2 focus:ring-jade-600/10" /></label>
                    <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Try a prompt</p><div className="flex flex-wrap gap-2">{promptIdeas.map((idea) => <button key={idea} type="button" onClick={() => { setPrompt(idea); setGenerated(false); }} className="rounded-full border border-neutral-200 px-3 py-2 text-left text-[10px] leading-4 text-neutral-600 transition hover:border-jade-300 hover:bg-jade-50 hover:text-jade-800">{idea}</button>)}</div></div>
                    {generated && <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-semibold text-amber-900">Review-ready draft outline</p><p className="mt-1 text-[11px] leading-5 text-amber-800">We’ll save your prompt as a draft note so you can complete and verify the invoice details. AI extraction and sending are not connected in this preview.</p><button type="button" onClick={() => onGenerate(prompt)} className="mt-3 rounded-lg bg-amber-800 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-amber-900">Open editable draft</button></div>}
                    <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-[10px] text-neutral-400">AI suggestions should be checked before sending.</p><div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50">Cancel</button><button type="button" disabled={!prompt.trim()} onClick={() => setGenerated(true)} className="inline-flex items-center gap-2 rounded-lg bg-jade-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-jade-800 disabled:cursor-not-allowed disabled:opacity-50"><span aria-hidden="true">✦</span> Generate draft</button></div></div>
                </div>
            </section>
        </div>
    );
}
