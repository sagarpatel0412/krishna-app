// pages/devotee/SeekerManagementPage.tsx

import { useEffect, useState } from "react";
import {
  getCentreSeekers,
  updateSeekerStatus,
} from "../../services/devoteeManagementService";

export default function SeekerManagementPage() {
  const [seekers, setSeekers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSeekers() {
    try {
      setLoading(true);
      setError("");

      const data = await getCentreSeekers({
        search,
        status,
      });

      setSeekers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load seekers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSeekers();
  }, []);

  async function handleStatusChange(seekerId: number, nextStatus: any) {
    try {
      await updateSeekerStatus(seekerId, nextStatus);
      await loadSeekers();
    } catch (err: any) {
      setError(err.message || "Failed to update seeker");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Devotee Portal
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Manage Registered Seekers
          </h1>

          <p className="mt-4 text-slate-600">
            View and manage seekers registered with your ISKCON centre.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_220px_140px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, city..."
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="blocked">Blocked</option>
            </select>

            <button
              onClick={loadSeekers}
              className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow hover:bg-orange-700"
            >
              Search
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading seekers...
          </div>
        ) : seekers.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            No seekers found.
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-orange-50 text-sm uppercase tracking-wider text-orange-700">
                  <tr>
                    <th className="px-6 py-4">Seeker</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Centre</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-orange-100">
                  {seekers.map((seeker) => (
                    <tr key={seeker.id} className="hover:bg-orange-50/40">
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900">
                          {seeker.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {seeker.id}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-700">
                          {seeker.email}
                        </p>
                        <p className="text-sm text-slate-500">
                          {seeker.phone || "No phone"}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {[seeker.city, seeker.state, seeker.country]
                          .filter(Boolean)
                          .join(", ") || "N/A"}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {seeker.iskcon_centre?.name || "N/A"}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold capitalize text-orange-700">
                          {seeker.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <select
                          value={seeker.status}
                          onChange={(e) =>
                            handleStatusChange(seeker.id, e.target.value)
                          }
                          className="rounded-xl border border-orange-100 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                          <option value="blocked">Block</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}