import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLoginSession, verifyLoginOtp } from "../../services/authService";

export default function VerifyOtpPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const tempUserId = sessionStorage.getItem("temp_user_id");

    if (!tempUserId) {
      setError("Session expired. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await verifyLoginOtp({
        temp_user_id: Number(tempUserId),
        otp,
      });

      saveLoginSession(data);
      sessionStorage.removeItem("temp_user_id");

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
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
          Verify OTP
        </h1>

        <p className="mt-4 text-slate-600">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-sm font-semibold text-slate-700">
            OTP Code
          </label>

          <input
            required
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="123456"
            className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 text-center text-3xl font-black tracking-[0.5em] outline-none focus:border-orange-500"
          />

          <button
            disabled={loading || otp.length !== 6}
            className="mt-6 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </form>
      </section>
    </main>
  );
}