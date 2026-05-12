import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGitaChapterSloks } from "../../../services/gitaService";
import type { GitaSlok } from "../../../types/gita";
import PageContainer from "../../../components/layout/PageContainer";

export default function GitaChapterPage() {
  const { chapterNumber } = useParams();

  const [sloks, setSloks] = useState<GitaSlok[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterNumber) return;

    getGitaChapterSloks(chapterNumber)
      .then(setSloks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [chapterNumber]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        <Link
          to="/books/bhagavad-gita"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to Bhagavad Gita
        </Link>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Bhagavad Gita
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Chapter {chapterNumber} Shloks
          </h1>

          <p className="mt-4 text-slate-600">
            Read all shloks from chapter {chapterNumber}. Click any shlok to see
            translation, purport, and detailed explanations.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4">
            <p className="text-2xl font-bold text-blue-700">{sloks.length}</p>
            <p className="text-sm text-slate-600">Total shloks</p>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <p className="text-slate-600">Loading shloks...</p>
          ) : (
            <div className="grid gap-5">
              {sloks.map((slok) => (
                <Link
                  key={slok.id}
                  to={`/books/bhagavad-gita/chapter/${slok.chapter_number}/verse/${slok.verse_number}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                      {slok.verse_number}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">
                          {slok.api_id}
                        </h3>

                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          Verse {slok.verse_number}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-line text-lg leading-9 text-slate-800">
                        {slok.slok}
                      </p>

                      <p className="mt-4 line-clamp-2 whitespace-pre-line text-sm leading-6 text-slate-500">
                        {slok.transliteration}
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
      </PageContainer>
    </main>
  );
}
