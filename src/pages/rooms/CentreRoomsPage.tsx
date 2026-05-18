import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { createRoomBooking, getCentreRooms } from "../../services/roomService";

export default function CentreRoomsPage() {
  const { centreId } = useParams();
  const [searchParams] = useSearchParams();

  const initialCheckIn = searchParams.get("check_in") || "";
  const initialCheckOut = searchParams.get("check_out") || "";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);

  const [form, setForm] = useState({
    guest_name: user?.name || "",
    guest_email: user?.email || "",
    guest_phone: user?.phone || "",
    guests_count: 1,
    rooms_count: 1,
    special_request: "",
  });

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [successBooking, setSuccessBooking] = useState<any>(null);

  async function loadRooms() {
    try {
      if (!centreId) return;

      setLoading(true);
      setError("");

      const data = await getCentreRooms(Number(centreId), checkIn, checkOut);
      setRooms(data);
    } catch (err: any) {
      setError(err.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRooms();
  }, [centreId]);

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!selectedRoom) {
        setError("Please select a room");
        return;
      }

      if (!checkIn || !checkOut) {
        setError("Please select check-in and check-out dates");
        return;
      }

      setBookingLoading(true);
      setError("");
      setSuccessBooking(null);

      const booking = await createRoomBooking({
        room_id: selectedRoom.id,
        guest_name: form.guest_name,
        guest_email: form.guest_email,
        guest_phone: form.guest_phone,
        check_in: checkIn,
        check_out: checkOut,
        guests_count: Number(form.guests_count),
        rooms_count: Number(form.rooms_count),
        special_request: form.special_request,
      });

      setSuccessBooking(booking);
      setSelectedRoom(null);
      await loadRooms();
    } catch (err: any) {
      setError(err.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Guest House Booking
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Available Rooms
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Select your dates, choose a room, and send a booking request.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px]">
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

            <button
              onClick={loadRooms}
              className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow hover:bg-orange-700"
            >
              Check
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {successBooking && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700 shadow">
            Booking request created successfully. Booking ID:{" "}
            <b>{successBooking.id}</b>
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <section>
            {loading ? (
              <div className="rounded-[2rem] bg-white p-8 text-orange-600 shadow">
                Loading rooms...
              </div>
            ) : rooms.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow">
                No rooms found for this centre.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {rooms.map((room) => {
                  const active = selectedRoom?.id === room.id;

                  return (
                    <article
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`cursor-pointer rounded-[2rem] border bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                        active ? "border-orange-500" : "border-orange-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">
                            {room.room_name}
                          </h2>

                          <p className="mt-1 text-sm font-semibold capitalize text-orange-600">
                            {room.room_type}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            room.available_rooms > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {room.available_rooms} available
                        </span>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                        {room.description || "No description available"}
                      </p>

                      <div className="mt-5 grid gap-3 text-sm text-slate-600">
                        <p>
                          Capacity: <b>{room.capacity}</b> guest(s)
                        </p>
                        <p>
                          Price:{" "}
                          <b>
                            {room.currency} {room.price_per_night} / night
                          </b>
                        </p>
                        <p>
                          Total rooms: <b>{room.total_rooms}</b>
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Booking Request
            </h2>

            {!selectedRoom ? (
              <p className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-7 text-orange-700">
                Select a room from the left side to continue booking.
              </p>
            ) : (
              <>
                <div className="mt-6 rounded-2xl bg-orange-50 p-5">
                  <p className="font-bold text-slate-900">
                    {selectedRoom.room_name}
                  </p>
                  <p className="mt-1 text-sm text-orange-700">
                    {selectedRoom.currency} {selectedRoom.price_per_night} /
                    night
                  </p>
                </div>

                <form onSubmit={handleBooking} className="mt-6 space-y-5">
                  {[
                    ["guest_name", "Guest Name", "Sagar Patel"],
                    ["guest_email", "Guest Email", "sagar@test.com"],
                    ["guest_phone", "Guest Phone", "+91 9876543210"],
                  ].map(([key, label, placeholder]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-slate-700">
                        {label}
                      </label>
                      <input
                        required={key === "guest_name"}
                        value={(form as any)[key]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        placeholder={placeholder}
                        className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>
                  ))}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={form.guests_count}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            guests_count: Number(e.target.value),
                          })
                        }
                        className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Rooms
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={selectedRoom.available_rooms || 1}
                        value={form.rooms_count}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rooms_count: Number(e.target.value),
                          })
                        }
                        className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Special Request
                    </label>
                    <textarea
                      value={form.special_request}
                      onChange={(e) =>
                        setForm({ ...form, special_request: e.target.value })
                      }
                      placeholder="Any special request..."
                      className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    disabled={bookingLoading || selectedRoom.available_rooms <= 0}
                    className="w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {bookingLoading ? "Submitting..." : "Send Booking Request"}
                  </button>
                </form>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}