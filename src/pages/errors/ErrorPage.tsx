import { Link } from "react-router-dom";

type Props = {
  title?: string;
  message?: string;
};

export default function ErrorPage({
  title = "Something Went Wrong",
  message = "An unexpected spiritual disturbance occurred while processing your request.",
}: Props) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[url('/krishna-images/krishna-bg.jpg')] bg-cover bg-center opacity-20" />

      <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-slate-950/90 to-black/95" />

      <section className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-red-300">
          Krishna Wisdom
        </p>

        <div className="mt-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-500/20 text-6xl">
            ⚠️
          </div>
        </div>

        <h1 className="mt-8 text-5xl font-black">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {message}
        </p>

        <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
          <p className="text-lg italic leading-8 text-red-100">
            “Do not be disturbed by temporary setbacks.”
          </p>

          <p className="mt-3 text-sm text-red-300">
            — Bhagavad Gita Wisdom
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-red-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:bg-red-600"
          >
            Retry
          </button>

          <Link
            to="/"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}