"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const mock = [
  { id: 1, name: "Alex, 29" },
  { id: 2, name: "Jamie, 32" },
];

export default function CuratorDashboard() {
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

      if (!data || data.role !== "curator") {
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
      <h1 className="text-2xl font-bold mb-4">Curate Matches</h1>
      <p className="text-zinc-400 mb-6">
        Add people into someone’s pool. They’ll make the final choices.
      </p>

      <div className="grid gap-4">
        {mock.map((c) => (
          <div key={c.id} className="border border-white/10 p-4 rounded-lg">
            <div className="font-semibold mb-1">{c.name}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-white/20 rounded">
                Pass
              </button>
              <button className="px-3 py-1 text-sm bg-white text-black rounded">
                Add to pool
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
