import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/passwordService";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await resetPassword(token, password);

      setSuccess(data.message || "Password reset successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
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
          Reset Password
        </h1>

        <p className="mt-4 text-slate-600">
          Create a new password for your Krishna Wisdom account.
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
            New Password
          </label>

          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500"
          />

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>

          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500"
          />

          <button
            disabled={loading || !!success}
            className="mt-6 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {success && (
          <Link
            to="/login"
            className="mt-6 block text-center text-sm font-bold text-orange-600"
          >
            Go to Login
          </Link>
        )}
      </section>
    </main>
  );
}