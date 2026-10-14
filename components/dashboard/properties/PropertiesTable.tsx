import Image from "next/image";
import Link from "next/link";
import { Property } from "./types";
import { formatCompactKSh } from "./propertiesData";

interface PropertiesTableProps {
    properties: Property[];
    onResetFilters?: () => void;
    onEdit?: (property: Property) => void;
    onDelete?: (property: Property) => void;
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
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const statusConfig = {
    fully_occupied: {
        label: "Fully Occupied",
        color: "text-success",
        bg: "bg-success/10",
        dot: "bg-success",
    },
    partially_vacant: {
        label: "Vacancies",
        color: "text-warning",
        bg: "bg-warning/10",
        dot: "bg-warning",
    },
    maintenance: {
        label: "Maintenance",
        color: "text-danger",
        bg: "bg-danger/10",
        dot: "bg-danger",
    },
    under_construction: {
        label: "Developing",
        color: "text-navy-700",
        bg: "bg-navy-100",
        dot: "bg-navy-700",
    },
} as const;

export default function PropertiesTable({
    properties,
    onResetFilters,
    onEdit,
    onDelete,
}: PropertiesTableProps) {
    if (properties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
                <h3 className="font-outfit text-lg font-semibold text-ink">No properties found</h3>
                <p className="mt-1 max-w-sm text-xs text-neutral-500">
                    No properties match your current search and filter criteria.
                </p>
                {onResetFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="mt-4 rounded-md bg-jade-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-jade-800"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
                <table className="w-full min-w-[760px] text-left text-xs">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50/75 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                            <th scope="col" className="px-5 py-3.5">Property</th>
                            <th scope="col" className="px-4 py-3.5">Type</th>
                            <th scope="col" className="px-4 py-3.5">Occupancy & Units</th>
                            <th scope="col" className="px-4 py-3.5">Monthly Revenue</th>
                            <th scope="col" className="px-4 py-3.5">Status</th>
                            <th scope="col" className="px-4 py-3.5">Manager</th>
                            <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {properties.map((property) => {
                            const status = statusConfig[property.status] ?? statusConfig.partially_vacant;
                            const occupancyPct = Math.round((property.occupiedUnits / property.totalUnits) * 100);

                            return (
                                <tr key={property.id} className="transition-colors hover:bg-neutral-50/70">
                                    {/* Property thumbnail + name + location */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                                                <Image
                                                    src={property.image}
                                                    alt={property.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-outfit text-sm font-bold text-ink">{property.name}</p>
                                                <p className="truncate text-[11px] text-neutral-400">
                                                    {property.address}, {property.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-4">
                                        <span className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700">
                                            {property.type}
                                        </span>
                                    </td>

                                    {/* Occupancy & Units progress bar */}
                                    <td className="px-4 py-4">
                                        <div className="w-36">
                                            <div className="flex items-center justify-between text-[11px] font-semibold">
                                                <span className="text-neutral-700">{occupancyPct}%</span>
                                                <span className="text-neutral-400">
                                                    {property.occupiedUnits}/{property.totalUnits} Units
                                                </span>
                                            </div>
                                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                                                <div
                                                    className={`h-full rounded-full ${
                                                        occupancyPct >= 90
                                                            ? "bg-jade-700"
                                                            : occupancyPct >= 70
                                                            ? "bg-jade-500"
                                                            : "bg-warning"
                                                    }`}
                                                    style={{ width: `${occupancyPct}%` }}
                                                />
                                            </div>
                                            {property.vacantUnits > 0 && (
                                                <p className="mt-1 text-[10px] text-warning">
                                                    {property.vacantUnits} vacant
                                                </p>
                                            )}
                                        </div>
                                    </td>

                                    {/* Monthly Revenue */}
                                    <td className="px-4 py-4">
                                        <p className="font-outfit text-sm font-bold text-ink">
                                            {formatCompactKSh(property.monthlyRevenue)}
                                        </p>
                                        <p className="text-[10px] text-neutral-400">Avg {formatCompactKSh(property.averageRent)}/unit</p>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.bg} ${status.color}`}
                                        >
                                            <span className={`size-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                                            {property.vacantUnits > 0
                                                ? `${property.vacantUnits} Vacant`
                                                : status.label}
                                        </span>
                                    </td>

                                    {/* Manager */}
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-neutral-800">{property.manager.name}</p>
                                        <p className="text-[10px] text-neutral-400">{property.manager.phone}</p>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4 text-right">
                                        <div className="inline-flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => onEdit?.(property)}
                                                aria-label={`Edit ${property.name}`}
                                                title={`Edit ${property.name}`}
                                                className="flex size-7 items-center justify-center rounded border border-neutral-200 text-neutral-500 transition-colors hover:border-jade-600 hover:bg-jade-50 hover:text-jade-700"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete?.(property)}
                                                aria-label={`Delete ${property.name}`}
                                                title={`Delete ${property.name}`}
                                                className="flex size-7 items-center justify-center rounded border border-neutral-200 text-neutral-400 transition-colors hover:border-danger/40 hover:bg-danger/10 hover:text-danger"
                                            >
                                                <TrashIcon />
                                            </button>
                                            <Link
                                                href="/account/leases"
                                                className="rounded border border-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-700 transition-colors hover:border-jade-600 hover:bg-jade-50 hover:text-jade-700"
                                            >
                                                Leases
                                            </Link>
                                            <Link
                                                href="/account/tenants"
                                                className="rounded bg-jade-700 px-2 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-jade-800"
                                            >
                                                Tenants
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-5 py-3 text-xs text-neutral-500">
                <span>Showing {properties.length} properties</span>
                <span className="font-medium">Portfolio Management View</span>
            </div>
        </div>
    );
}

