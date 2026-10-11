"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarScrollEffect from "@/components/ui/NavbarScrollEffect";

const navigation = [
    { label: "Home", href: "/", route: "/" },
    { label: "About us", href: "/about", route: "/about" },
    { label: "Properties", href: "/properties", route: "/properties" },
    { label: "Contact", href: "/contact", route: "/contact" },
];

function isActiveRoute(pathname: string, route: string) {
    return route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`);
}

function MenuIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ProfileIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
            <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 19a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function AccountLink() {
    return (
        <Link
            href="/auth"
            aria-label="Sign in or create an account"
            title="Sign in or create an account"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-300/80 text-white transition-colors hover:bg-gold-500 hover:text-ink"
        >
            <ProfileIcon />
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header id="site-navbar" className="sticky top-0 z-30 border-b border-white/15 bg-black/10 text-white backdrop-blur-[2px] transition-[background-color,border-color,box-shadow] duration-300">
            <NavbarScrollEffect />
            <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-14">
                <Link href="/" className="group flex shrink-0 items-center gap-1.5" aria-label="Jade Apartments home">
                    <Image
                        src="/logoassets/jadelogo.png"
                        alt=""
                        width={64}
                        height={64}
                        priority
                        className="size-10 object-contain transition-transform group-hover:scale-105 sm:size-12"
                    />
                    <span className="flex flex-col leading-none">
                        <span className="font-outfit text-[17px] font-semibold tracking-normal md:tracking-[0.01em] sm:text-[19px]">Jade</span>
                        <span className="mt-1 text-[9px] font-medium uppercase tracking-normal text-white/75 md:tracking-[0.18em] sm:text-[10px]">Apartments</span>
                    </span>
                </Link>

                <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex lg:gap-4">
                    {navigation.map(({ label, href, route }) => {
                        const current = isActiveRoute(pathname, route);

                        return (
                            <Link
                                key={label}
                                href={href}
                                aria-current={current ? "page" : undefined}
                                className={`rounded-sm px-4 py-2 text-[13px] font-medium transition-colors ${current
                                    ? "bg-white text-ink shadow-sm"
                                    : "text-white/90 hover:bg-white/15 hover:text-white"
                                    }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <AccountLink />
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    <AccountLink />
                    <details className="group relative">
                        <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/35 bg-black/10 transition-colors hover:bg-white/15 [&::-webkit-details-marker]:hidden">
                            <span className="sr-only">Open navigation menu</span>
                            <MenuIcon />
                        </summary>
                        <nav aria-label="Mobile navigation" className="absolute right-0 top-12 flex w-52 flex-col gap-1 rounded-md border border-white/15 bg-navy-900/95 p-2 shadow-xl backdrop-blur-lg">
                            {navigation.map(({ label, href, route }) => {
                                const current = isActiveRoute(pathname, route);

                                return (
                                    <Link
                                        key={label}
                                        href={href}
                                        aria-current={current ? "page" : undefined}
                                        className={`rounded px-3 py-2.5 text-sm transition-colors ${current ? "bg-white text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </details>
                </div>
            </div>
        </header>
    );
}
