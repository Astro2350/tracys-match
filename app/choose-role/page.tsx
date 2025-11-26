"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ChooseRolePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email);
        setLoading(false);
      }
    });
  }, [router]);

  async function setRole(role: "dater" | "curator") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return router.push("/login");

    // upsert = insert or update if exists
    await supabase.from("profiles").upsert({
      id: user.id,
      role,
    });

    if (role === "dater") router.push("/dater");
    else router.push("/curator");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        Verifying session…
      </main>
    );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-black text-white">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-center">Who are you here as?</h1>
        {email && (
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-zinc-300">{email}</span>
        )}
      </div>

      <p className="text-sm text-zinc-400 max-w-xl text-center">
        Choose a role to unlock the right dashboard. You can switch later without losing data. Sessions are protected with Supabase Auth.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button
          onClick={() => setRole("dater")}
          className="border rounded-lg px-6 py-4 text-center hover:bg-white/10 transition"
        >
          <h2 className="font-semibold text-xl mb-2">I’m the one dating</h2>
          <p className="text-sm text-zinc-400 max-w-xs">
            Create your profile and receive curated choices from trusted people.
          </p>
        </button>

        <button
          onClick={() => setRole("curator")}
          className="border rounded-lg px-6 py-4 text-center hover:bg-white/10 transition"
        >
          <h2 className="font-semibold text-xl mb-2">I’m here to help</h2>
          <p className="text-sm text-zinc-400 max-w-xs">
            Help someone you care about by curating a better dating pool.
          </p>
        </button>
      </div>

      <button
        onClick={handleSignOut}
        className="text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
      >
        Sign out securely
      </button>
    </main>
  );
}
