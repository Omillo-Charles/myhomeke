import Image from "next/image";

const properties = [
    {
        name: "The Willow Bungalow",
        location: "Karen, Nairobi",
        image: "/images/samples/bungalow.png",
        imageAlt: "Warm, contemporary bungalow set among landscaped greenery",
        type: "Bungalow",
        offer: "For rent",
        price: "KSh 180,000",
        period: "/ month",
        beds: "3 beds",
        baths: "2 baths",
        area: "220 m²",
    },
    {
        name: "Azure Heights Apartment",
        location: "Kilimani, Nairobi",
        image: "/images/samples/apartment.png",
        imageAlt: "Modern apartment building with spacious balconies",
        type: "Apartment",
        offer: "For sale",
        price: "KSh 18.5M",
        period: "",
        beds: "2 beds",
        baths: "2 baths",
        area: "118 m²",
    },
    {
        name: "The Grandview Estate",
        location: "Runda, Nairobi",
        image: "/images/samples/mansion.png",
        imageAlt: "Elegant multi-storey residence with a broad front porch",
        type: "Family home",
        offer: "For sale",
        price: "KSh 68M",
        period: "",
        beds: "5 beds",
        baths: "4 baths",
        area: "460 m²",
    },
    {
        name: "Skyline Penthouse",
        location: "Westlands, Nairobi",
        image: "/images/samples/penthouse.png",
        imageAlt: "Bright contemporary penthouse interior with expansive windows",
        type: "Penthouse",
        offer: "For rent",
        price: "KSh 320,000",
        period: "/ month",
        beds: "3 beds",
        baths: "3 baths",
        area: "205 m²",
    },
] as const;

function BedIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M3 15.5v-8m0 5h14v3m0-5V9a2 2 0 0 0-2-2h-4v5m-8 0h8M3 17v-1.5m14 1.5v-1.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function BathIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M3 10h14v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2Zm2 0V5a2 2 0 0 1 4 0v1m-5 12-1-2m12 2 1-2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function AreaIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4M3 3l5 5m9-5-5 5m5 9-5-5m-9 5 5-5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function FeaturedProperties() {
    return (
        <section aria-labelledby="featured-properties-title" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24">
            <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-jade-700">A place to call your own</p>
                        <h2 id="featured-properties-title" className="font-outfit text-3xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
                            Featured properties
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
                            A few homes worth a closer look, thoughtfully selected for your next chapter.
                        </p>
                    </div>
                    <a href="/properties" className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-sm border border-jade-800 px-5 text-sm font-semibold text-jade-800 transition-colors hover:bg-jade-800 hover:text-white">
                        View all properties <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-11 lg:grid-cols-4 lg:gap-6">
                    {properties.map((property) => (
                        <article key={property.name} className="group overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-[0_10px_30px_-25px_rgba(23,27,24,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_42px_-28px_rgba(23,27,24,0.45)]">
                            <a href="/properties" aria-label={`View ${property.name}`} className="relative block aspect-[4/3] overflow-hidden bg-neutral-100">
                                <Image
                                    src={property.image}
                                    alt={property.imageAlt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                />
                                <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-jade-800 shadow-sm">
                                    {property.offer}
                                </span>
                                <span className="absolute bottom-3 right-3 rounded-sm bg-navy-900/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                                    {property.type}
                                </span>
                            </a>

                            <div className="p-4 sm:p-5">
                                <p className="text-xs font-medium text-neutral-500">{property.location}</p>
                                <h3 className="mt-1.5 font-outfit text-lg font-semibold tracking-[-0.015em] text-ink">
                                    <a href="/properties" className="transition-colors hover:text-jade-700">{property.name}</a>
                                </h3>
                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-200 pb-4 text-xs text-neutral-600">
                                    <span className="inline-flex items-center gap-1.5"><BedIcon />{property.beds}</span>
                                    <span className="inline-flex items-center gap-1.5"><BathIcon />{property.baths}</span>
                                    <span className="inline-flex items-center gap-1.5"><AreaIcon />{property.area}</span>
                                </div>
                                <p className="mt-4 font-outfit text-lg font-semibold text-jade-800">
                                    {property.price}{property.period && <span className="ml-1 text-xs font-normal text-neutral-500">{property.period}</span>}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
