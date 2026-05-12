import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGitaChapters } from "../../../services/gitaService";
import type { GitaChapter } from "../../../types/gita";
import PageContainer from "../../../components/layout/PageContainer";

export default function BhagavadGitaPage() {
  const [chapters, setChapters] = useState<GitaChapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGitaChapters()
      .then(setChapters)
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
                Bhagavad Gita As It Is
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                Divine guidance spoken by Krishna.
              </h1>

              <p className="mt-5 leading-8 text-slate-700">
                <p>
                  The Bhagavad Gita is a timeless spiritual dialogue between
                  Lord Krishna and Arjuna, spoken on the battlefield of
                  Kurukshetra. At a moment of deep confusion and moral dilemma,
                  Arjuna seeks guidance, and Krishna reveals the profound truths
                  of life, duty, and the nature of the self.
                </p>

                <p>
                  The Gita teaches that we are not the body, but the eternal
                  soul, and that true fulfillment comes from self-realization
                  and devotion. It presents the paths of Karma Yoga, Jnana Yoga,
                  and Bhakti Yoga as ways to attain inner peace and spiritual
                  awakening.
                </p>

                <p>
                  More than a scripture, the Bhagavad Gita is a guide to living
                  with clarity, purpose, and strength — helping us act without
                  attachment and reconnect with the divine essence within.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  One of the central teachings of the Bhagavad Gita is the
                  concept of performing one’s duty (dharma) without attachment
                  to the results. Krishna advises Arjuna to act with sincerity
                  and dedication, but without being disturbed by success or
                  failure. This principle of selfless action helps free the mind
                  from anxiety and leads to a balanced, peaceful life.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  The Gita also explains the nature of the material world,
                  describing how it is governed by the three modes — goodness,
                  passion, and ignorance. By understanding these influences, a
                  person can rise above them and cultivate a higher state of
                  consciousness. Through discipline, knowledge, and devotion,
                  one gradually moves toward spiritual clarity and freedom.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Ultimately, the Bhagavad Gita emphasizes surrender to the
                  Supreme as the highest path. Krishna assures that those who
                  take refuge in Him with faith and devotion are protected and
                  guided. This message offers hope and direction, reminding us
                  that no matter our situation, we can always turn toward the
                  divine and find purpose, strength, and inner peace.
                </p>
              </p>

              <div className="mt-8 flex gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">
                    {chapters.length || 18}
                  </p>
                  <p className="text-sm text-slate-600">Chapters</p>
                </div>

                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">700</p>
                  <p className="text-sm text-slate-600">Shloks</p>
                </div>
              </div>
            </div>

            <div className="h-80 md:h-auto">
              <img
                src="http://localhost:3000/images/krishna_50.jpeg"
                alt="Bhagavad Gita"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">Chapters</h2>

          {loading ? (
            <p className="mt-8 text-slate-600">Loading chapters...</p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/books/bhagavad-gita/chapter/${chapter.chapter_number}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                      {chapter.chapter_number}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-600">
                        {chapter.name_sanskrit}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                        {chapter.translation}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {chapter.transliteration}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {chapter.meaning_en}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-blue-600">
                        {chapter.verses_count} shloks →
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
