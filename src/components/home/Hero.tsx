"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            (window as any).__preloaderFinished
        ) {
            setIsLoaded(true);
            return;
        }

        const handlePreloaderFinished = () => {
            setIsLoaded(true);
        };

        window.addEventListener(
            "preloaderFinished",
            handlePreloaderFinished
        );

        return () => {
            window.removeEventListener(
                "preloaderFinished",
                handlePreloaderFinished
            );
        };
    }, []);

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">

            {/* Gold Glow */}
            <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-[2500ms] ease-out ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "radial-gradient(60% 55% at 50% 68%, rgba(168,124,20,0.55) 0%, rgba(120,88,14,0.28) 35%, rgba(0,0,0,0) 70%)",
                }}
            />


            {/* Background Text */}
            <div
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="200"
                style={{
                    fontFamily: "var(--font-oswald)",
                }}
                className="pointer-events-none absolute inset-x-0 top-[55%] -translate-y-1/2 select-none whitespace-nowrap text-center text-[5rem] font-black uppercase leading-none tracking-tight text-white/5 sm:text-[7rem] md:text-[10rem] lg:text-[14rem]"
            >
                PRABINXFITNESS
            </div>



            {/* Content */}
            <div
                className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24 text-center"
            >


                {/* Heading */}
                <h1
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="300"
                    style={{
                        fontFamily: "var(--font-oswald)",
                    }}
                    className="max-w-4xl pt-8.75 text-4xl font-extrabold uppercase leading-[1.2] tracking-tight text-[#FFF7DF] sm:text-5xl md:text-6xl"
                >
                    Strength forged in{" "}
                    <span className="text-[#E8A428]">
                        Mountains.
                    </span>

                    <br />

                    <span className="text-[#E8A428]">
                        refined in the{" "}
                        <span className="text-[#FFF7DF]">
                            desert.
                        </span>
                    </span>
                </h1>



                {/* Description */}
                <p
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="500"
                    style={{
                        fontFamily: "var(--font-poppins)",
                    }}
                    className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                >
                    Transform your body and build lasting confidence with
                    personalized training designed for your goals.
                </p>



                {/* Buttons */}
                <div
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="700"
                    className="mt-8 flex flex-wrap justify-center gap-4"
                >
                    <button
                        style={{
                            fontFamily: "var(--font-poppins)",
                        }}
                        className="cursor-pointer rounded-md bg-[#E8A428] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105"
                    >
                        About Me
                    </button>


                    <button
                        style={{
                            fontFamily: "var(--font-poppins)",
                        }}
                        className="cursor-pointer rounded-md border border-[#E8A428] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#E8A428] hover:text-black"
                    >
                        Contact Now
                    </button>

                </div>



                {/* Trainer Image */}
                <div
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                    data-aos-delay="900"
                    className="relative mt-8 w-[75vw] max-w-[400px]"
                >
                    <Image
                        src="/images/C187B05D-DE03-47DD-BA7A-29E635CF901F 3.png"
                        alt="Prabin, UK certified personal trainer"
                        width={400}
                        height={600}
                        priority
                        className="h-auto w-full object-contain"
                    />
                </div>


            </div>

        </section>
    );
}