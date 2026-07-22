import Hero from "@/src/components/home/Hero";
import MarqueeStrip from "@/src/components/home/MarqueeStrip";
import About from "@/src/components/home/About"; 
import Services from "@/src/components/home/Services";
import Banner from "@/src/components/home/Banner";
import WhyChoose from "@/src/components/home/WhyChoose";
import Gallery from "@/src/components/home/Gallery";
import Testimonials from "@/src/components/home/Testimonials";
import Form from "@/src/components/home/Form";
import { prisma } from "@/src/lib/prisma";


export default async function Home() {
  const heroData = await prisma.hero.findFirst();
  const aboutData = await prisma.about.findFirst();
  const statsData = await prisma.stat.findMany();
  const serviceSectionData = await prisma.serviceSection.findFirst();
  const servicesData = await prisma.serviceCard.findMany();
  const testimonialSectionData = await prisma.testimonialSection.findFirst();
  const testimonialsData = await prisma.testimonial.findMany();
  const galleryData = (await prisma.galleryItem.findMany()).map((item) => ({
    ...item,
    type: item.type as "image" | "video",
    size: item.size as "lg" | "md",
    poster: item.poster || undefined,
  }));
  const whyChooseSectionData = await prisma.whyChooseSection.findFirst();
  const whyChooseFeaturesData = await prisma.whyChooseFeature.findMany({ orderBy: { order: "asc" } });
  const marqueeItemsData = await prisma.marqueeItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      {/* <Navbar /> */}
      <Hero data={heroData} />
      <MarqueeStrip items={marqueeItemsData} />
      <About data={aboutData} stats={statsData} /> 
      <Services sectionData={serviceSectionData} cards={servicesData} />
      <Banner />
      <WhyChoose sectionData={whyChooseSectionData} features={whyChooseFeaturesData} />
      <Testimonials sectionData={testimonialSectionData} reviews={testimonialsData} />
      <Gallery items={galleryData} />
      <Form />
    </div>
  );
}