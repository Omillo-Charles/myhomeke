import { BRAND_NAME } from "@/components/config/brand";

const benefits = [
    {
        number: "01",
        title: "Find a home that fits",
        description: "Explore thoughtfully selected homes and apartments suited to your needs and lifestyle.",
        icon: "home",
    },
    {
        number: "02",
        title: "Move with confidence",
        description: "Get clear, helpful guidance as you compare options and decide what feels right.",
        icon: "check",
    },
    {
        number: "03",
        title: "Discover quality rentals",
        description: "Browse comfortable rental options in neighborhoods that feel like a good fit.",
        icon: "key",
    },
    {
        number: "04",
        title: "Get personal guidance",
        description: "Our team is here to help at every step, from your first enquiry to your next move.",
        icon: "people",
    },
] as const;

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
    const shared = "size-5";

    if (icon === "home") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <path d="m3.5 10 8.5-7 8.5 7v10.5h-6v-6h-5v6h-6V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 10h.01M16 10h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        );
    }

    if (icon === "check") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <path d="M12 3 19 6v5.5c0 4.7-3 7.9-7 9.5-4-1.6-7-4.8-7-9.5V6l7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="m8.5 12 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (icon === "key") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <circle cx="8.5" cy="15.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m11.7 12.3 8.8-8.8m-3.3 3.3 2 2m-5-1 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
            <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3.5 20v-1.5A5.5 5.5 0 0 1 9 13h1m3.5 7v-1a4 4 0 0 1 4-4h1m-3-7.5a3 3 0 0 1 0 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function WhyChooseUs() {
    return (
        <section aria-labelledby="why-choose-us-title" className="bg-neutral-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-jade-700 md:tracking-[0.18em]">Why choose {BRAND_NAME}</p>
                        <h2 id="why-choose-us-title" className="max-w-2xl font-outfit text-3xl font-medium leading-tight tracking-normal text-ink md:tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]">
                            Your trusted partner for every real estate journey
                        </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-neutral-600 lg:justify-self-end lg:text-base">
                        Finding a home should feel clear and considered. We pair a thoughtful selection of properties with personal guidance, so you can make your next move with confidence.
                    </p>
                </div>

                <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
                    {benefits.map(({ number, title, description, icon }) => (
                        <article key={number} className="group flex min-h-[250px] flex-col border border-neutral-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(23,27,24,0.35)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_20px_36px_-24px_rgba(23,27,24,0.35)] sm:p-6">
                            <div className="flex items-start justify-between">
                                <span className="flex size-11 items-center justify-center rounded-md bg-jade-50 text-jade-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-700">
                                    <BenefitIcon icon={icon} />
                                </span>
                                <span className="font-outfit text-xs font-medium tracking-normal text-neutral-400 md:tracking-[0.08em]">{number}</span>
                            </div>
                            <h3 className="mt-7 font-outfit text-lg font-semibold tracking-normal text-ink md:tracking-[-0.015em]">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
