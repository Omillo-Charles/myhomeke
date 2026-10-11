"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const transparentClasses = ["border-white/15", "bg-black/10", "backdrop-blur-[2px]"];
const scrolledClasses = ["border-white/10", "bg-navy-900/95", "shadow-lg", "shadow-black/10", "backdrop-blur-md"];

export default function NavbarScrollEffect() {
    const pathname = usePathname();

    useEffect(() => {
        const navbar = document.getElementById("site-navbar");
        if (!navbar) return;

        const applyNavbarStyle = (scrolled: boolean) => {
            navbar.classList.remove(...transparentClasses, ...scrolledClasses);
            navbar.classList.add(...(scrolled ? scrolledClasses : transparentClasses));
        };

        if (pathname !== "/") {
            applyNavbarStyle(true);
            return;
        }

        const updateNavbar = () => applyNavbarStyle(window.scrollY > 16);
        updateNavbar();
        window.addEventListener("scroll", updateNavbar, { passive: true });
        return () => window.removeEventListener("scroll", updateNavbar);
    }, [pathname]);

    return null;
}
