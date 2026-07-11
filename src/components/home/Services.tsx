import React from 'react'
import { Dumbbell, Apple, MonitorSmartphone } from "lucide-react";

const Services = () => {
    return (
        <section className='relative overflow-hidden bg-[#141414] py-28'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid lg:grid-cols-2 gap-5'>
                    <div>
                        <div>
                            <h2
                                className="absolute top-20 text-6xl font-extrabold uppercase text-transparent"
                                style={{
                                    WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                    fontFamily: "var(--font-oswald)",
                                }}
                            >
                                Services Provided
                            </h2>

                            <h3
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="relative text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
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
                            className='text-[16px] text-[#C0C0C0]'>
                            Personalized programs, expert coaching, and proven methods to help you achieve real results.
                        </p>
                    </div>

                    <div>
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


                {/* Main Content */}
                <div className="grid grid-cols-3 gap-0">
                    <div className="bg-[#1a1a1a] p-8 border-r border-[#D6DCE5]/30 flex flex-col gap-[20px]">
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center border border-[#E8A428] rounded-xs">
                            <Dumbbell size={28} className="text-[#E8A428]" />
                        </div>

                        {/* Main */}
                        <div className='flex flex-col gap-[10px]'>
                            {/* Title */}
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className='text-[27px] font-medium text-[#fff7df]'>
                                In-Person Training
                            </h2>

                            <div className='flex flex-col gap-[15px]'>
                                {/* Desc */}
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='text-[14px] font-normal text-[#c0c0c0]'>
                                    One-to-one sessions on the floor at your gym or mine across the UAE. Programming built around strength, weight loss and muscle building — tailored to you, not a template.
                                </p>

                                {/* Tags */}
                                <div className='flex gap-3'>
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Strength
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        HIIT
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Functional
                                    </span>

                                    {/* <span
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                    Sports-specific
                                </span> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-8 border-r border-[#D6DCE5]/30 flex flex-col gap-[20px]">
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center border border-[#E8A428] rounded-xs">
                            <MonitorSmartphone size={28} className="text-[#E8A428]" />
                        </div>

                        {/* Main */}
                        <div className='flex flex-col gap-[10px]'>
                            {/* Title */}
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className='text-[27px] font-medium text-[#fff7df]'>
                                Online Coaching
                            </h2>

                            <div className='flex flex-col gap-[15px]'>
                                {/* Desc */}
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='text-[14px] font-normal text-[#c0c0c0]'>
                                    One-to-one sessions on the floor at your gym or mine across the UAE. Programming built around strength, weight loss and muscle building — tailored to you, not a template.
                                </p>

                                {/* Tags */}
                                <div className='flex gap-3'>
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Strength
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        HIIT
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Functional
                                    </span>

                                    {/* <span
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                    Sports-specific
                                </span> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-8 flex flex-col gap-[20px]">
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center border border-[#E8A428] rounded-xs">
                            <Apple size={28} className="text-[#E8A428]" />
                        </div>

                        {/* Main */}
                        <div className='flex flex-col gap-[10px]'>
                            {/* Title */}
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className='text-[27px] font-medium text-[#fff7df]'>
                                Nutrition Consulting
                            </h2>

                            <div className='flex flex-col gap-[15px]'>
                                {/* Desc */}
                                <p
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='text-[14px] font-normal text-[#c0c0c0]'>
                                    One-to-one sessions on the floor at your gym or mine across the UAE. Programming built around strength, weight loss and muscle building — tailored to you, not a template.
                                </p>

                                {/* Tags */}
                                <div className='flex gap-3'>
                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Strength
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        HIIT
                                    </span>

                                    <span
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                        Functional
                                    </span>

                                    {/* <span
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                    className='px-[15px] py-[5px] text-[12px] text-[#C0C0C0] border border-[#C0C0C0]'>
                                    Sports-specific
                                </span> */}
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
