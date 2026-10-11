import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Jade Apartments",
    description: "Read the terms that apply to your use of the Jade Apartments website.",
};

const sections = [
    {
        title: "Using this website",
        paragraphs: [
            "You may use this website to learn about Jade Apartments and explore property information for lawful, personal purposes. You agree not to interfere with the website, attempt unauthorized access, introduce malicious code, or use the site in a way that violates applicable law or another person’s rights.",
        ],
    },
    {
        title: "Property information",
        paragraphs: [
            "Property descriptions, images, prices, availability, and other details are provided for general information and may change or contain errors. Please confirm important details directly with Jade Apartments before making a decision.",
            "Website content is not an offer to sell, lease, or otherwise transact in a property. A transaction is only formed through separate written agreements executed by the relevant parties.",
        ],
    },
    {
        title: "Enquiries and communications",
        paragraphs: [
            "Submitting an enquiry does not guarantee a property reservation, viewing, or transaction. Please provide accurate information when contacting us. Any arrangements or agreements will be subject to their own terms.",
        ],
    },
    {
        title: "Intellectual property",
        paragraphs: [
            "Unless stated otherwise, the website’s text, visual design, branding, and other materials are owned by or used with permission by Jade Apartments. You may not reproduce or commercially use them without prior authorization, except where applicable law permits.",
        ],
    },
    {
        title: "Third-party links",
        paragraphs: [
            "This website may link to third-party websites or services. Jade Apartments does not control and is not responsible for their content, availability, or terms. You use third-party services at your own discretion.",
        ],
    },
    {
        title: "Disclaimer and liability",
        paragraphs: [
            "The website is provided on an “as available” basis. To the extent permitted by applicable law, Jade Apartments makes no guarantee that the website will always be uninterrupted, error-free, or suitable for every purpose.",
            "Nothing in these terms excludes liability or consumer rights that cannot legally be excluded. To the extent permitted by law, Jade Apartments is not responsible for indirect or consequential loss arising from use of, or inability to use, this website.",
        ],
    },
    {
        title: "Changes to these terms",
        paragraphs: [
            "We may update these terms when the website or our services change. Updates will be posted on this page with a revised date. Continued use of the website after an update means you accept the updated terms, subject to any rights that apply to you by law.",
        ],
    },
    {
        title: "Applicable law and contact",
        paragraphs: [
            "These terms are subject to the laws that apply where Jade Apartments operates, without limiting any non-waivable rights you may have. If you have a question about these terms, please contact us through our contact page.",
        ],
    },
];

export default function TermsOfServicePage() {
    return (
        <article>
            <header className="bg-navy-900 px-5 pb-10 pt-32 text-white sm:px-8 sm:pb-12 sm:pt-36 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">Jade Apartments</p>
                    <h1 className="font-outfit text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Terms of Service</h1>
                    <p className="mt-4 text-sm text-white/70">Last updated: October 11, 2026</p>
                </div>
            </header>

            <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:px-0">
                <p className="mb-8 text-base leading-7 text-neutral-700">
                    These terms apply to your access to and use of the Jade Apartments website. By using the website, you agree to these terms. If you do not agree, please do not use the website.
                </p>
                <div className="divide-y divide-border">
                    {sections.map(({ title, paragraphs }) => (
                        <section key={title} className="py-6 first:pt-0 last:pb-0">
                            <h2 className="font-outfit text-xl font-semibold tracking-[-0.015em] text-ink">{title}</h2>
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-3 text-sm leading-7 text-neutral-700">{paragraph}</p>
                            ))}
                            {title === "Applicable law and contact" && (
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
