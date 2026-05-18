// pages/centre-admin/CentreAdminRoomsPage.tsx

import { useEffect, useState } from "react";
import {
  createAdminRoom,
  deleteAdminRoom,
  getAdminRooms,
  updateAdminRoom,
} from "../../../services/centreAdminRoomService";

const emptyForm = {
  room_name: "",
  room_type: "single",
  description: "",
  capacity: 1,
  price_per_night: 0,
  currency: "INR",
  total_rooms: 1,
  is_active: true,
};

export default function CentreAdminRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [form, setForm] = useState<any>(emptyForm);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadRooms() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminRooms();
      setRooms(data);
    } catch (err: any) {
      setError(err.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingRoomId(null);
  }

  function handleEdit(room: any) {
    setEditingRoomId(room.id);
    setForm({
      room_name: room.room_name || "",
      room_type: room.room_type || "single",
      description: room.description || "",
      capacity: Number(room.capacity || 1),
      price_per_night: Number(room.price_per_night || 0),
      currency: room.currency || "INR",
      total_rooms: Number(room.total_rooms || 1),
      is_active: !!room.is_active,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingRoomId) {
        await updateAdminRoom(editingRoomId, form);
        setSuccess("Room updated successfully");
      } else {
        await createAdminRoom(form);
        setSuccess("Room created successfully");
      }

      resetForm();
      await loadRooms();
    } catch (err: any) {
      setError(err.message || "Failed to save room");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(roomId: number) {
    const confirmed = window.confirm("Delete this room?");
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteAdminRoom(roomId);
      setSuccess("Room deleted successfully");
      await loadRooms();
    } catch (err: any) {
      setError(err.message || "Failed to delete room");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Manage Rooms
          </h1>

          <p className="mt-4 text-slate-600">
            Add and manage guest house rooms for your ISKCON centre.
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              {editingRoomId ? "Edit Room" : "Add Room"}
            </h2>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Room Name
            </label>
            <input
              required
              value={form.room_name}
              onChange={(e) =>
                setForm({ ...form, room_name: e.target.value })
              }
              placeholder="Guest Room A"
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            />

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Room Type
            </label>
            <select
              value={form.room_type}
              onChange={(e) =>
                setForm({ ...form, room_type: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="family">Family</option>
              <option value="dormitory">Dormitory</option>
              <option value="suite">Suite</option>
            </select>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe facilities, rules, etc."
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Total Rooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.total_rooms}
                  onChange={(e) =>
                    setForm({ ...form, total_rooms: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Price / Night
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.price_per_night}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price_per_night: Number(e.target.value),
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Currency
                </label>
                <input
                  value={form.currency}
                  onChange={(e) =>
                    setForm({ ...form, currency: e.target.value.toUpperCase() })
                  }
                  placeholder="INR"
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <label className="mt-6 flex items-center gap-3 rounded-2xl border border-orange-100 p-4">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
              />
              <span className="font-semibold text-slate-700">Active</span>
            </label>

            <div className="mt-8 flex gap-3">
              <button
                disabled={saving}
                className="flex-1 rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingRoomId
                  ? "Update Room"
                  : "Create Room"}
              </button>

              {editingRoomId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full bg-slate-100 px-6 py-4 font-bold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">Rooms</h2>

            {loading ? (
              <p className="mt-6 text-orange-600">Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-orange-50 p-5 text-orange-700">
                No rooms created yet.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {rooms.map((room) => (
                  <article
                    key={room.id}
                    className="rounded-3xl border border-orange-100 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {room.room_name}
                        </h3>

                        <p className="mt-1 text-sm font-semibold capitalize text-orange-600">
                          {room.room_type}
                        </p>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {room.description || "No description"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                            Capacity: {room.capacity}
                          </span>
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                            Total: {room.total_rooms}
                          </span>
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                            {room.currency} {room.price_per_night}/night
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 ${
                              room.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {room.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(room)}
                          className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(room.id)}
                          className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}