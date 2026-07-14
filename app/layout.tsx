import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "prabinxfitness | UK Certified Personal Trainer in Dubai",
    template: "%s | Your Company Name",
  },

  description:
    "UK-certified Level 2 Gym Instructor and Level 3 Personal Trainer from Kathmandu, now based in Dubai. Helping clients achieve sustainable weight loss, muscle gain, strength, and overall fitness through personalized training and nutrition guidance.",

  keywords: [
    "Personal Trainer",
    "Certified Personal Trainer",
    "UK Certified Personal Trainer",
    "Level 2 Gym Instructor",
    "Level 3 Personal Trainer",
    "Fitness Coach",
    "Online Personal Training",
    "Strength Training",
    "Weight Loss Coach",
    "Muscle Building Coach",
    "Body Transformation",
    "Fat Loss Training",
    "Fitness Consultant",
    "Gym Coach",
    "Workout Plans",
    "Nutrition Guidance",
    "Personal Trainer Dubai",
    "Fitness Trainer Dubai",
    "Personal Trainer UAE",
    "Nepali Personal Trainer",
    "Personal Trainer Kathmandu",
    "Fitness Coach Kathmandu",
    "Dubai Fitness Coach",
    "Gym Instructor Dubai",
    "Certified Gym Instructor",
  ],

  authors: [
    {
      name: "Your Company",
    },
  ],

  creator: "Your Company",

  publisher: "Your Company",

  applicationName: "Your Company",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Your Company",
    description:
      "Luxury interior design services for homes, offices, and commercial spaces.",
    url: "https://yourdomain.com",
    siteName: "Your Company",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Company",
    description:
      "Luxury interior design services for homes and commercial spaces.",
    images: ["/images/seo/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Interior Design",
};

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
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}