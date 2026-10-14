import Image from "next/image";
import Link from "next/link";

function UnitIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-jade-700" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-jade-700" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-gold-600" aria-hidden="true">
            <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function SelectionIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-navy-600" aria-hidden="true">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

const overviewData = {
    units: 85,
    handoverDate: "24 December 2024",
    address: "Ngong Road, Nairobi, Kenya",
    selectionLimit: "KSh 5,000",
    image: "/images/samples/mansion.png",
} as const;

export default function DashboardGeneralOverview() {
    return (
        <section aria-label="General overview" className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                {/* Property image */}
                <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-[220px]">
                    <Image
                        src={overviewData.image}
                        alt="Featured property"
                        fill
                        sizes="(max-width: 640px) 100vw, 220px"
                        className="object-cover"
                    />
                    {/* Gradient overlay at bottom for mobile */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent sm:hidden" aria-hidden="true" />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="font-outfit text-base font-semibold text-ink">General Overview</h3>
                        <Link
                            href="/account/dashboard/properties"
                            className="text-[11px] font-semibold text-jade-700 transition-colors hover:text-jade-900"
                        >
                            View All →
                        </Link>
                    </div>

                    <ul className="space-y-3" role="list">
                        <li className="flex items-center gap-2.5">
                            <UnitIcon />
                            <span className="text-xs text-neutral-500">Units</span>
                            <span className="ml-auto text-xs font-semibold text-ink">{overviewData.units}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <CalendarIcon />
                            <span className="text-xs text-neutral-500">Handover Date</span>
                            <span className="ml-auto text-xs font-semibold text-ink">{overviewData.handoverDate}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <LocationIcon />
                            <span className="text-xs text-neutral-500">Address</span>
                            <span className="ml-auto max-w-[160px] text-right text-xs font-semibold text-ink">{overviewData.address}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <SelectionIcon />
                            <span className="text-xs text-neutral-500">Selection Limit</span>
                            <span className="ml-auto text-xs font-semibold text-ink">{overviewData.selectionLimit}</span>
                        </li>
                    </ul>

                    {/* CTA strip */}
                    <div className="mt-auto flex items-center gap-2 border-t border-neutral-100 pt-4">
                        <Link
                            href="/account/leases"
                            className="flex-1 rounded-md bg-jade-700 px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-jade-800"
                        >
                            View Leases
                        </Link>
                        <Link
                            href="/account/tenants"
                            className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-center text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                        >
                            View Tenants
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
