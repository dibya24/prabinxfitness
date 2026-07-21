'use client';

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Volume2, VolumeX, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

import Image2 from "../../../public/images/gallery/two.png";
import Image9 from "../../../public/images/gallery/one.png";
import Image5 from "../../../public/images/gallery/three.png";
import Image8 from "../../../public/images/gallery/client.jpg";

type MediaItem = {
    type: 'image' | 'video';
    src: StaticImageData | string;
    poster?: StaticImageData | string;
    title: string;
    category: string;
    size: 'lg' | 'md';
};

const defaultMediaItems: MediaItem[] = [
    // { type: 'image', src: Image9, title: 'Morning strength block', category: 'STRENGTH', size: 'lg' },
    { type: 'video', src: 'https://res.cloudinary.com/bz4xcvt7/video/upload/v1784446538/6103b752-c0a6-4b60-9804-3dc05bc5fe8e_cpge3c.mov', title: 'Form check — deadlift', category: 'COACHING', size: 'lg' },
    { type: 'image', src: Image8, title: 'Six months in', category: 'CLIENT STORY', size: 'md' },
    { type: 'video', src: 'https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345178/IMG_4390_iyexkw.mov', poster: Image5, title: 'Conditioning circuit', category: 'CONDITIONING', size: 'lg' },
    { type: 'image', src: Image9, title: 'Group conditioning', category: 'CONDITIONING', size: 'lg' },
    { type: 'video', src: 'https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345155/IMG_2908_stmago.mp4', poster: Image2, title: 'Form check — deadlift', category: 'COACHING', size: 'md' },
    // { type: 'image', src: 'https://res.cloudinary.com/bz4xcvt7/image/upload/f_auto,q_auto/v1784345340/IMG_3764_vsinct.heic', title: 'Six months in', category: 'CLIENT STORY', size: 'md' },
    // { type: 'image', src: Image8, title: 'One-on-one session', category: 'COACHING', size: 'md' },
    // { type: 'video', src: '/videos/training-clip-3.mp4', poster: Image7, title: 'Off-season progress', category: 'CLIENT STORY', size: 'md' },
    { type: 'image', src: 'https://res.cloudinary.com/bz4xcvt7/image/upload/f_auto,q_auto/v1784345340/IMG_3764_vsinct.heic', title: 'Recovery day', category: 'STRENGTH', size: 'md' },
    // { type: 'image', src: Image9, title: 'Recovery day', category: 'STRENGTH', size: 'md' },
];

// 🔧 Tile widths still scale per breakpoint, but ALL breakpoints participate
// in the same pinned horizontal-scroll track now — no separate mobile mode.
const tileWidthClass = {
    lg: 'w-[86vw] xs:w-[80vw] sm:w-[68vw] md:w-[58vw] lg:w-[48vw] xl:w-[42vw] 2xl:w-[38vw]',
    md: 'w-[80vw] xs:w-[72vw] sm:w-[42vw] md:w-[34vw] lg:w-[28vw] xl:w-[24vw] 2xl:w-[21vw]',
};

// ============================================================
// Video tile
// ============================================================
function VideoTile({
    src,
    poster,
    onOpen,
}: {
    src: string;
    poster?: StaticImageData | string;
    onOpen: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoEl.play().catch(() => { });
                    setStarted(true);
                } else {
                    videoEl.pause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoEl);
        return () => observer.disconnect();
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const videoEl = videoRef.current;
        if (!videoEl) return;
        videoEl.muted = !videoEl.muted;
        setMuted(videoEl.muted);
    };

    return (
        <div className="relative w-full h-full">
            <video
                ref={videoRef}
                src={src}
                poster={typeof poster === 'string' ? poster : poster?.src}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                onClick={onOpen}
                className="object-cover w-full h-full block"
            />

            {!started && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" fill="white" />
                </div>
            )}

            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A428] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/80">CLIP</span>
            </div>

            <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center justify-center
                           w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-sm
                           opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
                {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
        </div>
    );
}

