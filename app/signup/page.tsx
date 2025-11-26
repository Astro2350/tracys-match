"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isValidEmail, passwordIssues } from "@/lib/validation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("success");
  const [loading, setLoading] = useState(false);

  const pwIssues = useMemo(() => passwordIssues(pw), [pw]);
  const passwordsMatch = pw === confirm;

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isValidEmail(email)) {
      setMessageTone("error");
      return setMessage("Please use a valid email address.");
    }

    if (pwIssues.length) {
      setMessageTone("error");
      return setMessage(`Password needs: ${pwIssues.join(", ")}.`);
    }

    if (!passwordsMatch) {
      setMessageTone("error");
      return setMessage("Passwords must match.");
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: pw,
      options: {
        emailRedirectTo: `${window.location.origin}/choose-role`,
      },
    });
    setLoading(false);

    if (error) {
      setMessageTone("error");
      return setMessage(error.message);
    }

    setMessageTone("success");
    setMessage("Check your email to confirm your account. Verification is required before accessing dashboards.");
    router.prefetch("/choose-role");
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

        <form className="p-8 bg-zinc-950 space-y-4" onSubmit={handleSignup}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Create an account</h2>
              <p className="text-xs text-zinc-500">Email verification + strong passwords enforced.</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-zinc-300">RLS ready</span>
          </div>

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
              required
              autoComplete="email"
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
              required
              minLength={10}
              autoComplete="new-password"
            />
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-500">
              {["10+ chars", "Uppercase", "Lowercase", "Number", "Symbol"].map((item) => (
                <span key={item} className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-zinc-400" htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border border-white/10 bg-black/50 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Re-type your password"
              required
              autoComplete="new-password"
            />
            {!passwordsMatch && confirm.length > 0 && (
              <p className="text-xs text-amber-300">Passwords don’t match yet.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>

          {message && (
            <p
              className={`text-sm mt-2 ${
                messageTone === "success" ? "text-emerald-300" : "text-amber-300"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-xs text-zinc-500">
            We never post publicly or show who helped you curate. You stay in control. Email verification prevents account takeover and aligns with Supabase RLS defaults.
          </p>
        </form>
      </div>
    </main>
  );
}
