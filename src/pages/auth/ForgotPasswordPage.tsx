import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/passwordService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await forgotPassword(email);

      setSuccess(data.message || "Reset link sent if email exists.");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-xl">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          Krishna Wisdom
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Forgot Password
        </h1>

        <p className="mt-4 text-slate-600">
          Enter your registered email. We will send a secure one-time password
          reset link.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500"
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm font-bold text-orange-600"
        >
          Back to Login
        </Link>
      </section>
    </main>
  );
}