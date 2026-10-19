export type BroadcastChannel = "WhatsApp" | "SMS" | "Email";
export type BroadcastStatus = "Sent" | "Scheduled" | "Draft";

export interface Broadcast {
    id: string;
    title: string;
    message: string;
    property: string;
    audience: string;
    channels: BroadcastChannel[];
    sentAt: string;
    recipients: number;
    status: BroadcastStatus;
    imageName?: string;
}

export const initialBroadcasts: Broadcast[] = [
    {
        id: "BRD-0284",
        title: "October rent reminder",
        message: "A friendly reminder that rent is due on 1 November. Please use your usual payment method and include your unit number as the reference.",
        property: "All properties",
        audience: "All tenants",
        channels: ["WhatsApp", "SMS", "Email"],
        sentAt: "17 Oct 2026, 9:15 AM",
        recipients: 214,
        status: "Sent",
        imageName: "November-rent-guide.jpg",
    },
    {
        id: "BRD-0283",
        title: "Water maintenance notice",
        message: "Water supply will be interrupted on Saturday from 10 AM to 1 PM while our team services the main storage tank. We apologise for the inconvenience.",
        property: "Kilimani Heights",
        audience: "All tenants",
        channels: ["WhatsApp", "Email"],
        sentAt: "16 Oct 2026, 2:40 PM",
        recipients: 44,
        status: "Sent",
    },
    {
        id: "BRD-0282",
        title: "Fire safety inspection",
        message: "Our safety team will be visiting apartments for a routine fire alarm check. Please ensure access to your unit between 9 AM and 12 PM.",
        property: "Karen Gardens",
        audience: "Occupied units",
        channels: ["SMS", "Email"],
        sentAt: "18 Oct 2026, 8:00 AM",
        recipients: 17,
        status: "Scheduled",
    },
    {
        id: "BRD-0281",
        title: "Community garden update",
        message: "We are refreshing the shared garden this month. Let us know if you would like to volunteer or have suggestions for the new planting plan.",
        property: "All properties",
        audience: "All tenants",
        channels: ["Email"],
        sentAt: "15 Oct 2026, 11:20 AM",
        recipients: 214,
        status: "Sent",
    },
    {
        id: "BRD-0280",
        title: "Quarterly property newsletter",
        message: "Share the latest community news and property updates with residents.",
        property: "All properties",
        audience: "All tenants",
        channels: ["Email"],
        sentAt: "14 Oct 2026, 4:10 PM",
        recipients: 0,
        status: "Draft",
    },
];

export const broadcastProperties = [
    "All properties",
    "Kilimani Heights",
    "Karen Gardens",
    "Skyline Tower",
    "Grandview Estate",
    "Azure Heights",
    "Westlands Court",
    "Riverside Residences",
];

export const broadcastAudiences = ["All tenants", "Occupied units", "Tenants with overdue rent"];
