import Image from "next/image";
import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import MarqueeStrip from "@/src/components/home/MarqueeStrip";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      {/* <MarqueeStrip /> */}
    </div>
  );
}