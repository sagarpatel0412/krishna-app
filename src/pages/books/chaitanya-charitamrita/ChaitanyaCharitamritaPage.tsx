import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCCParts } from "../../../services/ccService";
import type { CCPart } from "../../../types/cc";
import Header from "../../../components/header/Header";

export default function ChaitanyaCharitamritaPage() {
  const [parts, setParts] = useState<CCPart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCCParts()
      .then(setParts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Header />
        <div className="mx-4">
          <Link
            to="/books"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Books
          </Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Chaitanya Charitamrita
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                The life and teachings of Sri Chaitanya Mahaprabhu.
              </h1>

              <div className="mt-5 space-y-4 leading-8 text-slate-700">
                <p>
                  Chaitanya Charitamrita reveals the divine life, teachings, and
                  inner mood of Sri Chaitanya Mahaprabhu, who appeared to spread
                  the chanting of the holy names and the path of pure love for
                  Krishna.
                </p>

                <p>
                  The text is divided into Ādi-līlā, Madhya-līlā, and
                  Antya-līlā, guiding the reader through Mahaprabhu’s identity,
                  mission, travels, teachings, and deep devotional ecstasies.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-blue-50 px-5 py-4">
                <p className="text-2xl font-bold text-blue-700">
                  {parts.length || 3}
                </p>
                <p className="text-sm text-slate-600">Parts / Līlās</p>
              </div>
            </div>

            <div className="h-80 md:h-auto">
              <img
                src="http://localhost:3000/images/krishna_21.jpeg"
                alt="Chaitanya Charitamrita"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">Parts</h2>

          {loading ? (
            <p className="mt-8 text-slate-600">Loading parts...</p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {parts.map((part) => (
                <Link
                  key={part.id}
                  to={`/books/chaitanya-charitamrita/${part.lila_key}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                    {part.order_index}
                  </div>

                  <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    {part.lila_key}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-blue-700">
                    {part.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Explore chapters and verses from {part.name}.
                  </p>

                  <p className="mt-5 text-sm font-semibold text-blue-600">
                    Open part →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
