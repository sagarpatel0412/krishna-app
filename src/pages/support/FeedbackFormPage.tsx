import { useState } from "react";
import { submitFeedback } from "../../services/feedbackService";

type Props = {
  type: "suggestion" | "contact" | "problem";
  title: string;
  subtitle: string;
};

export default function FeedbackFormPage({ type, title, subtitle }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    page_url: window.location.href,
    screenshot_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result = await submitFeedback({
        ...form,
        type,
      });

      setSuccess(result.message || "Submitted successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        page_url: window.location.href,
        screenshot_url: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Krishna Wisdom
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            {title}
          </h1>

          <p className="mt-4 text-slate-600">{subtitle}</p>
        </div>

        {success && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700 shadow">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700">
              Subject
            </label>
            <input
              required
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className={inputClass}
              placeholder="Short title"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              required
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className={`${inputClass} min-h-[180px]`}
              placeholder="Write your message..."
            />
          </div>

          {type === "problem" && (
            <>
              <div className="mt-5">
                <label className="block text-sm font-semibold text-slate-700">
                  Page URL
                </label>
                <input
                  value={form.page_url}
                  onChange={(e) =>
                    setForm({ ...form, page_url: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-slate-700">
                  Screenshot URL
                </label>
                <input
                  value={form.screenshot_url}
                  onChange={(e) =>
                    setForm({ ...form, screenshot_url: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Optional screenshot link"
                />
              </div>
            </>
          )}

          <button
            disabled={loading}
            className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
}