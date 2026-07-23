"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Home, Shield } from "lucide-react";
import { Oswald, Poppins, Bebas_Neue, Roboto_Condensed } from "next/font/google";
import "../globals.css";
import { FaInstagram } from "react-icons/fa";


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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/login");
        } else {
          setUsername(data.user.username);
          setRole(data.user.role || "ADMIN");
        }
      } catch (err) {
        console.error("Auth verification failed", err);
        router.push("/login");
      }
    }
    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className={`
      ${oswald.variable}
      ${poppins.variable}
      ${bebasNeue.variable}
      ${robotoCondensed.variable}
      min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800
    `}
    >
      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo / Link back to home */}
          <Link href="/" className="leading-none">
            <h1
              style={{ fontFamily: "var(--font-oswald)" }}
              className="text-3xl font-black uppercase tracking-wide text-[#E8A428]"
            >
              PRABINXFITNESS
            </h1>

            <p
              style={{ fontFamily: "var(--font-poppins)" }}
              className="mt-1 text-[10px] uppercase tracking-[2px] italic text-[#CFA74D]"
            >
              UK-Certified Personal Trainer | Dubai, UAE
            </p>
          </Link>

          {/* Right Area: Admin user details and Logout */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-black transition duration-300"
            >
              <Home size={15} />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <span className="h-4 w-px bg-gray-200"></span>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 uppercase">{username}</p>
                <p className="text-[10px] text-slate-400">{role === "ADMIN" ? "System Admin" : "Client Editor"}</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8A428] hover:bg-yellow-50 hover:border-red-200 transition-all duration-300"
              >
                <LogOut size={14} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>



      {/* Main Admin Section */}
      <main className="flex-grow py-8 bg-[#FAF9F6]">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className='bg-[#141414] py-[40px] relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
          <h2
            style={{ fontFamily: "var(--font-oswald)" }}
            className="text-center uppercase font-medium leading-none text-[48px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] bg-gradient-to-b from-[#E8A428] to-[#141414] bg-clip-text text-transparent"
          >
            prabinxfitness
          </h2>

          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Navigation */}

            <nav
              className="flex flex-wrap justify-center gap-5 sm:gap-8 lg:gap-10"
            >
              <Link
                href="#story"
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
              >
                Story
              </Link>

              <Link
                href="#coaching"
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
              >
                Coaching
              </Link>

              <Link
                href="#results"
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
              >
                Results
              </Link>

              <Link
                href="#contact"
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-base sm:text-lg text-gray-300 transition hover:text-[#CFA74D]"
              >
                Contact
              </Link>
            </nav>

            {/* Social Icons */}

            <div className="flex items-center gap-3">
              <a
                href='https://www.instagram.com/prabinxfitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#4A4A4A] text-[#CFA74D] transition-all duration-300 hover:border-[#CFA74D] hover:bg-[#CFA74D]/10"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>

          </div>


          {/* Line */}
          <div className="my-8 lg:my-10 h-px w-full bg-[#4A4A4A]" />

          {/* Copyright */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">

            <p
              style={{ fontFamily: "var(--font-oswald)" }}
              className="text-sm sm:text-base lg:text-lg text-[#FFF9E7]"
            >
              © PrabinXFitness. All Rights Reserved.
            </p>

            <p
              style={{ fontFamily: "var(--font-oswald)" }}
              className="text-sm sm:text-base lg:text-lg text-[#FFF9E7]"
            >
              Designed & Developed By{" "}
              <a
                href='https://dibyamaharjan.com'
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CFA74D]"
              >
                Dibya Maharjan
              </a>
            </p>

          </div>
        </div>
      </footer>
    </div>
  );
}