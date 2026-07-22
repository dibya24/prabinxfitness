"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    useEffect(() => {
        const isSystemRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/login");
        if (isSystemRoute) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };

    }, [pathname]);

    return children;
}