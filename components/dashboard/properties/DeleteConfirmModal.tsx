"use client";

import { Property } from "./types";

interface DeleteConfirmModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: (propertyId: string) => void;
}

export default function DeleteConfirmModal({
    property,
    isOpen,
    onClose,
    onConfirmDelete,
}: DeleteConfirmModalProps) {
    if (!isOpen || !property) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                role="alertdialog"
                aria-labelledby="delete-property-title"
                aria-modal="true"
                className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
            >
                <div className="flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
                    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h3 id="delete-property-title" className="mt-4 font-outfit text-lg font-bold text-ink">
                    Delete Property?
                </h3>
                <p className="mt-2 text-xs leading-5 text-neutral-600">
                    Are you sure you want to delete <strong className="text-ink">&ldquo;{property.name}&rdquo;</strong>? This will remove all associated unit records and lease associations from your portfolio view.
                </p>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirmDelete(property.id);
                            onClose();
                        }}
                        className="rounded-lg bg-danger px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-danger/90"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

