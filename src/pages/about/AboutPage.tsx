import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import prabhupada from '../../assets/prabhupada.webp'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        <section className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              About Krishna Wisdom
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
              A peaceful place to read, reflect, and remember Krishna.
            </h1>

            <p className="mt-6 leading-8 text-slate-700">
              Krishna Wisdom is a devotional reading app created to bring sacred
              Vaishnava scriptures into a clean, modern, and beautiful digital
              experience. The goal is simple: help readers connect with
              Krishna’s teachings through Bhagavad Gita, Srimad Bhagavatam,
              Chaitanya Charitamrita, Prabhupada books, and divine Krishna art.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <div className="h-[440px] overflow-hidden rounded-[1.5rem]">
              <img
                src="http://localhost:3000/images/krishna_02.jpeg"
                alt="Krishna"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Read Sacred Texts",
              desc: "Explore chapters, verses, translations, synonyms, and purports in a calm reading flow.",
            },
            {
              title: "Remember Krishna",
              desc: "Use the app as a daily spiritual companion to hear, read, and reflect on Krishna’s wisdom.",
            },
            {
              title: "AI-Assisted Learning",
              desc: "Ask questions, translate selected text, and understand scripture with helpful AI support.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-7 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🪈
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid items-center md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                About Srila Prabhupada
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
                Founder-Acharya of ISKCON
              </h2>

              <div className="mt-6 space-y-4 leading-8 text-slate-700">
                <p>
                  A.C. Bhaktivedanta Swami Prabhupada is the Founder-Acharya of
                  the International Society for Krishna Consciousness. He
                  dedicated his life to sharing the teachings of Lord Krishna and
                  the message of bhakti-yoga with the world.
                </p>

                <p>
                  Through his translations and purports of Bhagavad Gita, Srimad
                  Bhagavatam, Chaitanya Charitamrita, and many other books, he
                  presented Vaishnava wisdom in a clear and practical way for
                  modern readers.
                </p>

                <p>
                  This app respectfully presents scripture content inspired by
                  his mission — to make Krishna consciousness accessible through
                  reading, hearing, reflection, and sincere inquiry.
                </p>
                <p>
                  <Link
                    to="/about/prabhupada"
                    className="group inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:text-orange-600"
                  >
                    Read more about Srila Prabhupada

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </p>
              </div>
            </div>

            <div className="h-[520px] bg-blue-50">
              <img
                src={prabhupada}
                alt="Srila Prabhupada"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-600 p-8 text-white shadow-xl md:p-10">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
              What is ISKCON?
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              A global movement for Krishna consciousness.
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4 leading-8 text-blue-50">
                <p>
                  ISKCON, the International Society for Krishna Consciousness, is
                  a worldwide spiritual movement based on the teachings of Lord
                  Krishna as explained in Bhagavad Gita and the Vaishnava
                  scriptures.
                </p>

                <p>
                  Its central practice is bhakti-yoga — loving devotional service
                  to Krishna through chanting, hearing, worship, service, study,
                  and living a spiritually conscious life.
                </p>
              </div>

              <div className="space-y-4 leading-8 text-blue-50">
                <p>
                  ISKCON temples and communities around the world share kirtan,
                  prasadam, festivals, philosophy, book distribution, and
                  spiritual education.
                </p>

                <p>
                  The purpose is to help people remember their eternal
                  relationship with Krishna and live with compassion, purity,
                  wisdom, and devotion.
                </p>
              </div>
              <div>
                <p>
                  <Link
                    to="/about/iskcon"
                    className="group inline-flex items-center gap-2 font-semibold text-white-700 transition hover:text-orange-600"
                  >
                    Read more about ISKCON

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Bhakti Yoga",
              desc: "The path of devotion, service, chanting, and loving remembrance of Krishna.",
            },
            {
              title: "Scriptural Study",
              desc: "A guided way to understand Bhagavad Gita, Bhagavatam, and Prabhupada’s books.",
            },
            {
              title: "Spiritual Community",
              desc: "A culture of kirtan, prasadam, festivals, seva, and devotional association.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-7 shadow-md">
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Platform Features
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
              What Krishna Wisdom offers
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              Krishna Wisdom is being developed as a complete devotional ecosystem
              for scripture learning, spiritual guidance, live satsangs, devotee
              connection and temple-centered digital experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Sacred Scriptures",
                icon: "📖",
                desc: "Bhagavad Gita, Bhagavatam, Chaitanya Charitamrita and Prabhupada books with structured reading.",
              },
              {
                title: "Live Satsangs",
                icon: "🎙️",
                desc: "Attend online lectures, centre classes, invite-only discussions and spiritual sessions.",
              },
              {
                title: "Devotee Community",
                icon: "🪔",
                desc: "Connect seekers with verified devotees for guidance and spiritual association.",
              },
              {
                title: "Festival Calendar",
                icon: "📅",
                desc: "Track Ekadashi, appearance days and devotional festivals according to location.",
              },
              {
                title: "ISKCON Centres",
                icon: "🏛️",
                desc: "Explore temples, communities, lectures, events and devotional activities worldwide.",
              },
              {
                title: "AI Scripture Assistant",
                icon: "✨",
                desc: "Ask questions from scripture context with respectful AI-assisted learning.",
              },
              {
                title: "Krishna Media",
                icon: "📺",
                desc: "Discover devotional channels, lectures, kirtans and spiritual educational media.",
              },
              {
                title: "Future Devotional Tools",
                icon: "🔒",
                desc: "Secure communication, spiritual planning, room booking and temple ecosystem tools.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Core Principles
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
              What guides Krishna Wisdom
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Scripture First",
                  desc: "The platform is centred around authentic Vaishnava scripture study and devotional understanding.",
                },
                {
                  title: "Peaceful Experience",
                  desc: "Designed to avoid addictive social media patterns and encourage reflection and spiritual focus.",
                },
                {
                  title: "Devotional Respect",
                  desc: "Built with respect toward Krishna, Vaishnava teachings, temples and spiritual communities.",
                },
                {
                  title: "Technology for Service",
                  desc: "Modern technology used in service of spiritual education, association and outreach.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-blue-50 p-6"
                >
                  <h3 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-700">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl md:p-10">
          <div className="max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-300">
              Future Vision
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              Building a global devotional technology ecosystem
            </h2>

            <p className="mt-6 max-w-4xl leading-8 text-slate-300">
              Krishna Wisdom is envisioned as a long-term spiritual infrastructure
              platform that combines scripture learning, temple ecosystems,
              devotional education, spiritual communication and global devotee
              connection into one peaceful digital experience.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Secure devotee communication",
                "Temple event systems",
                "Online satsang infrastructure",
                "Global ISKCON centre pages",
                "Room booking and event registration",
                "AI scripture search and learning",
                "Festival reminders",
                "Devotional media ecosystem",
                "Spiritual learning paths",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-semibold text-slate-100">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Begin your reading journey.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Start with Bhagavad Gita, explore the Bhagavatam, read Prabhupada
            books, or open the Krishna gallery for devotional inspiration.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/books"
              className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg hover:bg-blue-700"
            >
              Start Reading
            </Link>

            <Link
              to="/books/prabhupada"
              className="rounded-full border border-blue-300 bg-white px-7 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              Prabhupada Books
            </Link>

            <Link
              to="/gallery"
              className="rounded-full border border-blue-300 bg-white px-7 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              View Gallery
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}