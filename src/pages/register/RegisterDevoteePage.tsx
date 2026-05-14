// pages/auth/RegisterDevoteePage.tsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerDevotee } from "../../services/authService";
import { getIskconCentres } from "../../services/iskconCentreServices"

export default function RegisterDevoteePage() {
  const navigate = useNavigate();

  const [centres, setCentres] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "test123456",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "India",
    postal_code: "",
    iskcon_centre_id: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [centresLoading, setCentresLoading] = useState(true);

  useEffect(() => {
    async function loadCentres() {
      try {
        const data = await getIskconCentres();
        setCentres(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to load ISKCON centres");
      } finally {
        setCentresLoading(false);
      }
    }

    loadCentres();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerDevotee({
        ...form,
        iskcon_centre_id: Number(form.iskcon_centre_id),
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Devotee registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-orange-700 to-yellow-500 px-6 py-10 text-white">
      <section className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-100">
            Krishna Wisdom
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight">
            Register as a devotee and help seekers with wisdom.
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-orange-100">
            Devotee accounts are connected with an ISKCON centre and may require
            admin approval before answering questions.
          </p>

          <Link
            to="/register"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-orange-700 shadow-lg"
          >
            Register as normal user
          </Link>
        </div>

        <form
          onSubmit={handleRegister}
          className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-orange-700">
            Devotee Registration
          </h2>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold text-slate-700">
            ISKCON Centre
          </label>
          <select
            name="iskcon_centre_id"
            required
            value={form.iskcon_centre_id}
            onChange={handleChange}
            disabled={centresLoading}
            className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="">
              {centresLoading ? "Loading centres..." : "Select ISKCON centre"}
            </option>

            {centres.map((centre) => (
              <option key={centre.id} value={centre.id}>
                {centre.name} - {centre.city}, {centre.country}
              </option>
            ))}
          </select>

          {[
            ["name", "Name", "Devotee Das"],
            ["email", "Email", "devotee@test.com"],
            ["phone", "Phone", "+91 9876543210"],
            ["address_line_1", "Address Line 1", "Temple Road"],
            ["address_line_2", "Address Line 2", "Near ISKCON Temple"],
            ["city", "City", "Ahmedabad"],
            ["state", "State", "Gujarat"],
            ["country", "Country", "India"],
            ["postal_code", "Postal Code", "380059"],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label className="mt-5 block text-sm font-semibold text-slate-700">
                {label}
              </label>
              <input
                name={name}
                type={name === "email" ? "email" : "text"}
                required={name === "name" || name === "email"}
                placeholder={placeholder}
                value={(form as any)[name]}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          ))}

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-700 disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Register as Devotee"}
          </button>

          <Link
            to="/login"
            className="mt-5 block text-center text-sm font-semibold text-orange-700 hover:underline"
          >
            Already have account? Login
          </Link>
        </form>
      </section>
    </main>
  );
}