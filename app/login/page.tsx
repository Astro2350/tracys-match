"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isValidEmail, passwordIssues } from "@/lib/validation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("success");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const pwIssues = useMemo(() => passwordIssues(pw), [pw]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setResetSent(false);

    if (!isValidEmail(email)) {
      setMessageTone("error");
      return setMessage("Enter a valid email address.");
    }

    if (pwIssues.length) {
      setMessageTone("error");
      return setMessage(`Password needs: ${pwIssues.join(", ")}.`);
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pw,
    });

    setLoading(false);

    if (error) {
      setMessageTone("error");
      return setMessage(error.message);
    }

    setMessageTone("success");
    setMessage("Secure login successful. Redirecting…");
    router.push("/choose-role");
  }

  async function handlePasswordReset() {
    setMessage("");
    setResetSent(false);

    if (!isValidEmail(email)) {
      setMessageTone("error");
      return setMessage("Enter your email first to receive a reset link.");
    }

    setLoading(true);

    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      setMessageTone("error");
      return setMessage(error.message);
    }

    setResetSent(true);
    setMessageTone("success");
    setMessage("Password reset email sent. Check your inbox.");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1.1fr_1fr] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-white/5">
        <div className="bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-8 flex flex-col gap-4">
          <div className="text-sm text-zinc-400">Welcome back</div>
          <h1 className="text-3xl font-semibold leading-tight">
            Log in securely and see who your trusted helpers added this week.
          </h1>
          <ul className="text-sm text-zinc-400 space-y-2">
            <li>• Private dashboard showing curated candidates</li>
            <li>• Session auto-refresh and secure token storage</li>
            <li>• Switch roles anytime between dater and curator</li>
          </ul>
          <div className="mt-auto text-xs text-zinc-500">
            Need an account? <a href="/signup" className="text-white underline">Create one here</a>.
          </div>
        </div>

        <form className="p-8 bg-zinc-950 space-y-4" onSubmit={handleLogin}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Secure login</h2>
              <p className="text-xs text-zinc-500">We use Supabase Auth with RLS-friendly tokens.</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-zinc-300">Encrypted in transit</span>
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
              autoComplete="email"
              required
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
              placeholder="••••••••"
              autoComplete="current-password"
              required
              minLength={10}
            />
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-500">
              {["10+ chars", "Upper & lower", "Number", "Symbol"].map((item) => (
                <span key={item} className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Checking credentials…" : "Log In"}
            </button>
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={loading}
              className="w-full px-6 py-3 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Send a password reset
            </button>
          </div>

          {message && (
            <p
              className={`text-sm mt-2 ${
                messageTone === "success" ? "text-emerald-300" : "text-amber-300"
              }`}
            >
              {message}
            </p>
          )}

          {resetSent && (
            <p className="text-xs text-zinc-500">If the email exists, a reset link is on the way.</p>
          )}

          <p className="text-xs text-zinc-500">
            By continuing you agree to receive occasional updates about curated matches. Sessions are stored securely in HttpOnly cookies managed by Supabase.
          </p>
        </form>
      </div>
    </main>
  );
}
