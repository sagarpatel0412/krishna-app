// pages/events/EventsPage.tsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch events");

        setEvents(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const countries = useMemo(() => {
    return Array.from(
      new Set(
        events
          .map((event) => event.iskcon_centre?.country)
          .filter(Boolean)
      )
    ).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();

    return events.filter((event) => {
      const centre = event.iskcon_centre || {};

      const matchesSearch =
        !q ||
        event.title?.toLowerCase().includes(q) ||
        event.description?.toLowerCase().includes(q) ||
        centre.name?.toLowerCase().includes(q) ||
        centre.city?.toLowerCase().includes(q) ||
        centre.country?.toLowerCase().includes(q);

      const matchesCountry = !country || centre.country === country;

      return matchesSearch && matchesCountry;
    });
  }, [events, search, country]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Krishna Wisdom Events
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Attend ISKCON Events Worldwide
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Browse active festivals, seva registrations, puja events, darshan
            passes and spiritual programs from ISKCON centres around the world.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event, centre, city, country..."
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Countries</option>

              {countries.map((item: any) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            No active events found.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {event.banner_image_url ? (
                  <img
                    src={event.banner_image_url}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-orange-100 text-5xl">
                    🙏
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {event.title}
                    </h2>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Active
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {event.description || "No description available"}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>
                      Date:{" "}
                      <b>{new Date(event.event_date).toLocaleString()}</b>
                    </p>

                    <p>
                      Centre:{" "}
                      <b>{event.iskcon_centre?.name || "ISKCON Centre"}</b>
                    </p>

                    <p>
                      Location:{" "}
                      <b>
                        {[
                          event.iskcon_centre?.city,
                          event.iskcon_centre?.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </b>
                    </p>

                    <p>
                      Fee:{" "}
                      <b>
                        {event.is_paid
                          ? `${event.currency} ${event.amount}`
                          : "Free"}
                      </b>
                    </p>
                  </div>

                  <Link
                    to={`/events/${event.event_code}`}
                    className="mt-6 block rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow hover:bg-orange-700"
                  >
                    Attend Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}