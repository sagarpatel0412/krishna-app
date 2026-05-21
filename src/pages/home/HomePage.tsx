import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { getTodayShlok, getFeaturedChannels, getTodaySbShlok } from "../../services/dailyWisdomService";
import { useEffect, useState } from "react";
import { books, features, vision } from "../../utils/utils";

export default function HomePage() {

  const navigate = useNavigate()

  const [todayShlok, setTodayShlok] = useState<any>(null);
  const [todaySbShlok, setTodaySbShlok] = useState<any>(null);
  const [dailyLoading, setDailyLoading] = useState(true);
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedChannels()
      .then(setChannels)
      .catch(console.error);
  }, []);

  useEffect(() => {
    getTodaySbShlok()
      .then(setTodaySbShlok)
      .catch(console.error);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadTodayShlok() {
      try {
        const response = await getTodayShlok();

        console.log(response, "response from service");

        const shlok = response?.data ? response.data : response;

        if (mounted) {
          setTodayShlok(shlok);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setDailyLoading(false);
        }
      }
    }

    loadTodayShlok();

    return () => {
      mounted = false;
    };
  }, []);

  console.log(channels, "channels")

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        <section className="grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Hare Krishna
            </p>

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Read, learn, connect and serve through Krishna Wisdom.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              Krishna Wisdom is a devotional platform for scriptures, live
              satsangs, ISKCON centres, events, rooms, seeker guidance,
              translations and AI-powered scripture learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/books/bhagavad-gita"
                className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg hover:bg-blue-700"
              >
                Start Reading
              </Link>

              <Link
                to="/lectures"
                className="rounded-full bg-orange-500 px-7 py-3 font-semibold text-white shadow-lg hover:bg-orange-600"
              >
                Join Live Lecture
              </Link>

              <Link
                to="/festival-calendar"
                className="rounded-full border border-blue-300 bg-white px-7 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Festival Calendar
              </Link>
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

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_520px]">
            <div className="rounded-[2rem] bg-white p-8 shadow-md">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Our Concept
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
                A devotional infrastructure platform
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-700">
                Krishna Wisdom is not just a reading application. It is designed as a
                complete devotional ecosystem where seekers, devotees, temples and
                spiritual communities can come together through technology centred on
                Krishna consciousness.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-700">
                The platform allows users to study Bhagavad Gita, Srimad Bhagavatam,
                Chaitanya Charitamrita and Prabhupada books with structured navigation,
                translations and devotional guidance. Users can ask scripture questions
                through an AI-powered assistant, attend live online satsangs, join
                invite-only lectures, discover ISKCON centres around the world, and
                participate in festivals, events and spiritual discussions.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-700">
                Krishna Wisdom also aims to support verified devotees, moderators and
                temple communities with tools for communication, lecture management,
                event organization, room booking, devotee guidance and spiritual
                outreach. Instead of distraction-driven social media, the goal is to
                create a peaceful, scripture-first digital environment focused on
                learning, service, association and spiritual growth.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-700">
                Our long-term vision is to build a global spiritual infrastructure
                platform for Krishna consciousness — combining scripture learning,
                devotional media, temple ecosystems, secure devotee communication,
                festival systems and future technologies that help people deepen their
                relationship with Krishna in a meaningful and practical way.
              </p>

              <section className="pb-20 mt-4 ">
                <div className="rounded-[2rem] bg-orange-50 p-8 text-center shadow-md">
                  <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
                    Today’s Shrimad Bhagvatam slok
                  </p>

                  <p className="mt-5 text-lg italic leading-8 text-orange-900">
                    {todaySbShlok ? (todaySbShlok.devanagari ||
                      todaySbShlok.verse_text ||
                      todaySbShlok.purport ||
                      "Loading today's shlok...") : "Loading ..."}
                  </p>

                  <p className="mt-4 text-sm font-bold text-orange-700">
                    Shrimad Bhagvatam {todaySbShlok?.title}
                    {todaySbShlok && (
                      <Link className="mx-4 text-blue-900" to={`/books/srimad-bhagavatam/canto/${todaySbShlok?.canto_number}/chapter/${todaySbShlok?.chapter_number}/verse/${todaySbShlok?.verse_number}`}>
                        Read
                      </Link>
                    )}

                  </p>
                </div>
              </section>

            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="relative h-full min-h-[700px]">
                <img
                  src="http://localhost:3000/images/krishna_33.jpeg"
                  alt="Lord Krishna"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                    Krishna Wisdom
                  </p>

                  <h3 className="mt-3 text-4xl font-extrabold leading-tight">
                    Technology in service of devotion
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    A spiritual ecosystem for scripture learning, live satsangs,
                    devotee connection and Krishna consciousness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            What Krishna Wisdom Offers
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="rounded-[2rem] bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.desc}
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-blue-600">
                  Explore →
                </span>
              </Link>
            ))}
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
                material worlds. He is the eternal friend, protector, guide and
                well-wisher of every living being.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                Through scripture, satsang and devotional service, Krishna
                Wisdom helps users understand Krishna not only philosophically,
                but personally and practically.
              </p>

              <Link
                to="/books/bhagavad-gita"
                className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Read About Krishna
              </Link>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-500 p-8 text-white shadow-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-100">
                Purpose
              </p>

              <h3 className="text-3xl font-bold">
                Why this app exists
              </h3>

              <p className="mt-5 leading-8 text-blue-50">
                The goal is to create a peaceful, scripture-first digital
                space. Instead of distraction, Krishna Wisdom focuses on
                spiritual learning, meaningful devotee connection, live
                satsangs, seva, festivals and temple-centred community.
              </p>

              <p className="mt-4 leading-8 text-blue-50">
                The long-term vision is to support seekers, devotees and ISKCON
                centres through one devotional technology platform.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Spiritual Books
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                Sacred Library
              </h3>
            </div>

            <Link
              to="/books"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {books.map((book) => (
              <Link key={book.short} to={book.link}>
                <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl">
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

        <section className="pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Spiritual Media
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                Featured Devotional Channels
              </h3>
            </div>

            <Link
              to="/playlists"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {channels.map((channel) => (
              <Link
                key={channel.id}
                to={`/playlists/owners/${channel.channel_id}`}
                className="rounded-[2rem] bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full bg-orange-100 shadow">
                  {channel.thumbnail ? (
                    <img
                      src={channel.thumbnail}
                      alt={channel.channel_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-black text-orange-700">
                      {channel.channel_name?.charAt(0) || "K"}
                    </div>
                  )}
                </div>

                <h4 className="mt-5 text-xl font-bold text-slate-900">
                  {channel.channel_name || "Devotional Channel"}
                </h4>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  Approved Krishna consciousness media channel.
                </p>
                <div className="flex justify-between">
                  <span onClick={(e) => {
                    e.preventDefault();
                    navigate(`/playlists/owners/${channel.channel_id}`)
                  }}
                    className="mt-5 inline-block text-sm font-bold text-blue-600">
                    Visit Channel →
                  </span>
                  <span onClick={(e) => {
                    e.preventDefault();
                    window.open(channel.channel_url, "_blank");
                  }}
                    className="mt-5 inline-block text-sm font-bold text-red-600">
                    See Youtube Channel →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-300">
              Future Vision
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              Building a spiritual technology ecosystem
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vision.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5"
                >
                  <p className="font-semibold text-slate-100">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="rounded-[2rem] bg-orange-50 p-8 text-center shadow-md">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Today’s Krishna Wisdom
            </p>

            <p className="mt-5 text-lg italic leading-8 text-orange-900">
              {todayShlok ? (todayShlok.slok ||
                todayShlok.transliteration ||
                todayShlok.purport ||
                "Loading today's shlok...") : "Loading ..."}
            </p>

            <p className="mt-4 text-sm font-bold text-orange-700">
              Bhagavad Gita {todayShlok?.chapter_number}.{todayShlok?.verse_number}

              {todayShlok && (
                <Link className="mx-4 text-blue-900" to={`/books/bhagavad-gita/chapter/${todayShlok?.chapter_number}/verse/${todayShlok?.verse_number}`}>
                  Read
                </Link>
              )}
            </p>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}