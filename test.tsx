import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <section className="bg-[#141414] px-5">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[20px] bg-[#171717]">
                {/* ================= Background ================= */}
                <div className="absolute inset-0">
                    {/* Main Golden Glow */}
                    <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3AA20]/45 blur-[110px]" />

                    {/* Secondary Glow */}
                    <div className="absolute right-[10%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FFD56A]/30 blur-[80px]" />

                    {/* Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#2D230F]/35 to-[#171717]/10" />
                </div>

                <div className="relative z-10 grid items-center gap-8 pl-8 pt-8 md:grid-cols-2 md:pl-16 md:pt-8">
                    {/* ================= Left Content ================= */}
                    <div className="flex flex-col gap-7">
                        <div>
                            <h2
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="text-3xl font-medium uppercase leading-tight text-[#FFF7DF] sm:text-4xl lg:text-5xl"
                            >
                                BEGIN YOUR JOURNEY TO
                                <br />
                                <span className="text-[#F3AA20]">WELLNESS</span> TODAY!
                            </h2>

                            <p
                                style={{ fontFamily: "var(--font-poppins)" }}
                                className="mt-5 max-w-[520px] text-sm leading-7 text-[#C9C9C9] sm:text-base"
                            >
                                Our experienced trainers will craft a tailored workout plan
                                just for you, ensuring maximum results and efficiency.
                            </p>
                        </div>

                        <div>
                            <a
                                href="https://wa.me/971558663590"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-full bg-[#E8A428] px-8 py-3 text-[16px] font-semibold text-black transition-all duration-300 hover:bg-[#f0b540]"
                            >
                                Make a Call Now
                            </a>
                        </div>
                    </div>

                    {/* ================= Right Image ================= */}
                    <div className="relative h-[300px] sm:h-[340px] lg:h-[480px] overflow-hidden">
                        {/* Decorative Ellipse */}
                        {/* Decorative Ellipse */}
                        <svg
                            className="absolute right-[-180px] top-[-0px] h-full w-full"
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
                            width={480}
                            height={620}
                            priority
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain z-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;