import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../../services/profileService";

export default function ProfilePage() {
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  const [roles, setRoles] = useState<any[]>([]);
  const [centre, setCentre] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const user = await getMyProfile();

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address_line_1: user.address_line_1 || "",
        address_line_2: user.address_line_2 || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        postal_code: user.postal_code || "",
      });

      setRoles(user.roles || []);
      setCentre(user.iskcon_centre || null);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updatedUser = await updateMyProfile({
        name: form.name,
        phone: form.phone,
        address_line_1: form.address_line_1,
        address_line_2: form.address_line_2,
        city: form.city,
        state: form.state,
        country: form.country,
        postal_code: form.postal_code,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(new Event("auth-changed"));

      setSuccess("Profile updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-orange-50">
        <div className="rounded-[2rem] bg-white p-8 text-orange-600 shadow-xl">
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Profile
          </h1>

          <p className="mt-4 text-slate-600">
            Manage your Krishna Wisdom account details.
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Personal Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  disabled
                  value={form.email}
                  className={`${inputClass} bg-slate-50 text-slate-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Postal Code
                </label>
                <input
                  value={form.postal_code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      postal_code: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700">
                Address Line 1
              </label>
              <input
                value={form.address_line_1}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address_line_1: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700">
                Address Line 2
              </label>
              <input
                value={form.address_line_2}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address_line_2: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  City
                </label>
                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  State
                </label>
                <input
                  value={form.state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      state: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Country
                </label>
                <input
                  value={form.country}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      country: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <button
              disabled={saving}
              className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900">
                Roles
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {roles.length === 0 ? (
                  <span className="text-sm text-slate-500">No roles</span>
                ) : (
                  roles.map((role: any) => (
                    <span
                      key={role.id || role.name}
                      className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
                    >
                      {role.name || role}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900">
                ISKCON Centre
              </h2>

              {centre ? (
                <div className="mt-4 text-sm leading-7 text-slate-600">
                  <p className="font-bold text-slate-900">
                    {centre.name}
                  </p>
                  <p>
                    {[centre.city, centre.country].filter(Boolean).join(", ")}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No centre linked.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}