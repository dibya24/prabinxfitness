"use client";

import Marquee from "react-fast-marquee";
import { Star, Dumbbell, Users, Repeat, Trophy } from "lucide-react";

const services = [
  { label: "FAT LOSS PLAN", icon: Star },
  { label: "HYPERTROPHY", icon: Dumbbell },
  { label: "ONE-ON-ONE TRAINING", icon: Users },
  { label: "BODY RECOMPOSITION", icon: Repeat },
  { label: "NUTRITIONAL GUIDANCE", icon: Trophy },
];

function MarqueeItems({ textColor = "text-black" }: { textColor?: string }) {
  return (
    <div className="flex items-center">
      {services.map(({ label, icon: Icon }, index) => (
        <div key={index} className="flex items-center gap-3 px-8 shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} strokeWidth={1.5} />
          <span
            style={{ fontFamily: "var(--font-oswald)" }}
            className={`whitespace-nowrap text-lg uppercase sm:text-xl ${textColor}`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div
      className="relative z-40 overflow-hidden isolate bg-transparent -mt-16 -mb-16 sm:-mt-20 sm:-mb-20"
      style={{ height: "calc(9vw + 70px)" }}
    >
      {/* Back outlined strip */}
      <div
        className="absolute z-10 top-1/2 -translate-y-1/2 rotate-[5deg] overflow-hidden border-y border-[#E8A428]/50 bg-transparent py-3"
        style={{ left: "-20px", right: "-20px" }}
      >
        <div className="marquee-transparent-wrapper">
          <Marquee direction="right" speed={40} autoFill gradient={false}>
            <MarqueeItems textColor="text-[#E8A428]" />
          </Marquee>
        </div>
      </div>

      {/* Main gold strip (STRAIGHT) */}
      <div className="absolute z-20 inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden bg-[#E8A428] py-4 shadow-2xl">
        <div className="marquee-transparent-wrapper">
          <Marquee direction="left" speed={40} autoFill gradient={false}>
            <MarqueeItems textColor="text-black" />
          </Marquee>
        </div>
      </div>

      <style jsx global>{`
        .marquee-transparent-wrapper,
        .marquee-transparent-wrapper * {
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}