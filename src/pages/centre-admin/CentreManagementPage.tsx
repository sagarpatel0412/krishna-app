import { useEffect, useState } from "react";

import {
  getMyCentre,
  updateMyCentre,
} from "../../services/centreManagementService";

export default function CentreManagementPage() {
  const [form, setForm] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadCentre() {
      try {
        const data = await getMyCentre();
        setForm(data);
      } catch (err: any) {
        setError(err.message || "Failed to load centre");
      } finally {
        setLoading(false);
      }
    }

    loadCentre();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateMyCentre(form);

      setSuccess("Centre updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update centre");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-orange-600">
        Loading centre...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Manage ISKCON Centre
          </h1>

          <p className="mt-4 text-slate-600">
            Update temple details, payment methods and contact information.
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["name", "Centre Name"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["website", "Website"],
              ["upi_id", "UPI ID"],
              ["upi_name", "UPI Name"],
              ["bank_name", "Bank Name"],
              ["bank_account_name", "Bank Account Name"],
              ["bank_account_number", "Bank Account Number"],
              ["bank_ifsc", "IFSC Code"],
              ["default_currency", "Default Currency"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700">
                  {label}
                </label>

                <input
                  value={form?.[key] || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "accepts_upi",
                "Accept UPI Payments",
              ],
              [
                "accepts_card",
                "Accept Card Payments",
              ],
              [
                "accepts_bank_transfer",
                "Accept Bank Transfer",
              ],
              [
                "accepts_international_payments",
                "Accept International Payments",
              ],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-3 rounded-2xl border border-orange-100 p-4"
              >
                <input
                  type="checkbox"
                  checked={!!form?.[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.checked,
                    })
                  }
                />

                <span className="font-medium text-slate-700">
                  {label}
                </span>
              </label>
            ))}
          </div>

          <button
            disabled={saving}
            className="mt-8 rounded-full bg-orange-600 px-8 py-4 font-bold text-white shadow-lg hover:bg-orange-700"
          >
            {saving ? "Saving..." : "Save Centre Details"}
          </button>
        </form>
      </section>
    </main>
  );
}