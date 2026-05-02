import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCCChapterSloks } from "../../../services/ccService";
import type { CCSlok } from "../../../types/cc";
import Header from "../../../components/header/Header";

export default function CCChapterPage() {
  const { lilaKey, chapterNumber } = useParams();

  const [sloks, setSloks] = useState<CCSlok[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lilaKey || !chapterNumber) return;

    getCCChapterSloks(lilaKey, chapterNumber)
      .then(setSloks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lilaKey, chapterNumber]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Header />
        <div className="mx-4">
          <Link
            to={`/books/chaitanya-charitamrita/${lilaKey}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to {lilaKey}-līlā
          </Link>
        </div>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Chaitanya Charitamrita
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            {lilaKey}-līlā, Chapter {chapterNumber}
          </h1>

          <p className="mt-4 text-slate-600">
            Read all verses from this chapter. Click any verse to see synonyms,
            translation, and purport.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4">
            <p className="text-2xl font-bold text-blue-700">{sloks.length}</p>
            <p className="text-sm text-slate-600">Verses</p>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <p className="text-slate-600">Loading verses...</p>
          ) : (
            <div className="grid gap-5">
              {sloks.map((slok) => (
                <Link
                  key={slok.id}
                  to={`/books/chaitanya-charitamrita/${slok.lila_key}/chapter/${slok.chapter_number}/verse/${slok.verse_key}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                      {slok.verse_key}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">
                          {slok.title}
                        </h3>

                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          Verse {slok.verse_key}
                        </span>
                      </div>

                      {slok.devanagari && (
                        <p className="mt-4 line-clamp-3 text-lg leading-9 text-slate-800">
                          {slok.devanagari}
                        </p>
                      )}

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                        {slok.verse_text}
                      </p>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-700">
                        {slok.translation}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-blue-600">
                        Read details →
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
