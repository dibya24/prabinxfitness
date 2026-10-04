"use client";

import React, { useState, useMemo } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Lightbulb,
    Sparkles,
    ArrowUpRight,
    Dumbbell,
    SlidersHorizontal,
    Activity,
    Apple,
    Moon,
    Flame
} from "lucide-react";
import { CONTENT } from "@/src/constants/content";

type MistakeItem = {
    id: string;
    tag?: string | null;
    title: string;
    description: string | null;
    solution?: string | null;
    coachTip?: string | null;
    order?: number;
};

type MistakeSectionData = {
    id?: string;
    backgroundTitle?: string | null;
    title?: string | null;
    highlightText?: string | null;
    titleEnd?: string | null;
    description?: string | null;
    ctaText?: string | null;
    ctaButtonText?: string | null;
    ctaButtonLink?: string | null;
    isActive?: boolean;
    mistakes?: MistakeItem[];
};

type MistakeProps = {
    sectionData?: MistakeSectionData | null;
};

const tagIcons: Record<string, React.ElementType> = {
    "FORM & TECHNIQUE": Dumbbell,
    "PROGRAMMING": SlidersHorizontal,
    "NUTRITION": Apple,
    "RECOVERY": Moon,
    "MINDSET": Flame,
    "EXERCISE BALANCE": Activity,
};

