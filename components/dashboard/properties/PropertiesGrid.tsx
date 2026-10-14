import { Property } from "./types";
import PropertyCard from "./PropertyCard";

interface PropertiesGridProps {
    properties: Property[];
    onResetFilters?: () => void;
    onEdit?: (property: Property) => void;
    onDelete?: (property: Property) => void;
}

export default function PropertiesGrid({
    properties,
    onResetFilters,
    onEdit,
    onDelete,
}: PropertiesGridProps) {
    if (properties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden="true">
                        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </div>
                <h3 className="mt-4 font-outfit text-lg font-semibold text-ink">No properties found</h3>
                <p className="mt-1 max-w-sm text-xs text-neutral-500">
                    No properties match your current search and filter criteria. Try adjusting your search term or filters.
                </p>
                {onResetFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="mt-5 rounded-md bg-jade-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-jade-800"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <section aria-label="Properties list" className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
}
