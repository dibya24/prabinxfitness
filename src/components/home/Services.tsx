import React from 'react'
import { Dumbbell, Apple, MonitorSmartphone } from "lucide-react";

const Services = () => {
    return (
        <section className='relative overflow-hidden bg-[#141414] py-28'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col gap-[20px] lg:gap-[40px]'>
                <div className='grid lg:grid-cols-2 gap-5'>
                    <div>
                        <div className="relative">
                            <h2
                                className="
                                              absolute
                  -top-5
                  left-0
                  text-3xl
                  sm:text-5xl
                  lg:text-6xl
                  font-extrabold
                  uppercase
                  text-transparent"
                                style={{
                                    WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                    fontFamily: "var(--font-oswald)",
                                }}
                            >
                                Services Provided
                            </h2>

                            <h3
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="
                                relative
                  pt-4
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  leading-tight
                  uppercase
                  text-[#FFF7DF]
                  font-medium
                  "
                            >
                                ELEVATE YOUR
                                <br />

                                <span className="text-[#E8A428]">
                                    FITNESS
                                </span>{" "}
                                EXPERIENCE
                            </h3>
                        </div>

                        <p
                            style={{ fontFamily: "var(--font-poppins)" }}
                            className='
                text-sm
                sm:text-base
                leading-relaxed
                text-[#C0C0C0]
                '>
                            Personalized programs, expert coaching, and proven methods to help you achieve real results.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className='flex flex-row gap-4 lg:justify-end lg:items-start'>
                        <button
                            className="mt-12 rounded-full bg-[#E8A428] px-10 py-4 font-semibold text-black transition hover:bg-white"
                        >
                            Make a Quick Call
                        </button>

                        <button
                            className="mt-12 rounded-full bg-[#E8A428] px-10 py-4 font-semibold text-black transition hover:bg-white"
                        >
                            Make a Quick Call
                        </button>
                    </div>
                </div>


                {/* ================= SERVICES ================= */}

                <div
                    className="
        mt-12
        sm:mt-16
        lg:mt-20
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
        lg:gap-6
    "
                >

                    {/* CARD 1 */}

                    <div
                        className="
            bg-[#1a1a1a]
            border
            border-[#D6DCE5]/20
            p-5
            sm:p-6
            lg:p-8
            flex
            flex-col
            gap-5
            transition-all
            duration-300
            hover:border-[#E8A428]/50
            hover:-translate-y-1
        "
                    >
                        {/* Icon */}
                        <div
                            className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                flex
                items-center
                justify-center
                border
                border-[#E8A428]
            "
                        >
                            <Dumbbell className="w-5 h-5 sm:w-7 sm:h-7 text-[#E8A428]" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="
                    text-xl
                    sm:text-2xl
                    lg:text-[27px]
                    font-medium
                    text-[#FFF7DF]
                "
                            >
                                In-Person Training
                            </h2>

                            <div className="flex flex-col gap-4">
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className="
                        text-sm
                        sm:text-[14px]
                        leading-relaxed
                        text-[#C0C0C0]
                    "
                                >
                                    One-to-one sessions designed around your goals.
                                    Whether fat loss, muscle gain, or strength development,
                                    every workout is tailored to your fitness level and lifestyle.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Strength
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        HIIT
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Functional
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 */}

                    <div
                        className="
            bg-[#1a1a1a]
            border
            border-[#D6DCE5]/20
            p-5
            sm:p-6
            lg:p-8
            flex
            flex-col
            gap-5
            transition-all
            duration-300
            hover:border-[#E8A428]/50
            hover:-translate-y-1
        "
                    >
                        <div
                            className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                flex
                items-center
                justify-center
                border
                border-[#E8A428]
            "
                        >
                            <MonitorSmartphone className="w-5 h-5 sm:w-7 sm:h-7 text-[#E8A428]" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="
                    text-xl
                    sm:text-2xl
                    lg:text-[27px]
                    font-medium
                    text-[#FFF7DF]
                "
                            >
                                Online Coaching
                            </h2>

                            <div className="flex flex-col gap-4">
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className="
                        text-sm
                        sm:text-[14px]
                        leading-relaxed
                        text-[#C0C0C0]
                    "
                                >
                                    Receive customized training plans, weekly check-ins,
                                    exercise guidance, progress tracking, and accountability
                                    support wherever you are.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Remote
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Tracking
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Support
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3 */}

                    <div
                        className="
            bg-[#1a1a1a]
            border
            border-[#D6DCE5]/20
            p-5
            sm:p-6
            lg:p-8
            flex
            flex-col
            gap-5
            transition-all
            duration-300
            hover:border-[#E8A428]/50
            hover:-translate-y-1
        "
                    >
                        <div
                            className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                flex
                items-center
                justify-center
                border
                border-[#E8A428]
            "
                        >
                            <Apple className="w-5 h-5 sm:w-7 sm:h-7 text-[#E8A428]" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="
                    text-xl
                    sm:text-2xl
                    lg:text-[27px]
                    font-medium
                    text-[#FFF7DF]
                "
                            >
                                Nutrition Consulting
                            </h2>

                            <div className="flex flex-col gap-4">
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className="
                        text-sm
                        sm:text-[14px]
                        leading-relaxed
                        text-[#C0C0C0]
                    "
                                >
                                    Build sustainable eating habits with personalized
                                    nutrition strategies designed to improve recovery,
                                    performance, energy, and body composition.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Nutrition
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Meal Plans
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                    >
                                        Lifestyle
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Services
