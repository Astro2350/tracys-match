"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Candidate = {
  id: number;
  name: string;
  note: string;
  status: "undecided" | "added" | "passed";
};

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex, 29",
    note: "Met at volunteer shift; kind, emotionally aware, values family.",
    status: "undecided",
  },
  {
    id: 2,
    name: "Jamie, 32",
    note: "Runs with our crew; thoughtful communicator and steady job.",
    status: "undecided",
  },
];

export default function CuratorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

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
  }, [router]);

  function updateStatus(id: number, status: Candidate["status"]) {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      )
    );
  }

  function addCandidate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    const next: Candidate = {
      id: Date.now(),
      name: name.trim(),
      note: note.trim() || "Added without a note.",
      status: "undecided",
    };

    setCandidates((prev) => [next, ...prev]);
    setName("");
    setNote("");
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
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Curator view</p>
            <h1 className="text-3xl font-bold">Curate matches for Taylor</h1>
            <p className="text-sm text-zinc-400">Gather thoughtful introductions with notes they can trust.</p>
          </div>
          <div className="border border-white/10 rounded-xl p-4 bg-white/5 text-sm text-zinc-300">
            <div className="flex items-center justify-between">
              <span>Pool health</span>
              <span className="text-emerald-300 font-semibold">{candidates.filter((c) => c.status === "added").length} ready</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Keep at least 3 solid options with clear notes.
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-white/10 rounded-2xl p-6 bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Curate a new candidate</h2>
                <p className="text-sm text-zinc-400">Share why they fit: how you know them, values, and any dealbreakers.</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-zinc-300">Private to Taylor</span>
            </div>

            <form className="space-y-3" onSubmit={addCandidate}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Name, age, quick descriptor"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Why do they fit? Include how you know them, values, and a green flag."
              />
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Helpful notes make approvals faster.</span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition"
                >
                  Add candidate
                </button>
              </div>
            </form>
          </section>

          <section className="border border-white/10 rounded-2xl p-6 bg-zinc-950 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Quick guidance</h2>
              <span className="text-xs text-zinc-500">Updated weekly</span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="border border-white/10 rounded-lg p-3 bg-white/5">
                Taylor is prioritizing people who communicate clearly about future plans.
              </li>
              <li className="border border-white/10 rounded-lg p-3 bg-white/5">
                Avoid suggesting coworkers; they want clean boundaries between work and dating.
              </li>
              <li className="border border-white/10 rounded-lg p-3 bg-white/5">
                Keep notes concise—why they’re a fit in two sentences helps them decide quickly.
              </li>
            </ul>
          </section>
        </div>

        <section className="border border-white/10 rounded-2xl bg-zinc-950">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-semibold">Your candidate list</h2>
              <p className="text-sm text-zinc-400">Mark each option so Taylor knows what to review first.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200">Added</span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200">Undecided</span>
              <span className="px-3 py-1 rounded-full bg-red-400/20 text-red-200">Passed</span>
            </div>
          </div>

          <div className="grid gap-4 p-6">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="border border-white/10 rounded-lg p-4 bg-white/5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-lg">{c.name}</div>
                  <p className="text-sm text-zinc-300">{c.note}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(c.id, "passed")}
                    className={`px-3 py-1 text-sm rounded-lg border border-white/20 transition ${
                      c.status === "passed" ? "bg-red-500/20 text-red-200" : "hover:bg-white/10"
                    }`}
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateStatus(c.id, "added")}
                    className={`px-3 py-1 text-sm rounded-lg transition ${
                      c.status === "added"
                        ? "bg-emerald-400 text-black"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    Add to pool
                  </button>
                  {c.status === "undecided" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-amber-400/20 text-amber-200">
                      Needs decision
                    </span>
                  )}
                  {c.status === "added" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-400/20 text-emerald-200">
                      Shared with Taylor
                    </span>
                  )}
                  {c.status === "passed" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-100">
                      Passed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
