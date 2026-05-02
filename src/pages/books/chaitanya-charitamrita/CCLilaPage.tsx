import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCCChapters } from "../../../services/ccService";
import type { CCChapter } from "../../../types/cc";
import Header from "../../../components/header/Header";

export default function CCLilaPage() {
  const { lilaKey } = useParams();

  const [chapters, setChapters] = useState<CCChapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lilaKey) return;

    getCCChapters(lilaKey)
      .then(setChapters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lilaKey]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Header/>
        <div className="mx-4">
          <Link
            to="/books/chaitanya-charitamrita"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Chaitanya Charitamrita
          </Link>
        </div>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Chaitanya Charitamrita
          </p>

          <h1 className="mt-3 text-4xl font-extrabold capitalize text-slate-900">
            {lilaKey}-līlā
          </h1>

          <p className="mt-4 text-slate-600">
            Explore all chapters from {lilaKey}-līlā and read the teachings,
            pastimes, translations, and purports.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4">
            <p className="text-2xl font-bold text-blue-700">
              {chapters.length}
            </p>
            <p className="text-sm text-slate-600">Chapters</p>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <p className="text-slate-600">Loading chapters...</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/books/chaitanya-charitamrita/${chapter.lila_key}/chapter/${chapter.chapter_number}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                      {chapter.chapter_number}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-600">
                        Chapter {chapter.chapter_number}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                        {chapter.name}
                      </h3>

                      <p className="mt-3 text-sm text-slate-500">
                        Explore verses and teachings →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
