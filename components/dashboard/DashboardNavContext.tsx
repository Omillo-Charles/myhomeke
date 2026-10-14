"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface DashboardNavContextType {
    isMobileNavOpen: boolean;
    openMobileNav: () => void;
    closeMobileNav: () => void;
    toggleMobileNav: () => void;
}

const DashboardNavContext = createContext<DashboardNavContextType>({
    isMobileNavOpen: false,
    openMobileNav: () => {},
    closeMobileNav: () => {},
    toggleMobileNav: () => {},
});

export function DashboardNavProvider({ children }: { children: ReactNode }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const pathname = usePathname();

    // Auto-close mobile navigation when route changes
    // Auto-close navigation on route change removed to avoid setState in effect

    // Prevent body scroll when mobile navigation is open
    useEffect(() => {
        if (isMobileNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileNavOpen]);

    return (
        <DashboardNavContext.Provider
            value={{
                isMobileNavOpen,
                openMobileNav: () => setIsMobileNavOpen(true),
                closeMobileNav: () => setIsMobileNavOpen(false),
                toggleMobileNav: () => setIsMobileNavOpen((prev) => !prev),
            }}
        >
            {children}
        </DashboardNavContext.Provider>
    );
}

export function useDashboardNav() {
    return useContext(DashboardNavContext);
}

