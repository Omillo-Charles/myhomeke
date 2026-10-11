"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
    { label: "Home", href: "#home", current: true },
    { label: "About us", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
];

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
        <a
            href="/auth"
            aria-label="Sign in or create an account"
            title="Sign in or create an account"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-300/80 text-white transition-colors hover:bg-gold-500 hover:text-ink"
        >
            <ProfileIcon />
        </a>
    );
}

export default function Navbar() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const updateScrollState = () => setHasScrolled(window.scrollY > 16);

        updateScrollState();
        window.addEventListener("scroll", updateScrollState, { passive: true });
        return () => window.removeEventListener("scroll", updateScrollState);
    }, []);

    return (
        <header className={`sticky top-0 z-30 border-b text-white transition-[background-color,border-color,box-shadow] duration-300 ${hasScrolled
            ? "border-white/10 bg-navy-900/95 shadow-lg shadow-black/10 backdrop-blur-md"
            : "border-white/15 bg-black/10 backdrop-blur-[2px]"
            }`}>
            <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-14">
                <a href="#home" className="group flex shrink-0 items-center gap-1.5" aria-label="Jade Apartments home">
                    <Image
                        src="/logoassets/jadelogo.png"
                        alt=""
                        width={64}
                        height={64}
                        priority
                        className="size-10 object-contain transition-transform group-hover:scale-105 sm:size-12"
                    />
                    <span className="flex flex-col leading-none">
                        <span className="font-outfit text-[17px] font-semibold tracking-[0.01em] sm:text-[19px]">Jade</span>
                        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-[10px]">Apartments</span>
                    </span>
                </a>

                <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex lg:gap-4">
                    {navigation.map(({ label, href, current }) => (
                        <a
                            key={label}
                            href={href}
                            aria-current={current ? "page" : undefined}
                            className={`rounded-sm px-4 py-2 text-[13px] font-medium transition-colors ${current
                                ? "bg-white text-ink shadow-sm"
                                : "text-white/90 hover:bg-white/15 hover:text-white"
                                }`}
                        >
                            {label}
                        </a>
                    ))}
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
                            {navigation.map(({ label, href, current }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-current={current ? "page" : undefined}
                                    className={`rounded px-3 py-2.5 text-sm transition-colors ${current ? "bg-white text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"}`}
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </details>
                </div>
            </div>
        </header>
    );
}
