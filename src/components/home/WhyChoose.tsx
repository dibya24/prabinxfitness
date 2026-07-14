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
                            why choose me
                        </h2>

                        <h3
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="relative pt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                        >
                            FITNESS SHOULD
                            <br />

                            <span className="text-[#E8A428]">
                                FEEL
                            </span>{" "}
                            LIKE IT FITS
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm sm:text-base text-[#C0C0C0] leading-relaxed">
                            Achieve your fitness goals with expert guidance, personalized support, and a results-driven approach.
                        </p>
                    </div>
                </div>

                {/* ======== MAIN WHY CHOOSE CONTENT ======== */}
                <div className="relative">

                    {/* ========= DESKTOP ========= */}
                    <div className="hidden xl:flex justify-center items-center relative min-h-[650px]">

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
                                src="/images/gallery/one.png"
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