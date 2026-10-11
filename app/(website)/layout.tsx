import type { ReactNode } from "react";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
        </>
    );
}
