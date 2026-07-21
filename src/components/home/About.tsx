import Image from "next/image";
import { CONTENT } from "@/src/constants/content";

import images from "@/src/constants/images";

type AboutData = {
    backgroundTitle: string;
    title: string;
    highlightText: string;
    titleEnd: string;
    mainHeading: string;
    paragraph: string;
};

type Stat = {
    id: number;
    title: string;
    subtitle: string;
    dark: boolean;
};

export default function About({ data, stats }: { data?: AboutData | null; stats?: Stat[] | null }) {
    const about = {
        heading: {
            backgroundTitle: data?.backgroundTitle || CONTENT.about.heading.backgroundTitle,
            title: data?.title || CONTENT.about.heading.title,
            highlightText: data?.highlightText || CONTENT.about.heading.highlightText,
            titleEnd: data?.titleEnd || CONTENT.about.heading.titleEnd,
        },
        description: {
            mainHeading: data?.mainHeading || CONTENT.about.description.mainHeading,
            paragraph: data?.paragraph || CONTENT.about.description.paragraph,
        },
        stats: stats && stats.length > 0 ? stats : CONTENT.about.stats,
    };

    return (
        <section
            id="story"
            className="bg-[#0b0b0b] pt-28 pb-20 text-white overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6 flex flex-col gap-12">


                {/* TOP CONTENT */}
                <div className="grid lg:grid-cols-2 gap-8">


                    {/* LEFT */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >

                        <div className="relative">

                            {/* Background Text */}
                            <h2
                                // data-aos="zoom-in"
                                // data-aos-duration="1800"
                                style={{
                                    WebkitTextStroke:
                                        "1px rgba(255,255,255,.12)",
                                    fontFamily:
                                        "var(--font-oswald)",
                                }}
                                className="
                                absolute
                                -top-8
                                left-0
                                text-4xl
                                sm:text-6xl
                                lg:text-7xl
                                font-black
                                uppercase
                                text-transparent
                                whitespace-nowrap
                                "
                            >
                                {about.heading.backgroundTitle}
                            </h2>



                            {/* Main Heading */}
                            <h3
                                data-aos="fade-up"
                                data-aos-delay="250"
                                data-aos-duration="1200"
                                style={{
                                    fontFamily:
                                        "var(--font-oswald)",
                                }}
                                className="
                                relative
                                pt-5
                                text-3xl
                                sm:text-4xl
                                lg:text-5xl
                                leading-tight
                                uppercase
                                text-[#FFF7DF]
                                font-medium
                                "
                            >
                                {about.heading.title}

                                <br />

                                <span className="text-[#E8A428]">
                                    {about.heading.highlightText}
                                </span>{" "}

                                {about.heading.titleEnd}

                            </h3>

                        </div>



                        {/* Certificate */}
                        <div
                            data-aos="zoom-in-up"
                            data-aos-delay="500"
                            data-aos-duration="1400"
                            className="mt-8"
                        >
                            <Image
                                src={images.about}
                                width={220}
                                height={220}
                                alt="Active IQ Personal Trainer Certificate"
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
                    <div
                        data-aos="fade-left"
                        data-aos-duration="1400"
                        data-aos-delay="300"
                    >

                        <h2
                            style={{
                                fontFamily: "var(--font-oswald)",
                            }}
                            className="
                            relative
                            overflow-hidden
                            text-xl
                            sm:text-2xl
                            lg:text-[30px]
                            uppercase
                            leading-snug
                            text-[#FFF7DF]
                            animate-text-reveal
                            "
                        >
                            <span className="block">
                                {about.description.mainHeading}
                            </span>
                        </h2>



                        <p
                            data-aos="fade-up"
                            data-aos-delay="500"
                            className="
                            mt-6
                            lg:mt-10
                            max-w-xl
                            text-sm
                            sm:text-base
                            leading-relaxed
                            text-[#C0C0C0]
                            "
                        >
                            {about.description.paragraph}
                        </p>

                    </div>

                </div>





                {/* STATS */}
                <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                    lg:gap-8
                    "
                >

                    {about.stats.map((stat, index) => (

                        <div
                            key={stat.id}
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={index * 200}
                        >
                            <StatCard
                                title={stat.title}
                                subtitle={stat.subtitle}
                                dark={stat.dark}
                            />
                        </div>

                    ))}

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
            className={`relative overflow-hidden rounded-full border-[3px] lg:border-4 border-[#B98519] px-6 sm:px-8 lg:px-12 py-4 lg:py-5 text-center shadow-xl transition-transform duration-500 hover:-translate-y-2
            ${dark
                    ? "bg-[#4b4127]"
                    : "bg-gradient-to-b from-[#f3bb39] via-[#a56b06] to-black"
                }
            `}
        >

            <h3
                style={{
                    fontFamily:
                        "var(--font-oswald)",
                }}
                className="text-xl sm:text-2xl lg:text-[27px] uppercase text-[#FFF7DF] font-semibold"
            >
                {title}
            </h3>


            <p className="text-sm sm:text-base text-[#C0C0C0]">
                {subtitle}
            </p>


        </div>

    );
}