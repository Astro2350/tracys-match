import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Top nav */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
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

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Curated dating, guided by{" "}
            <span className="text-zinc-300">the people who know you best.</span>
          </h1>

          <p className="text-sm md:text-base text-zinc-400">
            Tracy’s Match lets trusted friends or family quietly help curate
            your dating pool. They filter. You choose. No one ever sees who
            helped behind the scenes.
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

          <div className="pt-4 text-xs md:text-sm text-zinc-500">
            Built for single & divorced adults who want healthier relationships,
            with support from the people they trust.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-white/10 text-xs text-zinc-500 flex justify-center">
        <span>Tracy’s Match • Early prototype</span>
      </footer>
    </main>
  );
}
