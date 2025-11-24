"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DaterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return router.push("/login");

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!data || data.role !== "dater") {
        return router.push("/choose-role");
      }

      setLoading(false);
    }

    checkRole();
  }, []);

  if (loading)
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Your curated pool</h1>
      <p className="text-zinc-400 mb-6">
        This is where you’ll see people trusted helpers add for you.
      </p>

      <div className="border border-white/10 rounded-lg p-4 text-zinc-500">
        No curated candidates yet.
      </div>
    </main>
  );
}
