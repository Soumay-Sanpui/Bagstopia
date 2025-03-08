"use client";
import Navbar from "@/app/(components)/Navbar";
import Footer from "@/app/(components)/Footer";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function Layout({ children }) {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
