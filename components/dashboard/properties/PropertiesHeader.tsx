interface PropertiesHeaderProps {
    onOpenAddModal: () => void;
    totalCount: number;
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function PropertiesHeader({ onOpenAddModal, totalCount }: PropertiesHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2.5">
                    <h2 className="font-outfit text-2xl font-bold tracking-tight text-ink">
                        Properties
                    </h2>
                    <span className="rounded-full bg-jade-100 px-2.5 py-0.5 text-xs font-bold text-jade-800">
                        {totalCount} Total
                    </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                    Manage real estate portfolio, monitor occupied and vacant units, and track rent collection.
                </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                    type="button"
                    onClick={() => {
                        alert("Exporting properties portfolio CSV report...");
                    }}
                    className="inline-flex flex-1 sm:flex-none justify-center items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                >
                    <DownloadIcon />
                    Export CSV
                </button>

                <button
                    type="button"
                    onClick={onOpenAddModal}
                    className="inline-flex flex-1 sm:flex-none justify-center items-center gap-1.5 rounded-lg bg-jade-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-jade-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade-700"
                >
                    <PlusIcon />
                    Add Property
                </button>
            </div>
        </div>
    );
}

