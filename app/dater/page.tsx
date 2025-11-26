"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type PoolCandidate = {
  id: number;
  name: string;
  context: string;
  note: string;
  status: "considering" | "intro" | "passed" | "accepted";
};

const initialPool: PoolCandidate[] = [
  {
    id: 1,
    name: "Priya, 31",
    context: "Met through college friend — values family and service.",
    note: "Green flags: communicates clearly, shows up early, open about therapy.",
    status: "considering",
  },
  {
    id: 2,
    name: "Marco, 33",
    context: "Your mentor’s coworker — steady, loves cooking for friends.",
    note: "Green flags: asks great questions, patient, financially stable.",
    status: "intro",
  },
  {
    id: 3,
    name: "Sasha, 30",
    context: "Running group — empathetic and big on community events.",
    note: "Green flags: transparent about goals, loves conflict-free communication.",
    status: "accepted",
  },
];

export default function DaterDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState<PoolCandidate[]>(initialPool);

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
  }, [router]);

  function updateStatus(id: number, status: PoolCandidate["status"]) {
    setPool((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      )
    );
  }

  if (loading)
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Dater view</p>
            <h1 className="text-3xl font-bold">Your curated pool</h1>
            <p className="text-sm text-zinc-400">These options were added by people you trust. Move them forward or pass.</p>
          </div>
          <div className="border border-white/10 rounded-xl p-4 bg-white/5 text-sm text-zinc-300">
            <div className="flex items-center justify-between">
              <span>Ready for intro</span>
              <span className="text-emerald-300 font-semibold">{pool.filter((c) => c.status === "intro").length}</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">Keep momentum by responding within 48 hours.</div>
          </div>
        </div>

        <section className="border border-white/10 rounded-2xl bg-zinc-950">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-semibold">Suggested for you</h2>
              <p className="text-sm text-zinc-400">Each note was written privately by your helpers.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200">Accepted</span>
              <span className="px-3 py-1 rounded-full bg-sky-400/20 text-sky-100">Intro</span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200">Considering</span>
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-100">Passed</span>
            </div>
          </div>

          <div className="grid gap-4 p-6">
            {pool.map((candidate) => (
              <div
                key={candidate.id}
                className="border border-white/10 rounded-lg p-4 bg-white/5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-lg">{candidate.name}</div>
                  <p className="text-sm text-zinc-400">{candidate.context}</p>
                  <p className="text-sm text-zinc-300">{candidate.note}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(candidate.id, "passed")}
                    className={`px-3 py-1 text-sm rounded-lg border border-white/20 transition ${
                      candidate.status === "passed" ? "bg-red-500/20 text-red-200" : "hover:bg-white/10"
                    }`}
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateStatus(candidate.id, "intro")}
                    className={`px-3 py-1 text-sm rounded-lg transition ${
                      candidate.status === "intro"
                        ? "bg-sky-400 text-black"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    Request intro
                  </button>
                  <button
                    onClick={() => updateStatus(candidate.id, "accepted")}
                    className={`px-3 py-1 text-sm rounded-lg transition ${
                      candidate.status === "accepted"
                        ? "bg-emerald-400 text-black"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    Shortlist
                  </button>
                  {candidate.status === "considering" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-amber-400/20 text-amber-200">
                      Considering
                    </span>
                  )}
                  {candidate.status === "intro" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-sky-400/20 text-sky-100">
                      Intro requested
                    </span>
                  )}
                  {candidate.status === "accepted" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-400/20 text-emerald-200">
                      On your shortlist
                    </span>
                  )}
                  {candidate.status === "passed" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-100">Passed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/10 rounded-2xl p-6 bg-zinc-950 grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 mb-1">Helpers active</div>
            <div className="text-2xl font-semibold">3 people</div>
            <p className="text-sm text-zinc-400">Taylor, Jordan, and Priya are curating quietly.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 mb-1">Intros pending</div>
            <div className="text-2xl font-semibold">2</div>
            <p className="text-sm text-zinc-400">We’ll draft a warm intro message you can edit.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 mb-1">Your pace</div>
            <div className="text-2xl font-semibold">1 per week</div>
            <p className="text-sm text-zinc-400">Slow and steady. We’ll nudge helpers to respect your rhythm.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
