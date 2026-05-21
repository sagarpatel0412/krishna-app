import { Link } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";
import prabhupada from "../../../assets/prabhupada.webp";

const timeline = [
  ["1896", "Born as Abhay Charan De in Calcutta, India."],
  ["1922", "Met Srila Bhaktisiddhanta Sarasvati Thakura."],
  ["1965", "Travelled to America on the Jaladuta."],
  ["1966", "Founded ISKCON in New York City."],
  ["1968–1977", "Established temples, translated books, and spread Krishna consciousness worldwide."],
  ["1977", "Entered samadhi in Vrindavan."],
];

const teachings = [
  "Chant the holy names of Krishna.",
  "Study Bhagavad Gita and Srimad Bhagavatam.",
  "Live a life of purity, compassion and service.",
  "Offer food, work and talents to Krishna.",
  "Share Krishna consciousness with others.",
  "Associate with devotees and hear from scripture.",
];

const books = [
  "Bhagavad Gita As It Is",
  "Srimad Bhagavatam",
  "Sri Chaitanya Charitamrita",
  "Nectar of Devotion",
  "Krishna Book",
  "Teachings of Lord Chaitanya",
];

export default function PrabhupadaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50 text-slate-900">
      <PageContainer>
        <section className="grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Founder-Acharya of ISKCON
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
              His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              Srila Prabhupada carried the message of Lord Krishna across the
              world. Through his books, temples, disciples, kirtan, prasadam and
              tireless preaching, he made Krishna consciousness accessible to
              people everywhere.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/books/prabhupada"
                className="rounded-full bg-orange-600 px-7 py-3 font-bold text-white shadow-lg hover:bg-orange-700"
              >
                Read His Books
              </Link>

              <Link
                to="/books/bhagavad-gita"
                className="rounded-full border border-orange-300 bg-white px-7 py-3 font-bold text-orange-700 hover:bg-orange-50"
              >
                Bhagavad Gita
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <div className="h-[520px] overflow-hidden rounded-[1.5rem]">
              <img
                src={prabhupada}
                alt="Srila Prabhupada"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            Biography
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            A life dedicated to Krishna’s service
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Srila Prabhupada was born in 1896 in Calcutta, India. From
              childhood, he was attracted to Krishna worship, kirtan and
              devotional service. Later, he met his spiritual master, Srila
              Bhaktisiddhanta Sarasvati Thakura, who instructed him to spread
              Krishna consciousness in the English language.
            </p>

            <p>
              In 1965, at an advanced age, Srila Prabhupada travelled alone to
              America on the cargo ship Jaladuta. With deep faith in Krishna,
              he began sharing Bhagavad Gita, chanting Hare Krishna, cooking
              prasadam and teaching bhakti-yoga.
            </p>

            <p>
              In 1966, he founded the International Society for Krishna
              Consciousness, known as ISKCON. Within a few years, he inspired
              temples, farm communities, book distribution, kirtan, festivals,
              prasadam distribution and spiritual education across the world.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "His Mission",
              desc: "To spread Krishna consciousness, chanting of the holy names, and Bhagavad Gita wisdom throughout the world.",
            },
            {
              title: "His Gift",
              desc: "A complete spiritual culture: books, temples, kirtan, prasadam, festivals, deity worship and devotee association.",
            },
            {
              title: "His Legacy",
              desc: "A global movement where people from all backgrounds can learn bhakti-yoga and serve Krishna.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-7 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                🪔
              </div>

              <h3 className="text-2xl font-bold">{item.title}</h3>

              <p className="mt-4 leading-7 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">
            Timeline
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            Important moments from his life
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {timeline.map(([year, text]) => (
              <div
                key={year}
                className="rounded-3xl border border-white/10 bg-white/10 p-6"
              >
                <p className="text-3xl font-black text-orange-300">
                  {year}
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Teachings
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              What Srila Prabhupada taught
            </h2>

            <div className="mt-6 space-y-3">
              {teachings.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-blue-50 px-5 py-4 font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Books
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              His spiritual literature
            </h2>

            <div className="mt-6 space-y-3">
              {books.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-orange-50 px-5 py-4 font-semibold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-orange-50 p-8 text-center shadow-md md:p-10">
          <p className="text-lg italic leading-8 text-orange-900">
            “Books are the basis, purity is the force, preaching is the essence,
            utility is the principle.”
          </p>

          <p className="mt-4 text-sm font-bold text-orange-700">
            — Srila Prabhupada
          </p>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-4xl font-extrabold">
            Continue Srila Prabhupada’s mission
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Read his books, hear his teachings, chant Hare Krishna, serve
            devotees, and help others connect with Krishna consciousness.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/books/prabhupada"
              className="rounded-full bg-orange-600 px-7 py-3 font-bold text-white hover:bg-orange-700"
            >
              Explore Prabhupada Books
            </Link>

            <Link
              to="/lectures"
              className="rounded-full border border-orange-300 bg-white px-7 py-3 font-bold text-orange-700 hover:bg-orange-50"
            >
              Join Lectures
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}