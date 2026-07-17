import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <section className="bg-[#141414]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                <div
                    className="
                        relative
                        overflow-hidden

                        rounded-[12px]
                        sm:rounded-[16px]
                        lg:rounded-[20px]

                        aspect-[16/9]
                        sm:aspect-[21/9]
                        lg:aspect-[3/1]

                        max-h-[400px]
                    "
                >
                    <Image
                        src="/images/banner.png"
                        alt="Gym Banner"
                        fill
                        priority
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 90vw,
                            1280px
                        "
                        className="
                            object-cover
                            object-center
                        "
                    />

                    {/* Optional Dark Overlay */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

            </div>
        </section>
    );
};

export default Banner;