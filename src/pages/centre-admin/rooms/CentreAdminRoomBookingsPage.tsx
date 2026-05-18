import { useEffect, useMemo, useState } from "react";

import {
  getAdminRoomBookings,
  updateAdminRoomBookingStatus,
} from "../../../services/centreAdminRoomService";

export default function CentreAdminRoomBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminRoomBookings();

      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleUpdate(
    bookingId: number,
    booking_status: string,
    payment_status?: string
  ) {
    try {
      setError("");
      setSuccess("");

      await updateAdminRoomBookingStatus(bookingId, {
        booking_status,
        payment_status,
      });

      setSuccess("Booking updated successfully");

      await loadBookings();
    } catch (err: any) {
      setError(err.message || "Failed to update booking");
    }
  }

  const filteredBookings = useMemo(() => {
    if (!statusFilter) return bookings;

    return bookings.filter(
      (booking) => booking.booking_status === statusFilter
    );
  }, [bookings, statusFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Room Booking Requests
          </h1>

          <p className="mt-4 text-slate-600">
            Manage guest house room bookings for your ISKCON centre.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700 shadow">
            {success}
          </div>
        )}

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            No room bookings found.
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {filteredBookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-[2rem] bg-white p-6 shadow-xl"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {booking.room?.room_name}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          booking.booking_status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.booking_status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.booking_status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : booking.booking_status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                      <p>
                        Guest: <b>{booking.guest_name}</b>
                      </p>

                      <p>
                        Email: <b>{booking.guest_email || "-"}</b>
                      </p>

                      <p>
                        Phone: <b>{booking.guest_phone || "-"}</b>
                      </p>

                      <p>
                        Guests Count: <b>{booking.guests_count}</b>
                      </p>

                      <p>
                        Rooms Count: <b>{booking.rooms_count}</b>
                      </p>

                      <p>
                        Payment: <b>{booking.payment_status}</b>
                      </p>

                      <p>
                        Check-in: <b>{booking.check_in}</b>
                      </p>

                      <p>
                        Check-out: <b>{booking.check_out}</b>
                      </p>

                      <p>
                        Amount:{" "}
                        <b>
                          {booking.currency} {booking.total_amount}
                        </b>
                      </p>

                      <p>
                        User: <b>{booking.user?.name || "Guest User"}</b>
                      </p>
                    </div>

                    {booking.special_request && (
                      <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm leading-7 text-orange-700">
                        {booking.special_request}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 xl:w-[320px] xl:flex-col">
                    <button
                      onClick={() =>
                        handleUpdate(
                          booking.id,
                          "confirmed",
                          "success"
                        )
                      }
                      className="rounded-full bg-green-600 px-5 py-3 font-bold text-white shadow hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>

                    <button
                      onClick={() =>
                        handleUpdate(
                          booking.id,
                          "completed"
                        )
                      }
                      className="rounded-full bg-blue-600 px-5 py-3 font-bold text-white shadow hover:bg-blue-700"
                    >
                      Mark Completed
                    </button>

                    <button
                      onClick={() =>
                        handleUpdate(
                          booking.id,
                          "cancelled"
                        )
                      }
                      className="rounded-full bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>

                    <button
                      onClick={() =>
                        handleUpdate(
                          booking.id,
                          "rejected"
                        )
                      }
                      className="rounded-full bg-slate-700 px-5 py-3 font-bold text-white shadow hover:bg-slate-800"
                    >
                      Reject Booking
                    </button>
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