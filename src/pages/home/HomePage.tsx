import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import PageContainer from "../../components/layout/PageContainer";

const books = [
  {
    title: "Bhagavad Gita",
    short: "BG",
    desc: "Krishna’s timeless guidance to Arjuna.",
    link: "/books/bhagavad-gita",
    img: "http://localhost:3000/images/krishna_50.jpeg",
  },
  {
    title: "Srimad Bhagavatam",
    short: "SB",
    desc: "Pure devotional wisdom and Krishna’s pastimes.",
    link: "/books/srimad-bhagavatam",
    img: "http://localhost:3000/images/krishna_40.jpeg",
  },
  {
    title: "Chaitanya Charitamrita",
    short: "CC",
    link: "/books/chaitanya-charitamrita",
    desc: "Teachings and life of Sri Chaitanya Mahaprabhu.",
    img: "http://localhost:3000/images/krishna_21.jpeg",
  },
  {
    title: "Prabhupada Books",
    short: "SP",
    link: "/books/prabhupada",
    desc: "Books and lectures by Srila Prabhupada.",
    img: "http://localhost:3000/images/krishna_46.jpeg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>

        <section className="grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Hare Krishna
            </p>

            <h2 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Read Krishna’s wisdom with devotion.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              Explore Bhagavad Gita, Srimad Bhagavatam, Chaitanya Charitamrita,
              Prabhupada books, and beautiful Krishna art in one peaceful app.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg hover:bg-blue-700">
                Start Reading
              </button>

              <button className="rounded-full border border-blue-300 bg-white px-7 py-3 font-semibold text-blue-700 hover:bg-blue-50">
                View Gallery
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <div className="h-[420px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100">
              <img
                src="http://localhost:3000/images/krishna_02.jpeg"
                alt="Krishna"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 shadow-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                Supreme Personality
              </p>

              <h3 className="text-3xl font-bold text-slate-900">
                Who is Krishna?
              </h3>

              <p className="mt-5 leading-8 text-slate-700">
                Krishna is described in the Bhagavad Gita as the Supreme
                Personality of Godhead — the source of all spiritual and
                material worlds. He is not only the guide of Arjuna, but the
                eternal friend, protector, and well-wisher of every living
                being.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                In Srimad Bhagavatam, Krishna is revealed as the original form
                of the Lord, full of beauty, knowledge, strength, fame, wealth,
                and renunciation. His pastimes in Vrindavan show the highest
                expression of divine love.
              </p>

              <button className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Read About Krishna
              </button>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-500 p-8 text-white shadow-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-100">
                Creation & Purpose
              </p>

              <h3 className="text-3xl font-bold">Why did creation begin?</h3>

              <p className="mt-5 leading-8 text-blue-50">
                According to Bhagavad Gita, the material world is created under
                Krishna’s direction. Nature works as His energy, and living
                beings enter this world according to their desires and karma.
              </p>

              <p className="mt-4 leading-8 text-blue-50">
                Srimad Bhagavatam explains that creation gives conditioned souls
                a place to exercise free will, learn through experience, and
                gradually return to loving service of Krishna. The purpose is
                not punishment, but purification and spiritual awakening.
              </p>

              <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                Explore Creation
              </button>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <h3 className="mb-8 text-3xl font-bold text-slate-900">
            Sacred Library
          </h3>

          <div className="grid gap-6 md:grid-cols-4">
            {books.map((book) => (
              <Link to={book.link}>
                <div
                  key={book.short}
                  className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow">
                      {book.short}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="text-lg font-bold leading-tight">
                        {book.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm leading-6 text-slate-600">
                      {book.desc}
                    </p>

                    <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                      Read Now →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
