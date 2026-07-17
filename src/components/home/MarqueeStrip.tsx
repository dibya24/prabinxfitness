"use client";

import { Star, Dumbbell, Users, Repeat, Trophy } from "lucide-react";

const services = [
  { label: "FAT LOSS PLAN", icon: Star },
  { label: "HYPERTROPHY", icon: Dumbbell },
  { label: "ONE-ON-ONE TRAINING", icon: Users },
  { label: "BODY RECOMPOSITION", icon: Repeat },
  { label: "NUTRITIONAL GUIDANCE", icon: Trophy },
];

function MarqueeContent({
  textColor = "text-black",
}: {
  textColor?: string;
}) {
  return (
    <>
      {[0, 1].map((repeat) =>
        services.map(({ label, icon: Icon }, index) => (
          <div
            key={`${repeat}-${index}`}
            className="flex items-center gap-3 px-8 shrink-0"
          >
            <Icon className={`h-5 w-5 ${textColor}`} strokeWidth={1.5} />
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
    <div
      className="relative z-40 overflow-hidden isolate bg-transparent -mt-16 -mb-16 sm:-mt-20 sm:-mb-20"
      style={{
        height: "calc(9vw + 70px)",
      }}
    >
      {/* Back outlined strip */}
      <div
        className="absolute z-10 top-1/2 -translate-y-1/2 rotate-[5deg] overflow-hidden border-y border-[#E8A428]/50 bg-transparent py-3"
        style={{ left: "-20px", right: "-20px" }}
      >
        <div className="marquee-reverse flex w-max items-center">
          <MarqueeContent textColor="text-[#E8A428]" />
        </div>
      </div>

      {/* Main gold strip (STRAIGHT) */}
      <div className="absolute z-20 inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden bg-[#E8A428] py-4 shadow-2xl">
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