import { Link } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";
import iskcon from "../../../assets/iskon-temple.jpg";

const purposes = [
  "To systematically propagate spiritual knowledge to society at large.",
  "To propagate Krishna consciousness as revealed in Bhagavad Gita and Srimad Bhagavatam.",
  "To bring people closer together for teaching a simpler, natural way of life.",
  "To teach and encourage sankirtana, the congregational chanting of the holy names of God.",
  "To establish holy places dedicated to Krishna’s pastimes.",
  "To bring members together for spiritual education and devotional living.",
  "To publish and distribute books, magazines and writings about Krishna consciousness.",
];

const practices = [
  {
    title: "Chanting Hare Krishna",
    desc: "The chanting of the Hare Krishna maha-mantra is central to ISKCON’s spiritual practice.",
    icon: "📿",
  },
  {
    title: "Bhagavad Gita Study",
    desc: "ISKCON teaches Bhagavad Gita and Srimad Bhagavatam as practical spiritual guides.",
    icon: "📖",
  },
  {
    title: "Kirtan",
    desc: "Devotional music and congregational chanting help the heart remember Krishna.",
    icon: "🎶",
  },
  {
    title: "Prasadam",
    desc: "Food offered to Krishna is distributed as mercy, service and spiritual culture.",
    icon: "🍛",
  },
  {
    title: "Deity Worship",
    desc: "Temples offer beautiful worship to Krishna with devotion, cleanliness and love.",
    icon: "🪔",
  },
  {
    title: "Seva",
    desc: "Devotional service is the heart of bhakti-yoga and temple community life.",
    icon: "🙏",
  },
];

const activities = [
  "Temple worship and daily arati",
  "Sunday feasts and prasadam distribution",
  "Bhagavad Gita and Bhagavatam classes",
  "Harinam sankirtan and kirtan festivals",
  "Book distribution",
  "Food for Life and charity programs",
  "Youth programs and spiritual education",
  "Festivals like Janmashtami, Gaura Purnima and Ratha Yatra",
  "Farm communities and simple living projects",
];

const timeline = [
  ["1965", "Srila Prabhupada travelled from India to America on the Jaladuta."],
  ["1966", "ISKCON was incorporated in New York City by Srila Prabhupada."],
  ["1967–1970", "Early temples, kirtan, book distribution and preaching expanded."],
  ["1970s", "ISKCON grew internationally with temples, festivals, books and prasadam programs."],
  ["Today", "ISKCON continues as a global Krishna consciousness movement with temples and communities worldwide."],
];

