const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed SEO
  const seoCount = await prisma.seo.count();
  if (seoCount === 0) {
    await prisma.seo.create({
      data: {
        id: 1,
        title: "PrabinXFitness | UK Certified Personal Trainer in Dubai, UAE",
        description:
          "UK-certified Level 2 Gym Instructor and Level 3 Personal Trainer helping clients achieve sustainable weight loss, muscle gain, strength, and overall fitness.",
        keywords:
          "Personal Trainer, Certified Personal Trainer, Personal Trainer Dubai, Weight Loss Dubai, Muscle Gain Dubai",
      },
    });
    console.log("✅ Seeded SEO metadata");
  }

  // 2. Seed Hero
  const heroCount = await prisma.hero.count();
  if (heroCount === 0) {
    await prisma.hero.create({
      data: {
        id: 1,
        title: "Strength forged in Mountains. refined in the desert.",
        subtitle: "UK-Certified Personal Trainer | Dubai, UAE",
        description:
          "I'm Prabin, a UK-certified Personal Trainer helping people build strength, lose fat, and gain muscle through one-to-one coaching in the UAE and online worldwide.",
        image:
          "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269155/Active_iq_jn0t1u.png",
      },
    });
    console.log("✅ Seeded Hero section");
  }

  // 3. Seed About
  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        id: 1,
        backgroundTitle: "STORY",
        title: "UK-Certified Level 3 Personal Trainer with over",
        highlightText: "6 years",
        titleEnd: "of experience",
        mainHeading:
          "Guiding clients towards sustainable fitness, strength, and lifestyle transformations.",
        paragraph:
          "Born in the high Himalayas of Nepal and honed in the competitive fitness landscape of Dubai, my philosophy centers on discipline, technique, and adaptable training methods tailored to every unique body.",
      },
    });
    console.log("✅ Seeded About section");
  }

  // 4. Seed Stats
  const statCount = await prisma.stat.count();
  if (statCount === 0) {
    await prisma.stat.createMany({
      data: [
        { title: "6+ Years", subtitle: "Coaching Experience", dark: false },
        { title: "100+", subtitle: "Client Transformations", dark: true },
        { title: "Level 3", subtitle: "UK Certified REPs", dark: false },
        { title: "1-on-1 & Online", subtitle: "Flexible Formats", dark: true },
      ],
    });
    console.log("✅ Seeded Stats");
  }

  // 5. Seed ServiceSection & ServiceCards
  const serviceSectionCount = await prisma.serviceSection.count();
  if (serviceSectionCount === 0) {
    await prisma.serviceSection.create({
      data: {
        id: 1,
        backgroundTitle: "SERVICES",
        title: "TRAINING PROGRAMS",
        highlightText: "TAILORED FOR YOUR",
        titleEnd: "GOALS",
        description:
          "Whether you prefer hands-on gym coaching in Dubai or structured online guidance anywhere in the world.",
      },
    });
    console.log("✅ Seeded Service Section");
  }

  const serviceCardCount = await prisma.serviceCard.count();
  if (serviceCardCount === 0) {
    await prisma.serviceCard.createMany({
      data: [
        {
          title: "1-on-1 Personal Training",
          description:
            "Direct in-person training sessions in Dubai tailored to your current fitness level, body composition goals, and form refinement.",
          icon: "Dumbbell",
          tags: "Strength, Body Recomp, In-Person",
        },
        {
          title: "Online Fitness Coaching",
          description:
            "Custom workout routines, video form analysis, weekly check-ins, and progressive overload tracking from anywhere globally.",
          icon: "MonitorSmartphone",
          tags: "Remote, Custom Plan, Weekly Check-in",
        },
        {
          title: "Nutrition & Lifestyle Support",
          description:
            "Practical macro targets, habit tracking, and sustainable eating plans designed for long-term health without strict starvation.",
          icon: "Apple",
          tags: "Macros, Meal Guidance, Habit Tracking",
        },
      ],
    });
    console.log("✅ Seeded Service Cards");
  }

  // 6. Seed Testimonials
  const testSectionCount = await prisma.testimonialSection.count();
  if (testSectionCount === 0) {
    await prisma.testimonialSection.create({
      data: {
        id: 1,
        backgroundTitle: "REVIEWS",
        title: "WHAT MY CLIENTS",
        highlightText: "SAY ABOUT THEIR",
        titleEnd: "RESULTS",
        description:
          "Real transformations, real feedback from people who committed to the process.",
      },
    });
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "Subash Acharya",
          location: "Dubai, UAE",
          text: "Prabin's structured strength routine helped me fix my back posture and gain lean mass within 4 months. Highly recommended coach!",
        },
        {
          name: "Ramesh Sharma",
          location: "UK (Online Coaching)",
          text: "Even across time zones, Prabin monitored my workouts weekly. I dropped 12kg and built genuine bench and deadlift strength.",
        },
        {
          name: "Kiran Gurung",
          location: "Kathmandu, Nepal",
          text: "The nutrition advice was realistic and easy to follow alongside my demanding work schedule. Best investment in my health.",
        },
      ],
    });
    console.log("✅ Seeded Testimonials");
  }

  // 7. Seed Gallery
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        {
          type: "video",
          src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784446538/6103b752-c0a6-4b60-9804-3dc05bc5fe8e_cpge3c.mov",
          poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269155/Active_iq_jn0t1u.png",
          title: "Form check — deadlift",
          category: "COACHING",
          size: "lg",
        },
        {
          type: "image",
          src: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269642/client_crgkld.jpg",
          poster: null,
          title: "Six months in",
          category: "CLIENT STORY",
          size: "md",
        },
        {
          type: "video",
          src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345178/IMG_4390_iyexkw.mov",
          poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269246/one_eismdc.png",
          title: "Conditioning circuit",
          category: "CONDITIONING",
          size: "lg",
        },
        {
          type: "image",
          src: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269246/one_eismdc.png",
          poster: null,
          title: "Group conditioning",
          category: "CONDITIONING",
          size: "lg",
        },
        {
          type: "video",
          src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345155/IMG_2908_stmago.mp4",
          poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269656/two_hj3pp6.png",
          title: "Form check — deadlift",
          category: "COACHING",
          size: "md",
        },
        {
          type: "image",
          src: "https://res.cloudinary.com/bz4xcvt7/image/upload/f_auto,q_auto/v1784345340/IMG_3764_vsinct.heic",
          poster: null,
          title: "Recovery day",
          category: "STRENGTH",
          size: "md",
        },
      ],
    });
    console.log("✅ Seeded Gallery items");
  }

  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
