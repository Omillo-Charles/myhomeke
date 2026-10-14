export type PropertyType =
    | "Apartment"
    | "Bungalow"
    | "Penthouse"
    | "Mansion"
    | "Townhouse"
    | "Commercial";

export type PropertyStatus =
    | "fully_occupied"
    | "partially_vacant"
    | "maintenance"
    | "under_construction";

export interface PropertyManager {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}

export interface Property {
    id: string;
    name: string;
    type: PropertyType;
    address: string;
    location: string;
    image: string;
    totalUnits: number;
    occupiedUnits: number;
    vacantUnits: number;
    monthlyRevenue: number; // in KSh
    averageRent: number; // in KSh
    status: PropertyStatus;
    yearBuilt: number;
    manager: PropertyManager;
    amenities: string[];
    description: string;
    publicListing?: boolean; // true if property should be listed publicly
}

export type FilterStatus = "all" | PropertyStatus;
export type ViewMode = "grid" | "table";
export type SortOption =
    | "name_asc"
    | "units_desc"
    | "occupancy_desc"
    | "revenue_desc";

