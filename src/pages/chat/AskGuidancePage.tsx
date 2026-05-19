// pages/chat/AskGuidancePage.tsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIskconCentres } from "../../services/iskconCentreServices";
import {
  createConversation,
  getDevoteesByCentre,
} from "../../services/chatService";

type Centre = {
  id: number;
  name: string;
  centre_name?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
};

type Devotee = {
  id: number;
  name: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export default function AskGuidancePage() {
  const navigate = useNavigate();

  const [centres, setCentres] = useState<Centre[]>([]);
  const [devotees, setDevotees] = useState<Devotee[]>([]);
  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);

  const [search, setSearch] = useState("");
  const [loadingCentres, setLoadingCentres] = useState(true);
  const [loadingDevotees, setLoadingDevotees] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCentres() {
      try {
        const data = await getIskconCentres();
        setCentres(data);
      } catch (err: any) {
        setError(err.message || "Failed to load centres");
      } finally {
        setLoadingCentres(false);
      }
    }

    loadCentres();
  }, []);

  const filteredCentres = useMemo(() => {
    const query = search.toLowerCase();

    return centres.filter((centre) => {
      return (
        centre.name?.toLowerCase().includes(query) ||
        centre.city?.toLowerCase().includes(query) ||
        centre.country?.toLowerCase().includes(query)
      );
    });
  }, [centres, search]);

  async function handleSelectCentre(centre: Centre) {
    try {
      setSelectedCentre(centre);
      setDevotees([]);
      setLoadingDevotees(true);
      setError("");

      const data = await getDevoteesByCentre(centre.id);
      setDevotees(data);
    } catch (err: any) {
      setError(err.message || "Failed to load devotees");
    } finally {
      setLoadingDevotees(false);
    }
  }

  async function handleStartChat(devotee: Devotee) {
    if (!selectedCentre) return;

    try {
      const conversation = await createConversation({
        devotee_user_id: devotee.id,
        iskcon_centre_id: selectedCentre.id,
      });

      navigate(`/chat/${conversation.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to start chat");
    }
  }

  function handleCreateMeet(devotee: any) {
    console.log(devotee,'devotee')
    const title = `Devotee Meet with ${devotee.name}`;

    const details = `
Hare Krishna 🙏

Meeting with ${devotee.name}

Location:
${[devotee.city, devotee.state, devotee.country].filter(Boolean).join(", ")}
  `.trim();

    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 1);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    };

    const googleCalendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(title)}` +
      `&details=${encodeURIComponent(details)}` +
      `&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}` +
      `&add=${encodeURIComponent(devotee.email || "")}`;

    window.open(googleCalendarUrl, "_blank");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Ask Guidance
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Ask a question to a verified devotee
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Select an ISKCON centre, choose an approved devotee connected with
            that centre, and start a private spiritual guidance chat.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Choose ISKCON Centre
              </h2>

              <input
                type="text"
                placeholder="Search centre, city, country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500 md:w-80"
              />
            </div>

            {loadingCentres ? (
              <p className="mt-8 text-orange-600">Loading centres...</p>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredCentres.map((centre) => {
                  const active = selectedCentre?.id === centre.id;

                  return (
                    <button
                      key={centre.id}
                      onClick={() => handleSelectCentre(centre)}
                      className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${active
                          ? "border-orange-500 bg-orange-50"
                          : "border-orange-100 bg-white"
                        }`}
                    >
                      <h3 className="text-lg font-bold text-slate-900">
                        {centre.name}
                      </h3>

                      {centre.centre_name && (
                        <p className="mt-1 text-sm font-semibold text-orange-600">
                          {centre.centre_name}
                        </p>
                      )}

                      <p className="mt-3 text-sm text-slate-600">
                        {[centre.city, centre.state, centre.country]
                          .filter(Boolean)
                          .join(", ")}
                      </p>

                      {centre.address && (
                        <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                          {centre.address}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Verified Devotees
            </h2>

            {!selectedCentre && (
              <p className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-7 text-orange-700">
                Select a centre first to see devotees associated with that
                ISKCON centre.
              </p>
            )}

            {selectedCentre && (
              <div className="mt-4 rounded-2xl bg-orange-50 p-4">
                <p className="text-sm font-semibold text-orange-700">
                  Selected centre
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {selectedCentre.name}
                </p>
              </div>
            )}

            {loadingDevotees && (
              <p className="mt-6 text-orange-600">Loading devotees...</p>
            )}

            {!loadingDevotees && selectedCentre && devotees.length === 0 && (
              <p className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                No verified devotees found for this centre yet.
              </p>
            )}

            <div className="mt-6 space-y-4">
              {devotees.map((devotee) => (
                <div
                  key={devotee.id}
                  className="rounded-3xl border border-orange-100 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">
                      {devotee.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {devotee.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Verified Devotee
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    {[devotee.city, devotee.state, devotee.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  <button
                    onClick={() => handleStartChat(devotee)}
                    className="mt-5 w-full rounded-full bg-orange-600 px-5 py-3 font-semibold text-white shadow hover:bg-orange-700"
                  >
                    Start Chat
                  </button>
                  <button
                    onClick={() => handleCreateMeet(devotee)}
                    className="mt-3 w-full rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
                  >
                    Create Google Meet
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}