export default function Mistake({ sectionData }: MistakeProps) {
    // If explicitly deactivated in CMS, do not render
    if (sectionData && sectionData.isActive === false) {
        return null;
    }

    const heading = {
        backgroundTitle:
            sectionData?.backgroundTitle ||
            CONTENT.mistakes.heading.backgroundTitle,
        title: sectionData?.title || CONTENT.mistakes.heading.title,
        highlightText:
            sectionData?.highlightText ||
            CONTENT.mistakes.heading.highlightText,
        titleEnd:
            sectionData?.titleEnd || CONTENT.mistakes.heading.titleEnd,
    };

    const sectionDescription =
        sectionData?.description || CONTENT.mistakes.description;

    const rawMistakes: MistakeItem[] =
        sectionData?.mistakes && sectionData.mistakes.length > 0
            ? sectionData.mistakes.map((m, idx) => ({
                id: m.id || String(idx + 1),
                tag: m.tag || CONTENT.mistakes.items[idx]?.tag || "FITNESS TIP",
                title: m.title,
                description: m.description,
                solution:
                    m.solution ||
                    CONTENT.mistakes.items[idx]?.solution ||
                    "Focus on progressive overload, proper form, and structured nutrition under expert guidance.",
                coachTip:
                    m.coachTip ||
                    CONTENT.mistakes.items[idx]?.coachTip ||
                    "Consistency and form beat intensity every time.",
                order: m.order ?? idx + 1,
            }))
            : CONTENT.mistakes.items;

    // Filter categories
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    // Extract unique categories sdfsdlfdskfnslkdfsd
    const categories = useMemo(() => {
        const set = new Set<string>();
        rawMistakes.forEach((m) => {
            if (m.tag) set.add(m.tag);
        });
        return ["ALL", ...Array.from(set)];
    }, [rawMistakes]);

    const filteredMistakes = useMemo(() => {
        if (selectedCategory === "ALL") return rawMistakes;
        return rawMistakes.filter((m) => m.tag === selectedCategory);
    }, [selectedCategory, rawMistakes]);

    return (
        <section
            id="mistakes"
            className="relative overflow-hidden bg-[#0e0e0e] py-24 text-white"
        >
            {/* Subtle background glow effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8A428]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-14">

                {/* SECTION HEADER */}
                <div className="flex flex-col gap-5">
                    <div className="relative">
                        {/* Background Stroked Text */}
                        <h2
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,0.12)",
                                fontFamily: "var(--font-oswald)",
                            }}
                            className="absolute -top-7 sm:-top-9 left-0 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-transparent select-none whitespace-nowrap"
                        >
                            {heading.backgroundTitle}
                        </h2>

                        {/* Foreground Heading */}
                        <h3
                            data-aos="fade-up"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="relative pt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                        >
                            {heading.title}{" "}
                            <span className="text-[#E8A428]">
                                {heading.highlightText}
                            </span>{" "}
                            {heading.titleEnd}
                        </h3>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <p
                            data-aos="fade-up"
                            data-aos-delay="150"
                            style={{ fontFamily: "var(--font-poppins)" }}
                            className="max-w-3xl text-sm sm:text-base leading-relaxed text-[#B0B0B0]"
                        >
                            {sectionDescription}
                        </p>

                        <div
                            data-aos="fade-left"
                            data-aos-delay="200"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8A428] font-semibold bg-[#E8A428]/10 border border-[#E8A428]/30 px-3.5 py-1.5 rounded-full self-start lg:self-end shrink-0"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Coach Prabin&apos;s Training Guide</span>
                        </div>
                    </div>
                </div>

                {/* CATEGORY FILTER TABS */}
                {categories.length > 2 && (
                    <div
                        data-aos="fade-up"
                        data-aos-delay="250"
                        className="flex flex-wrap items-center gap-2 sm:gap-3"
                    >
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            const count =
                                cat === "ALL"
                                    ? rawMistakes.length
                                    : rawMistakes.filter((m) => m.tag === cat)
                                        .length;

                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        fontFamily: "var(--font-roboto-condensed)",
                                    }}
                                    className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${isSelected
                                        ? "bg-[#E8A428] text-black shadow-lg shadow-[#E8A428]/20"
                                        : "bg-[#181818] text-[#C0C0C0] border border-[#2a2a2a] hover:border-[#E8A428]/50 hover:text-white"
                                        }`}
                                >
                                    <span>{cat}</span>
                                    <span
                                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected
                                            ? "bg-black/20 text-black font-bold"
                                            : "bg-[#252525] text-[#888]"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* MISTAKES & SOLUTIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
                    {filteredMistakes.map((item, index) => {
                        const TagIcon =
                            (item.tag && tagIcons[item.tag]) || Dumbbell;

                        return (
                            <div
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-duration="900"
                                data-aos-delay={(index % 3) * 150}
                                className="group bg-[#151515] border border-[#262626] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:border-[#E8A428]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E8A428]/5 relative overflow-hidden"
                            >
                                {/* Top gold indicator line on hover */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8A428] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex flex-col gap-5">
                                    {/* CARD TOP META */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#E8A428] bg-[#E8A428]/10 border border-[#E8A428]/25 px-2.5 py-1 rounded-md">
                                            <TagIcon className="w-3 h-3 text-[#E8A428]" />
                                            {item.tag || "MISTAKE"}
                                        </span>

                                        <span
                                            style={{
                                                fontFamily:
                                                    "var(--font-roboto-condensed)",
                                            }}
                                            className="text-xs font-bold text-[#555] group-hover:text-[#E8A428] transition-colors"
                                        >
                                            #{String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* MISTAKE TITLE */}
                                    <h4
                                        style={{
                                            fontFamily: "var(--font-oswald)",
                                        }}
                                        className="text-xl sm:text-2xl font-medium uppercase text-[#FFF7DF] group-hover:text-white transition-colors leading-snug"
                                    >
                                        {item.title}
                                    </h4>

                                    {/* THE MISTAKE BLOCK */}
                                    <div className="rounded-lg bg-[#221313]/50 border border-red-500/20 p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-red-400">
                                            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "var(--font-roboto-condensed)",
                                                }}
                                                className="text-xs font-bold uppercase tracking-wider"
                                            >
                                                The Beginner Mistake
                                            </span>
                                        </div>
                                        <p
                                            style={{
                                                fontFamily:
                                                    "var(--font-poppins)",
                                            }}
                                            className="text-xs sm:text-[13px] leading-relaxed text-[#D0B8B8]"
                                        >
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* THE CORRECT SOLUTION BLOCK */}
                                    <div className="rounded-lg bg-[#112419]/60 border border-emerald-500/30 p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "var(--font-roboto-condensed)",
                                                }}
                                                className="text-xs font-bold uppercase tracking-wider text-emerald-400"
                                            >
                                                The Correct Solution
                                            </span>
                                        </div>
                                        <p
                                            style={{
                                                fontFamily:
                                                    "var(--font-poppins)",
                                            }}
                                            className="text-xs sm:text-[13px] leading-relaxed text-[#B7D8C3]"
                                        >
                                            {item.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* COACH TIP FOOTER */}
                                {item.coachTip && (
                                    <div className="mt-5 pt-4 border-t border-[#252525] flex items-start gap-2 text-[#999]">
                                        <Lightbulb className="w-3.5 h-3.5 text-[#E8A428] shrink-0 mt-0.5" />
                                        <p
                                            style={{
                                                fontFamily:
                                                    "var(--font-poppins)",
                                            }}
                                            className="text-[11px] leading-tight italic text-[#A6A6A6]"
                                        >
                                            <span className="text-[#E8A428] font-medium not-italic">
                                                Coach Tip:
                                            </span>{" "}
                                            {item.coachTip}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* BOTTOM CALL TO ACTION BANNER */}
                <div
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c160c] via-[#141414] to-[#1c160c] border border-[#E8A428]/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
                >
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <span
                            style={{
                                fontFamily: "var(--font-roboto-condensed)",
                            }}
                            className="text-xs font-bold uppercase tracking-widest text-[#E8A428]"
                        >
                            Stop Wasting Months In The Gym
                        </span>
                        <h4
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-2xl sm:text-3xl uppercase font-medium text-[#FFF7DF]"
                        >
                            Need Your Form Checked Or A Personalized Routine?
                        </h4>
                        <p
                            style={{ fontFamily: "var(--font-poppins)" }}
                            className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed"
                        >
                            {sectionData?.ctaText || CONTENT.mistakes.ctaText}
                        </p>
                    </div>

                    <a
                        href={sectionData?.ctaButtonLink || CONTENT.mistakes.ctaButtonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: "var(--font-roboto-condensed)",
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#E8A428] hover:bg-[#ffb636] text-black px-7 py-3 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E8A428]/25 shrink-0"
                    >
                        <span>{sectionData?.ctaButtonText || CONTENT.mistakes.ctaButtonText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>

            </div>
        </section>
    );
}