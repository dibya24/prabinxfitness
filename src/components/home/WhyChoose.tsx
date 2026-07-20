"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CONTENT } from "@/src/constants/content";
import images from "@/src/constants/images";

const whychoose = CONTENT.whyChoose;

const leftFeatures = [
    {
        title: "KNOWLEDGE & EXPERIENCE",
        desc: "Train with proven methods focused on safe, effective, and sustainable progress.",
        top: "60%",
    },
    {
        title: "RESULTS THAT LAST",
        desc: "Build healthy habits that create long-term fitness and confidence, not quick fixes.",
        top: "87%",
    },
];

const rightFeatures = [
    {
        title: "GOAL-ORIENTED APPROACH",
        desc: "Every plan is designed to help you achieve real, measurable results.",
        top: "12%",
    },
    {
        title: "DEDICATED SUPPORT",
        desc: "Stay motivated with consistent guidance and accountability throughout your journey.",
        top: "39%",
    },
];

function stageProgress(
    progress: number,
    start: number,
    end: number
): number {
    if (progress <= start) return 0;
    if (progress >= end) return 1;
    return (progress - start) / (end - start);
}

export default function WhyChoose() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let ticking = false;

        const update = () => {
            ticking = false;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            if (total <= 0) return;

            const raw = -rect.top / total;
            const clamped = Math.min(1, Math.max(0, raw));
            setProgress(clamped);
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // 🔧 Image reveal removed — only LEFT and RIGHT now animate on scroll.
    // Progress windows widened slightly since we no longer need to
    // reserve 0 -> 0.3 for the image stage.
    const leftP = stageProgress(progress, 0, 0.5);
    const rightP = stageProgress(progress, 0.5, 1);

    return (
        <section className="bg-[#141414] py-20">
            <div className="mx-auto max-w-7xl px-6 flex flex-col gap-2">

                {/* ======== Heading (unchanged) ======== */}
                <div className="grid lg:grid-cols-2 gap-5 items-center">
                    <div className="relative">
                        <h2
                            className="absolute -top-5 left-0 text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-transparent"
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                fontFamily: "var(--font-oswald)",
                            }}
                        >
                            {whychoose.heading.backgroundTitle}
                        </h2>

                        <h3
                            data-aos="fade-up"
                            data-aos-delay="200"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="relative pt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                        >
                            {whychoose.heading.title}{" "}
                            <span className="text-[#E8A428]">
                                {whychoose.heading.highlightText}
                            </span>{" "}
                            <br />
                            {whychoose.heading.titleEnd}
                        </h3>
                    </div>

                    <div>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="text-sm sm:text-base text-[#C0C0C0] text-left lg:text-right leading-relaxed"
                        >
                            {whychoose.description}
                        </p>
                    </div>
                </div>

                {/* ======== MAIN WHY CHOOSE CONTENT ======== */}
                <div className="relative">

                    {/* ========= DESKTOP (scroll-pinned reveal, no libs) ========= */}
                    <div ref={scrollRef} className="hidden xl:block relative h-[300vh]">
                        <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">

                            {/* IMAGE — always visible, no scroll animation */}
                            <div className="relative w-[350px] h-[520px]">
                                <Image
                                    src={images.why}
                                    alt="Trainer"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* LEFT */}
                            <div
                                className="absolute left-0 bottom-35 w-[500px] h-full"
                                style={{
                                    opacity: leftP,
                                    transform: `translateX(${(1 - leftP) * -60}px)`,
                                }}
                            >
                                {leftFeatures.map((item, index) => (
                                    <div
                                        key={index}
                                        className="absolute w-full"
                                        style={{ top: item.top }}
                                    >
                                        <div className="flex items-center">
                                            <div className="text-right w-[300px]">
                                                <h4
                                                    style={{ fontFamily: "var(--font-oswald)" }}
                                                    className="uppercase text-[22px] text-[#F8F1DE]"
                                                >
                                                    {item.title}
                                                </h4>
                                                <p
                                                    style={{ fontFamily: "var(--font-poppins)" }}
                                                    className="text-[#A8A8A8] mt-2 text-[14px]"
                                                >
                                                    {item.desc}
                                                </p>
                                            </div>

                                            <div className="flex-1 h-[1px] bg-[#E8A428] relative ml-6">
                                                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#E8A428] border-[6px] border-[#fbdfaa]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT */}
                            <div
                                className="absolute right-0 top-20 w-[500px] h-full"
                                style={{
                                    opacity: rightP,
                                    transform: `translateX(${(1 - rightP) * 60}px)`,
                                }}
                            >
                                {rightFeatures.map((item, index) => (
                                    <div
                                        key={index}
                                        className="absolute w-full"
                                        style={{ top: item.top }}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-1 h-[1px] bg-[#E8A428] relative mr-6">
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#E8A428] border-[6px] border-[#fbdfaa]" />
                                            </div>

                                            <div className="w-[300px]">
                                                <h4
                                                    style={{ fontFamily: "var(--font-oswald)" }}
                                                    className="uppercase text-[22px] text-[#F8F1DE]"
                                                >
                                                    {item.title}
                                                </h4>
                                                <p
                                                    style={{ fontFamily: "var(--font-poppins)" }}
                                                    className="text-[#A8A8A8] mt-2 text-[14px]"
                                                >
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* ========= TABLET & MOBILE: stacked, no scroll-pin ========= */}
                    <div className="xl:hidden flex flex-col items-center gap-12">

                        {/* IMAGE */}
                        <div
                            data-aos="fade-up"
                            className="relative w-[260px] h-[380px] sm:w-[300px] sm:h-[440px]"
                        >
                            <Image
                                src={images.why}
                                alt="Trainer"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* LEFT FEATURES — stacked, left-aligned text on small screens */}
                        <div className="w-full flex flex-col gap-8">
                            {leftFeatures.map((item, index) => (
                                <div
                                    key={`left-${index}`}
                                    data-aos="fade-right"
                                    data-aos-delay={index * 100}
                                    className="flex items-center gap-4 sm:gap-6"
                                >
                                    <span className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E8A428] border-[4px] sm:border-[6px] border-[#fbdfaa]" />

                                    <div className="flex-1">
                                        <h4
                                            style={{ fontFamily: "var(--font-oswald)" }}
                                            className="uppercase text-lg sm:text-xl text-[#F8F1DE]"
                                        >
                                            {item.title}
                                        </h4>
                                        <p
                                            style={{ fontFamily: "var(--font-poppins)" }}
                                            className="text-[#A8A8A8] mt-1 text-sm"
                                        >
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT FEATURES — stacked underneath */}
                        <div className="w-full flex flex-col gap-8">
                            {rightFeatures.map((item, index) => (
                                <div
                                    key={`right-${index}`}
                                    data-aos="fade-left"
                                    data-aos-delay={index * 100}
                                    className="flex items-center gap-4 sm:gap-6"
                                >
                                    <span className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E8A428] border-[4px] sm:border-[6px] border-[#fbdfaa]" />

                                    <div className="flex-1">
                                        <h4
                                            style={{ fontFamily: "var(--font-oswald)" }}
                                            className="uppercase text-lg sm:text-xl text-[#F8F1DE]"
                                        >
                                            {item.title}
                                        </h4>
                                        <p
                                            style={{ fontFamily: "var(--font-poppins)" }}
                                            className="text-[#A8A8A8] mt-1 text-sm"
                                        >
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}