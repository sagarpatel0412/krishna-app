import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("test123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, email, password });
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
            Create your account and begin your spiritual reading journey.
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-blue-100">
            Read Bhagavad Gita, Srimad Bhagavatam, Chaitanya Charitamrita,
            translations, purports, and devotional wisdom in one peaceful place.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-blue-700">Create account</h2>

          <p className="mt-2 text-sm text-slate-600">
            Register to continue reading.
          </p>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <label className="mt-8 block text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Sagar Patel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="sagar@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
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
