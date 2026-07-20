import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <section className="bg-[#141414] px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[20px] bg-[#171717]">

                {/* ================= Background ================= */}
                <div className="absolute inset-0">
                    {/* Main Glow */}
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3AA20]/45 blur-[90px] sm:h-[520px] sm:w-[520px] lg:h-[760px] lg:w-[760px] lg:blur-[110px]" />

                    {/* Secondary Glow */}
                    <div className="absolute right-[5%] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-[#FFD56A]/25 blur-[60px] sm:h-[320px] sm:w-[320px] lg:h-[420px] lg:w-[420px] lg:blur-[80px]" />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#2D230F]/35 to-[#171717]/10" />
                </div>

                {/* ================= Content ================= */}
                <div className="relative z-10 grid items-center gap-8 pl-8 pt-8 md:grid-cols-2 md:pl-16 md:pt-8">

                    {/* ================= Left ================= */}
                    <div className="text-center md:text-left">

                        <h2
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-3xl font-medium uppercase leading-tight text-[#FFF7DF] sm:text-4xl lg:text-5xl"
                        >
                            BEGIN YOUR FITNESS
                            <br />
                            <span className="text-[#F3AA20]">
                                JOURNEY
                            </span>{" "}
                            TODAY!
                        </h2>

                        <p
                            style={{ fontFamily: "var(--font-poppins)" }}
                            className="mt-5 max-w-[520px] text-sm leading-7 text-[#C9C9C9] sm:text-base"
                        >
                            {`Creating a personalized training plan tailored to your goals, helping you achieve lasting results safely and efficiently.`}
                        </p>

                        <a
                            href="https://wa.me/971558663590"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#E8A428] px-8 py-3 text-[15px] font-semibold text-black transition-all duration-300 hover:bg-[#f0b540] sm:px-9 sm:text-base"
                        >
                            Make a Call Now
                        </a>

                    </div>

                    {/* ================= Right ================= */}
                    <div className="relative flex justify-center">

                        <div className="relative h-[280px] w-full sm:h-[360px] md:h-[420px] lg:h-[520px]">

                            {/* Ellipse */}
                            <svg
                                className="absolute right-[-70px] top-1/2 h-[120%] w-[120%] -translate-y-1/2 sm:right-[-100px] lg:right-[-170px]"
                                viewBox="0 0 800 700"
                                fill="none"
                            >
                                <ellipse
                                    cx="500"
                                    cy="330"
                                    rx="500"
                                    ry="300"
                                    transform="rotate(-15 500 330)"
                                    stroke="#F3AA20"
                                    strokeWidth="7"
                                />
                            </svg>

                            <Image
                                src="https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269091/hero_img_uhxccj.png"
                                alt="Fitness Trainer"
                                width={520}
                                height={680}
                                priority
                                className="absolute bottom-0 left-1/2 z-10 h-full w-auto -translate-x-1/2 object-contain"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Banner;