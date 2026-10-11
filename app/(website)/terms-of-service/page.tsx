import type { Metadata } from "next";
import { BRAND_NAME } from "@/components/config/brand";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
    title: `Terms of Service | ${BRAND_NAME}`,
    description: `Read the terms that apply to your use of the ${BRAND_NAME} website.`,
};

const sections = [
    {
        title: "Using this website",
        paragraphs: [
            `You may use this website to learn about ${BRAND_NAME} and explore property information for lawful, personal purposes. You agree not to interfere with the website, attempt unauthorized access, introduce malicious code, or use the site in a way that violates applicable law or another person’s rights.`,
        ],
    },
    {
        title: "Property information",
        paragraphs: [
            `Property descriptions, images, prices, availability, and other details are provided for general information and may change or contain errors. Please confirm important details directly with ${BRAND_NAME} before making a decision.`,
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
            `Unless stated otherwise, the website’s text, visual design, branding, and other materials are owned by or used with permission by ${BRAND_NAME}. You may not reproduce or commercially use them without prior authorization, except where applicable law permits.`,
        ],
    },
    {
        title: "Third-party links",
        paragraphs: [
            `This website may link to third-party websites or services. ${BRAND_NAME} does not control and is not responsible for their content, availability, or terms. You use third-party services at your own discretion.`,
        ],
    },
    {
        title: "Disclaimer and liability",
        paragraphs: [
            `The website is provided on an “as available” basis. To the extent permitted by applicable law, ${BRAND_NAME} makes no guarantee that the website will always be uninterrupted, error-free, or suitable for every purpose.`,
            `Nothing in these terms excludes liability or consumer rights that cannot legally be excluded. To the extent permitted by law, ${BRAND_NAME} is not responsible for indirect or consequential loss arising from use of, or inability to use, this website.`,
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
            `These terms are subject to the laws that apply where ${BRAND_NAME} operates, without limiting any non-waivable rights you may have. If you have a question about these terms, please contact us through our contact page.`,
        ],
    },
];

export default function TermsOfServicePage() {
    return (
        <LegalDocument
            title="Terms of Service"
            subtitle="Understanding your rights and responsibilities."
            intro={`These terms apply to your access to and use of the ${BRAND_NAME} website. By using the website, you agree to these terms. If you do not agree, please do not use the website.`}
            lastUpdated="October 12, 2026"
            sections={sections}
            contactAfterSection="Applicable law and contact"
        />
    );
}