export default function IskconPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50 text-slate-900">
      <PageContainer>
        <section className="grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              About ISKCON
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
              The International Society for Krishna Consciousness
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              ISKCON, also known as the Hare Krishna movement, is a global
              spiritual movement founded by His Divine Grace A.C. Bhaktivedanta
              Swami Prabhupada in New York City in 1966. Its purpose is to help
              people understand Krishna consciousness through bhakti-yoga,
              chanting, scripture study, prasadam, service and devotee
              association.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/books/bhagavad-gita"
                className="rounded-full bg-orange-600 px-7 py-3 font-bold text-white shadow-lg hover:bg-orange-700"
              >
                Read Bhagavad Gita
              </Link>

              <Link
                to="/about/prabhupada"
                className="rounded-full border border-orange-300 bg-white px-7 py-3 font-bold text-orange-700 hover:bg-orange-50"
              >
                About Prabhupada
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <div className="h-[520px] overflow-hidden rounded-[1.5rem]">
              <img
                src={iskcon}
                alt="ISKCON Krishna Consciousness"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            What is ISKCON?
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            A movement of bhakti-yoga, chanting and Krishna consciousness
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              ISKCON is rooted in the Gaudiya Vaishnava tradition, which teaches
              that Krishna is the Supreme Personality of Godhead and that the
              soul’s natural relationship with Him is awakened through loving
              devotional service.
            </p>

            <p>
              The movement shares the teachings of Bhagavad Gita, Srimad
              Bhagavatam and the teachings of Sri Chaitanya Mahaprabhu. Its
              central spiritual practice is chanting the holy names of Krishna,
              especially the Hare Krishna maha-mantra.
            </p>

            <p>
              ISKCON communities around the world offer temple worship, kirtan,
              prasadam distribution, classes, festivals, book distribution,
              youth programs, spiritual counseling and opportunities for seva.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Founder-Acharya",
              desc: "Srila Prabhupada founded ISKCON in 1966 and carried Krishna’s message worldwide.",
            },
            {
              title: "Bhakti Yoga",
              desc: "ISKCON teaches devotional service to Krishna through hearing, chanting, remembering and serving.",
            },
            {
              title: "Global Community",
              desc: "Temples and communities around the world support spiritual learning, worship and association.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-7 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                🪔
              </div>

              <h3 className="text-2xl font-bold">{item.title}</h3>

              <p className="mt-4 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-600 p-8 text-white shadow-2xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
            Seven Purposes
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            Why ISKCON was established
          </h2>

          <p className="mt-5 max-w-4xl leading-8 text-blue-50">
            Srila Prabhupada incorporated ISKCON with seven explicit purposes,
            including spreading spiritual knowledge, teaching Krishna
            consciousness, encouraging sankirtana, establishing holy places and
            publishing spiritual literature.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {purposes.map((purpose, index) => (
              <div
                key={purpose}
                className="rounded-3xl border border-white/10 bg-white/10 p-5"
              >
                <p className="text-sm font-bold text-orange-200">
                  Purpose {index + 1}
                </p>

                <p className="mt-2 leading-7 text-white">{purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Spiritual Practices
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
              The culture of Krishna consciousness
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              ISKCON’s daily spiritual life is centred on hearing, chanting,
              worship, study, service, prasadam and association with devotees.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {practices.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Temple Life
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              What happens in ISKCON communities
            </h2>

            <div className="mt-6 space-y-3">
              {activities.map((item) => (
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
              Prasadam & Service
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Sharing Krishna’s mercy
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-slate-700">
              <p>
                Prasadam means food offered to Krishna with devotion. ISKCON
                temples distribute prasadam through temple feasts, festivals and
                outreach programs.
              </p>

              <p>
                ISKCON’s Food for Life tradition expanded prasadam distribution
                to help serve people in need through free or subsidised food
                programs.
              </p>

              <p>
                Through prasadam, book distribution, kirtan and spiritual
                education, devotees try to share Krishna consciousness in a
                compassionate and practical way.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">
            History
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            From a small storefront to a global movement
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {timeline.map(([year, text]) => (
              <div
                key={year}
                className="rounded-3xl border border-white/10 bg-white/10 p-6"
              >
                <p className="text-3xl font-black text-orange-300">{year}</p>

                <p className="mt-3 leading-7 text-slate-200">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            ISKCON & Krishna Wisdom
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
            Supporting spiritual learning through technology
          </h2>

          <p className="mt-6 max-w-5xl text-lg leading-8 text-slate-700">
            Krishna Wisdom is being built as a devotional technology platform
            inspired by the mission of sharing Krishna consciousness. Through
            scriptures, lectures, festivals, centre discovery, spiritual media,
            devotee connection and future temple tools, the app aims to support
            seekers and devotees in a peaceful, scripture-first digital
            environment.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/centres"
              className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white hover:bg-blue-700"
            >
              Explore ISKCON Centres
            </Link>

            <Link
              to="/lectures"
              className="rounded-full border border-blue-300 bg-white px-7 py-3 font-bold text-blue-700 hover:bg-blue-50"
            >
              Join Online Lectures
            </Link>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-4xl font-extrabold">
            Begin your Krishna consciousness journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Read Bhagavad Gita, join live satsangs, visit ISKCON centres,
            attend festivals and connect with devotees.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/books/bhagavad-gita"
              className="rounded-full bg-orange-600 px-7 py-3 font-bold text-white hover:bg-orange-700"
            >
              Read Bhagavad Gita
            </Link>

            <Link
              to="/about/prabhupada"
              className="rounded-full border border-orange-300 bg-white px-7 py-3 font-bold text-orange-700 hover:bg-orange-50"
            >
              About Srila Prabhupada
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}