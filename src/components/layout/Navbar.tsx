"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  {
    title: "Story",
    href: "#story",
  },
  {
    title: "Coaching",
    href: "#coaching",
  },
  {
    title: "Results",
    href: "#results",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${scrolled
        ? "border-b border-white/10 bg-black/90 backdrop-blur-md shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}

        <Link href="/" className="leading-none">
          <h1
            style={{ fontFamily: "var(--font-oswald)" }}
            className="text-3xl font-black uppercase tracking-wide text-[#F4E3C1]"
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

        {/* Desktop Navigation */}

        <nav
          style={{ fontFamily: "var(--font-poppins)" }}
          className="hidden items-center gap-10 md:flex"
        >
          {navLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm text-gray-300 transition duration-300 hover:text-[#CFA74D]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}

        <div className="hidden md:block">
          <a
            href="https://wa.me/971558663590"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{ fontFamily: "var(--font-roboto-condensed)" }}
              className="cursor-pointer rounded-full border border-[#E8A428] px-8 py-2 text-[16px] font-semibold text-[#E8A428] transition-all duration-300 hover:bg-[#E8A428] hover:text-black"
            >
              Connect on WhatsApp
            </button>
          </a>
        </div>

        {/* Mobile Toggle */}

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-[400px]" : "max-h-0"
          }`}
      >
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-md">
          <div
            style={{ fontFamily: "var(--font-poppins)" }}
            className="flex flex-col gap-6 p-6"
          >
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 transition hover:text-[#CFA74D]"
              >
                {item.title}
              </Link>
            ))}

            <a
              href="https://wa.me/971558663590"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="cursor-pointer border border-[#E8A428] py-3 text-[#F4E3C1] transition hover:bg-[#E8A428] hover:text-black"
              >
                Connect on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}