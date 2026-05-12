import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSBChapters } from "../../../services/sbService";
import type { SBChapter } from "../../../types/sb";
import PageContainer from "../../../components/layout/PageContainer";

export default function SBCantoPage() {
  const { cantoNumber } = useParams();

  const [chapters, setChapters] = useState<SBChapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cantoNumber) return;

    getSBChapters(cantoNumber)
      .then(setChapters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cantoNumber]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        {/* Back */}
        <div className="mx-4">
          <Link
            to="/books/srimad-bhagavatam"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Cantos
          </Link>
        </div>

        {/* Header */}
        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Srimad Bhagavatam
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Canto {cantoNumber}
          </h1>

          <p className="mt-4 text-slate-600">
            Explore all chapters from this canto and dive deep into divine
            teachings and pastimes.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4">
            <p className="text-2xl font-bold text-blue-700">
              {chapters.length}
            </p>
            <p className="text-sm text-slate-600">Chapters</p>
          </div>
        </section>

        {/* Chapters List */}
        <section className="mt-10">
          {loading ? (
            <p className="text-slate-600">Loading chapters...</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/books/srimad-bhagavatam/canto/${chapter.canto_number}/chapter/${chapter.chapter_number}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                      {chapter.chapter_number}
                    </div>

                    {/* Content */}
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
      </PageContainer>
    </main>
  );
}
