export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";
export type TaskStatus = "Planned" | "In progress" | "Completed";

export interface OwnerTask {
    id: string;
    title: string;
    description: string;
    property: string;
    unit: string;
    category: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
    assignee: string;
    relatedReport?: string;
}

// Sample owner-created work plans and reminders. Replace with backend records later.
export const initialTasks: OwnerTask[] = [
    {
        id: "TSK-1084",
        title: "Repair kitchen sink leak",
        description: "Replace the worn pipe connector below the kitchen sink and check for cabinet water damage.",
        property: "Kilimani Heights",
        unit: "A-04",
        category: "Plumbing",
        priority: "High",
        status: "Planned",
        dueDate: "2026-10-18",
        assignee: "Unassigned",
        relatedReport: "RPT-2408",
    },
    {
        id: "TSK-1083",
        title: "Fix pedestrian gate access reader",
        description: "Inspect the card reader, test resident access cards, and confirm the gate closes securely.",
        property: "Karen Gardens",
        unit: "Common area",
        category: "Security",
        priority: "Urgent",
        status: "In progress",
        dueDate: "2026-10-17",
        assignee: "James Mwangi",
        relatedReport: "RPT-2407",
    },
    {
        id: "TSK-1082",
        title: "Inspect Block B lift",
        description: "Arrange a service visit and confirm the lift safety system before returning it to service.",
        property: "Grandview Estate",
        unit: "Block B",
        category: "Lift maintenance",
        priority: "Urgent",
        status: "In progress",
        dueDate: "2026-10-17",
        assignee: "Peter Njoroge",
        relatedReport: "RPT-2405",
    },
    {
        id: "TSK-1081",
        title: "Review water pressure in bathroom",
        description: "Check the unit supply valve and building pump pressure; report findings to the tenant.",
        property: "Azure Heights",
        unit: "2B",
        category: "Plumbing",
        priority: "Medium",
        status: "Planned",
        dueDate: "2026-10-20",
        assignee: "Unassigned",
        relatedReport: "RPT-2404",
    },
    {
        id: "TSK-1080",
        title: "Replace parking area light",
        description: "Replace the failed LED fitting above parking space 24 and verify the timer sensor.",
        property: "Westlands Court",
        unit: "Parking 24",
        category: "Electrical",
        priority: "Low",
        status: "Completed",
        dueDate: "2026-10-15",
        assignee: "James Mwangi",
        relatedReport: "RPT-2403",
    },
    {
        id: "TSK-1079",
        title: "Schedule quarterly water tank cleaning",
        description: "Book the contractor, notify residents, and record the service certificate.",
        property: "Riverside Residences",
        unit: "All blocks",
        category: "Preventive maintenance",
        priority: "Medium",
        status: "Planned",
        dueDate: "2026-10-24",
        assignee: "Mary Wanjiku",
    },
    {
        id: "TSK-1078",
        title: "Follow up on shared water bill reading",
        description: "Compare the meter reading to last month and provide the tenant with an explanation.",
        property: "Karen Gardens",
        unit: "A-03",
        category: "Utilities",
        priority: "Medium",
        status: "Planned",
        dueDate: "2026-10-21",
        assignee: "Unassigned",
        relatedReport: "RPT-2400",
    },
];

export const taskProperties = [
    "Kilimani Heights",
    "Karen Gardens",
    "Skyline Tower",
    "Grandview Estate",
    "Azure Heights",
    "Westlands Court",
    "Riverside Residences",
    "Other / portfolio-wide",
];
