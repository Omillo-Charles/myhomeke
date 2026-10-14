import { initialProperties } from "@/components/dashboard/properties/propertiesData";
import { Property } from "@/components/dashboard/properties/types";

// A Listing is a Property that has been enabled for public visibility
export type Listing = Property & { publicListing: true };

export type ListingFilterStatus =
    | "all"
    | "fully_occupied"
    | "partially_vacant"
    | "maintenance"
    | "under_construction";

export type ListingSortOption =
    | "name_asc"
    | "rent_desc"
    | "occupancy_desc"
    | "revenue_desc";

/** Derive listings from the shared properties mock data */
export const getListings = (): Listing[] =>
    initialProperties.filter((p): p is Listing => p.publicListing === true);

export function listingStatusLabel(status: Property["status"]): string {
    switch (status) {
        case "fully_occupied":
            return "Fully Occupied";
        case "partially_vacant":
            return "Partially Vacant";
        case "maintenance":
            return "Maintenance";
        case "under_construction":
            return "Under Construction";
        default:
            return status;
    }
}

export function listingStatusColor(status: Property["status"]): string {
    switch (status) {
        case "fully_occupied":
            return "bg-jade-100 text-jade-800";
        case "partially_vacant":
            return "bg-amber-100 text-amber-800";
        case "maintenance":
            return "bg-orange-100 text-orange-800";
        case "under_construction":
            return "bg-neutral-200 text-neutral-700";
        default:
            return "bg-neutral-100 text-neutral-700";
    }
}

