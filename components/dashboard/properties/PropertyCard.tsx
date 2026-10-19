import Image from "next/image";
import Link from "next/link";
import { Property } from "./types";
import { formatCompactKSh } from "./propertiesData";

interface PropertyCardProps {
    property: Property;
    onEdit?: (property: Property) => void;
    onDelete?: (property: Property) => void;
}

const typeBadgeStyles = {
    Apartment: "bg-jade-100 text-jade-800",
    Bungalow: "bg-gold-100 text-gold-800",
    Penthouse: "bg-navy-100 text-navy-800",
    Mansion: "bg-neutral-200 text-neutral-800",
    Townhouse: "bg-amber-100 text-amber-800",
    Commercial: "bg-slate-200 text-slate-800",
} as const;

function LocationPinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 shrink-0 text-neutral-400" aria-hidden="true">
            <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3 shrink-0" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
    const occupancyPct = Math.round((property.occupiedUnits / property.totalUnits) * 100);

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
            {/* Image banner with badges and Edit button */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" aria-hidden="true" />

                {/* Top: Left type badge + Right Edit button */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                    <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${typeBadgeStyles[property.type] ?? "bg-white/90 text-ink"
                            }`}
                    >
                        {property.type}
                    </span>

                    {/* Edit button replacing previous occupancy pill */}
                    <button
                        type="button"
                        onClick={() => onEdit?.(property)}
                        aria-label={`Edit ${property.name}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/60 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm backdrop-blur-md transition-colors hover:border-jade-600 hover:bg-white hover:text-jade-800"
                    >
                        <EditIcon />
                        <span>Edit</span>
                    </button>
                </div>

                {/* Bottom image overlay stats */}
                <div className="absolute inset-x-3 bottom-2.5 flex items-baseline justify-between text-white">
                    <span className="text-[11px] font-medium text-white/90">Monthly Rent Roll</span>
                    <span className="font-outfit text-base font-bold text-white drop-shadow-sm">
                        {formatCompactKSh(property.monthlyRevenue)}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                {/* Title & Location */}
                <div>
                    <h3 className="font-outfit text-base font-bold text-ink transition-colors group-hover:text-jade-800">
                        {property.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                        <LocationPinIcon />
                        <span className="truncate">{property.address}, {property.location}</span>
                    </p>
                </div>

                {/* Occupancy bar */}
                <div className="mt-4 rounded-lg bg-neutral-50 p-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-600">Occupancy</span>
                        <span className={occupancyPct >= 85 ? "text-jade-700" : "text-amber-700"}>
                            {occupancyPct}%
                        </span>
                    </div>

                    <div
                        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200"
                        role="progressbar"
                        aria-valuenow={occupancyPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${occupancyPct >= 90
                                    ? "bg-jade-700"
                                    : occupancyPct >= 70
                                        ? "bg-jade-500"
                                        : "bg-warning"
                                }`}
                            style={{ width: `${occupancyPct}%` }}
                        />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>{property.occupiedUnits} Occupied</span>
                        <span>{property.vacantUnits} Vacant</span>
                        <span>{property.totalUnits} Total Units</span>
                    </div>
                </div>

                {/* Amenities pills */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {property.amenities.slice(0, 3).map((amenity) => (
                        <span
                            key={amenity}
                            className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                        >
                            {amenity}
                        </span>
                    ))}
                    {property.amenities.length > 3 && (
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
                            +{property.amenities.length - 3}
                        </span>
                    )}
                </div>

                {/* Manager & Action Strip */}
                <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                        <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wider text-neutral-400">Manager</p>
                            <p className="truncate text-xs font-semibold text-neutral-700">{property.manager.name}</p>
                        </div>
                        <a
                            href={`tel:${property.manager.phone}`}
                            className="flex size-7 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-jade-300 hover:bg-jade-50 hover:text-jade-700"
                            title={`Call ${property.manager.name}`}
                        >
                            <PhoneIcon />
                        </a>
                    </div>

                    {/* Bottom Action Strip: Delete icon on bottom left + View Leases + View Tenants */}
                    <div className="mt-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onDelete?.(property)}
                            aria-label={`Delete ${property.name}`}
                            title={`Delete ${property.name}`}
                            className="flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-400 transition-colors hover:border-danger/40 hover:bg-danger/10 hover:text-danger focus-visible:outline-2 focus-visible:outline-danger"
                        >
                            <TrashIcon />
                        </button>
                        <Link
                            href="/account/leases"
                            className="flex-1 rounded-md bg-jade-700 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-jade-800"
                        >
                            View Leases
                        </Link>
                        <Link
                            href="/account/tenants"
                            className="flex-1 rounded-md border border-neutral-200 py-2 text-center text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                        >
                            View Tenants
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
