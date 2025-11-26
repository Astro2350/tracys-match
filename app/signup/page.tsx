"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password: pw,
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email to confirm your account.");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1.1fr_1fr] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-white/5">
        <div className="bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-8 flex flex-col gap-4">
          <div className="text-sm text-zinc-400">Start fresh</div>
          <h1 className="text-3xl font-semibold leading-tight">
            Create a private space for curated introductions that honor your boundaries.
          </h1>
          <ul className="text-sm text-zinc-400 space-y-2">
            <li>• Invite trusted helpers to scout and filter</li>
            <li>• Share context and dealbreakers upfront</li>
            <li>• Accept, request an intro, or pass in one tap</li>
          </ul>
          <div className="mt-auto text-xs text-zinc-500">
            Already have an account? <a href="/login" className="text-white underline">Log in</a> instead.
          </div>
        </div>

        <div className="p-8 bg-zinc-950 space-y-4">
          <h2 className="text-xl font-semibold">Create an account</h2>
          <div className="space-y-3">
            <label className="text-sm text-zinc-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-white/10 bg-black/50 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm text-zinc-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="border border-white/10 bg-black/50 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Create a strong password"
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition"
          >
            Sign Up
          </button>

          {message && <p className="text-sm mt-2 text-emerald-300">{message}</p>}

          <p className="text-xs text-zinc-500">
            We never post publicly or show who helped you curate. You stay in control.
          </p>
        </div>
      </div>
    </main>
  );
}
