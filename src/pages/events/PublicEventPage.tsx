import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPublicEvent,
  registerForEvent,
} from "../../services/publicEventService";

export default function PublicEventPage() {
  const { eventCode } = useParams();

  const [event, setEvent] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [registration, setRegistration] = useState<any>(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        if (!eventCode) return;

        const data = await getPublicEvent(eventCode);
        setEvent(data);

        const initialData: any = {};
        const fields = data?.form_schema?.fields || [];

        fields.forEach((field: any) => {
          initialData[field.id] = field.type === "checkbox" ? false : "";
        });

        setFormData(initialData);
      } catch (err: any) {
        setError(err.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventCode]);

  function handleChange(field: any, value: any) {
    setFormData({
      ...formData,
      [field.id]: value,
    });
  }

  function renderField(field: any) {
    const commonClass =
      "mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500";

    if (field.type === "textarea") {
      return (
        <textarea
          required={field.required}
          placeholder={field.placeholder || field.label}
          value={formData[field.id] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className={commonClass}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          required={field.required}
          value={formData[field.id] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className={commonClass}
        >
          <option value="">
            {field.placeholder || `Select ${field.label}`}
          </option>

          {(field.options || []).map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="mt-3 flex items-center gap-3 rounded-2xl border border-orange-100 p-4">
          <input
            type="checkbox"
            checked={!!formData[field.id]}
            onChange={(e) => handleChange(field, e.target.checked)}
          />
          <span className="font-medium text-slate-700">
            {field.placeholder || field.label}
          </span>
        </label>
      );
    }

    return (
      <input
        type={
          field.type === "phone"
            ? "tel"
            : field.type === "date"
            ? "date"
            : field.type
        }
        required={field.required}
        placeholder={field.placeholder || field.label}
        value={formData[field.id] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        className={commonClass}
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!eventCode) return;

      setSubmitting(true);
      setError("");

      const data = await registerForEvent(eventCode, formData);
      setRegistration(data);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 p-10 text-center font-semibold text-orange-600">
        Loading event...
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-orange-50 p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  const fields = event?.form_schema?.fields || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          {event?.banner_image_url && (
            <img
              src={event.banner_image_url}
              alt={event.title}
              className="h-64 w-full object-cover"
            />
          )}

          <div className="p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              {event?.iskcon_centre?.name}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
              {event?.title}
            </h1>

            <p className="mt-4 leading-8 text-slate-600">
              {event?.description}
            </p>

            <div className="mt-6 grid gap-4 rounded-3xl bg-orange-50 p-5 text-sm text-orange-800 md:grid-cols-2">
              <p>
                Date:{" "}
                <b>{new Date(event.event_date).toLocaleString()}</b>
              </p>

              <p>
                Payment:{" "}
                <b>
                  {event.is_paid
                    ? `${event.currency} ${event.amount}`
                    : "Free"}
                </b>
              </p>

              <p>
                Centre:{" "}
                <b>
                  {[event?.iskcon_centre?.city, event?.iskcon_centre?.country]
                    .filter(Boolean)
                    .join(", ")}
                </b>
              </p>

              <p>
                Code: <b>{event.event_code}</b>
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {registration ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <p className="text-5xl">🎟️</p>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              Registration Successful
            </h2>

            <p className="mt-4 text-slate-600">
              Your ticket code:
            </p>

            <p className="mt-3 rounded-2xl bg-orange-50 px-5 py-4 text-xl font-black text-orange-700">
              {registration.ticket_code}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Save this ticket code. QR generation and scanner validation can be added next.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Registration Form
            </h2>

            <div className="mt-6 space-y-6">
              {fields.map((field: any) => (
                <div key={field.id}>
                  <label className="block text-sm font-semibold text-slate-700">
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>

                  {renderField(field)}
                </div>
              ))}
            </div>

            <button
              disabled={submitting}
              className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Register for Event"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}