// ============================================================ Tile ============================================================ // 
function Tile({
    item,
    index,
    onOpen,
    setRef,
}: {
    item: MediaItem;
    index: number;
    onOpen: () => void;
    setRef: (el: HTMLDivElement | null) => void;
}) {
    return (
        <div
            ref={setRef}
            data-index={index}
            className={`gallery-tile group relative flex-none rounded-xl sm:rounded-2xl overflow-hidden
                        h-[50vh] xs:h-[54vh] sm:h-[58vh] md:h-[64vh] lg:h-[70vh] ${tileWidthClass[item.size]}`}
        >
            <span
                style={{ fontFamily: 'var(--font-oswald)' }}
                className="absolute -top-2 left-2 sm:-top-3 sm:left-3 text-[64px] xs:text-[76px] sm:text-[96px] md:text-[120px] lg:text-[140px] font-bold leading-none
                           text-white/[0.06] select-none pointer-events-none z-10"
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            {item.type === 'video' ? (
                <VideoTile src={item.src as string} poster={item.poster} onOpen={onOpen} />
            ) : (
                <button onClick={onOpen} className="relative w-full h-full block cursor-pointer">
                    <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 40vw"
                    />
                </button>
            )}

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            <div
                className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 md:p-5 lg:p-6 z-10 pointer-events-none
                           translate-y-0 opacity-100
                           lg:translate-y-4 lg:opacity-0
                           transition-all duration-300 ease-out
                           lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            >
                <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] text-[#E8A428]">
                    {item.category}
                </span>
                <h3
                    style={{ fontFamily: 'var(--font-oswald)' }}
                    className="mt-1 text-sm sm:text-base md:text-lg lg:text-xl uppercase text-[#FFF7DF] leading-tight"
                >
                    {item.title}
                </h3>
            </div>
        </div>
    );
}

// ============================================================
// Lightbox
// ============================================================
function Lightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-3 sm:p-6 md:p-10"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 flex items-center justify-center
                           w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
            >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            <div className="relative w-full max-w-6xl max-h-[80vh] sm:max-h-[85vh] aspect-video" onClick={(e) => e.stopPropagation()}>
                {item.type === 'video' ? (
                    <video src={item.src as string} controls autoPlay playsInline className="w-full h-full object-contain rounded-lg" />
                ) : (
                    <Image src={item.src} alt={item.title} fill className="object-contain rounded-lg" sizes="90vw" />
                )}
            </div>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-center px-4" onClick={(e) => e.stopPropagation()}>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#E8A428]">{item.category}</span>
                <h3 style={{ fontFamily: 'var(--font-oswald)' }} className="mt-1 text-lg sm:text-xl uppercase text-[#FFF7DF]">
                    {item.title}
                </h3>
            </div>
        </div>
    );
}

// ============================================================
// Main gallery — pinned horizontal scroll on EVERY screen size.
// Driven by page scroll position (works identically for mouse
// wheel, trackpad, and touch swipe — no mode-switching needed).
// ============================================================
type GalleryItemData = {
    type: 'image' | 'video';
    src: StaticImageData | string;
    poster?: StaticImageData | string;
    title: string;
    category: string;
    size: 'lg' | 'md';
};

