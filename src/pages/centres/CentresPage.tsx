// pages/centres/CentresPage.tsx

import { useEffect, useMemo, useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

type Centre = {
    id: number;
    name: string;
    centre_name?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    address?: string | null;
};

export default function CentresPage() {
    const [centres, setCentres] = useState<Centre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [countryFilter, setCountryFilter] = useState("");

    useEffect(() => {
        fetchCentres();
    }, []);

    async function fetchCentres() {
        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/iskcon-centres`);

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to fetch ISKCON centres"
                );
            }

            setCentres(data.data || []);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const countries = useMemo(() => {
        const uniqueCountries = Array.from(
            new Set(
                centres
                    .map((centre) => centre.country)
                    .filter(Boolean)
            )
        );

        return uniqueCountries.sort();
    }, [centres]);

    const filteredCentres = useMemo(() => {
        return centres.filter((centre) => {
            const query = search.toLowerCase();

            const matchesSearch =
                !query ||
                centre.name?.toLowerCase().includes(query) ||
                centre.city?.toLowerCase().includes(query) ||
                centre.country?.toLowerCase().includes(query) ||
                centre.state?.toLowerCase().includes(query);

            const matchesCountry =
                !countryFilter || centre.country === countryFilter;

            return matchesSearch && matchesCountry;
        });
    }, [centres, search, countryFilter]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
            <section className="mx-auto max-w-7xl">
                <div className="my-5">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                        Krishna Wisdom
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
                        ISKCON Centres Worldwide
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                        Explore ISKCON temples and devotional centres across the world.
                    </p>
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">


                    <div className="flex flex-col gap-3 md:flex-row">
                        <input
                            type="text"
                            placeholder="Search by centre, city or country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-2xl border border-orange-100 bg-white px-5 py-3 outline-none focus:border-orange-500 md:w-80"
                        />

                        <select
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(e.target.value)}
                            className="rounded-2xl border border-orange-100 bg-white px-5 py-3 outline-none focus:border-orange-500"
                        >
                            <option value="">All Countries</option>

                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-500">
                        Total Centres: {filteredCentres.length}
                    </p>
                </div>

                {loading && (
                    <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
                        <p className="text-lg font-semibold text-orange-600">
                            Loading ISKCON centres...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-10 rounded-3xl bg-red-50 p-6 text-red-600 shadow-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredCentres.map((centre) => (
                            <article
                                key={centre.id}
                                className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-blue-900">
                                            {centre.name}
                                        </h2>

                                        {centre.centre_name && (
                                            <p className="mt-2 text-sm font-medium text-blue-600">
                                                {centre.centre_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                                        ISKCON
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3 text-sm text-blue-600">
                                    {(centre.city || centre.state || centre.country) && (
                                        <div>
                                            <p className="font-semibold text-blue-800">
                                                Location
                                            </p>

                                            <p className="mt-1">
                                                {[centre.city, centre.state, centre.country]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </p>
                                        </div>
                                    )}

                                    {centre.address && (
                                        <div>
                                            <p className="font-semibold text-blue-800">
                                                Address
                                            </p>

                                            <p className="mt-1 leading-7">
                                                {centre.address}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {!loading && !error && filteredCentres.length === 0 && (
                    <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
                        <p className="text-lg font-semibold text-slate-700">
                            No ISKCON centres found.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}