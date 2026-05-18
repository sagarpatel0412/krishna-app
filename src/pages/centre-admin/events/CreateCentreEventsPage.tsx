// pages/centre-admin/CreateCentreEventPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCentreEvent } from "../../../services/centreEventAdminService";

const FIELD_TYPES = [
  "text",
  "email",
  "phone",
  "number",
  "textarea",
  "select",
  "checkbox",
  "date",
];

function makeField(type = "text") {
  const id = `${type}_${Date.now()}`;

  return {
    id,
    label: "New Field",
    type,
    placeholder: "",
    required: false,
    order: Date.now(),
    options: type === "select" ? ["Option 1", "Option 2"] : [],
  };
}

export default function CreateCentreEventPage() {
  const navigate = useNavigate();

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    event_date: "",
    registration_start: "",
    registration_end: "",
    is_paid: false,
    amount: "",
    currency: "INR",
    status: "draft",
  });

  const [fields, setFields] = useState<any[]>([
    {
      id: "full_name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      order: 1,
      options: [],
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "phone",
      placeholder: "Enter phone number",
      required: true,
      order: 2,
      options: [],
    },
  ]);

  const [selectedFieldId, setSelectedFieldId] = useState("full_name");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedField = fields.find((field) => field.id === selectedFieldId);

  function updateField(fieldId: string, updates: any) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  }

  function addField(type: string) {
    const field = makeField(type);
    setFields((prev) => [...prev, field]);
    setSelectedFieldId(field.id);
  }

  function removeField(fieldId: string) {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
    setSelectedFieldId(fields[0]?.id || "");
  }

  function moveField(fieldId: string, direction: "up" | "down") {
    const index = fields.findIndex((field) => field.id === fieldId);
    if (index === -1) return;

    const next = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= next.length) return;

    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

    setFields(
      next.map((field, idx) => ({
        ...field,
        order: idx + 1,
      }))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!eventForm.title || !eventForm.event_date || fields.length === 0) {
        setError("Title, event date and at least one field are required");
        return;
      }

      const form_schema = {
        version: 1,
        fields,
      };

      await createCentreEvent({
        ...eventForm,
        amount: eventForm.is_paid ? Number(eventForm.amount || 0) : 0,
        form_schema,
        theme_config: {
          primaryColor: "#f97316",
          backgroundColor: "#fff7ed",
          buttonColor: "#ea580c",
        },
      });

      navigate("/centre-admin/events");
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Create Event Form
          </h1>

          <p className="mt-4 text-slate-600">
            Build a dynamic festival/event form and publish it for users.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 xl:grid-cols-[320px_1fr_360px]">
          <aside className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">Event Details</h2>

            {[
              ["title", "Title", "Janmashtami 2026"],
              ["description", "Description", "Special darshan and prasadam"],
              ["event_date", "Event Date", ""],
              ["registration_start", "Registration Start", ""],
              ["registration_end", "Registration End", ""],
              ["currency", "Currency", "INR"],
            ].map(([key, label, placeholder]) => (
              <div key={key}>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  {label}
                </label>

                {key === "description" ? (
                  <textarea
                    value={(eventForm as any)[key]}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                  />
                ) : (
                  <input
                    type={
                      key.includes("date") || key.includes("start") || key.includes("end")
                        ? "datetime-local"
                        : "text"
                    }
                    required={key === "title" || key === "event_date"}
                    value={(eventForm as any)[key]}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                  />
                )}
              </div>
            ))}

            <label className="mt-6 flex items-center gap-3 rounded-2xl border border-orange-100 p-4">
              <input
                type="checkbox"
                checked={eventForm.is_paid}
                onChange={(e) =>
                  setEventForm({ ...eventForm, is_paid: e.target.checked })
                }
              />
              <span className="font-semibold text-slate-700">Paid Event</span>
            </label>

            {eventForm.is_paid && (
              <div>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Amount
                </label>
                <input
                  type="number"
                  min="0"
                  value={eventForm.amount}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, amount: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            )}

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              value={eventForm.status}
              onChange={(e) =>
                setEventForm({ ...eventForm, status: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </aside>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Form Builder
              </h2>

              <div className="flex flex-wrap gap-2">
                {FIELD_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addField(type)}
                    className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold capitalize text-orange-700 hover:bg-orange-200"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`cursor-pointer rounded-3xl border p-5 transition ${
                    selectedFieldId === field.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-orange-100 bg-white"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-red-500">*</span>
                        )}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        {field.type}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveField(field.id, "up");
                        }}
                        disabled={index === 0}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold disabled:opacity-40"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveField(field.id, "down");
                        }}
                        disabled={index === fields.length - 1}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold disabled:opacity-40"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(field.id);
                        }}
                        className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {field.type === "textarea" ? (
                    <textarea
                      disabled
                      placeholder={field.placeholder || field.label}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  ) : field.type === "select" ? (
                    <select
                      disabled
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                    >
                      <option>{field.placeholder || "Select option"}</option>
                      {field.options?.map((option: string) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-3 text-slate-600">
                      <input type="checkbox" disabled />
                      {field.placeholder || field.label}
                    </label>
                  ) : (
                    <input
                      disabled
                      type={
                        field.type === "phone"
                          ? "tel"
                          : field.type === "date"
                          ? "date"
                          : field.type
                      }
                      placeholder={field.placeholder || field.label}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Field Settings
            </h2>

            {!selectedField ? (
              <p className="mt-6 text-slate-500">Select a field to edit.</p>
            ) : (
              <>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Label
                </label>
                <input
                  value={selectedField.label}
                  onChange={(e) =>
                    updateField(selectedField.id, { label: e.target.value })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />

                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Placeholder
                </label>
                <input
                  value={selectedField.placeholder}
                  onChange={(e) =>
                    updateField(selectedField.id, {
                      placeholder: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                />

                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Field Type
                </label>
                <select
                  value={selectedField.type}
                  onChange={(e) =>
                    updateField(selectedField.id, {
                      type: e.target.value,
                      options:
                        e.target.value === "select"
                          ? selectedField.options?.length
                            ? selectedField.options
                            : ["Option 1"]
                          : [],
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                >
                  {FIELD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <label className="mt-5 flex items-center gap-3 rounded-2xl border border-orange-100 p-4">
                  <input
                    type="checkbox"
                    checked={selectedField.required}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        required: e.target.checked,
                      })
                    }
                  />
                  <span className="font-semibold text-slate-700">
                    Required field
                  </span>
                </label>

                {selectedField.type === "select" && (
                  <div>
                    <label className="mt-5 block text-sm font-semibold text-slate-700">
                      Options comma separated
                    </label>
                    <textarea
                      value={selectedField.options?.join(", ") || ""}
                      onChange={(e) =>
                        updateField(selectedField.id, {
                          options: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    JSON Preview
                  </p>
                  <pre className="mt-3 max-h-56 overflow-auto text-xs text-slate-600">
                    {JSON.stringify(selectedField, null, 2)}
                  </pre>
                </div>
              </>
            )}

            <button
              disabled={saving}
              type="submit"
              className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
            >
              {saving ? "Creating Event..." : "Create Event"}
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}