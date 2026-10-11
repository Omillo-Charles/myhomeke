import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AuthShowcase from "@/components/auth/AuthShowcase";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
    title: "Your Account | Jade Apartments",
    description: "Sign in or create your Jade Apartments account.",
};

export default function AuthPage() {
    return (
        <main className="grid min-h-svh bg-neutral-50 lg:grid-cols-2">
            <section aria-label="Jade Apartments welcome" className="relative isolate flex min-h-[310px] flex-col justify-between overflow-hidden bg-navy-900 px-6 py-6 text-white sm:min-h-[390px] sm:px-10 sm:py-8 lg:min-h-svh lg:px-12 lg:py-10 xl:px-16">
                <Image
                    src="/images/authimage.png"
                    alt="A contemporary home warmly lit at dusk"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="-z-20 object-cover object-center"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 via-navy-900/10 to-navy-900/90" />

                <Link href="/" className="inline-flex w-fit items-center gap-2.5" aria-label="Jade Apartments home">
                    <Image src="/logoassets/jadelogo.png" alt="" width={56} height={56} priority className="size-11 object-contain" />
                    <span className="flex flex-col leading-none">
                        <span className="font-outfit text-lg font-semibold tracking-normal md:tracking-[0.01em]">Jade</span>
                        <span className="mt-1 text-[9px] font-medium uppercase tracking-normal text-white/80 md:tracking-[0.18em]">Apartments</span>
                    </span>
                </Link>

                <AuthShowcase />
            </section>

            <section aria-labelledby="auth-form-title" className="relative flex min-h-[590px] items-center justify-center px-5 py-10 sm:px-10 sm:py-14 lg:min-h-svh lg:px-12 lg:py-16">
                <Link href="/" className="absolute right-5 top-5 inline-flex min-h-9 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-700 transition-colors hover:border-gold-400 hover:text-ink sm:right-8 sm:top-8">
                    Back to home
                </Link>
                <AuthForm />
            </section>
        </main>
    );
}
