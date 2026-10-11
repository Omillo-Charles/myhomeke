import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, BRAND_WORDMARK } from "@/components/config/brand";

const footerGroups = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "#home" },
            { label: "Find a property", href: "/properties" },
            { label: `About ${BRAND_NAME}`, href: "/about" },
        ],
    },
    {
        title: "For residents",
        links: [
            { label: "Browse homes", href: "/properties" },
            { label: "Sign in", href: "/auth" },
            { label: "Get in touch", href: "/contact" },
        ],
    },
];

const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "X", href: "https://x.com/", icon: "x" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
] as const;

export function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
    if (icon === "facebook") {
        return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-[18px]"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4Z" /></svg>;
    }
    if (icon === "x") {
        return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-[17px]"><path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.5 21H3.4l7.3-8.4L2.8 3h6.5l4.5 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z" /></svg>;
    }
    if (icon === "instagram") {
        return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[18px]"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.7" cy="6.6" r="1" fill="currentColor" /></svg>;
    }
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-[18px]"><path d="M19.6 8.2a7.1 7.1 0 0 1-4.2-1.4v7.1a5.6 5.6 0 1 1-4.8-5.5v3a2.7 2.7 0 1 0 1.9 2.6V2.8h3a4.2 4.2 0 0 0 4.1 3.7v1.7Z" /></svg>;
}

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white">
            <section aria-labelledby="footer-cta-title" className="relative isolate overflow-hidden">
                <Image
                    src="/images/footerimage.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="-z-20 object-cover object-center"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/65" />
                <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
                    <div className="max-w-xl">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-normal text-gold-300 md:tracking-[0.18em]">Your next chapter starts here</p>
                        <h2 id="footer-cta-title" className="font-outfit text-2xl font-medium tracking-normal text-white md:tracking-[-0.02em] sm:text-3xl">
                            Ready to find a place to call home?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-white/75">Explore considered homes and find the right fit for the way you live.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <a href="/properties" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-gold-400 px-5 text-sm font-semibold text-ink transition-colors hover:bg-gold-300">
                            Explore homes <span aria-hidden="true">↗</span>
                        </a>
                        <a href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/45 px-5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10">
                            Talk to our team
                        </a>
                    </div>
                </div>
            </section>

            <div className="border-t border-white/10">
                <div className="mx-auto grid max-w-[1440px] gap-9 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:px-14 lg:py-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${BRAND_NAME} home`}>
                            <Image src="/logoassets/jadelogo.png" alt="" width={64} height={64} className="size-11 object-contain" />
                            <span className="flex flex-col leading-none">
                                <span className="font-outfit text-lg font-semibold tracking-normal md:tracking-[0.01em]">{BRAND_WORDMARK.primary}</span>
                                <span className="mt-1 text-[9px] font-medium uppercase tracking-normal text-white/65 md:tracking-[0.18em]">{BRAND_WORDMARK.secondary}</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
                            Thoughtfully selected homes, with local guidance to make your next move feel effortless.
                        </p>
                        <nav aria-label={`Follow ${BRAND_NAME}`} className="mt-5 flex items-center gap-2">
                            {socialLinks.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${BRAND_NAME} on ${label}`}
                                    className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold-300 hover:bg-white/10 hover:text-gold-200"
                                >
                                    <SocialIcon icon={icon} />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {footerGroups.map(({ title, links }) => (
                        <nav key={title} aria-label={title}>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-normal text-gold-300 md:tracking-[0.12em]">{title}</h3>
                            <ul className="space-y-3">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <a href={href} className="text-sm text-white/70 transition-colors hover:text-white">{label}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-normal text-gold-300 md:tracking-[0.12em]">Get in touch</h3>
                        <p className="max-w-xs text-sm leading-6 text-white/70">Questions about finding your next home? Our team is ready to help.</p>
                        <a href="/contact" className="mt-3 inline-flex text-sm font-medium text-white underline decoration-gold-400 underline-offset-4 transition-colors hover:text-gold-200">Contact {BRAND_NAME}</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
                    <p>© 2026 {BRAND_NAME}. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <a href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</a>
                        <a href="/terms-of-service" className="transition-colors hover:text-white">Terms of Service</a>
                        <p>
                            Built &amp; Maintained by{" "}
                            <a href="https://omytechkenya.co.ke" target="_blank" rel="noopener noreferrer" className="font-medium text-white/75 transition-colors hover:text-gold-300">OMYT3CH</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