export default function BentoGallery({ items }: { items?: GalleryItemData[] | null }) {
    const mediaItems = items && items.length > 0 ? items : defaultMediaItems;
    const pinWrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const maxTranslateRef = useRef(0);

    // ---- Measure track width & size the pin wrapper so scroll distance
    //      through the wrapper exactly covers the horizontal travel needed ----
    const recalc = useCallback(() => {
        const wrapper = pinWrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track) return;

        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxTranslate = Math.max(0, trackWidth - viewportWidth);
        maxTranslateRef.current = maxTranslate;
        wrapper.style.height = `${window.innerHeight + maxTranslate}px`;
    }, []);

    useLayoutEffect(() => {
        recalc();

        let resizeTimer: ReturnType<typeof setTimeout>;
        const debouncedRecalc = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(recalc, 150);
        };

        const ro = new ResizeObserver(debouncedRecalc);
        if (trackRef.current) ro.observe(trackRef.current);

        window.addEventListener('resize', debouncedRecalc);
        window.addEventListener('orientationchange', debouncedRecalc);

        return () => {
            clearTimeout(resizeTimer);
            ro.disconnect();
            window.removeEventListener('resize', debouncedRecalc);
            window.removeEventListener('orientationchange', debouncedRecalc);
        };
    }, [recalc]);

    // ---- Drive translateX + progress + active tile from page scroll ----
    useEffect(() => {
        let ticking = false;
        const update = () => {
            ticking = false;
            const wrapper = pinWrapperRef.current;
            const track = trackRef.current;
            if (!wrapper || !track) return;

            const rect = wrapper.getBoundingClientRect();
            const total = wrapper.offsetHeight - window.innerHeight;
            if (total <= 0) return;

            const raw = -rect.top / total;
            const clamped = Math.min(1, Math.max(0, raw));

            const offset = clamped * maxTranslateRef.current;
            track.style.transform = `translateX(-${offset}px)`;
            setProgress(clamped);

            const viewportCenter = offset + window.innerWidth / 2;
            let closest = 0;
            let closestDist = Infinity;
            tileRefs.current.forEach((el, i) => {
                if (!el) return;
                const tileCenter = el.offsetLeft + el.offsetWidth / 2;
                const dist = Math.abs(tileCenter - viewportCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = i;
                }
            });
            setActiveIndex(closest);
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollByTile = useCallback((dir: 1 | -1) => {
        window.scrollBy({ top: window.innerWidth * 0.6 * dir, behavior: 'smooth' });
    }, []);

    return (
        <section id="work" className="relative bg-[#0B0B0B]">
            <style>{`
                .gallery-track { scrollbar-width: none; -ms-overflow-style: none; }
                .gallery-track::-webkit-scrollbar { display: none; }
                @media (prefers-reduced-motion: reduce) {
                    .gallery-tile img, .gallery-tile video { transition: none !important; }
                }
            `}</style>

            {/* ===== Heading ===== */}
            <div className="max-w-7xl mx-auto pt-20 px-[20px] flex flex-col">
                <div className='flex flex-col gap-2'>
                    <div className='relative'>
                        <h2
                            className="absolute -top-5 left-0 text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-transparent"
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,.12)",
                                fontFamily: "var(--font-oswald)",
                            }}
                        >
                            Gallery
                        </h2>

                        <h3
                            data-aos="fade-up"
                            data-aos-delay="200"
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className="relative pt-5 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
                        >
                            MY
                            {" "}

                            <span className="text-[#E8A428]">
                                Collections
                            </span> {" "}

                            till now
                        </h3>
                    </div>
                </div>
            </div>

            {/* ===== Pinned horizontal-scroll wrapper — active on ALL screen sizes ===== */}
            <div ref={pinWrapperRef} className="relative">
                <div className="mx-auto max-w-8xl sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                    <div
                        ref={trackRef}
                        className="gallery-track flex gap-3 xs:gap-4 sm:gap-5 px-4 xs:px-6 md:px-10 lg:px-12 will-change-transform"
                    >
                        {mediaItems.map((item, i) => (
                            <Tile
                                key={i}
                                item={item}
                                index={i}
                                setRef={(el) => (tileRefs.current[i] = el)}
                                onOpen={() => setLightboxIndex(i)}
                            />
                        ))}
                        <div className="flex-none w-4 xs:w-6 lg:w-12" aria-hidden />
                    </div>

                    {/* Scrub bar */}
                    <div className="max-w-[1800px] w-full mx-auto px-4 xs:px-6 md:px-10 lg:px-12 mt-5 xs:mt-6 lg:mt-8 flex items-center gap-3 xs:gap-4 lg:gap-5">
                        <button
                            onClick={() => scrollByTile(-1)}
                            className="w-7 h-7 xs:w-8 xs:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full border border-[#262626]
                                       text-[#A8A8A8] hover:text-[#E8A428] hover:border-[#E8A428] transition-colors shrink-0"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </button>

                        <div className="relative flex-1 h-[2px] bg-[#262626] rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-[#E8A428] rounded-full transition-[width] duration-150 ease-out"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>

                        <span className="font-mono text-[9px] xs:text-[10px] lg:text-[11px] tracking-[0.15em] lg:tracking-[0.2em] text-[#E8A428] w-20 xs:w-24 lg:w-32 text-right truncate shrink-0">
                            {mediaItems[activeIndex]?.category}
                        </span>

                        <button
                            onClick={() => scrollByTile(1)}
                            className="w-7 h-7 xs:w-8 xs:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full border border-[#262626]
                                       text-[#A8A8A8] hover:text-[#E8A428] hover:border-[#E8A428] transition-colors shrink-0"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (
                <Lightbox item={mediaItems[lightboxIndex]} onClose={() => setLightboxIndex(null)} />
            )}
        </section>
    );
}