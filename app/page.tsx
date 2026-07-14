import Image from "next/image";
import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import MarqueeStrip from "@/src/components/home/MarqueeStrip";
import About from "@/src/components/home/About";
import Services from "@/src/components/home/Services";
import Banner from "@/src/components/home/Banner";
import WhyChoose from "@/src/components/home/WhyChoose";
import Gallery from "@/src/components/home/Gallery";
import Testimonials from "@/src/components/home/Testimonials";
import Form from "@/src/components/home/Form";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <MarqueeStrip />
      <About /> 
      <Services />
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Gallery />
      <Form />
    </div>
  );
}