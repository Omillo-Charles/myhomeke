import Image from "next/image";
import Link from "next/link";

type ActivityType = "maintenance" | "payment" | "lease";

interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    timeAgo: string;
    image: string;
    urgent?: boolean;
}

function MaintenanceIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.47-2.47a6 6 0 0 1-7.94 7.94l-4.69 4.69a2.12 2.12 0 0 1-3-3l4.69-4.69A6 6 0 0 1 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function PaymentIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function LeaseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

const activityConfig: Record<ActivityType, { icon: React.FC; color: string; bg: string }> = {
    maintenance: { icon: MaintenanceIcon, color: "text-warning", bg: "bg-warning/10" },
    payment:     { icon: PaymentIcon,     color: "text-success", bg: "bg-success/10" },
    lease:       { icon: LeaseIcon,       color: "text-info",    bg: "bg-info/10"    },
};

const activities: Activity[] = [
    {
        id: "1",
        type: "maintenance",
        title: "New Maintenance Request",
        description: "Unit 12B – Plumbing Issue",
        timeAgo: "2 hours ago",
        image: "/images/samples/apartment.png",
        urgent: true,
    },
    {
        id: "2",
        type: "maintenance",
        title: "New Maintenance Request",
        description: "Unit 7A – Electrical Fault",
        timeAgo: "3 hours ago",
        image: "/images/samples/bungalow.png",
    },
    {
        id: "3",
        type: "payment",
        title: "Rent Payment Received",
        description: "Unit 15A – KSh 45,000",
        timeAgo: "5 hours ago",
        image: "/images/samples/penthouse.png",
    },
    {
        id: "4",
        type: "payment",
        title: "Rent Payment Received",
        description: "Unit 16B – KSh 38,500",
        timeAgo: "5 hours ago",
        image: "/images/samples/mansion.png",
    },
    {
        id: "5",
        type: "lease",
        title: "Lease Renewal Due",
        description: "Unit 8C – Due in 15 days",
        timeAgo: "1 day ago",
        image: "/images/samples/apartment.png",
        urgent: true,
    },
    {
        id: "6",
        type: "lease",
        title: "Lease Renewal Due",
        description: "Unit 3D – Due in 15 days",
        timeAgo: "1 day ago",
        image: "/images/samples/bungalow.png",
        urgent: true,
    },
];

function ActivityItem({ activity }: { activity: Activity }) {
    const config = activityConfig[activity.type];
    const Icon = config.icon;

    return (
        <li className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50">
            {/* Property thumbnail */}
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={activity.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                        <Icon />
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                    {activity.urgent && (
                        <span className="rounded-full bg-danger/10 px-1.5 py-0.5 text-[10px] font-semibold text-danger">
                            Urgent
                        </span>
                    )}
                </div>
                <p className="mt-0.5 truncate text-xs font-semibold text-ink">{activity.description}</p>
                <p className="text-[11px] text-neutral-400">{activity.timeAgo}</p>
            </div>
        </li>
    );
}

export default function DashboardRecentActivity() {
    return (
        <section aria-label="Recent activities" className="flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-5 py-4">
                <h3 className="text-sm font-semibold text-ink">Recent Activities</h3>
                <Link
                    href="/account/maintenance"
                    className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900"
                >
                    View All →
                </Link>
            </div>

            {/* Activity list */}
            <ul className="divide-y divide-neutral-50 px-3 py-2" role="list">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </ul>
        </section>
    );
}
