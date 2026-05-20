import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/books";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("test123456");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      if (data.requires_otp) {
        sessionStorage.setItem("temp_user_id", String(data.temp_user_id));
        navigate("/verify-otp");
        return;
      }
    } catch (err: any) {
      setError(err.message);
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
            Login to continue reading sacred wisdom.
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-blue-100">
            Access Bhagavad Gita, Srimad Bhagavatam, Chaitanya Charitamrita,
            translations, purports, and devotional reading pages.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-blue-700">Welcome back</h2>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <label className="mt-8 block text-sm font-semibold text-slate-700">
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

          <div className="flex justify-between">
            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <Link to="/forgot-password" className="mt-5 block text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors hover:text-underline">Forget password ?</Link>
          </div>

          <input
            type="password"
            required
            placeholder="test123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-700">
            Login & Continue
          </button>

          <Link
            to="/register"
            className="mt-5 block text-center text-sm font-semibold text-blue-700 hover:underline"
          >
            Create new account
          </Link>
        </form>
      </section>
    </main>
  );
}
