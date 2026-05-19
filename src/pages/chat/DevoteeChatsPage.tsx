// pages/chat/DevoteeChatsPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function DevoteeChatsPage() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadConversations() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch chats");
      }

      setConversations(data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  }

  function handleCreateMeet(devotee: any) {
    console.log(devotee, 'devotee')
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

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Devotee Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Guidance Requests
          </h1>

          <p className="mt-4 text-slate-600">
            Reply to seekers who contacted you for spiritual guidance.
          </p>
        </div>

        {loading && (
          <div className="mt-8 rounded-3xl bg-white p-8 text-orange-600 shadow">
            Loading chats...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-600 shadow">
            {error}
          </div>
        )}

        {!loading && conversations.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-8 text-slate-600 shadow">
            No chats yet.
          </div>
        )}

        <div className="mt-8 space-y-5">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full rounded-[2rem] border border-orange-100 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {chat.seeker?.name || "Seeker"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Centre: {chat.iskcon_centre?.name || "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Started chatting on:{" "}
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mx-2">
                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 mx-2">
                    Open Chat
                  </span>
                  <button
                    className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateMeet(chat.seeker);
                    }}
                  >
                    Create Meet
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}