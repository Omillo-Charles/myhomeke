"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing, listingStatusColor, listingStatusLabel } from "./listingsData";
import { formatCompactKSh } from "@/components/dashboard/properties/propertiesData";

interface ListingCardProps {
    listing: Listing;
    onUnlist?: (listing: Listing) => void;
}

const TYPE_BADGE: Record<string, string> = {
    Apartment: "bg-jade-100 text-jade-800",
    Bungalow: "bg-gold-100 text-gold-800",
    Penthouse: "bg-navy-100 text-navy-800",
    Mansion: "bg-neutral-200 text-neutral-800",
    Townhouse: "bg-amber-100 text-amber-800",
    Commercial: "bg-slate-200 text-slate-800",
};

function LocationPinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 shrink-0 text-neutral-400" aria-hidden="true">
            <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function ListingCard({ listing, onUnlist }: ListingCardProps) {
    const occupancyPct = Math.round((listing.occupiedUnits / listing.totalUnits) * 100);

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" aria-hidden="true" />

                {/* Top: type badge + status badge */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                    <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${TYPE_BADGE[listing.type] ?? "bg-white/90 text-ink"}`}
                    >
                        {listing.type}
                    </span>
                    <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${listingStatusColor(listing.status)}`}
                    >
                        {listingStatusLabel(listing.status)}
                    </span>
                </div>

                {/* Public badge */}
                <div className="absolute bottom-2.5 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-jade-600/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow backdrop-blur-sm">
                        <svg viewBox="0 0 24 24" fill="none" className="size-2.5" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M2 12s2.5-7 10-7 10 7 10 7-2.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.8" />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                        Public
                    </span>
                </div>

                {/* Rent roll on bottom right */}
                <div className="absolute bottom-2.5 right-3 text-right">
                    <span className="font-outfit text-sm font-bold text-white drop-shadow-sm">
                        {formatCompactKSh(listing.monthlyRevenue)}
                    </span>
                    <span className="ml-1 text-[10px] text-white/80">/mo</span>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-4">
                {/* Title & Location */}
                <div>
                    <h3 className="font-outfit text-sm font-bold text-ink transition-colors group-hover:text-jade-800 sm:text-base">
                        {listing.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                        <LocationPinIcon />
                        <span className="truncate">{listing.address}, {listing.location}</span>
                    </p>
                </div>

                {/* Description */}
                <p className="mt-2.5 line-clamp-2 text-[11px] leading-relaxed text-neutral-500">
                    {listing.description}
                </p>

                {/* Occupancy bar */}
                <div className="mt-3.5 rounded-lg bg-neutral-50 p-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-600">Occupancy</span>
                        <span className={occupancyPct >= 85 ? "text-jade-700" : "text-amber-700"}>
                            {occupancyPct}%
                        </span>
                    </div>
                    <div
                        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200"
                        role="progressbar"
                        aria-valuenow={occupancyPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${
                                occupancyPct >= 90
                                    ? "bg-jade-700"
                                    : occupancyPct >= 70
                                    ? "bg-jade-500"
                                    : "bg-warning"
                            }`}
                            style={{ width: `${occupancyPct}%` }}
                        />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-400">
                        <span>{listing.occupiedUnits} Occupied</span>
                        <span>{listing.vacantUnits} Vacant</span>
                        <span>{listing.totalUnits} Total</span>
                    </div>
                </div>

                {/* Key stats row */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-neutral-50 px-3 py-2 text-center">
                        <p className="font-outfit text-sm font-bold text-ink">{formatCompactKSh(listing.averageRent)}</p>
                        <p className="text-[10px] text-neutral-500">Avg. Rent / Unit</p>
                    </div>
                    <div className="rounded-lg bg-neutral-50 px-3 py-2 text-center">
                        <p className="font-outfit text-sm font-bold text-jade-700">{listing.vacantUnits}</p>
                        <p className="text-[10px] text-neutral-500">Units Available</p>
                    </div>
                </div>

                {/* Amenities */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                            {a}
                        </span>
                    ))}
                    {listing.amenities.length > 3 && (
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
                            +{listing.amenities.length - 3}
                        </span>
                    )}
                </div>

                {/* Action strip */}
                <div className="mt-auto flex items-center gap-2 border-t border-neutral-100 pt-4">
                    <button
                        type="button"
                        onClick={() => onUnlist?.(listing)}
                        title="Remove from public listing"
                        className="flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-2 text-[11px] font-semibold text-neutral-500 transition-colors hover:border-danger/40 hover:bg-danger/8 hover:text-danger"
                    >
                        <EyeOffIcon />
                        <span>Unlist</span>
                    </button>
                    <Link
                        href="/account/properties"
                        className="flex-1 rounded-md bg-jade-700 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-jade-800"
                    >
                        View Property
                    </Link>
                </div>
            </div>
        </article>
    );
}
