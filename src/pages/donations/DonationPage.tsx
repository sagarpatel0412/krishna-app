// pages/donations/DonationPage.tsx

import { useEffect, useState } from "react";
import {
  createDonation,
  getCentreSevas,
  getDonationCentres,
} from "../../services/donationService";

export default function DonationPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [centres, setCentres] = useState<any[]>([]);
  const [sevas, setSevas] = useState<any[]>([]);

  const [selectedCentre, setSelectedCentre] = useState<any>(null);
  const [selectedSevaId, setSelectedSevaId] = useState("");

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [form, setForm] = useState({
    donor_name: user?.name || "",
    donor_email: user?.email || "",
    donor_phone: user?.phone || "",
    donor_country: user?.country || "India",
  });

  const [loading, setLoading] = useState(true);
  const [sevaLoading, setSevaLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDonation, setSuccessDonation] = useState<any>(null);

  useEffect(() => {
    async function loadCentres() {
      try {
        const data = await getDonationCentres();
        setCentres(data);
      } catch (err: any) {
        setError(err.message || "Failed to load centres");
      } finally {
        setLoading(false);
      }
    }

    loadCentres();
  }, []);

  async function handleCentreChange(centreId: string) {
    const centre = centres.find((item) => item.id === Number(centreId));

    setSelectedCentre(centre || null);
    setSelectedSevaId("");
    setSevas([]);
    setPaymentMethod("");

    if (!centre) return;

    if (centre.accepts_upi) {
      setPaymentMethod("upi");
    } else if (centre.accepts_card) {
      setPaymentMethod("card");
    }

    try {
      setSevaLoading(true);
      const data = await getCentreSevas(centre.id);
      setSevas(data);
    } catch (err: any) {
      setError(err.message || "Failed to load sevas");
    } finally {
      setSevaLoading(false);
    }
  }

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessDonation(null);

    if (!selectedCentre || !selectedSevaId || !amount || !paymentMethod) {
      setError("Please select centre, seva, amount and payment method");
      return;
    }

    try {
      const donation = await createDonation({
        iskcon_centre_id: selectedCentre.id,
        seva_category_id: Number(selectedSevaId),
        donor_name: form.donor_name,
        donor_email: form.donor_email,
        donor_phone: form.donor_phone,
        donor_country: form.donor_country,
        amount: Number(amount),
        currency: selectedCentre.default_currency || "INR",
        payment_method: paymentMethod,
      });

      setSuccessDonation(donation);
    } catch (err: any) {
      setError(err.message || "Donation failed");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Donation Seva
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Donate to an ISKCON Centre
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Choose a centre, select seva, enter your amount, and continue with
            the available payment method.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {successDonation && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700 shadow">
            Donation request created successfully. Donation ID:{" "}
            <b>{successDonation.id}</b>
          </div>
        )}

        <form
          onSubmit={handleDonate}
          className="mt-8 grid gap-8 rounded-[2rem] bg-white p-8 shadow-xl lg:grid-cols-2"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Seva Details
            </h2>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              ISKCON Centre
            </label>
            <select
              required
              disabled={loading}
              onChange={(e) => handleCentreChange(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">
                {loading ? "Loading centres..." : "Select centre"}
              </option>

              {centres.map((centre) => (
                <option key={centre.id} value={centre.id}>
                  {centre.name} - {centre.city}, {centre.country}
                </option>
              ))}
            </select>

            {selectedCentre && (
              <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm text-orange-700">
                <p>
                  Currency:{" "}
                  <b>{selectedCentre.default_currency || "INR"}</b>
                </p>
                <p className="mt-1">
                  {selectedCentre.address}
                </p>
              </div>
            )}

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Seva
            </label>
            <select
              required
              value={selectedSevaId}
              onChange={(e) => setSelectedSevaId(e.target.value)}
              disabled={!selectedCentre || sevaLoading}
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">
                {sevaLoading ? "Loading sevas..." : "Select seva"}
              </option>

              {sevas.map((seva) => (
                <option key={seva.id} value={seva.id}>
                  {seva.name}
                </option>
              ))}
            </select>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Amount
            </label>
            <div className="mt-2 flex overflow-hidden rounded-2xl border border-orange-100">
              <span className="bg-orange-50 px-4 py-3 font-bold text-orange-700">
                {selectedCentre?.default_currency || "INR"}
              </span>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 outline-none"
              />
            </div>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Payment Method
            </label>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {selectedCentre?.accepts_upi && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-2xl border px-4 py-4 text-left font-semibold ${
                    paymentMethod === "upi"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  UPI
                </button>
              )}

              {selectedCentre?.accepts_card && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border px-4 py-4 text-left font-semibold ${
                    paymentMethod === "card"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  Card
                </button>
              )}
            </div>

            {paymentMethod === "upi" && selectedCentre?.upi_id && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p>
                  UPI ID: <b>{selectedCentre.upi_id}</b>
                </p>
                {selectedCentre.upi_name && (
                  <p>
                    Name: <b>{selectedCentre.upi_name}</b>
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Donor Details
            </h2>

            {[
              ["donor_name", "Name", "Sagar Patel"],
              ["donor_email", "Email", "sagar@test.com"],
              ["donor_phone", "Phone", "+91 9876543210"],
              ["donor_country", "Country", "India"],
            ].map(([name, label, placeholder]) => (
              <div key={name}>
                <label className="mt-6 block text-sm font-semibold text-slate-700">
                  {label}
                </label>
                <input
                  required={name === "donor_name"}
                  value={(form as any)[name]}
                  onChange={(e) =>
                    setForm({ ...form, [name]: e.target.value })
                  }
                  placeholder={placeholder}
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700"
            >
              Create Donation Request
            </button>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              Note: This currently creates a donation record. Razorpay/Stripe
              integration can be added next for real online payment.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}