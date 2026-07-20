import { Dumbbell, Apple, MonitorSmartphone } from "lucide-react";
import { CONTENT } from "@/src/constants/content";

const service = CONTENT.service;

const serviceIcons = {
    Dumbbell,
    MonitorSmartphone,
    Apple,
};

const Services = () => {
    return (
        <section
            id="coaching"
            className="relative overflow-hidden bg-[#141414] py-20"
        >
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">


                {/* HEADER */}
                <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-start">
                    {/* LEFT */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >

                        <div className="relative">
                            {/* Background text */}
                            <h2
                                style={{
                                    WebkitTextStroke:
                                        "1px rgba(255,255,255,.12)",
                                    fontFamily:
                                        "var(--font-oswald)",
                                }}
                                className="absolute -top-6 left-0 text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-transparent"
                            >
                                {service.heading.backgroundTitle}
                            </h2>

                            <h3
                                data-aos="fade-up"
                                data-aos-delay="200"
                                style={{
                                    fontFamily:
                                        "var(--font-oswald)",
                                }}
                                className="relative pt-5 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                            >

                                {service.heading.title} {" "}


                                <span className="text-[#E8A428]">
                                    {service.heading.highlightText}
                                </span>{" "}

                                {service.heading.titleEnd}

                            </h3>
                        </div>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            style={{fontFamily:"var(--font-poppins)",}}
                            className="
                            mt-5
                            text-sm
                            sm:text-base
                            leading-relaxed
                            text-[#C0C0C0]
                            "
                        >
                            {service.description}
                        </p>

                    </div>

                    {/* BUTTONS */}
                    <div
                        data-aos="fade-left"
                        data-aos-duration="1200"
                        className="flex flex-row lg:justify-end lg:items-end"
                    >

                        {service.buttons.map((stat, index) => (


                            <a
                                key={stat.id}
                                href={stat.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-aos="zoom-in"
                                data-aos-delay={index * 200}
                                style={{
                                    fontFamily: "var(--font-roboto-condensed)",
                                }}
                                className={`mt-0 lg:mt-20 rounded-full px-8 py-2 text-[16px] font-semibold transition-all duration-300 cursor-pointer transition-all duration-300

                ${index === 0 ? `bg-[#E8A428] text-black ` : `border border-[#E8A428] bg-transparent text-[#F4E3C1] hover:bg-[#E8A428] hover:text-black`}`}
                                title={stat.text}
                            >

                                {stat.text}

                            </a>

                        ))}

                    </div>
                </div>




                {/* SERVICE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

                    {service.cards.map((card, index) => {

                        const Icon =
                            serviceIcons[
                            card.icon as keyof typeof serviceIcons
                            ];


                        return (

                            <div
                                key={card.id}
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay={index * 180}
                                className="group bg-[#1a1a1a] border border-[#D6DCE5]/20 p-5 sm:p-6 lg:p-8 flex flex-col gap-5 transition-all duration-500 hover:border-[#E8A428]/50 hover:-translate-y-2"
                            >


                                {/* ICON */}
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-[#E8A428] transition-transform duration-500 group-hover:scale-110"
                                >
                                    <Icon
                                        className="w-5 h-5 sm:w-7 sm:h-7 text-[#E8A428]"
                                    />
                                </div>



                                <div className="flex flex-col gap-3">


                                    <h2
                                        style={{
                                            fontFamily:
                                                "var(--font-oswald)",
                                        }}
                                        className="text-xl sm:text-2xl lg:text-[27px] font-medium text-[#FFF7DF]"
                                    >
                                        {card.title}
                                    </h2>



                                    <p
                                        style={{ fontFamily: "var(--font-poppins)", }}
                                        className="text-sm sm:text-[14px] leading-relaxed text-[#C0C0C0]"
                                    >
                                        {card.description}
                                    </p>



                                    <div className="flex flex-wrap gap-2">

                                        {card.tags.map((tag, tagIndex) => (

                                            <span
                                                key={tagIndex}
                                                style={{ fontFamily: "var(--font-poppins)", }}
                                                className="px-3 py-1 text-xs sm:text-sm border border-[#C0C0C0] text-[#C0C0C0]"
                                            >
                                                {tag}
                                            </span>

                                        ))}

                                    </div>


                                </div>


                            </div>

                        );
                    })}


                </div>


            </div>
        </section>
    );
};

export default Services;