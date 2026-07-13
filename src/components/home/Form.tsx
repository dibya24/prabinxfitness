import React from 'react'

const Form = () => {
    return (
        <section className='bg-[#0F0F0F] py-28 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid lg:grid-cols-2 gap-5'>
                    {/* Title/Short Desc */}
                    <div>
                        <div>
                            <div>
                                <h2
                                    className="absolute top-20 text-6xl font-extrabold uppercase text-transparent"
                                    style={{
                                        WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                        fontFamily: "var(--font-oswald)",
                                    }}
                                >
                                    Get In Touch
                                </h2>

                                <h3
                                    style={{ fontFamily: "var(--font-oswald)" }}
                                    className="relative text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                                >
                                    READY TO
                                    <br />

                                    <span className="text-[#E8A428]">
                                        BIGIN
                                    </span>{" "}
                                    YOUR JOURNEY?
                                </h3>
                            </div>

                            <p
                                style={{ fontFamily: "var(--font-poppins)" }}
                                className='text-[16px] text-[#C0C0C0]'>
                                I grew up in Kathmandu Valley, where physical discipline is woven into daily life - from the terraced farmlands to the trekking trials of the Himalayas. That environment my discipline.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-10 space-y-5">

                            {/* Location */}
                            <div className="flex items-center gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8A428]/20 bg-[#E8A428]/10">
                                    <svg
                                        className="h-5 w-5 text-[#E8A428]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                                        />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#8A8A8A]">
                                        Location
                                    </p>
                                    <p className="mt-1 text-base text-[#FFF7DF]">
                                        Kathmandu, Nepal
                                    </p>
                                </div>
                            </div>


                            {/* Email */}
                            <div className="flex items-center gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8A428]/20 bg-[#E8A428]/10">
                                    <svg
                                        className="h-5 w-5 text-[#E8A428]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M22 6l-10 7L2 6"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#8A8A8A]">
                                        Email
                                    </p>
                                    <p className="mt-1 text-base text-[#FFF7DF]">
                                        trainer@example.com
                                    </p>
                                </div>
                            </div>


                            {/* Call */}
                            <div className="flex items-center gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8A428]/20 bg-[#E8A428]/10">
                                    <svg
                                        className="h-5 w-5 text-[#E8A428]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#8A8A8A]">
                                        Call
                                    </p>
                                    <p className="mt-1 text-base text-[#FFF7DF]">
                                        +977 98XXXXXXXX
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-[24px] border border-white/10 bg-[#151515] p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,.4)]">
                        <form className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-xs uppercase tracking-widest text-[#A5A5A5]"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="h-11 w-full rounded-xl border border-[#2B2B2B] bg-[#0F0F0F] px-4 text-sm text-white placeholder:text-[#666] outline-none transition-all duration-300 focus:border-[#E8A428] focus:ring-4 focus:ring-[#E8A428]/10"
                                />
                            </div>


                            {/* Email & Phone */}
                            <div className="grid gap-4 md:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-xs uppercase tracking-widest text-[#A5A5A5]"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-11 w-full rounded-xl border border-[#2B2B2B] bg-[#0F0F0F] px-4 text-sm text-white placeholder:text-[#666] outline-none transition-all duration-300 focus:border-[#E8A428] focus:ring-4 focus:ring-[#E8A428]/10"
                                    />
                                </div>


                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-1.5 block text-xs uppercase tracking-widest text-[#A5A5A5]"
                                    >
                                        Contact
                                    </label>

                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+977 98XXXXXXXX"
                                        className="h-11 w-full rounded-xl border border-[#2B2B2B] bg-[#0F0F0F] px-4 text-sm text-white placeholder:text-[#666] outline-none transition-all duration-300 focus:border-[#E8A428] focus:ring-4 focus:ring-[#E8A428]/10"
                                    />
                                </div>

                            </div>


                            {/* Goal */}
                            <div>
                                <label
                                    htmlFor="goal"
                                    className="mb-1.5 block text-xs uppercase tracking-widest text-[#A5A5A5]"
                                >
                                    Primary Goal
                                </label>

                                <div className="relative">
                                    <select
                                        id="goal"
                                        defaultValue=""
                                        className="h-11 w-full appearance-none rounded-xl border border-[#2B2B2B] bg-[#0F0F0F] px-4 text-sm text-white outline-none transition-all duration-300 focus:border-[#E8A428] focus:ring-4 focus:ring-[#E8A428]/10"
                                    >
                                        <option value="" disabled>
                                            Select your goal
                                        </option>
                                        <option>Weight Loss</option>
                                        <option>Muscle Gain</option>
                                        <option>Strength Training</option>
                                        <option>Body Transformation</option>
                                        <option>General Fitness</option>
                                        <option>Sports Performance</option>
                                    </select>

                                    <svg
                                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E8A428]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>


                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-1.5 block text-xs uppercase tracking-widest text-[#A5A5A5]"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    rows={3}
                                    placeholder="Tell me about your fitness goals..."
                                    className="w-full resize-none rounded-xl border border-[#2B2B2B] bg-[#0F0F0F] p-3.5 text-sm text-white placeholder:text-[#666] outline-none transition-all duration-300 focus:border-[#E8A428] focus:ring-4 focus:ring-[#E8A428]/10"
                                />
                            </div>


                            {/* Button */}
                            <button
                                type="submit"
                                className="group flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#D8971D] via-[#E8A428] to-[#F2B63D] text-sm font-semibold text-[#111] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(232,164,40,.3)] cursor-pointer"
                            >
                                Book Your Free Consultation

                                <svg
                                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14M13 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form