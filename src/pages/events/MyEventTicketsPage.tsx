// pages/events/MyEventTicketsPage.tsx

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getMyEventRegistrations } from "../../services/eventTicketService";

export default function MyEventTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getMyEventRegistrations();
        setTickets(data);
      } catch (err: any) {
        setError(err.message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            My Events
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            My Registered Event Tickets
          </h1>

          <p className="mt-4 text-slate-600">
            Show this QR code at the event entrance for validation.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading tickets...
          </div>
        ) : tickets.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            You have not registered for any event yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {tickets.map((ticket) => (
              <article
                key={ticket.id}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="rounded-2xl bg-white p-4 shadow">
                    <QRCodeSVG value={ticket.ticket_code} size={150} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {ticket.event?.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {ticket.event?.iskcon_centre?.name}
                    </p>

                    <p className="mt-4 text-sm text-slate-600">
                      Date:{" "}
                      <b>{new Date(ticket.event?.event_date).toLocaleString()}</b>
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Ticket Code:
                    </p>

                    <p className="mt-2 rounded-2xl bg-orange-50 px-4 py-3 font-black text-orange-700">
                      {ticket.ticket_code}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        Payment: {ticket.payment_status}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        Check-in: {ticket.checkin_status}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}