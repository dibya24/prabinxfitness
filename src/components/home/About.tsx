"use client";

import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="bg-[#0b0b0b] py-28 text-white overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* ================= TOP ================= */}

                <div className="grid lg:grid-cols-2 gap-5">

                    {/* LEFT */}

                    <div>

                        <div className="relative">

                            <h2
                                className="absolute -top-8 left-0 text-6xl font-extrabold uppercase text-transparent"
                                style={{
                                    WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                    fontFamily: "var(--font-oswald)",
                                }}
                            >
                                ABOUT ME
                            </h2>

                            <h3
                                style={{ fontFamily: "var(--font-oswald)" }}
                                className="relative text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                            >
                                Dedicated To Igniting Your
                                <br />

                                <span className="text-[#E8A428]">
                                    Passion
                                </span>{" "}
                                For Health
                            </h3>

                        </div>

                        <div className="mt-20">

                            <Image
                                src="/images/Active_iq.png"
                                width={220}
                                height={220}
                                alt="Certificate"
                                className="object-contain"
                            />

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div>

                        <h2
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="text-[27px] uppercase leading-snug text-[#FFF7DF]"
                        >
                            RESULTS DRIVEN FITNESS,
                            DEDICATED TO HELPING YOU
                            TRAIN SMARTER,
                            MOVE BETTER,
                            AND LIVE STRONGER.

                            WITH EXPERT AND CERTIFIED
                            COACHING AND A SUPPORTIVE
                            COMMUNITY.
                        </h2>

                        <div className="flex">
                            <p className="mt-10 max-w-xl text-[16px] text-[#C0C0C0]">
                                We help individuals achieve sustainable results through
                                personalized coaching, progressive training programs,
                                and nutrition strategies tailored to every lifestyle.
                            </p>

                            <button
                                className="mt-12 rounded-full bg-[#E8A428] px-10 py-4 font-semibold text-black transition hover:bg-white"
                            >
                                Make a Quick Call
                            </button>
                        </div>

                    </div>

                </div>

                {/* ================= BOTTOM ================= */}

                <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="ACTIVE IQ"
                        subtitle="Certified"
                        dark
                    />

                    <StatCard
                        title="LEVEL 2"
                        subtitle="Gym Instructor"
                    />

                    <StatCard
                        title="LEVEL 3"
                        subtitle="Personal Trainer"
                    />

                    <StatCard
                        title="50+"
                        subtitle="Clients"
                        dark
                    />

                </div>

            </div>
        </section>
    );
}

function StatCard({
    title,
    subtitle,
    dark = false,
}: {
    title: string;
    subtitle: string;
    dark?: boolean;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-full border-4 border-[#B98519] px-12 py-5 text-center shadow-xl
      ${dark
                    ? "bg-[#4b4127]"
                    : "bg-gradient-to-b from-[#f3bb39] via-[#a56b06] to-black"
                }`}
        >
            <h3
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-[27px] uppercase text-[#FFF7DF] font-semibold"
            >
                {title}
            </h3>

            <p className="text-[16px] text-[#C0C0C0]">
                {subtitle}
            </p>
        </div>
    );
}