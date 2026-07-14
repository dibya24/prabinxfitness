'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/all';

import Image1 from "../../../public/images/Active_iq.png";
import Image2 from "../../../public/images/gallery/two.png";
import Image3 from "../../../public/images/Active_iq.png";
import Image4 from "../../../public/images/Active_iq.png";
import Image5 from "../../../public/images/gallery/three.png";
import Image6 from "../../../public/images/gallery/four.png";
import Image7 from "../../../public/images/gallery/six.png";
import Image8 from "../../../public/images/gallery/client.jpg";
import Image9 from "../../../public/images/gallery/one.png";
import Image10 from "../../../public/images/Active_iq.png";

const images = [
    Image1,
    Image2,
    Image9,
    Image10,
    Image5,
    Image8,
    Image7,
    Image6,
];

const gridAreas = [
    '1 / 1 / 3 / 2',
    '1 / 2 / 2 / 3',
    '2 / 2 / 4 / 3',
    '1 / 3 / 3 / 4',
    '3 / 1 / 4 / 2',
    '3 / 3 / 5 / 4',
    '4 / 1 / 5 / 2',
    '4 / 2 / 5 / 3',
];

export default function BentoGallery() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const flipCtxRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Flip);

        const createTween = () => {
            const galleryElement = galleryRef.current;
            if (!galleryElement) return;

            const galleryItems = galleryElement.querySelectorAll<HTMLElement>('.gallery__item');

            flipCtxRef.current?.revert();
            galleryElement.classList.remove('gallery--final');

            flipCtxRef.current = gsap.context(() => {
                galleryElement.classList.add('gallery--final');
                const flipState = Flip.getState(galleryItems);

                galleryElement.classList.remove('gallery--final');

                const flip = Flip.to(flipState, {
                    simple: true,
                    ease: 'expoScale(1, 5)',
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: galleryElement,
                        start: 'center center',
                        end: '+=100%',
                        scrub: true,
                        pin: galleryElement.parentElement ?? undefined,
                    },
                });

                tl.add(flip);

                return () => gsap.set(galleryItems, { clearProps: 'all' });
            });
        };

        createTween();

        // Use a debounced resize listener to avoid thrashing ScrollTrigger and Flip states
        // when the window is actively being resized, which breaks the coordinates.
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                createTween();
                // Ensure ScrollTrigger recalculates all start/end positions after Flip restarts
                ScrollTrigger.refresh();
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
            flipCtxRef.current?.revert();
        };
    }, []);

    return (
        <>
            <style>{`
        .gallery--bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }
      `}</style>

            <div
                ref={wrapRef}
                className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#000000]" id="work"
            >
                <div
                    ref={galleryRef}
                    id="gallery-8"
                    className="gallery--bento relative w-full h-full flex-none"
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="gallery__item bg-center bg-cover flex-none relative"
                            style={{ gridArea: gridAreas[i] }}
                        >
                            {typeof img === 'string' ? (
                                // External URL
                                <img
                                    src={img}
                                    alt={`Gallery image ${i + 1}`}
                                    className="object-cover w-full h-full block"
                                />
                            ) : (
                                // Local image
                                <Image
                                    src={img}
                                    alt={`Gallery image ${i + 1}`}
                                    className="object-cover"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="px-20 py-8">
                <h2 className="text-2xl font-semibold mb-4">Here is some content</h2>
                {Array.from({ length: 1 }).map((_, i) => (
                    <p key={i} className="text-xl mb-4 leading-relaxed">
                        Saman has been enthralled by magic since 2010. He recalls what he was like as a child. He purchased a few tricks and started practicing them with his family and friends. After meeting a couple in Pokhara in 2013, Saman was asked to perform a stand-up act at their wedding. The reactions to his then-amateurish performance as a magician were astounding, and Saman understood he had the ability to develop his newfound pleasure into something considerably more professional. He has performed as a Magician in Kathmandu for a range of events including corporate events, private parties, weddings, formal dinners, celebrity appearances, trade fairs, and festivals. Elevate your next corporate event with a captivating and thought-provoking performance that blends magic and keynote speaking to inspire and encourage creativity with your audience.
                    </p>
                ))}
            </div> */}
        </>
    );
}











// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import { Flip } from "gsap/Flip";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(Flip, ScrollTrigger);

// const images = [
//     "/images/Active_iq.png",
//     "https://assets.codepen.io/16327/portrait-image-12.jpg",
//     "https://assets.codepen.io/16327/portrait-image-8.jpg",
//     "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
//     "https://assets.codepen.io/16327/portrait-image-4.jpg",
//     "https://assets.codepen.io/16327/portrait-image-3.jpg",
//     "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
//     "https://assets.codepen.io/16327/portrait-image-1.jpg",
// ];

// export default function BentoGallery() {
//     const galleryRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const gallery = galleryRef.current;

//         if (!gallery) return;

//         let ctx: gsap.Context;

//         const createAnimation = () => {
//             ctx?.revert();

//             const items = gallery.querySelectorAll(".gallery-item");

//             gallery.classList.remove("gallery-final");

//             ctx = gsap.context(() => {
//                 gallery.classList.add("gallery-final");

//                 const state = Flip.getState(items);

//                 gallery.classList.remove("gallery-final");

//                 const flip = Flip.to(state, {
//                     duration: 1,
//                     ease: "expo.inOut",
//                     absolute: true,
//                 });

//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: gallery,
//                         start: "center center",
//                         end: "+=100%",
//                         scrub: true,
//                         pin: gallery.parentElement,
//                         invalidateOnRefresh: true,
//                     },
//                 });

//                 tl.add(flip);
//             }, gallery);
//         };

//         createAnimation();

//         window.addEventListener("resize", createAnimation);

//         return () => {
//             window.removeEventListener("resize", createAnimation);
//             ctx?.revert();
//             ScrollTrigger.getAll().forEach((t) => t.kill());
//         };
//     }, []);

//     return (
//         <>
//             <section className="relative h-screen overflow-hidden flex items-center justify-center">
//                 <div
//                     ref={galleryRef}
//                     className="gallery grid h-full w-full justify-center content-center gap-[1vh]"
//                 >
//                     {images.map((image, index) => (
//                         <div
//                             key={index}
//                             className={`gallery-item relative overflow-hidden rounded-xl`}
//                         >
//                             <Image
//                                 src={image}
//                                 alt=""
//                                 fill
//                                 className="object-cover"
//                                 sizes="33vw"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section className="max-w-6xl mx-auto py-24 px-6">
//                 <h2 className="text-5xl font-bold mb-8">
//                     Here is some content
//                 </h2>

//                 {Array.from({ length: 8 }).map((_, i) => (
//                     <p key={i} className="text-lg leading-8 mb-6">
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
//                         aspernatur molestiae consequatur modi saepe asperiores facere
//                         architecto exercitationem. Consequuntur incidunt dolores molestias
//                         fugiat eveniet dignissimos.
//                     </p>
//                 ))}
//             </section>
//         </>
//     );
// }