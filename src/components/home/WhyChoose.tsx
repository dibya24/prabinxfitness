import Image from "next/image";

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
        <section className="bg-[#141414] py-28 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-5">

                {/* Heading */}

                <div className="text-center relative mb-20">

                    <h2
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="absolute left-1/2 -translate-x-1/2 -top-7 text-[64px] uppercase font-bold text-transparent stroke-text whitespace-nowrap"
                    >
                        WHY CHOOSE PRABIN
                    </h2>

                    <h3
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="text-[62px] leading-none uppercase font-semibold text-[#F8F1DE]"
                    >
                        Fitness Should <span className="text-[#E8A428]">Feel</span> Like It
                        <br />
                        Fits
                    </h3>

                    <p
                        style={{ fontFamily: "var(--font-poppins)" }}
                        className="mt-6 text-[#BDBDBD] text-lg max-w-2xl mx-auto leading-8"
                    >
                        Achieve your fitness goals with expert guidance, personalized
                        support, and a results-driven approach.
                    </p>
                </div>

                {/* Main */}

                <div className="relative flex justify-center items-center">

                    {/* LEFT */}

                    <div className="absolute left-0 w-[420px] h-full">

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

                                    <div className="flex-1 h-[1px] bg-[#D8D8D8] relative ml-6">

                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#D9D9D9] border-[6px] border-[#B5B5B5]" />

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* IMAGE */}

                    <div className="relative w-[350px] h-[520px]">

                        <Image
                            src="/images/trainer.png"
                            alt="Trainer"
                            fill
                            className="object-cover"
                        />

                    </div>

                    {/* RIGHT */}

                    <div className="absolute right-0 w-[420px] h-full">

                        {rightFeatures.map((item, index) => (
                            <div
                                key={index}
                                className="absolute w-full"
                                style={{ top: item.top }}
                            >
                                <div className="flex items-center">

                                    <div className="flex-1 h-[1px] bg-[#D8D8D8] relative mr-6">

                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#D9D9D9] border-[6px] border-[#B5B5B5]" />

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

            </div>
        </section>
    );
}