"use client";

import { useState, useMemo } from "react";
import {
    getListings,
    Listing,
    ListingFilterStatus,
    ListingSortOption,
} from "./listingsData";
import { initialProperties } from "@/components/dashboard/properties/propertiesData";
import ListingsHeader from "./ListingsHeader";
import ListingsStats from "./ListingsStats";
import ListingsFilterBar from "./ListingsFilterBar";
import ListingCard from "./ListingCard";

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center">
            <svg
                viewBox="0 0 64 64"
                fill="none"
                className="mb-4 size-16 text-neutral-300"
                aria-hidden="true"
            >
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
                <path
                    d="M32 18s-12 10-12 18a12 12 0 0 0 24 0c0-8-12-18-12-18Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <circle cx="32" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <p className="font-outfit text-base font-semibold text-neutral-500">
                No listings match your filters
            </p>
            <p className="mt-1 max-w-xs text-xs text-neutral-400">
                Try changing the status filter, or enable public listing on a property from the Properties page.
            </p>
        </div>
    );
}

export default function ListingsView() {
    // In a real app this state would be server-driven. For now we derive from mock data.
    const [listings, setListings] = useState<Listing[]>(() => getListings());
    const [filter, setFilter] = useState<ListingFilterStatus>("all");
    const [sort, setSort] = useState<ListingSortOption>("name_asc");
    const [search, setSearch] = useState("");

    const handleUnlist = (listing: Listing) => {
        setListings((prev) => prev.filter((l) => l.id !== listing.id));
    };

    const filtered = useMemo(() => {
        let result = listings;

        // Status filter
        if (filter !== "all") {
            result = result.filter((l) => l.status === filter);
        }

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (l) =>
                    l.name.toLowerCase().includes(q) ||
                    l.location.toLowerCase().includes(q) ||
                    l.type.toLowerCase().includes(q)
            );
        }

        // Sort
        switch (sort) {
            case "name_asc":
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rent_desc":
                result = [...result].sort((a, b) => b.averageRent - a.averageRent);
                break;
            case "occupancy_desc":
                result = [...result].sort(
                    (a, b) =>
                        b.occupiedUnits / b.totalUnits - a.occupiedUnits / a.totalUnits
                );
                break;
            case "revenue_desc":
                result = [...result].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
                break;
        }

        return result;
    }, [listings, filter, sort, search]);

    return (
        <div className="space-y-5">
            {/* Header */}
            <ListingsHeader count={listings.length} />

            {/* Stats */}
            <ListingsStats listings={listings} total={initialProperties.length} />

            {/* Filters */}
            <ListingsFilterBar
                activeFilter={filter}
                onFilterChange={setFilter}
                activeSort={sort}
                onSortChange={setSort}
                search={search}
                onSearchChange={setSearch}
            />

            {/* Count row */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">
                    Showing{" "}
                    <span className="font-semibold text-ink">{filtered.length}</span>{" "}
                    {filtered.length === 1 ? "listing" : "listings"}
                </p>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            onUnlist={handleUnlist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

