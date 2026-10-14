"use client";

import { formatCompactKSh } from "@/components/dashboard/properties/propertiesData";
import { Listing } from "./listingsData";

interface ListingsStatsProps {
    listings: Listing[];
    total: number;
}

function StatCard({
    label,
    value,
    sub,
    accent,
}: {
    label: string;
    value: string;
    sub?: string;
    accent?: string;
}) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {label}
            </p>
            <p className={`font-outfit text-xl font-bold ${accent ?? "text-ink"}`}>
                {value}
            </p>
            {sub && <p className="text-[11px] text-neutral-500">{sub}</p>}
        </div>
    );
}

export default function ListingsStats({ listings, total }: ListingsStatsProps) {
    const totalRentRoll = listings.reduce((s, l) => s + l.monthlyRevenue, 0);
    const totalUnits = listings.reduce((s, l) => s + l.vacantUnits, 0);
    const avgRent =
        listings.length > 0
            ? Math.round(listings.reduce((s, l) => s + l.averageRent, 0) / listings.length)
            : 0;

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
                label="Total Listings"
                value={String(listings.length)}
                sub={`of ${total} properties`}
            />
            <StatCard
                label="Vacant Units"
                value={String(totalUnits)}
                sub="available now"
                accent="text-jade-700"
            />
            <StatCard
                label="Avg. Rent"
                value={formatCompactKSh(avgRent)}
                sub="per unit / month"
            />
            <StatCard
                label="Total Rent Roll"
                value={formatCompactKSh(totalRentRoll)}
                sub="from listed properties"
                accent="text-jade-700"
            />
        </div>
    );
}

