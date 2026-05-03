import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            Krishna Wisdom
          </Link>

          <div className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
            <Link to="/books" className="hover:text-blue-700">
              Books
            </Link>
            <Link to="/gallery" className="hover:text-blue-700">
              Gallery
            </Link>
            <Link to="/about" className="text-blue-700">
              About
            </Link>
          </div>
        </nav>

        <section className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              About Krishna Wisdom
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-tight md:text-6xl">
              A peaceful place to read, reflect, and remember Krishna.
            </h1>

            <p className="mt-6 leading-8 text-slate-700">
              Krishna Wisdom is a devotional reading app created to bring sacred
              Vaishnava scriptures into a clean, modern, and beautiful digital
              experience. The goal is simple: help readers connect with
              Krishna’s teachings through Bhagavad Gita, Srimad Bhagavatam,
              Chaitanya Charitamrita, Prabhupada books, and divine Krishna art.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <div className="h-[440px] overflow-hidden rounded-[1.5rem]">
              <img
                src="http://localhost:3000/images/krishna_02.jpeg"
                alt="Krishna"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Read Sacred Texts",
              desc: "Explore chapters, verses, translations, synonyms, and purports in a calm reading flow.",
            },
            {
              title: "Remember Krishna",
              desc: "Use the app as a daily spiritual companion to hear, read, and reflect on Krishna’s wisdom.",
            },
            {
              title: "Beautiful Gallery",
              desc: "Browse devotional Krishna images and paintings with a smooth preview and download experience.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-7 shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🪈
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-600 p-10 text-white shadow-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
              Purpose
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              Built for seekers, readers, and devotees.
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-blue-50">
              <p>
                This app is designed for anyone who wants to understand Krishna
                consciousness in a more accessible way. Instead of searching
                across many pages, users can move step by step through books,
                chapters, and verses with a clean interface.
              </p>

              <p>
                The deeper purpose is to create a space where spiritual reading
                feels peaceful, focused, and inspiring — not cluttered or
                distracting. Every page is designed to support reflection,
                devotion, and steady learning.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Begin your reading journey.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Start with Bhagavad Gita, explore the Bhagavatam, or open the
            Krishna gallery for devotional inspiration.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/books"
              className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg hover:bg-blue-700"
            >
              Start Reading
            </Link>

            <Link
              to="/gallery"
              className="rounded-full border border-blue-300 bg-white px-7 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              View Gallery
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
