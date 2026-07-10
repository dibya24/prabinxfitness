"use client";

import {
  Star,
  Dumbbell,
  Users,
  Repeat,
  Trophy,
} from "lucide-react";

const services = [
  { label: "FAT LOSS PLAN", icon: Star },
  { label: "HYPERTROPHY", icon: Dumbbell },
  { label: "ONE-ON-ONE TRAINING", icon: Users },
  { label: "BODY RECOMPOSITION", icon: Repeat },
  { label: "NUTRITIONAL GUIDANCE", icon: Trophy },
];

function MarqueeContent({
  textColor,
}: {
  textColor: string;
}) {
  return (
    <>
      {[0, 1].map((rep) =>
        services.map(({ label, icon: Icon }, i) => (
          <div
            key={`${rep}-${i}`}
            className="flex items-center gap-3 px-6 lg:px-8"
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${textColor} lg:h-5 lg:w-5`}
              strokeWidth={1.75}
            />

            <span
              style={{ fontFamily: "var(--font-oswald)" }}
              className={`whitespace-nowrap text-sm font-semibold uppercase ${textColor} sm:text-base lg:text-xl`}
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
    <div className="relative z-30 -mt-6 mb-[-60px] h-[120px] w-full overflow-hidden">
      {/* Back Transparent Strip */}

      <div className="absolute top-0 left-0 w-full rotate-[4deg] overflow-hidden border-y border-[#E8A428]/40 py-3">
        <div className="marquee-reverse flex w-max items-center">
          <MarqueeContent textColor="text-[#E8A428]" />
        </div>
      </div>

      {/* Front Gold Strip */}

      <div className="absolute top-8 left-0 w-full overflow-hidden bg-[#E8A428] py-4 shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
        <div className="marquee-forward flex w-max items-center">
          <MarqueeContent textColor="text-black" />
        </div>
      </div>

      <style jsx>{`
        .marquee-forward {
          animation: marqueeForward 22s linear infinite;
        }

        .marquee-reverse {
          animation: marqueeReverse 22s linear infinite;
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