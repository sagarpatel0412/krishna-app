import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { getIskconCentres } from "../../services/iskconCentreServices";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "test123456",
    phone: "",
    city: "",
    state: "",
    country: "India",
    iskcon_centre_id: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [centres, setCentres] = useState<any[]>([]);
  const [centresLoading, setCentresLoading] = useState(true);

  useEffect(() => {
    async function loadCentres() {
      try {
        const data = await getIskconCentres();
        setCentres(data);
      } catch (err: any) {
        setError(err.message || "Failed to load centres");
      } finally {
        setCentresLoading(false);
      }
    }

    loadCentres();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({
        ...form, iskcon_centre_id: form.iskcon_centre_id
          ? Number(form.iskcon_centre_id)
          : null,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-sky-500 px-6 py-10 text-white">
      <section className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
            Krishna Wisdom
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight">
            Create your seeker account.
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-blue-100">
            Read Bhagavad Gita, Srimad Bhagavatam, Chaitanya Charitamrita,
            translations, purports, and devotional wisdom in one peaceful place.
          </p>

          <Link
            to="/devotee/register"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg"
          >
            Register as Devotee
          </Link>
        </div>

        <form
          onSubmit={handleRegister}
          className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-blue-700">Create account</h2>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {[
            ["name", "Name", "Sagar Patel"],
            ["email", "Email", "sagar@test.com"],
            ["phone", "Phone", "+91 9876543210"],
            ["city", "City", "Ahmedabad"],
            ["state", "State", "Gujarat"],
            ["country", "Country", "India"],
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
                className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          ))}

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            ISKCON Centre
          </label>

          <select
            name="iskcon_centre_id"
            value={form.iskcon_centre_id}
            onChange={(e) =>
              setForm({ ...form, iskcon_centre_id: e.target.value })
            }
            disabled={centresLoading}
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
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
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register as User"}
          </button>

          <Link
            to="/login"
            className="mt-5 block text-center text-sm font-semibold text-blue-700 hover:underline"
          >
            Already have account? Login
          </Link>
        </form>
      </section>
    </main>
  );
}