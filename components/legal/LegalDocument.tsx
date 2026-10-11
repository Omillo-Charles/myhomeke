import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/components/config/brand";

export type LegalSection = {
    title: string;
    paragraphs: string[];
};

type LegalDocumentProps = {
    title: string;
    subtitle: string;
    intro: string;
    lastUpdated: string;
    sections: LegalSection[];
    contactAfterSection: string;
};

function sectionId(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function LegalDocument({
    title,
    subtitle,
    intro,
    lastUpdated,
    sections,
    contactAfterSection,
}: LegalDocumentProps) {
    return (
        <article className="bg-[#F3F5FA] pb-12 sm:pb-16">
            <header className="relative isolate flex min-h-[300px] items-end overflow-hidden bg-navy-900 text-white sm:min-h-[360px] lg:min-h-[400px]">
                <Image
                    src="/images/samples/apartment.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="-z-20 object-cover object-[center_42%]"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/45" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-gold-200 md:tracking-[0.16em]">{BRAND_NAME} · Legal</p>
                        <h1 className="font-outfit text-4xl font-medium leading-tight tracking-normal text-white md:tracking-[-0.035em] sm:text-5xl lg:text-6xl">{title}</h1>
                        <p className="mt-3 text-sm text-white/85 sm:text-base">{subtitle}</p>
                        <p className="mt-5 text-xs text-white/65">Last updated: {lastUpdated}</p>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid w-full min-w-0 max-w-[1240px] gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center lg:gap-14 lg:px-10 lg:py-14">
                <aside className="h-fit min-w-0 max-w-full lg:sticky lg:top-28">
                    <nav aria-label={`${title} table of contents`} className="min-w-0 max-w-full overflow-hidden rounded-md border border-[#E1E5EF] bg-white p-4 shadow-[0_12px_35px_-30px_rgba(13,31,48,0.45)] sm:p-5">
                        <h2 className="mb-3 text-xs font-semibold text-navy-900">Table of contents</h2>
                        <ol className="flex min-w-0 max-w-full touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin] lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
                            {sections.map(({ title: sectionTitle }, index) => (
                                <li key={sectionTitle} className="shrink-0 lg:shrink">
                                    <a
                                        href={`#${sectionId(sectionTitle)}`}
                                        className={`block rounded px-3 py-2 text-xs transition-colors ${index === 0 ? "bg-navy-900 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-navy-900"}`}
                                    >
                                        <span className="mr-2 text-[10px] opacity-65">{String(index + 1).padStart(2, "0")}</span>
                                        {sectionTitle}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </aside>

                <div className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-[#E6E9F0] bg-white px-4 py-6 shadow-[0_18px_55px_-42px_rgba(13,31,48,0.4)] sm:px-8 sm:py-9 lg:px-10 lg:py-11">
                    <p className="break-words border-l-2 border-gold-500 pl-4 text-sm leading-7 text-neutral-700 sm:text-[15px]">{intro}</p>

                    <div className="mt-8 divide-y divide-[#E9ECF2]">
                        {sections.map(({ title: sectionTitle, paragraphs }, index) => (
                            <section key={sectionTitle} id={sectionId(sectionTitle)} className="scroll-mt-28 py-7 first:pt-0 last:pb-0">
                                <h2 className="flex min-w-0 items-start gap-3 font-outfit text-xl font-semibold tracking-normal text-navy-900 md:tracking-[-0.015em] sm:text-2xl">
                                    <span className="mt-1 shrink-0 text-xs font-medium tracking-normal text-gold-700 md:tracking-[0.08em]">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="min-w-0 break-words">{sectionTitle}</span>
                                </h2>
                                {paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mt-3 break-words text-sm leading-7 text-neutral-600 sm:text-[15px]">{paragraph}</p>
                                ))}
                                {sectionTitle === contactAfterSection && (
                                    <p className="mt-4 text-sm leading-7 text-neutral-600">
                                        <Link href="/contact" className="font-semibold text-jade-700 underline decoration-gold-500 underline-offset-4 transition-colors hover:text-jade-900">Contact {BRAND_NAME}</Link>
                                    </p>
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 rounded-sm bg-[#F3F5FA] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                            <h2 className="font-outfit text-base font-semibold text-navy-900">Still have questions?</h2>
                            <p className="mt-1 text-sm text-neutral-600">Our team is happy to help clarify anything in this document.</p>
                        </div>
                        <Link href="/contact" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-sm bg-jade-800 px-4 text-xs font-semibold text-white transition-colors hover:bg-jade-700">Contact us</Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
