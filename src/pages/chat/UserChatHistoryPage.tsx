// pages/chat/UserChatHistoryPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function UserChatHistoryPage() {
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
        throw new Error(data.message || "Failed to fetch chat history");
      }

      setConversations(data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch chat history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            My Guidance Chats
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Your chat request history
          </h1>

          <p className="mt-4 text-slate-600">
            View your previous conversations with verified devotees.
          </p>
        </div>

        {loading && (
          <div className="mt-8 rounded-3xl bg-white p-8 text-orange-600 shadow">
            Loading your chats...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-600 shadow">
            {error}
          </div>
        )}

        {!loading && !error && conversations.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-8 text-slate-600 shadow">
            You have not started any guidance chat yet.
          </div>
        )}

        <div className="mt-8 space-y-5">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full rounded-[2rem] border border-orange-100 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {chat.devotee?.name || "Verified Devotee"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Centre: {chat.iskcon_centre?.name || "N/A"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Status:{" "}
                    <span className="font-semibold capitalize text-orange-600">
                      {chat.status}
                    </span>
                  </p>
                </div>

                <div className="rounded-full bg-orange-100 px-5 py-3 text-sm font-bold text-orange-700">
                  Open Chat
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}