import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTiktok } from "react-icons/fa";
// import { Instagram } from "lucide-react";
import { SiThreads } from "react-icons/si";

const Footer = () => {
    return (
        <section className='bg-[#141414] py-[40px] relative overflow-hidden'>
            <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
                <h2
                    style={{ fontFamily: "var(--font-oswald)" }}
                    className="
                    text-center
                        uppercase
                        font-medium
                        leading-none

                        text-[48px]
                        sm:text-[70px]
                        md:text-[100px]
                        lg:text-[140px]
                        xl:text-[180px]

                        bg-gradient-to-b
                        from-[#E8A428]
                        to-[#141414]
                        bg-clip-text
                        text-transparent
                        "
                >
                    prabinxfitness
                </h2>

                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        lg:flex-row
                        items-center
                        justify-between
                        gap-8
                    "
                >

                    {/* Navigation */}

                    <nav
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-5
                            sm:gap-8
                            lg:gap-10
                        "
                    >
                        <Link
                            href="#story"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
                        >
                            Story
                        </Link>

                        <Link
                            href="#coaching"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
                        >
                            Coaching
                        </Link>

                        <Link
                            href="#results"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
                        >
                            Results
                        </Link>

                        <Link
                            href="#contact"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Social Icons */}

                    <div className="flex items-center gap-3">

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex
                                h-10
                                w-10
                                sm:h-11
                                sm:w-11
                                items-center
                                justify-center
                                border
                                border-[#4A4A4A]
                                text-[#CFA74D]
                                transition-all
                                duration-300
                                hover:border-[#CFA74D]
                                hover:bg-[#CFA74D]/10
                            "
                        >
                            <FaInstagram className="h-5 w-5" />
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex
                                h-10
                                w-10
                                sm:h-11
                                sm:w-11
                                items-center
                                justify-center
                                border
                                border-[#4A4A4A]
                                text-[#CFA74D]
                                transition-all
                                duration-300
                                hover:border-[#CFA74D]
                                hover:bg-[#CFA74D]/10
                            "
                        >
                            <SiThreads className="h-5 w-5" />
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex
                                h-10
                                w-10
                                sm:h-11
                                sm:w-11
                                items-center
                                justify-center
                                border
                                border-[#4A4A4A]
                                text-[#CFA74D]
                                transition-all
                                duration-300
                                hover:border-[#CFA74D]
                                hover:bg-[#CFA74D]/10
                            "
                        >
                            <FaTiktok className="h-5 w-5" />
                        </a>

                    </div>

                </div>


                {/* Line */}
                {/* <div className="w-full h-px bg-[#4A4A4A] my-10" /> */}
                <div className="my-8 lg:my-10 h-px w-full bg-[#4A4A4A]" />

                {/* Copyright */}
                <div
                    className="
                        flex
                        flex-col
                        lg:flex-row
                        items-center
                        justify-between
                        gap-4
                        text-center
                        lg:text-left
                    "
                >

                    <p
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="
                            text-sm
                            sm:text-base
                            lg:text-lg
                            text-[#FFF9E7]
                        "
                    >
                        © PrabinXFitness. All Rights Reserved.
                    </p>

                    <p
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="
                            text-sm
                            sm:text-base
                            lg:text-lg
                            text-[#FFF9E7]
                        "
                    >
                        Designed & Developed By{" "}
                        <a
                            href="https://dibyamaharjan.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#CFA74D]"
                        >
                            Dibya Maharjan
                        </a>
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Footer