import Image from "next/image";
import { CONTENT } from "@/src/constants/content";

const whychoose = CONTENT.whyChoose;

const leftFeatures = [
    {
        title: "KNOWLEDGE & EXPERIENCE",
        desc: "Train with proven methods focused on safe, effective, and sustainable progress.",
        top: "60%",
    },
    {
        title: "RESULTS THAT LAST",
        desc: "Build healthy habits that create long-term fitness and confidence, not quick fixes.",
        top: "87%",
    },
];

const rightFeatures = [
    {
        title: "GOAL-ORIENTED APPROACH",
        desc: "Every plan is designed to help you achieve real, measurable results.",
        top: "12%",
    },
    {
        title: "DEDICATED SUPPORT",
        desc: "Stay motivated with consistent guidance and accountability throughout your journey.",
        top: "39%",
    },
];

export default function WhyChoose() {
    return (
        <section className="bg-[#141414] py-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 flex flex-col  gap-[40px]">

                {/* ======== Heading ======== */}
                <div className="grid lg:grid-cols-2 gap-5 items-center">
                    <div className="relative">
                        <h2
                            className="absolute -top-5 left-0 text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-transparent"
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                fontFamily: "var(--font-oswald)",
                            }}
                        >
                            {whychoose.heading.backgroundTitle}
                        </h2>

                        <h3
                            data-aos="fade-up"
                            data-aos-delay="200"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="relative pt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                        >
                            {whychoose.heading.title}{" "}

                            <span className="text-[#E8A428]">
                                {whychoose.heading.highlightText}
                            </span>{" "}
                            <br />

                            {whychoose.heading.titleEnd}
                        </h3>
                    </div>

                    <div>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="text-sm sm:text-base text-[#C0C0C0] text-right leading-relaxed">
                            {whychoose.description}
                        </p>
                    </div>
                </div>

                {/* ======== MAIN WHY CHOOSE CONTENT ======== */}
                <div className="relative">

                    {/* ========= DESKTOP ========= */}
                    <div className="hidden xl:flex justify-center items-center relative h-full">
                        {/* IMAGE */}
                        <div className="relative w-[350px] h-[520px]">

                            <Image
                                src="/images/gallery/one.png"
                                alt="Trainer"
                                fill
                                className="object-cover"
                            />

                        </div>

                        {/* LEFT */}
                        <div className="absolute left-0 bottom-16 w-[500px] h-full">

                            {leftFeatures.map((item, index) => (
                                <div
                                    key={index}
                                    className="absolute w-full"
                                    style={{ top: item.top }}
                                >
                                    <div className="flex items-center">

                                        <div className="text-right w-[300px]">

                                            <h4
                                                style={{ fontFamily: "var(--font-oswald)" }}
                                                className="uppercase text-[22px] text-[#F8F1DE]"
                                            >
                                                {item.title}
                                            </h4>

                                            <p
                                                style={{ fontFamily: "var(--font-poppins)" }}
                                                className="text-[#A8A8A8] leading-8 mt-2"
                                            >
                                                {item.desc}
                                            </p>

                                        </div>

                                        <div className="flex-1 h-[1px] bg-[#E8A428] relative ml-6">

                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#E8A428] border-[6px] border-[#fbdfaa]" />

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>



                        {/* RIGHT */}
                        <div className="absolute right-0 w-[500px] h-full">

                            {rightFeatures.map((item, index) => (
                                <div
                                    key={index}
                                    className="absolute w-full"
                                    style={{ top: item.top }}
                                >
                                    <div className="flex items-center">

                                        <div className="flex-1 h-[1px] bg-[#E8A428] relative mr-6">

                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#E8A428] border-[6px] border-[#fbdfaa]" />

                                        </div>

                                        <div className="w-[300px]">

                                            <h4
                                                style={{ fontFamily: "var(--font-oswald)" }}
                                                className="uppercase text-[22px] text-[#F8F1DE]"
                                            >
                                                {item.title}
                                            </h4>

                                            <p
                                                style={{ fontFamily: "var(--font-poppins)" }}
                                                className="text-[#A8A8A8] leading-8 mt-2"
                                            >
                                                {item.desc}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* ========= TABLET ========= */}
                    <div className="hidden md:flex xl:hidden flex-col items-center gap-12">

                        {/* Top Features */}
                        <div className="grid grid-cols-2 gap-8 w-full">

                            {leftFeatures.map((item, index) => (
                                <div key={index}>

                                    <h4
                                        style={{ fontFamily: "var(--font-oswald)" }}
                                        className="uppercase text-[20px] text-[#F8F1DE]"
                                    >
                                        {item.title}
                                    </h4>

                                    <p
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="text-[#A8A8A8] leading-7 mt-2"
                                    >
                                        {item.desc}
                                    </p>

                                </div>
                            ))}

                        </div>

                        {/* Image */}
                        <div className="relative w-[320px] h-[470px]">

                            <Image
                                src="/images/gallery/one.png"
                                alt="Trainer"
                                fill
                                className="object-cover"
                            />

                        </div>

                        {/* Bottom Features */}
                        <div className="grid grid-cols-2 gap-8 w-full">

                            {rightFeatures.map((item, index) => (
                                <div key={index}>

                                    <h4
                                        style={{ fontFamily: "var(--font-oswald)" }}
                                        className="uppercase text-[20px] text-[#F8F1DE]"
                                    >
                                        {item.title}
                                    </h4>

                                    <p
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="text-[#A8A8A8] leading-7 mt-2"
                                    >
                                        {item.desc}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* ========= MOBILE ========= */}
                    <div className="flex md:hidden flex-col items-center">

                        {/* Image */}
                        <div className="relative w-[260px] sm:w-[300px] h-[380px] sm:h-[450px]">

                            <Image
                                src="/images/gallery/one.png"
                                alt="Trainer"
                                fill
                                className="object-cover"
                            />

                        </div>

                        {/* All Features */}
                        <div className="mt-10 grid grid-cols-1 gap-8 w-full">

                            {[...leftFeatures, ...rightFeatures].map((item, index) => (
                                <div
                                    key={index}
                                    className="text-center border border-[#2A2A2A] p-5 rounded-xl"
                                >

                                    <h4
                                        style={{ fontFamily: "var(--font-oswald)" }}
                                        className="uppercase text-[18px] sm:text-[20px] text-[#F8F1DE]"
                                    >
                                        {item.title}
                                    </h4>

                                    <p
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                        className="text-[#A8A8A8] text-sm sm:text-base leading-7 mt-2"
                                    >
                                        {item.desc}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}