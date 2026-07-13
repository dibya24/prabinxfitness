import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <div className="bg-[#141414]">
            <section className="relative max-w-7xl mx-auto h-[382px] overflow-hidden px-6">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/banner.png"
                        alt="Gym Banner"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            </section>
        </div>
    );
};

export default Banner;