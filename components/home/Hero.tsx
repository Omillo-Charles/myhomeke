import Image from "next/image";

function SearchIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[18px]">
            <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.7" />
            <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0 text-neutral-500">
            <path d="m5.5 7.5 4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Hero() {
    return (
        <section id="home" aria-labelledby="hero-title" className="relative isolate -mt-[76px] flex min-h-[760px] flex-col justify-center overflow-hidden bg-navy-900 pb-10 pt-28 text-white sm:min-h-[790px] sm:pt-32 lg:-mt-[88px] lg:min-h-[min(900px,100svh)] lg:pb-16 lg:pt-36">
            <Image
                src="/images/herobanner.png"
                alt="A contemporary villa with a landscaped garden and swimming pool at dusk"
                fill
                priority
                sizes="100vw"
                className="-z-20 object-cover object-[58%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,18,18,0.82)_0%,rgba(8,18,18,0.61)_43%,rgba(8,18,18,0.15)_100%)]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/35 to-transparent" />

            <div className="mx-auto w-full max-w-[1440px] px-5 pb-40 sm:px-8 sm:pb-44 lg:px-14 lg:pb-48">
                <div className="max-w-[700px]">
                    <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase text-gold-200 sm:text-xs">
                        <span className="h-px w-8 bg-gold-300" />
                        Find a home with ease!
                    </p>
                    <h1 id="hero-title" className="max-w-[680px] font-outfit text-[clamp(2.9rem,7vw,5.8rem)] font-medium leading-[0.99] tracking-normal text-white [text-wrap:balance] md:tracking-[-0.04em]">
                        A home that feels like <span className="text-gold-200">yours.</span>
                    </h1>
                    <p className="mt-6 max-w-[540px] text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
                        Discover considered homes and apartments, with the trusted local guidance to make your next move feel effortless.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a href="/properties" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-gold-400 px-6 text-sm font-semibold text-ink shadow-lg shadow-black/15 transition-colors hover:bg-gold-300">
                            Explore properties
                            <span aria-hidden="true" className="text-lg leading-none">↗</span>
                        </a>
                        <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/50 px-6 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10">
                            Talk to our team
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-5 bottom-5 z-10 mx-auto max-w-[1190px] sm:inset-x-8 lg:bottom-7 lg:inset-x-14">
                <div aria-label="Property search filters" role="region" tabIndex={0} className="overflow-x-auto overscroll-x-contain rounded-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="min-w-[820px] rounded-md border border-white/70 bg-white p-2 text-ink shadow-[0_24px_70px_-28px_rgba(0,0,0,0.45)] sm:p-3 lg:min-w-0 lg:p-4">
                        <div className="grid grid-cols-[minmax(200px,1.2fr)_minmax(190px,1fr)_minmax(190px,1fr)_auto] items-center gap-0">
                            <label className="flex min-h-[58px] flex-col justify-center px-3 sm:px-5">
                                <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-normal text-neutral-700 md:tracking-[0.08em]">Location</span>
                                <input aria-label="Preferred location" type="text" placeholder="Where would you like to live?" className="min-w-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-neutral-400" />
                            </label>
                            <label className="flex min-h-[58px] flex-col justify-center border-l border-border px-3 sm:px-5">
                                <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-normal text-neutral-700 md:tracking-[0.08em]">Property type</span>
                                <span className="flex items-center justify-between gap-3">
                                    <select aria-label="Property type" defaultValue="" className="w-full appearance-none bg-transparent text-[13px] text-neutral-600 outline-none">
                                        <option value="" disabled>Any property type</option>
                                        <option>Apartment</option>
                                        <option>House</option>
                                        <option>Villa</option>
                                    </select>
                                    <ChevronIcon />
                                </span>
                            </label>
                            <label className="flex min-h-[58px] flex-col justify-center border-l border-border px-3 sm:px-5">
                                <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-normal text-neutral-700 md:tracking-[0.08em]">Budget</span>
                                <span className="flex items-center justify-between gap-3">
                                    <select aria-label="Budget range" defaultValue="" className="w-full appearance-none bg-transparent text-[13px] text-neutral-600 outline-none">
                                        <option value="" disabled>Select your budget</option>
                                        <option>Under KSh 50,000 / month</option>
                                        <option>KSh 50,000 – 150,000 / month</option>
                                        <option>Over KSh 150,000 / month</option>
                                    </select>
                                    <ChevronIcon />
                                </span>
                            </label>
                            <a href="/properties" className="ml-3 inline-flex min-h-[52px] min-w-[160px] items-center justify-center gap-2 rounded-sm bg-jade-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-jade-700 lg:ml-4 lg:min-w-[185px]">
                                <SearchIcon />
                                Search homes
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
