"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ChooseRolePage() {
  const router = useRouter();

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-black text-white">
      <h1 className="text-3xl font-bold text-center">
        Who are you here as?
      </h1>

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
    </main>
  );
}
