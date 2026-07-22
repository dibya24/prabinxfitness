import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";
import { CONTENT } from "@/src/constants/content";
import images from "@/src/constants/images";

const JWT_SECRET = process.env.JWT_SECRET || "prabinxfitness_jwt_secret_key_123456";
const COOKIE_NAME = "admin_token";

// Helper to get session user
async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string; role?: string };
    let role = decoded.role;
    if (!role) {
      const user = await prisma.adminUser.findUnique({
        where: { id: decoded.userId }
      });
      role = user?.role || "ADMIN";
    }
    return { userId: decoded.userId, username: decoded.username, role };
  } catch {
    return null;
  }
}

// Middleware helper to check authentication
async function isAuthenticated() {
  const user = await getSessionUser();
  return !!user;
}

// GET /api/admin/content - Retrieve all dynamic content (with hardcoded fallbacks)
export async function GET() {
  try {
    const currentUser = await getSessionUser();
    // 1. Fetch from DB
    const seo = await prisma.seo.findFirst();
    const hero = await prisma.hero.findFirst();
    const about = await prisma.about.findFirst();
    const stats = await prisma.stat.findMany();
    const serviceSection = await prisma.serviceSection.findFirst();
    const services = await prisma.serviceCard.findMany();
    const testimonialSection = await prisma.testimonialSection.findFirst();
    const testimonials = await prisma.testimonial.findMany();
    const galleryItems = await prisma.galleryItem.findMany();
    const whyChooseSection = await prisma.whyChooseSection.findFirst();
    const whyChooseFeatures = await prisma.whyChooseFeature.findMany({ orderBy: { order: "asc" } });
    const marqueeItems = await prisma.marqueeItem.findMany({ orderBy: { order: "asc" } });
    const footerSection = await prisma.footerSection.findFirst();

    // 2. Map default values if DB is empty
    const defaultSeo = {
      title: "PrabinXFitness | UK Certified Personal Trainer in Dubai, UAE",
      description: "UK-certified Level 2 Gym Instructor and Level 3 Personal Trainer helping clients achieve sustainable weight loss, muscle gain, strength, and overall fitness through personalized training and nutrition.",
      keywords: "Personal Trainer, Certified Personal Trainer, Personal Trainer Dubai, Weight Loss Dubai, Muscle Gain Dubai",
    };

    const defaultHero = {
      title: "Strength forged in Mountains. refined in the desert.",
      subtitle: "UK-Certified Personal Trainer | Dubai, UAE",
      description: "I'm Prabin, a UK-certified Personal Trainer helping people build strength, lose fat, and gain muscle through one-to-one coaching in the UAE and online worldwide.",
      image: images.hero,
    };

    const defaultAbout = {
      backgroundTitle: CONTENT.about.heading.backgroundTitle,
      title: CONTENT.about.heading.title,
      highlightText: CONTENT.about.heading.highlightText,
      titleEnd: CONTENT.about.heading.titleEnd,
      mainHeading: CONTENT.about.description.mainHeading,
      paragraph: CONTENT.about.description.paragraph,
    };

    const defaultStats = CONTENT.about.stats.map(s => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      dark: s.dark,
    }));

    const defaultServiceSection = {
      backgroundTitle: CONTENT.service.heading.backgroundTitle,
      title: CONTENT.service.heading.title,
      highlightText: CONTENT.service.heading.highlightText,
      titleEnd: CONTENT.service.heading.titleEnd,
      description: CONTENT.service.description,
    };

    const defaultServices = CONTENT.service.cards.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      icon: c.icon,
      tags: c.tags.join(", "),
    }));

    const defaultTestimonialSection = {
      backgroundTitle: CONTENT.testimonials.heading.backgroundTitle,
      title: CONTENT.testimonials.heading.title,
      highlightText: CONTENT.testimonials.heading.highlightText,
      titleEnd: CONTENT.testimonials.heading.titleEnd,
      description: CONTENT.testimonials.description,
    };

    const defaultTestimonials = CONTENT.testimonials.reviews.map(r => ({
      id: r.id,
      name: r.name,
      location: r.location,
      text: r.text,
    }));

    const defaultGallery = [
      {
        id: 1,
        type: "video",
        src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784446538/6103b752-c0a6-4b60-9804-3dc05bc5fe8e_cpge3c.mov",
        poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269155/Active_iq_jn0t1u.png",
        title: "Form check — deadlift",
        category: "COACHING",
        size: "lg",
      },
      {
        id: 2,
        type: "image",
        src: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269642/client_crgkld.jpg",
        poster: null,
        title: "Six months in",
        category: "CLIENT STORY",
        size: "md",
      },
      {
        id: 3,
        type: "video",
        src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345178/IMG_4390_iyexkw.mov",
        poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269246/one_eismdc.png",
        title: "Conditioning circuit",
        category: "CONDITIONING",
        size: "lg",
      },
      {
        id: 4,
        type: "image",
        src: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269246/one_eismdc.png",
        poster: null,
        title: "Group conditioning",
        category: "CONDITIONING",
        size: "lg",
      },
      {
        id: 5,
        type: "video",
        src: "https://res.cloudinary.com/bz4xcvt7/video/upload/v1784345155/IMG_2908_stmago.mp4",
        poster: "https://res.cloudinary.com/bz4xcvt7/image/upload/v1784269656/two_hj3pp6.png",
        title: "Form check — deadlift",
        category: "COACHING",
        size: "md",
      },
      {
        id: 6,
        type: "image",
        src: "https://res.cloudinary.com/bz4xcvt7/image/upload/f_auto,q_auto/v1784345340/IMG_3764_vsinct.heic",
        poster: null,
        title: "Recovery day",
        category: "STRENGTH",
        size: "md",
      },
    ];

    const defaultWhyChooseSection = {
      backgroundTitle: "WHY CHOOSE ME",
      title: "FITNESS SHOULD",
      highlightText: "FEEL",
      titleEnd: "LIKE IT FITS",
      description: "Achieve your fitness goals with expert guidance, personalized support, and a results-driven approach.",
    };

    const defaultWhyChooseFeatures = [
      {
        id: 1,
        title: "KNOWLEDGE & EXPERIENCE",
        desc: "Train with proven methods focused on safe, effective, and sustainable progress.",
        side: "LEFT",
        topPos: "60%",
        order: 1,
      },
      {
        id: 2,
        title: "RESULTS THAT LAST",
        desc: "Build healthy habits that create long-term fitness and confidence, not quick fixes.",
        side: "LEFT",
        topPos: "87%",
        order: 2,
      },
      {
        id: 3,
        title: "GOAL-ORIENTED APPROACH",
        desc: "Every plan is designed to help you achieve real, measurable results.",
        side: "RIGHT",
        topPos: "12%",
        order: 3,
      },
      {
        id: 4,
        title: "DEDICATED SUPPORT",
        desc: "Stay motivated with consistent guidance and accountability throughout your journey.",
        side: "RIGHT",
        topPos: "39%",
        order: 4,
      },
    ];

    const defaultMarquee = [
      { id: 1, label: "FAT LOSS PLAN", icon: "Star", order: 1 },
      { id: 2, label: "HYPERTROPHY", icon: "Dumbbell", order: 2 },
      { id: 3, label: "ONE-ON-ONE TRAINING", icon: "Users", order: 3 },
      { id: 4, label: "BODY RECOMPOSITION", icon: "Repeat", order: 4 },
      { id: 5, label: "NUTRITIONAL GUIDANCE", icon: "Trophy", order: 5 },
    ];

    const defaultFooter = {
      backgroundText: "prabinxfitness",
      instagramUrl: "https://www.instagram.com/prabinxfitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      copyrightText: "© PrabinXFitness. All Rights Reserved.",
      designerName: "Dibya Maharjan",
      designerUrl: "https://dibyamaharjan.com",
    };

    return NextResponse.json({
      seo: seo || defaultSeo,
      hero: hero || defaultHero,
      about: about || defaultAbout,
      stats: stats.length ? stats : defaultStats,
      serviceSection: serviceSection || defaultServiceSection,
      services: services.length ? services : defaultServices,
      testimonialSection: testimonialSection || defaultTestimonialSection,
      testimonials: testimonials.length ? testimonials : defaultTestimonials,
      galleryItems: galleryItems.length ? galleryItems : defaultGallery,
      whyChooseSection: whyChooseSection || defaultWhyChooseSection,
      whyChooseFeatures: whyChooseFeatures.length ? whyChooseFeatures : defaultWhyChooseFeatures,
      marqueeItems: marqueeItems.length ? marqueeItems : defaultMarquee,
      footerSection: footerSection || defaultFooter,
      currentUser,
    });
  } catch (error: unknown) {
    console.error("Fetch content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST /api/admin/content - Update a specific content section
export async function POST(req: Request) {
  try {
    // 1. Auth check
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json({ error: "Section and data parameters required" }, { status: 400 });
    }

    switch (section) {
      case "seo":
        await prisma.seo.upsert({
          where: { id: 1 },
          update: {
            title: data.title,
            description: data.description,
            keywords: data.keywords,
          },
          create: {
            id: 1,
            title: data.title,
            description: data.description,
            keywords: data.keywords,
          },
        });
        break;

      case "hero":
        await prisma.hero.upsert({
          where: { id: 1 },
          update: {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            image: data.image,
          },
          create: {
            id: 1,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            image: data.image,
          },
        });
        break;

      case "about":
        await prisma.about.upsert({
          where: { id: 1 },
          update: {
            backgroundTitle: data.backgroundTitle,
            title: data.title,
            highlightText: data.highlightText,
            titleEnd: data.titleEnd,
            mainHeading: data.mainHeading,
            paragraph: data.paragraph,
          },
          create: {
            id: 1,
            backgroundTitle: data.backgroundTitle,
            title: data.title,
            highlightText: data.highlightText,
            titleEnd: data.titleEnd,
            mainHeading: data.mainHeading,
            paragraph: data.paragraph,
          },
        });
        break;

      case "stats":
        // data should be an array of stats
        await prisma.$transaction([
          prisma.stat.deleteMany(),
          prisma.stat.createMany({
            data: data.map((s: { title: string; subtitle: string; dark?: boolean }) => ({
              title: s.title,
              subtitle: s.subtitle,
              dark: !!s.dark,
            })),
          }),
        ]);
        break;

      case "services":
        // Updates service section details and list of service cards
        const { sectionInfo, cards } = data;
        await prisma.serviceSection.upsert({
          where: { id: 1 },
          update: {
            backgroundTitle: sectionInfo.backgroundTitle,
            title: sectionInfo.title,
            highlightText: sectionInfo.highlightText,
            titleEnd: sectionInfo.titleEnd,
            description: sectionInfo.description,
          },
          create: {
            id: 1,
            backgroundTitle: sectionInfo.backgroundTitle,
            title: sectionInfo.title,
            highlightText: sectionInfo.highlightText,
            titleEnd: sectionInfo.titleEnd,
            description: sectionInfo.description,
          },
        });

        if (cards && Array.isArray(cards)) {
          await prisma.$transaction([
            prisma.serviceCard.deleteMany(),
            prisma.serviceCard.createMany({
              data: cards.map((c: { title: string; description: string; icon?: string; tags: string }) => ({
                title: c.title,
                description: c.description,
                icon: c.icon || "Dumbbell",
                tags: c.tags,
              })),
            }),
          ]);
        }
        break;

      case "testimonials":
        // Updates testimonial section details and list of reviews
        const { testInfo, reviews } = data;
        await prisma.testimonialSection.upsert({
          where: { id: 1 },
          update: {
            backgroundTitle: testInfo.backgroundTitle,
            title: testInfo.title,
            highlightText: testInfo.highlightText,
            titleEnd: testInfo.titleEnd,
            description: testInfo.description,
          },
          create: {
            id: 1,
            backgroundTitle: testInfo.backgroundTitle,
            title: testInfo.title,
            highlightText: testInfo.highlightText,
            titleEnd: testInfo.titleEnd,
            description: testInfo.description,
          },
        });

        if (reviews && Array.isArray(reviews)) {
          await prisma.$transaction([
            prisma.testimonial.deleteMany(),
            prisma.testimonial.createMany({
              data: reviews.map((r: { name: string; location: string; text: string }) => ({
                name: r.name,
                location: r.location,
                text: r.text,
              })),
            }),
          ]);
        }
        break;

      case "gallery":
        // data should be an array of gallery items
        if (Array.isArray(data)) {
          await prisma.$transaction([
            prisma.galleryItem.deleteMany(),
            prisma.galleryItem.createMany({
              data: data.map((g: { type: string; src: string; poster?: string | null; title: string; category: string; size?: string }) => ({
                type: g.type,
                src: g.src,
                poster: g.poster || null,
                title: g.title,
                category: g.category,
                size: g.size || "md",
              })),
            }),
          ]);
        }
        break;

      case "whychoose":
        const { sectionInfo: whyChooseInfo, features: whyChooseFeatures } = data;
        await prisma.whyChooseSection.upsert({
          where: { id: 1 },
          update: {
            backgroundTitle: whyChooseInfo.backgroundTitle,
            title: whyChooseInfo.title,
            highlightText: whyChooseInfo.highlightText,
            titleEnd: whyChooseInfo.titleEnd,
            description: whyChooseInfo.description,
          },
          create: {
            id: 1,
            backgroundTitle: whyChooseInfo.backgroundTitle,
            title: whyChooseInfo.title,
            highlightText: whyChooseInfo.highlightText,
            titleEnd: whyChooseInfo.titleEnd,
            description: whyChooseInfo.description,
          },
        });

        if (whyChooseFeatures && Array.isArray(whyChooseFeatures)) {
          await prisma.$transaction([
            prisma.whyChooseFeature.deleteMany(),
            prisma.whyChooseFeature.createMany({
              data: whyChooseFeatures.map((f: { title: string; desc: string; side: string; topPos: string; order?: number }) => ({
                title: f.title,
                desc: f.desc,
                side: f.side,
                topPos: f.topPos,
                order: f.order || 0,
              })),
            }),
          ]);
        }
        break;

      case "marquee":
        if (Array.isArray(data)) {
          await prisma.$transaction([
            prisma.marqueeItem.deleteMany(),
            prisma.marqueeItem.createMany({
              data: data.map((m: { label: string; icon: string; order?: number }) => ({
                label: m.label,
                icon: m.icon,
                order: m.order || 0,
              })),
            }),
          ]);
        }
        break;

      case "footer":
        await prisma.footerSection.upsert({
          where: { id: 1 },
          update: {
            backgroundText: data.backgroundText,
            instagramUrl: data.instagramUrl,
            copyrightText: data.copyrightText,
            designerName: data.designerName,
            designerUrl: data.designerUrl,
          },
          create: {
            id: 1,
            backgroundText: data.backgroundText,
            instagramUrl: data.instagramUrl,
            copyrightText: data.copyrightText,
            designerName: data.designerName,
            designerUrl: data.designerUrl,
          },
        });
        break;

      default:
        return NextResponse.json({ error: "Invalid section specified" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `${section} updated successfully` });

  } catch (error: unknown) {
    console.error("Update content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
