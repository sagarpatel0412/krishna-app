import { useEffect, useState } from "react";
import { getMyRoomBookings } from "../../services/roomService";

export default function MyRoomBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getMyRoomBookings();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            My Room Bookings
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Your Guest House Booking Requests
          </h1>

          <p className="mt-4 text-slate-600">
            Track your room booking requests and confirmation status.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            You have not created any room booking yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {booking.room?.room_name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {booking.iskcon_centre?.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold capitalize text-orange-700">
                    {booking.booking_status}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>
                    Check-in: <b>{booking.check_in}</b>
                  </p>
                  <p>
                    Check-out: <b>{booking.check_out}</b>
                  </p>
                  <p>
                    Guests: <b>{booking.guests_count}</b>
                  </p>
                  <p>
                    Rooms: <b>{booking.rooms_count}</b>
                  </p>
                  <p>
                    Amount:{" "}
                    <b>
                      {booking.currency} {booking.total_amount}
                    </b>
                  </p>
                  <p>
                    Payment: <b>{booking.payment_status}</b>
                  </p>
                </div>

                {booking.special_request && (
                  <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm text-orange-700">
                    {booking.special_request}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}