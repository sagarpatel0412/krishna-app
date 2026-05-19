import { useEffect, useState } from "react";
import {
  deleteAdminCentre,
  getAdminCentres,
  updateAdminCentre,
} from "../../services/adminCentreService";

import {
  getCountries,
  getStates,
  getCities,
} from "../../services/locationService";

const currencies = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "SGD",
  "AED",
  "NZD",
  "JPY",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "MYR",
  "THB",
  "IDR",
  "PHP",
  "ZAR",
  "BRL",
  "MXN",
  "KRW",
  "CNY",
  "HKD",
  "TWD",
  "RUB",
];

export default function AdminCentresPage() {
  const [centres, setCentres] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [filters, setFilters] = useState({
    search: "",
    country: "",
    state: "",
    city: "",
    currency: "",
    issue: "",
    page: 1,
    limit: 25,
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [editingCentre, setEditingCentre] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCentres(nextFilters = filters) {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminCentres(nextFilters);

      setCentres(result.data || []);
      setPagination(result.pagination);
    } catch (err: any) {
      setError(err.message || "Failed to load centres");
    } finally {
      setLoading(false);
    }
  }

  async function loadCountries() {
    const data = await getCountries();
    setCountries(data);
  }

  useEffect(() => {
    loadCountries();
    loadCentres();
  }, []);

  async function handleFilterChange(key: string, value: any) {
    const nextFilters = {
      ...filters,
      [key]: value,
      page: 1,
    };

    setFilters(nextFilters);

    if (key === "country") {
      const selectedCountry = countries.find(
        (item) => item.name === value || item.isoCode === value
      );

      setStates([]);
      setCities([]);

      if (selectedCountry) {
        const stateData = await getStates(selectedCountry.isoCode);
        setStates(stateData);
      }

      nextFilters.state = "";
      nextFilters.city = "";
    }

    if (key === "state") {
      const selectedCountry = countries.find(
        (item) => item.name === nextFilters.country
      );

      const selectedState = states.find(
        (item) => item.name === value || item.isoCode === value
      );

      setCities([]);

      if (selectedCountry && selectedState) {
        const cityData = await getCities(
          selectedCountry.isoCode,
          selectedState.isoCode
        );
        setCities(cityData);
      }

      nextFilters.city = "";
    }

    await loadCentres(nextFilters);
  }

  function openEditModal(centre: any) {
    setEditingCentre(centre);

    setEditForm({
      name: centre.name || "",
      centre_name: centre.centre_name || "",
      address: centre.address || "",
      city: centre.city || "",
      state: centre.state || "",
      country: centre.country || "",
      postal_code: centre.postal_code || "",
      region: centre.region || "",
      phone: centre.phone || "",
      email: centre.email || "",
      website: centre.website || "",
      image_url: centre.image_url || "",
      source_url: centre.source_url || "",
      source_name: centre.source_name || "",
      default_currency: centre.default_currency || "INR",

      accepts_upi: !!centre.accepts_upi,
      accepts_card: !!centre.accepts_card,
      accepts_bank_transfer: !!centre.accepts_bank_transfer,
      accepts_international_payments:
        !!centre.accepts_international_payments,

      upi_id: centre.upi_id || "",
      upi_name: centre.upi_name || "",
      bank_account_name: centre.bank_account_name || "",
      bank_account_number: centre.bank_account_number || "",
      bank_ifsc: centre.bank_ifsc || "",
      bank_name: centre.bank_name || "",
      payment_notes: centre.payment_notes || "",
    });
  }

  function closeEditModal() {
    setEditingCentre(null);
    setEditForm({});
  }

  async function handleUpdateCentre(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateAdminCentre(editingCentre.id, editForm);

      setSuccess("Centre updated successfully");
      closeEditModal();
      await loadCentres();
    } catch (err: any) {
      setError(err.message || "Failed to update centre");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCentre(centreId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this centre?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteAdminCentre(centreId);

      setSuccess("Centre deleted successfully");
      await loadCentres();
    } catch (err: any) {
      setError(err.message || "Failed to delete centre");
    }
  }

  async function goToPage(page: number) {
    const nextFilters = {
      ...filters,
      page,
    };

    setFilters(nextFilters);
    await loadCentres(nextFilters);
  }

  const inputClass =
    "w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-[1600px]">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Super Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            ISKCON Centre Data Manager
          </h1>

          <p className="mt-4 text-slate-600">
            Search, clean, edit and manage all ISKCON centre records.
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

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <input
              value={filters.search}
              onChange={(e) =>
                handleFilterChange("search", e.target.value)
              }
              placeholder="Search name, city, email..."
              className={inputClass}
            />

            <select
              value={filters.country}
              onChange={(e) =>
                handleFilterChange("country", e.target.value)
              }
              className={inputClass}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={filters.state}
              onChange={(e) =>
                handleFilterChange("state", e.target.value)
              }
              className={inputClass}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              value={filters.city}
              onChange={(e) =>
                handleFilterChange("city", e.target.value)
              }
              className={inputClass}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              value={filters.currency}
              onChange={(e) =>
                handleFilterChange("currency", e.target.value)
              }
              className={inputClass}
            >
              <option value="">All Currency</option>
              {currencies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={filters.issue}
              onChange={(e) =>
                handleFilterChange("issue", e.target.value)
              }
              className={inputClass}
            >
              <option value="">All Records</option>
              <option value="missing_country">Missing Country</option>
              <option value="missing_city">Missing City</option>
              <option value="missing_email">Missing Email</option>
              <option value="missing_currency">Missing Currency</option>
              <option value="missing_payment">Missing Payment</option>
            </select>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px] text-left text-sm">
              <thead className="bg-orange-50 text-slate-700">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Centre</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Currency</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-orange-600">
                      Loading centres...
                    </td>
                  </tr>
                ) : centres.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                      No centres found.
                    </td>
                  </tr>
                ) : (
                  centres.map((centre) => (
                    <tr
                      key={centre.id}
                      className="border-t border-slate-100 hover:bg-orange-50/40"
                    >
                      <td className="px-5 py-4 font-bold text-slate-700">
                        #{centre.id}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {centre.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {centre.centre_name || "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        <p>
                          {[centre.city, centre.state, centre.country]
                            .filter(Boolean)
                            .join(", ") || "-"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {centre.postal_code || ""}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {centre.default_currency || "-"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        <p>{centre.email || "-"}</p>
                        <p className="mt-1 text-xs">
                          {centre.phone || "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {centre.accepts_upi && (
                            <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
                              UPI
                            </span>
                          )}
                          {centre.accepts_card && (
                            <span className="rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
                              Card
                            </span>
                          )}
                          {centre.accepts_bank_transfer && (
                            <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-700">
                              Bank
                            </span>
                          )}
                          {centre.accepts_international_payments && (
                            <span className="rounded-full bg-sky-50 px-2 py-1 text-xs text-sky-700">
                              Intl
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500">
                        {centre.source_name || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(centre)}
                            className="rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCentre(centre.id)}
                            className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Page {pagination.page} of {pagination.total_pages} — Total{" "}
                {pagination.total}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => goToPage(pagination.page - 1)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                >
                  Prev
                </button>

                <button
                  disabled={pagination.page >= pagination.total_pages}
                  onClick={() => goToPage(pagination.page + 1)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {editingCentre && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-8">
            <form
              onSubmit={handleUpdateCentre}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                    Edit Centre
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                    #{editingCentre.id} {editingCentre.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {[
                  ["name", "Name"],
                  ["centre_name", "Centre Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["website", "Website"],
                  ["postal_code", "Postal Code"],
                  ["region", "Region"],
                  ["source_name", "Source Name"],
                  ["source_url", "Source URL"],
                  ["image_url", "Image URL"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-slate-700">
                      {label}
                    </label>
                    <input
                      value={editForm[key] || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          [key]: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Country
                  </label>
                  <input
                    value={editForm.country || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        country: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    State
                  </label>
                  <input
                    value={editForm.state || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        state: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    City
                  </label>
                  <input
                    value={editForm.city || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        city: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Default Currency
                  </label>
                  <select
                    value={editForm.default_currency || "INR"}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        default_currency: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {currencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700">
                  Address
                </label>
                <textarea
                  value={editForm.address || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div className="mt-8 rounded-3xl bg-orange-50 p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Payment Settings
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-4">
                  {[
                    ["accepts_upi", "UPI"],
                    ["accepts_card", "Card"],
                    ["accepts_bank_transfer", "Bank Transfer"],
                    [
                      "accepts_international_payments",
                      "International",
                    ],
                  ].map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 rounded-2xl bg-white p-4 font-semibold text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={!!editForm[key]}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            [key]: e.target.checked,
                          })
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {[
                    ["upi_id", "UPI ID"],
                    ["upi_name", "UPI Name"],
                    ["bank_account_name", "Bank Account Name"],
                    ["bank_account_number", "Bank Account Number"],
                    ["bank_ifsc", "Bank IFSC"],
                    ["bank_name", "Bank Name"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-slate-700">
                        {label}
                      </label>
                      <input
                        value={editForm[key] || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            [key]: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Payment Notes
                  </label>
                  <textarea
                    value={editForm.payment_notes || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        payment_notes: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-full bg-slate-100 px-6 py-3 font-bold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}