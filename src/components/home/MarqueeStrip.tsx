"use client";
import { Star, Dumbbell, Users, Repeat, Trophy } from "lucide-react";

const services = [
    { label: "FAT LOSS PLAN", icon: Star },
    { label: "HYPERTROPHY", icon: Dumbbell },
    { label: "ONE-ON-ONE TRAINING", icon: Users },
    { label: "BODY RECOMPOSITION", icon: Repeat },
    { label: "NUTRITIONAL GUIDANCE", icon: Trophy },
];

function MarqueeContent({ textColor = "text-black" }: { textColor?: string }) {
    // Rendered twice so the 0%→-50% animation loop has no visible seam.
    return (
        <>
            {[0, 1].map((rep) =>
                services.map(({ label, icon: Icon }, i) => (
                    <div key={`${rep}-${i}`} className="flex items-center gap-3 px-8">
                        <Icon className={`h-5 w-5 shrink-0 ${textColor}`} strokeWidth={1.5} />
                        <span
                            style={{ fontFamily: "var(--font-oswald)" }}
                            className={`whitespace-nowrap text-lg uppercase sm:text-xl ${textColor}`}
                        >
                            {label}
                        </span>
                    </div>
                ))
            )}
        </>
    );
}

export default function MarqueeStrip() {
    return (
        <div className="relative z-30 -mt-8 mb-[-60px] h-[120px] overflow-visible">
            {/* Thin bordered ticker line, sits behind and pokes out past the main band */}
            <div className="absolute left-1/2 top-0 w-[120%] -translate-x-1/2 overflow-hidden rotate-[6deg] border-y border-[#E8A428]/50 bg-transparent py-3">
                <div className="marquee-reverse flex w-max items-center">
                    <MarqueeContent textColor="text-[#E8A428]" />
                </div>
            </div>

            {/* Main solid gold band */}
            <div className="absolute left-1/2 top-8 w-[120%] -translate-x-1/2 overflow-hidden rotate-[3deg] bg-[#E8A428] py-4 shadow-2xl">
                <div className="marquee-forward flex w-max items-center">
                    <MarqueeContent textColor="text-black" />
                </div>
            </div>

            <style jsx>{`
        .marquee-forward {
          animation: marqueeForward 25s linear infinite;
        }
        .marquee-reverse {
          animation: marqueeReverse 25s linear infinite;
        }
        @keyframes marqueeForward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-forward,
          .marquee-reverse {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
}