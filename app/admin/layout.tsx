"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Home, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-[#FFF7DF]">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8A428] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium tracking-widest uppercase">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo / Link back to home */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black text-[#E8A428] p-1.5 rounded-lg flex items-center justify-center">
              <Shield size={20} />
            </div>
            <div>
              <h1
                style={{ fontFamily: "var(--font-oswald)" }}
                className="text-xl font-bold uppercase tracking-wider text-black group-hover:text-[#E8A428] transition duration-300"
              >
                PRABINXFITNESS
              </h1>
              <p
                style={{ fontFamily: "var(--font-poppins)" }}
                className="text-[8px] uppercase tracking-[2px] italic text-[#CFA74D]"
              >
                Command Center
              </p>
            </div>
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
                className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-300"
              >
                <LogOut size={14} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Section */}
      <main className="flex-grow py-8 bg-[#FAF9F6]">{children}</main>

      {/* Admin Footer */}
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-slate-400 lg:px-8">
          <p>© {new Date().getFullYear()} Prabinxfitness Command Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
