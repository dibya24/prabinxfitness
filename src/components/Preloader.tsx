"use client";

import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";

export default function Preloader() {

    const [progress, setProgress] = useState(0);
    const [hide, setHide] = useState(false);


    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).__preloaderFinished) {
            setHide(true);
            setProgress(100);
            return;
        }

        const interval = setInterval(() => {

            setProgress((prev) => {

                if (prev >= 100) {

                    clearInterval(interval);

                    setTimeout(() => {
                        setHide(true);
                        if (typeof window !== "undefined") {
                            (window as any).__preloaderFinished = true;
                            window.dispatchEvent(new Event("preloaderFinished"));
                        }
                    }, 500);

                    return 100;
                }

                return prev + 5;
            });


        }, 80);


        return () => clearInterval(interval);

    }, []);



    return (

        <div
            className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#0b0b0b] transition-all duration-700
            ${hide
                    ? "opacity-0 pointer-events-none scale-110"
                    : "opacity-100"
                }
            `}
        >

            <div className="flex flex-col items-center gap-8">
                {/* Icon */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#E8A428]">

                    <div className="absolute inset-0 rounded-full bg-[#E8A428]/20 animate-ping" />

                    <Dumbbell
                        className="
                        relative
                        z-10
                        h-9
                        w-9
                        text-[#E8A428]
                        "
                    />

                </div>



                {/* Logo Text */}

                <div className="text-center">

                    <h1
                        style={{
                            fontFamily: "var(--font-oswald)"
                        }}
                        className="
                        text-4xl
                        uppercase
                        tracking-widest
                        text-[#FFF7DF]
                        "
                    >
                        PRABIN
                        <span className="text-[#E8A428]">
                            MAHARJAN
                        </span>
                    </h1>


                    <p
                        style={{
                            fontFamily: "var(--font-poppins)"
                        }}
                        className="
                        mt-2
                        text-xs
                        uppercase
                        tracking-[0.4em]
                        text-[#A8A8A8]
                        "
                    >
                        Certified Personal Trainer
                    </p>

                </div>



                {/* Progress */}

                <div className="w-[260px]">


                    <div
                        className="
                        h-[3px]
                        bg-[#222]
                        overflow-hidden
                        "
                    >

                        <div
                            className="
                            h-full
                            bg-[#E8A428]
                            transition-all
                            duration-300
                            "
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>


                    <div className="mt-3 flex justify-between">

                        <span className="text-xs text-[#999]">
                            LOADING
                        </span>


                        <span
                            className="
                            text-sm
                            text-[#E8A428]
                            "
                        >
                            {progress}%
                        </span>

                    </div>


                </div>


            </div>


        </div>

    );
}