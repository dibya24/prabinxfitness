import type { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import {
  Oswald,
  Poppins,
  Bebas_Neue,
  Roboto_Condensed,
} from "next/font/google";
import "./globals.css";

import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Preloader from "@/src/components/Preloader";
import SmoothScroll from "@/src/components/SmoothScroll";
import AOSProvider from "@/src/components/providers/AOSProvider";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let dbTitle = "PrabinXFitness | UK Certified Personal Trainer in Dubai, UAE";
  let dbDescription = "UK-certified Level 2 Gym Instructor and Level 3 Personal Trainer from Kathmandu, now based in Dubai. Helping clients achieve sustainable weight loss, muscle gain, strength, and overall fitness through personalized training and nutrition guidance.";
  let dbKeywords = [
    "Personal Trainer", "Certified Personal Trainer", "UK Certified Personal Trainer", "Fitness Coach", "Gym Instructor",
    "Personal Trainer Dubai", "Fitness Coach Dubai", "Gym Trainer Dubai", "Body Transformation Dubai", "Weight Loss Dubai",
    "Muscle Gain Dubai", "Strength Coach Dubai", "Online Coach Dubai", "Personal Trainer UAE", "Fitness Trainer UAE",
    "Best Personal Trainer UAE", "Gym Coach UAE", "Personal Trainer Nepal", "Fitness Coach Nepal", "Gym Trainer Nepal",
    "Kathmandu Personal Trainer", "Nepali Personal Trainer", "Online Personal Trainer Nepal", "Personal Trainer Qatar",
    "Personal Trainer Saudi Arabia", "Personal Trainer Oman", "Personal Trainer Bahrain", "Personal Trainer Kuwait",
    "Online Personal Trainer", "Online Fitness Coach", "Online Nutrition Coach", "Virtual Personal Trainer",
    "Weight Loss Coach", "Fat Loss Coach", "Muscle Building", "Strength Training", "Hypertrophy Training",
    "Bodybuilding Coach", "Nutrition Coach", "Workout Plans", "Transformation Coach", "Fitness Transformation",
    "Athletic Performance", "Functional Training", "Personalized Workout", "Customized Diet Plan",
    "Best Personal Trainer Dubai", "Best Fitness Coach Dubai", "Affordable Personal Trainer Dubai",
    "Certified Gym Trainer Dubai", "Best Nepali Trainer Dubai", "Online Weight Loss Coach", "Muscle Gain Coach UAE"
  ];

  try {
    const seo = await prisma.seo.findFirst();
    if (seo) {
      dbTitle = seo.title;
      dbDescription = seo.description;
      dbKeywords = seo.keywords.split(",").map((k) => k.trim()).filter(Boolean);
    }
  } catch (err) {
    console.error("Failed to fetch SEO metadata from database", err);
  }

  return {
    metadataBase: new URL("https://prabinxfitness.com"),
    title: {
      default: dbTitle,
      template: `%s | ${dbTitle.split("|")[0].trim()}`,
    },
    description: dbDescription,
    keywords: dbKeywords,
    authors: [
      {
        name: "prabinxfitness",
        url: "prabinxfitness.com",
      },
    ],
    creator: "prabinxfitness",
    publisher: "prabinxfitness",
    applicationName: "prabinxfitness",
    alternates: {
      canonical: "https://prabinxfitness.com",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: dbTitle,
      description: dbDescription,
      url: "https://prabinxfitness.com",
      siteName: "Prabin X Fitness",
      locale: "en_GB",
      alternateLocale: ["ar_AE", "en_US"],
      type: "website",
      images: [
        {
          url: "https://prabinxfitness.com/images/seo/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "prabinxfitness",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dbTitle,
      description: dbDescription,
      images: ["/images/seo/og-image.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    category: "Fitness",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${poppins.variable} ${bebasNeue.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <AOSProvider>
          <SmoothScroll>
            <Preloader />
            <Navbar />

            {children}

            <Footer />
          </SmoothScroll>
        </AOSProvider>
      </body>
    </html>
  );
}