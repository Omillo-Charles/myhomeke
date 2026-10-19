export type MaintenanceStatus = "Scheduled" | "In progress" | "Completed" | "Cancelled";
export type MaintenancePriority = "Urgent" | "High" | "Medium" | "Low";

export interface MaintenanceRecord {
    id: string;
    title: string;
    description: string;
    property: string;
    unit: string;
    category: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    date: string;
    cost: number;
    vendor: string;
    relatedTask?: string;
}

// Sample completed and planned maintenance history for the UI preview.
export const initialMaintenanceRecords: MaintenanceRecord[] = [
    {
        id: "MNT-2408",
        title: "Kitchen sink pipe repair",
        description: "Replaced worn connector below the sink, dried cabinet base and pressure-tested the taps.",
        property: "Kilimani Heights",
        unit: "A-04",
        category: "Plumbing",
        priority: "High",
        status: "In progress",
        date: "2026-10-20",
        cost: 8500,
        vendor: "MajiPro Plumbing",
        relatedTask: "TSK-1084",
    },
    {
        id: "MNT-2407",
        title: "Pedestrian gate access reader service",
        description: "Repaired card reader connection, re-enrolled access cards and tested secure closing.",
        property: "Karen Gardens",
        unit: "Main entrance",
        category: "Security",
        priority: "Urgent",
        status: "In progress",
        date: "2026-10-19",
        cost: 18500,
        vendor: "SecureWay Systems",
        relatedTask: "TSK-1083",
    },
    {
        id: "MNT-2406",
        title: "Block B lift safety inspection",
        description: "Technician inspecting lift sensors and safety brake after the lift stopped between floors.",
        property: "Grandview Estate",
        unit: "Block B",
        category: "Lift maintenance",
        priority: "Urgent",
        status: "Scheduled",
        date: "2026-10-21",
        cost: 42000,
        vendor: "Metro Lift Services",
        relatedTask: "TSK-1082",
    },
    {
        id: "MNT-2405",
        title: "Replace parking area light",
        description: "Installed a new LED fitting above parking space 24 and checked the dusk sensor.",
        property: "Westlands Court",
        unit: "Parking 24",
        category: "Electrical",
        priority: "Low",
        status: "Completed",
        date: "2026-10-15",
        cost: 6200,
        vendor: "BrightSpark Electrical",
        relatedTask: "TSK-1080",
    },
    {
        id: "MNT-2404",
        title: "Quarterly water tank cleaning",
        description: "Cleaned and disinfected the rooftop tank, then recorded a clear water quality check.",
        property: "Riverside Residences",
        unit: "All blocks",
        category: "Preventive maintenance",
        priority: "Medium",
        status: "Completed",
        date: "2026-10-11",
        cost: 27000,
        vendor: "ClearFlow Services",
    },
    {
        id: "MNT-2403",
        title: "Bathroom exhaust fan replacement",
        description: "Replaced faulty fan motor and verified airflow and noise levels.",
        property: "Riverside Residences",
        unit: "5A",
        category: "Electrical",
        priority: "Medium",
        status: "Completed",
        date: "2026-10-08",
        cost: 11500,
        vendor: "BrightSpark Electrical",
        relatedTask: "TSK-1079",
    },
    {
        id: "MNT-2402",
        title: "Common area repainting",
        description: "Completed touch-ups and repainting on the ground floor corridor walls.",
        property: "Azure Heights",
        unit: "Ground floor",
        category: "Painting",
        priority: "Low",
        status: "Completed",
        date: "2026-10-02",
        cost: 36000,
        vendor: "FreshCoat Painters",
    },
    {
        id: "MNT-2401",
        title: "Generator routine servicing",
        description: "Changed oil and filters, tested automatic transfer switch and logged run time.",
        property: "Skyline Tower",
        unit: "Generator room",
        category: "Generator service",
        priority: "Medium",
        status: "Completed",
        date: "2026-09-28",
        cost: 22500,
        vendor: "PowerCare Kenya",
    },
];

export const maintenanceProperties = [
    "Kilimani Heights",
    "Karen Gardens",
    "Skyline Tower",
    "Grandview Estate",
    "Azure Heights",
    "Westlands Court",
    "Riverside Residences",
    "Other / portfolio-wide",
];
