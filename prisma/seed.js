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

  // 8. Seed WhyChooseSection & WhyChooseFeatures
  const whyChooseSectionCount = await prisma.whyChooseSection.count();
  if (whyChooseSectionCount === 0) {
    await prisma.whyChooseSection.create({
      data: {
        id: 1,
        backgroundTitle: "WHY CHOOSE ME",
        title: "FITNESS SHOULD",
        highlightText: "FEEL",
        titleEnd: "LIKE IT FITS",
        description: "Achieve your fitness goals with expert guidance, personalized support, and a results-driven approach.",
      },
    });
    console.log("✅ Seeded Why Choose Me Section Info");
  }

  const whyChooseFeaturesCount = await prisma.whyChooseFeature.count();
  if (whyChooseFeaturesCount === 0) {
    await prisma.whyChooseFeature.createMany({
      data: [
        {
          title: "KNOWLEDGE & EXPERIENCE",
          desc: "Train with proven methods focused on safe, effective, and sustainable progress.",
          side: "LEFT",
          topPos: "60%",
          order: 1,
        },
        {
          title: "RESULTS THAT LAST",
          desc: "Build healthy habits that create long-term fitness and confidence, not quick fixes.",
          side: "LEFT",
          topPos: "87%",
          order: 2,
        },
        {
          title: "GOAL-ORIENTED APPROACH",
          desc: "Every plan is designed to help you achieve real, measurable results.",
          side: "RIGHT",
          topPos: "12%",
          order: 3,
        },
        {
          title: "DEDICATED SUPPORT",
          desc: "Stay motivated with consistent guidance and accountability throughout your journey.",
          side: "RIGHT",
          topPos: "39%",
          order: 4,
        },
      ],
    });
    console.log("✅ Seeded Why Choose Me Features");
  }

  // 9. Seed MarqueeItems
  const marqueeItemsCount = await prisma.marqueeItem.count();
  if (marqueeItemsCount === 0) {
    await prisma.marqueeItem.createMany({
      data: [
        { label: "FAT LOSS PLAN", icon: "Star", order: 1 },
        { label: "HYPERTROPHY", icon: "Dumbbell", order: 2 },
        { label: "ONE-ON-ONE TRAINING", icon: "Users", order: 3 },
        { label: "BODY RECOMPOSITION", icon: "Repeat", order: 4 },
        { label: "NUTRITIONAL GUIDANCE", icon: "Trophy", order: 5 },
      ],
    });
    console.log("✅ Seeded Marquee Items");
  }

  // 10. Seed FooterSection
  const footerSectionCount = await prisma.footerSection.count();
  if (footerSectionCount === 0) {
    await prisma.footerSection.create({
      data: {
        id: 1,
        backgroundText: "prabinxfitness",
        instagramUrl: "https://www.instagram.com/prabinxfitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        copyrightText: "© PrabinXFitness. All Rights Reserved.",
        designerName: "Dibya Maharjan",
        designerUrl: "https://dibyamaharjan.com",
      },
    });
    console.log("✅ Seeded Footer Section");
  }

  // 11. Seed MistakeSection & Mistakes
  const mistakeSectionCount = await prisma.mistakeSection.count();
  if (mistakeSectionCount === 0) {
    await prisma.mistakeSection.create({
      data: {
        backgroundTitle: "COMMON ERRORS",
        title: "MISTAKES TO",
        highlightText: "AVOID",
        titleEnd: "AS A BEGINNER",
        description:
          "Starting your fitness journey is exciting, but common pitfalls can stall your progress or lead to injury. Here are the most frequent beginner mistakes—and the exact, science-backed solutions to fix them.",
        ctaText: "Stop guessing your workouts. Train with a proven, personalized plan built for your body.",
        ctaButtonText: "Get Personalized Coaching",
        ctaButtonLink: "https://wa.me/971558663590?text=Hi%20Prabin%2C%20I%20want%20to%20fix%20my%20workout%20routine%20and%20start%20personal%20training.",
        isActive: true,
        mistakes: {
          create: [
            {
              tag: "FORM & TECHNIQUE",
              title: "Ego Lifting & Sacrificing Form",
              description:
                "Loading up heavy weights before mastering proper movement mechanics. Using momentum, swinging the torso, or hyperextending the lower back dramatically increases injury risk and robs tension from the target muscles.",
              solution:
                "Drop the working weight by 30–40%. Focus on full range of motion, controlled 2-3 second eccentrics (lowering phase), and mind-muscle connection. Only add weight when you can execute every single repetition with flawless technique.",
              coachTip: "Tension builds muscle; momentum only strains joints.",
              order: 1,
            },
            {
              tag: "PROGRAMMING",
              title: "Program Hopping & Inconsistent Workouts",
              description:
                "Changing routines every week based on viral social media videos. Without consistent exercise selection, your neuromuscular system cannot adapt, making true progressive overload and measurable strength gains impossible.",
              solution:
                "Commit to a structured 8–12 week program designed around key compound lifts. Track every session's exercises, sets, reps, and weights in a logbook. Only progress the load or volume once you cleanly achieve your rep target.",
              coachTip: "Repetition and progressive overload drive long-term transformation.",
              order: 2,
            },
            {
              tag: "NUTRITION",
              title: "Extreme Starvation Diets or 'Dirty Bulking'",
              description:
                "Slashing daily calories to extreme deficit levels to rush fat loss (sacrificing lean muscle and crashing hormones), or consuming unchecked junk food under the excuse of bulking (gaining mostly stubborn body fat).",
              solution:
                "Calculate your baseline maintenance calories. Aim for a sensible 300–500 kcal deficit for fat loss, or a controlled 200–300 kcal surplus for muscle gain. Consume 1.6–2.2g of protein per kg of bodyweight and prioritize whole foods.",
              coachTip: "Fuel your body for athletic performance, not punishment.",
              order: 3,
            },
            {
              tag: "RECOVERY",
              title: "Skipping Warm-Ups & Neglecting Sleep",
              description:
                "Jumping straight into heavy working sets with cold joints and tight tissues, or training 7 days a week on 5 hours of sleep under the misguided belief that 'more is always better'.",
              solution:
                "Dedicate 5–8 minutes to dynamic mobility drills and progressive warm-up sets before heavy compound lifts. Schedule 1–2 full rest days weekly and prioritize 7–9 hours of deep sleep—muscle tissue repairs and grows during recovery, not in the gym.",
              coachTip: "You don't grow in the gym; you grow while recovering.",
              order: 4,
            },
            {
              tag: "MINDSET",
              title: "Chasing Quick-Fix Supplements Over Basics",
              description:
                "Spending substantial money on fat burners, detox teas, and exotic stimulants expecting miracles, while ignoring consistency, meal preparation, proper hydration, and sleep hygiene.",
              solution:
                "Treat supplements as the final 5% optimization. Lock in your training consistency, daily step goals, whole-food nutrition, and 8 hours of sleep first. If supplementing, rely strictly on proven staples: Whey Protein and Creatine Monohydrate.",
              coachTip: "No supplement can outwork a poor diet and erratic training.",
              order: 5,
            },
            {
              tag: "EXERCISE BALANCE",
              title: "Excessive Cardio While Avoiding Strength Training",
              description:
                "Spending endless hours on the treadmill or elliptical to burn calories while avoiding weight training out of fear of becoming 'too bulky' or muscular.",
              solution:
                "Resistance training is the primary driver of body recomposition, metabolic health, and bone density. Train with weights 3–4 days weekly to preserve and sculpt lean muscle, and use moderate cardio or 8k–10k daily steps as an aerobic tool.",
              coachTip: "Lifting weights sculpts the physique; cardio merely assists energy balance.",
              order: 6,
            },
          ],
        },
      },
    });
    console.log("✅ Seeded Mistake Section & Beginner Mistakes");
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
