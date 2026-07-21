"use client";

import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";

export default function Preloader() {

    const [progress, setProgress] = useState(0);
    const [hide, setHide] = useState(false);


    useEffect(() => {

        if (
            typeof window !== "undefined" &&
            window.__preloaderFinished
        ) {
            setTimeout(() => {
                setHide(true);
                setProgress(100);
            }, 0);
            return;
        }


        const interval = setInterval(() => {

            setProgress((prev) => {

                if (prev >= 100) {

                    clearInterval(interval);

                    setTimeout(() => {

                        setHide(true);

                        if (typeof window !== "undefined") {

                            window.__preloaderFinished = true;

                            window.dispatchEvent(
                                new Event("preloaderFinished")
                            );
                        }

                    }, 700);


                    return 100;
                }


                const remaining = 100 - prev;

                const increment = Math.max(
                    1,
                    Math.ceil(remaining * 0.08)
                );


                return Math.min(
                    prev + increment,
                    100
                );

            });


        }, 90);



        return () => clearInterval(interval);


    }, []);



    return (

        <div
            className={`
            fixed inset-0 z-[99999]
            flex items-center justify-center
            overflow-hidden
            bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0b0b0b_55%,_#000000_100%)]
            transition-all
            duration-700
            ease-out

            ${
                hide
                    ? "opacity-0 blur-md scale-105 pointer-events-none"
                    : "opacity-100 scale-100"
            }
            `}
        >


            {/* Ambient Glow */}

            <div
                className="
                absolute
                h-[400px]
                w-[400px]
                rounded-full
                bg-[#E8A428]/10
                blur-[120px]
                "
            />



            <div
                className="
                relative
                flex
                flex-col
                items-center
                gap-9
                "
            >



                {/* Icon */}

                <div
                    className="
                    relative
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    "
                >

                    {/* Glow */}

                    <div
                        className="
                        absolute
                        inset-0
                        rounded-full
                        bg-[#E8A428]/20
                        blur-xl
                        "
                    />


                    {/* Outer Ring */}

                    <div
                        className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#E8A428]/50
                        "
                    />


                    {/* Inner Ring */}

                    <div
                        className="
                        absolute
                        inset-3
                        rounded-full
                        border
                        border-[#E8A428]/20
                        "
                    />



                    {/* Pulse */}

                    <div
                        className="
                        absolute
                        inset-0
                        rounded-full
                        bg-[#E8A428]/10
                        animate-ping
                        "
                    />



                    <Dumbbell
                        className="
                        relative
                        z-10
                        h-10
                        w-10
                        text-[#E8A428]
                        animate-[spin_8s_linear_infinite]
                        "
                    />

                </div>





                {/* Brand */}

                <div
                    className="
                    text-center
                    "
                >


                    <h1
                        style={{
                            fontFamily: "var(--font-oswald)"
                        }}
                        className="
                        text-5xl
                        md:text-6xl
                        uppercase
                        tracking-[0.18em]
                        font-semibold
                        text-[#FFF7DF]
                        "
                    >

                        PRABIN{" "}

                        <span
                            className="
                            text-[#E8A428]
                            "
                        >
                            MAHARJAN
                        </span>


                    </h1>



                    <p
                        style={{
                            fontFamily: "var(--font-poppins)"
                        }}
                        className="
                        mt-4
                        text-xs
                        uppercase
                        tracking-[0.45em]
                        text-[#999]
                        "
                    >

                        Certified Personal Trainer

                    </p>



                    <p
                        style={{
                            fontFamily: "var(--font-poppins)"
                        }}
                        className="
                        mt-2
                        text-sm
                        text-[#666]
                        "
                    >

                        Strength • Fat Loss • Muscle Building

                    </p>


                </div>






                {/* Progress */}

                <div
                    className="
                    w-[280px]
                    "
                >



                    <div
                        className="
                        h-[5px]
                        overflow-hidden
                        rounded-full
                        bg-[#222]
                        "
                    >

                        <div

                            className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-[#A06B16]
                            via-[#E8A428]
                            to-[#FFD56A]
                            shadow-[0_0_20px_rgba(232,164,40,0.8)]
                            transition-all
                            duration-300
                            "
                            style={{
                                width: `${progress}%`
                            }}

                        />


                    </div>





                    <div
                        className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        "
                    >


                        <span
                            className="
                            text-xs
                            uppercase
                            tracking-[0.35em]
                            text-[#777]
                            animate-pulse
                            "
                        >

                            Loading...

                        </span>




                        <span
                            className="
                            text-sm
                            font-medium
                            tracking-wider
                            text-[#E8A428]
                            "
                        >

                            {progress}%

                        </span>



                    </div>


                </div>





            </div>





            {/* Bottom Accent */}

            <div
                className="
                absolute
                bottom-10
                left-1/2
                -translate-x-1/2
                "
            >

                <div
                    className="
                    h-px
                    w-32
                    bg-gradient-to-r
                    from-transparent
                    via-[#E8A428]
                    to-transparent
                    "
                />


            </div>



        </div>

    );

}