import Hero from "@/src/components/home/Hero";
import MarqueeStrip from "@/src/components/home/MarqueeStrip";
import About from "@/src/components/home/About";
import Services from "@/src/components/home/Services";
import Banner from "@/src/components/home/Banner";
import Mistake from "@/src/components/home/Mistake";
import WhyChoose from "@/src/components/home/WhyChoose";
import Gallery from "@/src/components/home/Gallery";
import Testimonials from "@/src/components/home/Testimonials";
import Form from "@/src/components/home/Form";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Parallelized fetching for fast server-side response times
  const [
    heroData,
    aboutData,
    statsData,
    serviceSectionData,
    servicesData,
    testimonialSectionData,
    testimonialsData,
    galleryRawData,
    mistakeSectionData,
    whyChooseSectionData,
    whyChooseFeaturesData,
    marqueeItemsData,
  ] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.about.findFirst(),
    prisma.stat.findMany(),
    prisma.serviceSection.findFirst(),
    prisma.serviceCard.findMany(),
    prisma.testimonialSection.findFirst(),
    prisma.testimonial.findMany(),
    prisma.galleryItem.findMany(),
    prisma.mistakeSection.findFirst({
      include: {
        mistakes: {
          orderBy: {
            order: "asc",
          },
        },
      },
    }),
    prisma.whyChooseSection.findFirst(),
    prisma.whyChooseFeature.findMany({ orderBy: { order: "asc" } }),
    prisma.marqueeItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const galleryData = galleryRawData.map((item) => ({
    ...item,
    type: item.type as "image" | "video",
    size: item.size as "lg" | "md",
    poster: item.poster || undefined,
  }));

  return (
    <main>
      <Hero data={heroData} />
      <MarqueeStrip items={marqueeItemsData} />
      <About data={aboutData} stats={statsData} />
      <Services sectionData={serviceSectionData} cards={servicesData} />
      <Banner />
      <Mistake sectionData={mistakeSectionData} />
      <WhyChoose sectionData={whyChooseSectionData} features={whyChooseFeaturesData} />
      <Testimonials sectionData={testimonialSectionData} reviews={testimonialsData} />
      <Gallery items={galleryData} />
      <Form />
    </main>
  );
}
