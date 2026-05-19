// pages/rooms/RoomsPage.tsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getRoomCentres } from "../../services/roomService";

export default function RoomsPage() {
  const [centres, setCentres] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCentres() {
      try {
        const data = await getRoomCentres();
        setCentres(data);
      } catch (err: any) {
        setError(err.message || "Failed to load centres");
      } finally {
        setLoading(false);
      }
    }

    loadCentres();
  }, []);

  const countries = useMemo(() => {
    return Array.from(
      new Set(centres.map((centre) => centre.country).filter(Boolean))
    ).sort();
  }, [centres]);

  const filteredCentres = useMemo(() => {
    const q = search.toLowerCase();

    return centres.filter((centre) => {
      const matchesSearch =
        !q ||
        centre.name?.toLowerCase().includes(q) ||
        centre.city?.toLowerCase().includes(q) ||
        centre.country?.toLowerCase().includes(q);

      const matchesCountry = !country || centre.country === country;

      return matchesSearch && matchesCountry;
    });
  }, [centres, search, country]);

  function getRoomsLink(centreId: number) {
    const query = new URLSearchParams();

    if (checkIn) query.append("check_in", checkIn);
    if (checkOut) query.append("check_out", checkOut);

    const queryString = query.toString();

    return `/rooms/centre/${centreId}${queryString ? `?${queryString}` : ""}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Guest House Booking
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Book Rooms at ISKCON Centres
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Select a centre, check room availability, and send a booking request
            to the temple/guest house team.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search centre, city, country..."
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500 xl:col-span-2"
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

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading centres...
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCentres.map((centre) => (
              <article
                key={centre.id}
                className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  {centre.centre_name}
                </h2>

                <p className="mt-3 text-sm text-slate-600">
                  {[centre.city, centre.state, centre.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>

                {centre.address && (
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
                    {centre.address}
                  </p>
                )}

                <Link
                  to={getRoomsLink(centre.id)}
                  className="mt-6 block rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow hover:bg-orange-700"
                >
                  View Rooms
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}