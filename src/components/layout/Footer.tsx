import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTiktok } from "react-icons/fa";
// import { Instagram } from "lucide-react";
import { SiThreads } from "react-icons/si";

const Footer = () => {
    return (
        <section className='bg-[#141414] py-[40px] relative overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6'>
                <div
                    style={{ fontFamily: "var(--font-oswald)" }}
                    className="text-[180px] text-center font-medium uppercase bg-gradient-to-b from-[#E8A428] to-[#141414] bg-clip-text text-transparent"
                >
                    prabinxfitness
                </div>

                <div className='flex items-center justify-between'>
                    <nav className='flex gap-10'>
                        <Link
                            key=""
                            href=""
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-[18px] text-gray-300 transition duration-300 hover:text-[#CFA74D]">
                            Story
                        </Link>

                        <Link
                            key=""
                            href=""
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-[18px] text-gray-300 transition duration-300 hover:text-[#CFA74D]">
                            Coaching
                        </Link>

                        <Link
                            key=""
                            href=""
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-[18px] text-gray-300 transition duration-300 hover:text-[#CFA74D]">
                            Results
                        </Link>

                        <Link
                            key=""
                            href=""
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-[18px] text-gray-300 transition duration-300 hover:text-[#CFA74D]">
                            Contact
                        </Link>
                    </nav>

                    {/* Social Icons */}
                    <div className="flex gap-3">

                        {/* Instagram */}
                        <div className='w-10! h-10 flex items-center justify-center border border-[#4A4A4A]'>
                            <FaInstagram className="h-5 w-5 text-[#CFA74D]" />
                        </div>


                        {/* Threads */}
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center border border-[#5f4848] text-[#CFA74D] transition-all duration-300 hover:border-[#CFA74D] hover:bg-[#CFA74D]/10"
                        >
                            <SiThreads className="h-5 w-5" />
                        </a>


                        {/* TikTok */}
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center border border-[#4A4A4A] text-[#CFA74D] transition-all duration-300 hover:border-[#CFA74D] hover:bg-[#CFA74D]/10"
                        >
                            <FaTiktok className="h-5 w-5" />
                        </a>

                    </div>
                </div>

                {/* Line */}
                <div className="w-full h-px bg-[#4A4A4A] my-10" />

                {/* Copyright */}
                <div className='flex items-center justify-between'>
                    <div
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className='text-[18px] font-medium text-[#FFF9E7] transition duration-300'>© PrabinXFitness. All Rights Reserved.</div>
                    <div
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className='text-[18px] text-[#FFF9E7] transition duration-300'>Designed & Developed By <a href="dibyamaharjan.com/" className='text-[#CFA74D]'> Dibya Maharjan</a></div>
                </div>
            </div>
        </section>
    )
}

export default Footer