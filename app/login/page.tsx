"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (data.authenticated) {
          router.push("/admin");
        } else {
          setIsSetup(data.firstTimeSetup);
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error("Error checking auth status", err);
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const action = isSetup ? "register" : "login";
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-[#FFF7DF]">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8A428] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium tracking-widest uppercase">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/5 bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1
              style={{ fontFamily: "var(--font-oswald)" }}
              className="text-3xl font-black uppercase tracking-wider text-[#F4E3C1] hover:text-[#E8A428] transition duration-300"
            >
              PRABINXFITNESS
            </h1>
            <p
              style={{ fontFamily: "var(--font-poppins)" }}
              className="mt-1 text-[9px] uppercase tracking-[3px] italic text-[#CFA74D]"
            >
              Command Center Admin
            </p>
          </Link>
          <h2
            style={{ fontFamily: "var(--font-oswald)" }}
            className="mt-6 text-2xl font-bold uppercase tracking-tight text-[#FFF7DF]"
          >
            {isSetup ? "First-Time Admin Setup" : "Sign In to Admin"}
          </h2>
          <p className="mt-2 text-xs text-white/50">
            {isSetup
              ? "Create your administrator account to start managing the CMS."
              : "Enter your administrator credentials to access dashboard."}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-[#CFA74D] mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#FFF7DF] placeholder-white/30 focus:border-[#E8A428] focus:bg-white/10 focus:outline-none transition duration-300"
                placeholder="e.g. admin"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#CFA74D] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#FFF7DF] placeholder-white/30 focus:border-[#E8A428] focus:bg-white/10 focus:outline-none transition duration-300"
                placeholder={isSetup ? "Minimum 6 characters" : "••••••••"}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{ fontFamily: "var(--font-roboto-condensed)" }}
              className="group relative flex w-full cursor-pointer justify-center rounded-lg bg-[#E8A428] px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#cfa74d] focus:outline-none disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              ) : isSetup ? (
                "Create Account"
              ) : (
                "Access Dashboard"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
