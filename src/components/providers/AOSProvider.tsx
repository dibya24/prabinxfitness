"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const initAOS = () => {
            AOS.init({
                duration: 1000,
                once: true,
                easing: "ease-out-cubic",
                offset: 80,
            });
        };

        // If preloader is already finished, initialize AOS immediately
        if (typeof window !== "undefined" && window.__preloaderFinished) {
            initAOS();
            return;
        }

        // Wait for preloader to dispatch the finish event
        const handlePreloaderFinished = () => {
            initAOS();
        };

        window.addEventListener("preloaderFinished", handlePreloaderFinished);
        return () => {
            window.removeEventListener("preloaderFinished", handlePreloaderFinished);
        };
    }, []);

    return children;
}