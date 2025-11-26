"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { passwordIssues } from "@/lib/validation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("success");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(() => !code || type !== "recovery");

  const pwIssues = useMemo(() => passwordIssues(password), [password]);
  const passwordsMatch = password === confirm;

  useEffect(() => {
    if (!code || type !== "recovery") return;

    supabase.auth
      .exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          setMessageTone("error");
          setMessage(error.message);
        } else {
          setReady(true);
        }
      })
      .catch(() => {
        setMessageTone("error");
        setMessage("Something went wrong validating your reset link.");
      });
  }, [code, type]);

  async function handleUpdate() {
    setMessage("");

    if (pwIssues.length) {
      setMessageTone("error");
      return setMessage(`Password needs: ${pwIssues.join(", ")}.`);
    }

    if (!passwordsMatch) {
      setMessageTone("error");
      return setMessage("Passwords must match.");
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setMessageTone("error");
      return setMessage(error.message);
    }

    setMessageTone("success");
    setMessage("Password updated. You can now sign in.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg border border-white/10 rounded-2xl bg-zinc-950 p-8 shadow-xl shadow-white/5 space-y-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Account recovery</p>
          <h1 className="text-2xl font-semibold">Reset your password</h1>
          <p className="text-sm text-zinc-400">Choose a strong password to protect your curated space.</p>
        </div>

        {!ready && <p className="text-sm text-zinc-400">Validating your reset link…</p>}

        {ready && (
          <>
            <div className="space-y-3">
              <label className="text-sm text-zinc-400" htmlFor="new-password">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-white/10 bg-black/50 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="••••••••••"
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
              <label className="text-sm text-zinc-400" htmlFor="confirm-password">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border border-white/10 bg-black/50 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Re-type your password"
                autoComplete="new-password"
              />
              {!passwordsMatch && confirm.length > 0 && (
                <p className="text-xs text-amber-300">Passwords don’t match yet.</p>
              )}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleUpdate}
              className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Updating…" : "Save new password"}
            </button>
          </>
        )}

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
          If this link has expired, request a fresh reset from the login page. We never expose who curated on your behalf.
        </p>
      </div>
    </main>
  );
}
