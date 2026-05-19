import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getFestivalCalendar } from "../../services/festivalCalendarService";

export default function FestivalCalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [year, setYear] = useState(2026);
  const [city, setCity] = useState("Ahmedabad");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  async function loadCalendar() {
    try {
      setLoading(true);

      const data = await getFestivalCalendar({
        year,
        city,
        country,
      });

      setEvents(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCalendar();
  }, []);

  function handleEventClick(info: any) {
    const event = info.event;

    const title = event.title;
    const description = `
${event.extendedProps.description || ""}

${event.extendedProps.fasting || ""}
  `.trim();

    const startDate = event.start;
    const endDate = event.end || event.start;

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    };

    const googleCalendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(title)}` +
      `&details=${encodeURIComponent(description)}` +
      `&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

    window.open(googleCalendarUrl, "_blank");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Vaishnava Calendar
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Festival Calendar
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            View ISKCON and Vaishnava festivals by year and location.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[160px_1fr_1fr_140px]">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <button
              onClick={loadCalendar}
              className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow hover:bg-orange-700"
            >
              Load
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl">
          {loading ? (
            <p className="p-10 text-center font-semibold text-orange-600">
              Loading calendar...
            </p>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="auto"
              eventClick={handleEventClick}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
              eventColor="#ea580c"
            />
          )}
        </div>
      </section>
    </main>
  );
}