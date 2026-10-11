import type { Metadata } from "next";
import Image from "next/image";
import { BRAND_NAME } from "@/components/config/brand";
import { SocialIcon } from "@/components/ui/Footer";

export const metadata: Metadata = {
    title: `Contact | ${BRAND_NAME}`,
    description: `Get in touch with ${BRAND_NAME} for help finding your next home.`,
};

function ContactIcon({ kind }: { kind: "office" | "email" | "phone" | "hours" }) {
    const shared = "size-5";

    if (kind === "office") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        );
    }

    if (kind === "email") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        );
    }

    if (kind === "phone") {
        return (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
                <path d="m7.2 3.5 3 3.6-1.8 2.2a15 15 0 0 0 6.3 6.3l2.2-1.8 3.6 3-.9 3a2 2 0 0 1-2.2 1.4C9.6 20 4 14.4 2.8 6.6a2 2 0 0 1 1.4-2.2l3-.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={shared}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const contactDetails: {
    title: string;
    lines: string[];
    kind: "office" | "email" | "phone" | "hours";
    href?: string;
}[] = [
    { title: "Our office", lines: ["Nairobi, Kenya", "Serving homes across Kenya"], kind: "office" },
    { title: "Email us", lines: ["contact@myhome.ke", "We’ll get back to you soon"], kind: "email", href: "mailto:contact@myhome.ke" },
    { title: "Call us", lines: ["+254 700 000 000", "Mon–Sat, 8:00 am–6:00 pm"], kind: "phone", href: "tel:+254700000000" },
    { title: "Office hours", lines: ["Monday–Saturday", "Sunday by appointment"], kind: "hours" },
] as const;

export default function ContactPage() {
    return (
        <>
            <section aria-labelledby="contact-title" className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-navy-900 sm:min-h-[350px]">
                <Image
                    src="/images/samples/apartment.png"
                    alt="Contemporary apartment building"
                    fill
                    priority
                    sizes="100vw"
                    className="-z-20 object-cover object-[center_42%]"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/90 via-navy-900/75 to-navy-900/45" />
                <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-14">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-gold-200 md:tracking-[0.16em]">We’re here to help</p>
                    <h1 id="contact-title" className="font-outfit text-4xl font-medium leading-tight tracking-normal text-white md:tracking-[-0.035em] sm:text-5xl">Contact us</h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                        Start a conversation with {BRAND_NAME}. We’d love to help you find your next home.
                    </p>
                </div>
            </section>

            <section aria-labelledby="contact-form-title" className="bg-neutral-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-16">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-jade-700 md:tracking-[0.15em]">Get in touch</p>
                        <h2 className="font-outfit text-3xl font-medium leading-tight tracking-normal text-ink md:tracking-[-0.03em] sm:text-4xl">
                            Seamless communication, <span className="text-jade-800">personal guidance.</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                            Whether you’re looking for a home, have a question about a listing, or simply want to talk through your options, send us a message and our team will be glad to help.
                        </p>

                        <div className="mt-8 grid border-y border-neutral-200 sm:grid-cols-2">
                            {contactDetails.map(({ title, lines, kind, href }) => {
                                const content = (
                                    <>
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-gold-400 text-ink">
                                            <ContactIcon kind={kind} />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold text-ink">{title}</span>
                                            {lines.map((line) => (
                                                <span key={line} className="mt-1 block break-words text-xs leading-5 text-neutral-600">{line}</span>
                                            ))}
                                        </span>
                                    </>
                                );

                                return href ? (
                                    <a key={title} href={href} className="flex min-w-0 items-start gap-3 border-b border-neutral-200 py-4 transition-colors hover:bg-white/70 sm:px-2">
                                        {content}
                                    </a>
                                ) : (
                                    <div key={title} className="flex min-w-0 items-start gap-3 border-b border-neutral-200 py-4 sm:px-2">
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-7">
                            <h3 className="text-sm font-semibold text-ink">Follow our social channels</h3>
                            <p className="mt-1 text-xs leading-5 text-neutral-600">Keep up with new homes and updates from {BRAND_NAME}.</p>
                            <div className="mt-3 flex items-center gap-2">
                                {([
                                    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
                                    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
                                    { label: "X", href: "https://x.com/", icon: "x" },
                                    { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
                                ] as const).map(({ label, href, icon }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${BRAND_NAME} on ${label}`} className="flex size-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-gold-500 hover:bg-gold-50 hover:text-jade-800">
                                        <SocialIcon icon={icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full min-w-0 max-w-full overflow-hidden border border-neutral-200 bg-white p-4 shadow-[0_18px_50px_-35px_rgba(23,27,24,0.45)] sm:p-7 lg:p-8">
                        <h2 id="contact-form-title" className="font-outfit text-2xl font-semibold tracking-normal text-ink md:tracking-[-0.02em] sm:text-3xl">Send us a message</h2>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">Tell us a little about what you’re looking for and we’ll be in touch.</p>

                        <form className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-medium text-neutral-700">Name</span>
                                    <input type="text" name="name" autoComplete="name" placeholder="Your name" required className="h-11 w-full rounded-sm border border-neutral-300 bg-white px-3 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15" />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-medium text-neutral-700">Email</span>
                                    <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required className="h-11 w-full rounded-sm border border-neutral-300 bg-white px-3 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15" />
                                </label>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-medium text-neutral-700">Phone <span className="font-normal text-neutral-500">(optional)</span></span>
                                    <input type="tel" name="phone" autoComplete="tel" placeholder="+254" className="h-11 w-full rounded-sm border border-neutral-300 bg-white px-3 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15" />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-medium text-neutral-700">Subject</span>
                                    <input type="text" name="subject" placeholder="How can we help?" required className="h-11 w-full rounded-sm border border-neutral-300 bg-white px-3 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="mb-1.5 block text-xs font-medium text-neutral-700">Message</span>
                                <textarea name="message" rows={5} placeholder="Write your message here..." required className="w-full resize-y rounded-sm border border-neutral-300 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15" />
                            </label>
                            <button type="button" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-gold-400 px-5 text-xs font-semibold uppercase tracking-normal text-ink transition-colors hover:bg-gold-300 md:tracking-[0.08em]">
                                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="m3 4 14-1-5 14-3-6-6-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="m9 11 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                                Send message
                            </button>
                            <p className="text-center text-[11px] leading-5 text-neutral-500">Your details are used only to respond to your enquiry. See our <a href="/privacy-policy" className="underline underline-offset-2 hover:text-jade-700">Privacy Policy</a>.</p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
