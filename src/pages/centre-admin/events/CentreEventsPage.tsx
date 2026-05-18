import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteCentreEvent,
  getCentreEvents,
} from "../../../services/centreEventAdminService";

export default function CentreEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents(nextStatus = status) {
    try {
      setLoading(true);
      setError("");

      const data = await getCentreEvents(nextStatus);
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents("");
  }, []);

  async function handleDelete(eventId: number) {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await deleteCentreEvent(eventId);
      await loadEvents();
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
    }
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    loadEvents(value);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-[2rem] bg-white p-8 shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Centre Admin
            </p>

            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
              Manage Events
            </h1>

            <p className="mt-4 text-slate-600">
              Create festival forms, paid registrations, and QR ticket events.
            </p>
          </div>

          <Link
            to="/centre-admin/events/create"
            className="rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow-lg hover:bg-orange-700"
          >
            Create Event
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="max-w-xs">
            <label className="block text-sm font-semibold text-slate-700">
              Filter by status
            </label>

            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Events</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="expired">Expired</option>
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
        ) : events.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            No events found.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {event.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Code:{" "}
                      <span className="font-bold text-orange-600">
                        {event.event_code}
                      </span>
                    </p>
                  </div>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold capitalize text-orange-700">
                    {event.status}
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                  {event.description || "No description"}
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>
                    Date:{" "}
                    <b>
                      {new Date(event.event_date).toLocaleString()}
                    </b>
                  </p>

                  <p>
                    Payment:{" "}
                    <b>
                      {event.is_paid
                        ? `${event.currency} ${event.amount}`
                        : "Free"}
                    </b>
                  </p>

                  <p>
                    Registrations:{" "}
                    <b>{event.registrations?.length || 0}</b>
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/events/${event.event_code}`}
                    target="_blank"
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Public Form
                  </Link>

                  <Link
                    to={`/centre-admin/events/${event.id}/edit`}
                    className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}