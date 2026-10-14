"use client";

interface ListingsHeaderProps {
    count: number;
}

function GlobeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export default function ListingsHeader({ count }: ListingsHeaderProps) {
    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-outfit text-xl font-bold text-ink sm:text-2xl">
                    My Listings
                </h1>
                <p className="mt-0.5 text-xs text-neutral-500">
                    Properties enabled for public discovery on the home feed.{" "}
                    <span className="font-semibold text-jade-700">{count} listed</span> right now.
                </p>
            </div>

            {/* Info pill */}
            <div className="mt-2 inline-flex shrink-0 items-center gap-2 rounded-xl border border-jade-200 bg-jade-50 px-4 py-2.5 text-xs text-jade-800 sm:mt-0">
                <GlobeIcon />
                <span>
                    Listings appear on the <strong>public home feed</strong> for prospective tenants.
                </span>
            </div>
        </div>
    );
}

