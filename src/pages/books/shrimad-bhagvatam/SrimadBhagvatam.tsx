import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSBCantos } from "../../../services/sbService";
import type { SBCanto } from "../../../types/sb";
import PageContainer from "../../../components/layout/PageContainer";

export default function SrimadBhagavatamPage() {
  const [cantos, setCantos] = useState<SBCanto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSBCantos()
      .then(setCantos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        <Link
          to="/books"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to Books
        </Link>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Srimad Bhagavatam
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                The spotless Purana of devotion.
              </h1>

              <div className="mt-5 space-y-4 leading-8 text-slate-700">
                <p>
                  Srimad Bhagavatam is one of the most important scriptures in
                  bhakti tradition. It reveals the nature of the Supreme Lord,
                  the purpose of creation, the journey of the soul, and the path
                  of pure devotional service.
                </p>

                <p>
                  Through histories, prayers, teachings, and divine pastimes,
                  the Bhagavatam gradually guides the reader from philosophical
                  understanding to loving devotion to Lord Krishna.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Unlike other scriptures that primarily focus on philosophy or
                  ritual, the Srimad Bhagavatam emphasizes the direct experience
                  of divine love through hearing and remembering the pastimes of
                  the Lord. It describes the lives of great devotees, their
                  struggles, realizations, and unwavering faith, showing how
                  devotion transforms the heart and brings one closer to
                  Krishna.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  The Bhagavatam culminates in the Tenth Canto, which
                  beautifully narrates the childhood and youthful pastimes of
                  Lord Krishna in Vrindavan — revealing the highest and most
                  intimate form of divine love. By regularly hearing and
                  reflecting on these teachings, one gradually transcends
                  material desires and awakens a deep, personal connection with
                  the Supreme.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">
                    {cantos.length || 12}
                  </p>
                  <p className="text-sm text-slate-600">Cantos</p>
                </div>

                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">18k+</p>
                  <p className="text-sm text-slate-600">Verses</p>
                </div>
              </div>
            </div>

            <div className="h-80 md:h-auto">
              <img
                src="http://localhost:3000/images/krishna_40.jpeg"
                alt="Srimad Bhagavatam"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">Cantos</h2>

          {loading ? (
            <p className="mt-8 text-slate-600">Loading cantos...</p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cantos.map((canto) => (
                <Link
                  key={canto.id}
                  to={`/books/srimad-bhagavatam/canto/${canto.canto_number}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                      {canto.canto_number}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-600">
                        Canto {canto.canto_number}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                        {canto.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Explore chapters and verses from Canto{" "}
                        {canto.canto_number}.
                      </p>

                      <p className="mt-4 text-sm font-semibold text-blue-600">
                        Open canto →
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
