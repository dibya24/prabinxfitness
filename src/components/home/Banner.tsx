import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <section className="bg-[#141414]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[20px]

                        h-[140px]
                        sm:h-[220px]
                        md:h-[280px]
                        lg:h-[340px]
                        xl:h-[400px]
                    "
                >
                    <Image
                        src="/images/banner.png"
                        alt="Gym Banner"
                        fill
                        priority
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 768px) 100vw,
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