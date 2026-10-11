import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Jade Apartments",
    description: "Learn how Jade Apartments handles personal information when you use our website.",
};

const sections = [
    {
        title: "Information you provide",
        paragraphs: [
            "If you contact Jade Apartments or request information about a property, we may receive the details you choose to share, such as your name, email address, phone number, preferences, and the contents of your message.",
            "Please do not send sensitive personal information unless it is necessary for your request.",
        ],
    },
    {
        title: "How information is used",
        paragraphs: [
            "We use information you provide to respond to enquiries, help you explore property options, operate and improve the website, and protect the site and its users. We do not sell personal information.",
        ],
    },
    {
        title: "Cookies and similar technologies",
        paragraphs: [
            "The website may use essential technologies required for its operation. If analytics or other optional technologies are introduced, this policy should be updated to explain what they collect and how you can manage your choices.",
        ],
    },
    {
        title: "When information may be shared",
        paragraphs: [
            "Information may be shared with service providers who help operate the website or respond to your request, and where disclosure is required by law or reasonably necessary to protect rights, safety, and the integrity of our services. Service providers should only use information for the services they perform for us.",
        ],
    },
    {
        title: "Retention and security",
        paragraphs: [
            "We keep personal information only for as long as reasonably needed for the purposes described above, unless a longer period is required by law. We use reasonable safeguards, but no method of storage or transmission can be guaranteed completely secure.",
        ],
    },
    {
        title: "Your choices and rights",
        paragraphs: [
            "Depending on where you live, you may have rights to access, correct, delete, or restrict certain uses of your personal information. You may ask us about information you have provided or withdraw a request by contacting Jade Apartments through our contact page.",
        ],
    },
    {
        title: "Children’s privacy and external sites",
        paragraphs: [
            "This website is intended for a general audience and is not designed to collect information from children. Links to third-party websites are provided for convenience; their privacy practices are governed by their own policies.",
        ],
    },
    {
        title: "Changes and contact",
        paragraphs: [
            "We may update this policy as the website or our practices change. The latest revision date is shown below. For privacy questions, please use our contact page.",
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <article>
            <header className="bg-navy-900 px-5 pb-10 pt-32 text-white sm:px-8 sm:pb-12 sm:pt-36 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">Jade Apartments</p>
                    <h1 className="font-outfit text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Privacy Policy</h1>
                    <p className="mt-4 text-sm text-white/70">Last updated: October 11, 2026</p>
                </div>
            </header>

            <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:px-0">
                <p className="mb-8 text-base leading-7 text-neutral-700">
                    This policy explains how Jade Apartments may handle personal information when you visit this website or contact us. It is written for the website’s current informational use and should be updated if our services or data practices change.
                </p>
                <div className="divide-y divide-border">
                    {sections.map(({ title, paragraphs }) => (
                        <section key={title} className="py-6 first:pt-0 last:pb-0">
                            <h2 className="font-outfit text-xl font-semibold tracking-[-0.015em] text-ink">{title}</h2>
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-3 text-sm leading-7 text-neutral-700">{paragraph}</p>
                            ))}
                            {title === "Your choices and rights" && (
                                <p className="mt-3 text-sm leading-7 text-neutral-700">
                                    <a href="/contact" className="font-medium text-jade-700 underline decoration-gold-500 underline-offset-4 hover:text-jade-900">Contact Jade Apartments</a>
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
}
