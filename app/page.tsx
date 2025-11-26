import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="text-lg font-semibold tracking-tight">
          tracy’s<span className="text-sm text-white/50">match</span>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-md border border-white/20 hover:bg-white/10 transition"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            Sign up
          </Link>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300">
            Private, curated, human-guided dating
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Curated dating, guided by{" "}
            <span className="text-zinc-300">the people who know you best.</span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Tracy’s Match lets trusted friends or family quietly curate your dating pool.
            They filter. You choose. No one ever sees who helped behind the scenes.
            Just a calmer, more thoughtful way to meet the right people.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-md bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition"
            >
              Get started
            </Link>
            <Link
              href="/choose-role"
              className="px-6 py-3 rounded-md border border-white/20 text-sm text-zinc-200 hover:bg-white/5 transition"
            >
              Explore as guest
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-left">
            {["Invite helpers", "Curate a pool", "Stay private"].map((item) => (
              <div
                key={item}
                className="border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-zinc-300"
              >
                <div className="font-semibold text-white mb-1">{item}</div>
                {item === "Invite helpers" && "Send a link to someone you trust and let them gather quality matches."}
                {item === "Curate a pool" && "Helpers add thoughtful picks with notes. You see the best options first."}
                {item === "Stay private" && "Only you know who helped. Your choices remain yours alone."}
              </div>
            ))}
          </div>

          <div className="pt-4 text-xs md:text-sm text-zinc-500">
            Built for single & divorced adults who want healthier relationships,
            with support from the people they trust.
          </div>
        </div>
      </section>

      <section className="w-full border-t border-white/5 bg-black py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Why this works</p>
            <h2 className="text-2xl font-bold">Trust moves the dating experience forward.</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Helpers see the things algorithms miss: how someone handles conflict, treats
              friends, or shows up consistently. Tracy’s Match gives them a quiet place to
              share those insights while you stay in control.
            </p>
          </div>

          {["Safety first", "Signals that matter", "Clear next steps"].map((title, idx) => (
            <div key={title} className="border border-white/10 rounded-xl p-5 bg-white/5">
              <div className="text-xs text-zinc-500 mb-2">0{idx + 1}</div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              {idx === 0 && (
                <p className="text-sm text-zinc-400">
                  No public profiles or endless swiping. You see options filtered by people who care
                  about your wellbeing.
                </p>
              )}
              {idx === 1 && (
                <p className="text-sm text-zinc-400">
                  Helpers add context like values, dealbreakers, and how they met the person so you can
                  make confident decisions.
                </p>
              )}
              {idx === 2 && (
                <p className="text-sm text-zinc-400">
                  Move forward with a simple yes/no. We guide you to a short intro or a polite pass—no ghosting needed.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full border-t border-white/5 bg-zinc-950 py-14">
        <div className="max-w-5xl mx-auto px-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">How it flows</p>
            <h2 className="text-2xl font-bold">Three simple steps to calmer dating.</h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black font-semibold">
                  1
                </span>
                <div>
                  <div className="font-semibold text-white">Invite a trusted helper</div>
                  <p className="text-zinc-400">
                    Send a private link to a friend, sibling, or mentor to start curating your pool.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black font-semibold">
                  2
                </span>
                <div>
                  <div className="font-semibold text-white">They propose thoughtful matches</div>
                  <p className="text-zinc-400">
                    Helpers add candidates with notes and context so you know why they fit.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black font-semibold">
                  3
                </span>
                <div>
                  <div className="font-semibold text-white">You decide, quietly</div>
                  <p className="text-zinc-400">
                    Accept, request an intro, or pass with one tap. Only you see the final list.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-2xl bg-black p-6 space-y-4 shadow-lg shadow-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">This week</p>
                <p className="text-3xl font-semibold">6 curated options</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500">Accepted</p>
                <p className="text-xl font-semibold text-emerald-400">3 intros</p>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                {
                  name: "Priya — thoughtful, community-minded",
                  status: "Intro requested",
                  color: "text-amber-300",
                },
                {
                  name: "Marco — great communicator, knows your pace",
                  status: "Accepted",
                  color: "text-emerald-300",
                },
                {
                  name: "Sasha — values family, met through a friend",
                  status: "Considering",
                  color: "text-sky-300",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="border border-white/10 rounded-lg p-4 bg-white/5"
                >
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className={`text-xs mt-1 ${item.color}`}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full px-6 py-4 border-t border-white/10 text-xs text-zinc-500 flex justify-center bg-black">
        <span>Tracy’s Match • Early prototype</span>
      </footer>
    </main>
  );
}
