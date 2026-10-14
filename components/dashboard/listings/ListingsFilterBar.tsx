"use client";

import { ListingFilterStatus, ListingSortOption } from "./listingsData";

const STATUS_FILTERS: { label: string; value: ListingFilterStatus }[] = [
    { label: "All Listings", value: "all" },
    { label: "Partially Vacant", value: "partially_vacant" },
    { label: "Fully Occupied", value: "fully_occupied" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Under Construction", value: "under_construction" },
];

const SORT_OPTIONS: { label: string; value: ListingSortOption }[] = [
    { label: "Name (A–Z)", value: "name_asc" },
    { label: "Highest Rent", value: "rent_desc" },
    { label: "Best Occupancy", value: "occupancy_desc" },
    { label: "Highest Revenue", value: "revenue_desc" },
];

interface ListingsFilterBarProps {
    activeFilter: ListingFilterStatus;
    onFilterChange: (f: ListingFilterStatus) => void;
    activeSort: ListingSortOption;
    onSortChange: (s: ListingSortOption) => void;
    search: string;
    onSearchChange: (v: string) => void;
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 text-neutral-400" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="m16.5 16.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function ListingsFilterBar({
    activeFilter,
    onFilterChange,
    activeSort,
    onSortChange,
    search,
    onSearchChange,
}: ListingsFilterBarProps) {
    return (
        <div className="flex flex-col gap-3">
            {/* Search + Sort row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative max-w-xs w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <SearchIcon />
                    </span>
                    <input
                        type="search"
                        placeholder="Search listings…"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                    />
                </div>

                {/* Sort */}
                <select
                    value={activeSort}
                    onChange={(e) => onSortChange(e.target.value as ListingSortOption)}
                    className="h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15 sm:w-48"
                    aria-label="Sort listings"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Status filter pills — horizontally scrollable */}
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        type="button"
                        onClick={() => onFilterChange(f.value)}
                        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            activeFilter === f.value
                                ? "border-jade-600 bg-jade-700 text-white"
                                : "border-neutral-200 bg-white text-neutral-600 hover:border-jade-400 hover:text-jade-700"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

