"use client";

import { FilterStatus, PropertyType, SortOption, ViewMode } from "./types";

interface PropertiesFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: FilterStatus;
    onStatusChange: (status: FilterStatus) => void;
    typeFilter: string;
    onTypeChange: (type: string) => void;
    locationFilter: string;
    onLocationChange: (location: string) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    statusCounts: Record<FilterStatus, number>;
    availableLocations: string[];
    availableTypes: PropertyType[];
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 text-neutral-400" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="m16.5 16.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function GridIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function TableIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function PropertiesFilterBar({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    typeFilter,
    onTypeChange,
    locationFilter,
    onLocationChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    statusCounts,
    availableLocations,
    availableTypes,
}: PropertiesFilterBarProps) {
    const statusTabs: { label: string; value: FilterStatus }[] = [
        { label: "All Properties", value: "all" },
        { label: "Fully Occupied", value: "fully_occupied" },
        { label: "Vacancies", value: "partially_vacant" },
        { label: "Under Maintenance", value: "maintenance" },
    ];

    return (
        <div className="flex flex-col gap-4">
            {/* Top row: Status tabs + View toggles */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Status tabs */}
                <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:pb-0" role="tablist">
                    {statusTabs.map((tab) => {
                        const active = statusFilter === tab.value;
                        const count = statusCounts[tab.value] ?? 0;
                        return (
                            <button
                                key={tab.value}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => onStatusChange(tab.value)}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                                    active
                                        ? "bg-jade-700 text-white shadow-sm"
                                        : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-ink"
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                                        active
                                            ? "bg-white/20 text-white"
                                            : "bg-neutral-100 text-neutral-600"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* View toggle button group */}
                <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1">
                    <button
                        type="button"
                        aria-label="Grid view"
                        onClick={() => onViewModeChange("grid")}
                        className={`flex size-8 items-center justify-center rounded-md transition-colors ${
                            viewMode === "grid"
                                ? "bg-jade-700 text-white shadow-sm"
                                : "text-neutral-500 hover:bg-neutral-100 hover:text-ink"
                        }`}
                    >
                        <GridIcon />
                    </button>
                    <button
                        type="button"
                        aria-label="Table view"
                        onClick={() => onViewModeChange("table")}
                        className={`flex size-8 items-center justify-center rounded-md transition-colors ${
                            viewMode === "table"
                                ? "bg-jade-700 text-white shadow-sm"
                                : "text-neutral-500 hover:bg-neutral-100 hover:text-ink"
                        }`}
                    >
                        <TableIcon />
                    </button>
                </div>
            </div>

            {/* Bottom row: Search input + dropdown filters */}
            <div className="flex flex-row gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-nowrap sm:flex-wrap sm:gap-3 sm:overflow-visible" role="region">
                {/* Search input */}
                <div className="relative shrink-0">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search properties by name, address, or manager..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-8 text-xs text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => onSearchChange("")}
                            className="absolute inset-y-0 right-2.5 flex items-center text-xs text-neutral-400 hover:text-ink"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Property Type Dropdown */}
                <div className="shrink-0">
                    <select
                        aria-label="Filter by property type"
                        value={typeFilter}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 outline-none transition-shadow focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15 sm:w-auto sm:min-w-[140px]"
                    >
                        <option value="all">All Types</option>
                        {availableTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location Dropdown */}
                <div className="shrink-0">
                    <select
                        aria-label="Filter by location"
                        value={locationFilter}
                        onChange={(e) => onLocationChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 outline-none transition-shadow focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15 sm:w-auto sm:min-w-[150px]"
                    >
                        <option value="all">All Locations</option>
                        {availableLocations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Option */}
                <div className="shrink-0">
                    <select
                        aria-label="Sort properties"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 outline-none transition-shadow focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15 sm:w-auto sm:min-w-[160px]"
                    >
                        <option value="name_asc">Name: A to Z</option>
                        <option value="units_desc">Total Units: High to Low</option>
                        <option value="occupancy_desc">Occupancy: Highest First</option>
                        <option value="revenue_desc">Revenue: Highest First</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

