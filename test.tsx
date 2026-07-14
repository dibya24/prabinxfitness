"use client";

import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="overflow-hidden bg-[#0b0b0b] py-16 sm:py-20 lg:py-28 text-white"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* ================= TOP ================= */}

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* LEFT */}

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
                  text-transparent
                "
                                style={{
                                    WebkitTextStroke:
                                        "1px rgba(255,255,255,.12)",
                                    fontFamily: "var(--font-oswald)",
                                }}
                            >
                                ABOUT ME
                            </h2>

                            <h3
                                style={{
                                    fontFamily: "var(--font-oswald)",
                                }}
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
                                Dedicated To Igniting Your
                                <br />

                                <span className="text-[#E8A428]">
                                    Passion
                                </span>{" "}
                                For Health
                            </h3>

                        </div>

                        <div className="mt-10 sm:mt-14 lg:mt-20">
                            <Image
                                src="/images/Active_iq.png"
                                width={220}
                                height={220}
                                alt="Certificate"
                                className="
                  w-[140px]
                  sm:w-[180px]
                  lg:w-[220px]
                  h-auto
                  object-contain
                "
                            />
                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col justify-center">

                        <h2
                            style={{
                                fontFamily: "var(--font-oswald)",
                            }}
                            className="
                text-xl
                sm:text-2xl
                lg:text-[27px]
                uppercase
                leading-snug
                text-[#FFF7DF]
              "
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

                        <p
                            className="
                mt-6
                sm:mt-8
                lg:mt-10
                max-w-xl
                text-sm
                sm:text-base
                text-[#C0C0C0]
                leading-relaxed
              "
                        >
                            We help individuals achieve
                            sustainable results through
                            personalized coaching,
                            progressive training programs,
                            and nutrition strategies tailored
                            to every lifestyle.
                        </p>

                    </div>

                </div>

                {/* ================= BOTTOM ================= */}

                <div
                    className="
            mt-14
            sm:mt-20
            lg:mt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            lg:gap-8
          "
                >
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
            className={`
        relative
        overflow-hidden
        rounded-full
        border-[3px]
        lg:border-4
        border-[#B98519]
        px-6
        sm:px-8
        lg:px-12
        py-4
        lg:py-5
        text-center
        shadow-xl
        ${dark
                    ? "bg-[#4b4127]"
                    : "bg-gradient-to-b from-[#f3bb39] via-[#a56b06] to-black"
                }
      `}
        >
            <h3
                style={{
                    fontFamily: "var(--font-oswald)",
                }}
                className="
          text-xl
          sm:text-2xl
          lg:text-[27px]
          uppercase
          text-[#FFF7DF]
          font-semibold
        "
            >
                {title}
            </h3>

            <p
                className="
          text-sm
          sm:text-base
          text-[#C0C0C0]
        "
            >
                {subtitle}
            </p>
        </div>
    );
}