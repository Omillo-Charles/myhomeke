export type ReportCategory = "Maintenance" | "Safety" | "Noise" | "Utilities" | "Common areas" | "Other";
export type ReportPriority = "Urgent" | "High" | "Medium" | "Low";
export type ReportStatus = "Open" | "In progress" | "Resolved";

export interface TenantReport {
    id: string;
    title: string;
    description: string;
    category: ReportCategory;
    priority: ReportPriority;
    status: ReportStatus;
    tenant: string;
    unit: string;
    property: string;
    reportedAt: string;
    assignee: string;
}

export const tenantReports: TenantReport[] = [
    {
        id: "RPT-2408",
        title: "Water leaking under kitchen sink",
        description: "The pipe beneath the kitchen sink has been dripping since last night. The cabinet floor is starting to get wet.",
        category: "Maintenance",
        priority: "High",
        status: "Open",
        tenant: "Amara Osei",
        unit: "A-04",
        property: "Kilimani Heights",
        reportedAt: "Today, 9:42 AM",
        assignee: "Unassigned",
    },
    {
        id: "RPT-2407",
        title: "Gate access reader not responding",
        description: "The pedestrian entrance reader does not recognize access cards. Several residents are having to use the vehicle gate.",
        category: "Safety",
        priority: "Urgent",
        status: "In progress",
        tenant: "Brian Kamau",
        unit: "B-12",
        property: "Karen Gardens",
        reportedAt: "Today, 8:16 AM",
        assignee: "James Mwangi",
    },
    {
        id: "RPT-2406",
        title: "Loud music from neighbouring unit",
        description: "There has been loud music late at night on three occasions this week, usually after 11 PM.",
        category: "Noise",
        priority: "Medium",
        status: "Open",
        tenant: "Cynthia Mwangi",
        unit: "18C",
        property: "Skyline Tower",
        reportedAt: "Yesterday, 7:35 PM",
        assignee: "Unassigned",
    },
    {
        id: "RPT-2405",
        title: "Lift out of service in Block B",
        description: "The lift stopped between floors briefly and is now showing an out-of-service message in the lobby.",
        category: "Maintenance",
        priority: "Urgent",
        status: "In progress",
        tenant: "David Otieno",
        unit: "3-08",
        property: "Grandview Estate",
        reportedAt: "Yesterday, 4:12 PM",
        assignee: "Peter Njoroge",
    },
    {
        id: "RPT-2404",
        title: "Water pressure is very low",
        description: "Shower and kitchen taps have noticeably low pressure since this morning.",
        category: "Utilities",
        priority: "Medium",
        status: "Open",
        tenant: "Esther Njeri",
        unit: "2B",
        property: "Azure Heights",
        reportedAt: "Yesterday, 11:54 AM",
        assignee: "Unassigned",
    },
    {
        id: "RPT-2403",
        title: "Broken light in parking area",
        description: "The light above parking space 24 has been out for several nights, making the area difficult to see.",
        category: "Common areas",
        priority: "Low",
        status: "Resolved",
        tenant: "Farah Ali",
        unit: "7-02",
        property: "Westlands Court",
        reportedAt: "12 Oct 2026, 3:37 PM",
        assignee: "James Mwangi",
    },
    {
        id: "RPT-2402",
        title: "Bathroom exhaust fan stopped",
        description: "The exhaust fan hums but does not spin. There is a growing damp smell in the bathroom.",
        category: "Maintenance",
        priority: "Medium",
        status: "In progress",
        tenant: "George Muli",
        unit: "5A",
        property: "Riverside Residences",
        reportedAt: "11 Oct 2026, 10:21 AM",
        assignee: "Peter Njoroge",
    },
    {
        id: "RPT-2401",
        title: "Waste collection missed this week",
        description: "The bins outside the east entrance have not been collected and are nearly full.",
        category: "Common areas",
        priority: "Low",
        status: "Resolved",
        tenant: "Hannah Wairimu",
        unit: "C-11",
        property: "Kilimani Heights",
        reportedAt: "10 Oct 2026, 5:49 PM",
        assignee: "Mary Wanjiku",
    },
    {
        id: "RPT-2400",
        title: "Water bill seems unusually high",
        description: "This month's shared water charge is significantly higher than previous months. Please review the meter reading.",
        category: "Utilities",
        priority: "High",
        status: "Open",
        tenant: "Joyce Wambui",
        unit: "A-03",
        property: "Karen Gardens",
        reportedAt: "9 Oct 2026, 9:08 AM",
        assignee: "Unassigned",
    },
];
