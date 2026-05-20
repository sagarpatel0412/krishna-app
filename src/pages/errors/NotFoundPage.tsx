import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[url('/krishna-images/krishna-bg.jpg')] bg-cover bg-center opacity-20" />

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-orange-950/70 to-black/90" />

      <section className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-orange-300">
          Krishna Wisdom
        </p>

        <h1 className="mt-6 text-8xl font-black text-orange-400">
          404
        </h1>

        <h2 className="mt-4 text-4xl font-extrabold leading-tight">
          Page Not Found
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The page you are searching for may have been moved,
          deleted, or perhaps never existed in this material world.
        </p>

        <div className="mt-10 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-6">
          <p className="text-lg italic leading-8 text-orange-100">
            “For one who remembers Me without deviation,
            I am easy to obtain.”
          </p>

          <p className="mt-3 text-sm text-orange-300">
            — Bhagavad Gita 8.14
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-600"
          >
            Return Home
          </Link>

          <Link
            to="/lectures"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            Explore Lectures
          </Link>
        </div>
      </section>
    </main>
  );
}