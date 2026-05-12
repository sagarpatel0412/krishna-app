import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Playlist = {
  id: number;
  playlist_id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  video_count: number;

  owner?: {
    channel_name: string;
    channel_url: string;
  };
};

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch(`${API_BASE_URL}/playlists`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        const result = await response.json();

        if (result.success) {
          setPlaylists(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <PageContainer>
        <section className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Krishna Wisdom
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Devotional Playlists
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-700">
            Explore lectures, kirtans, bhajans, conversations, and spiritual
            discussions from ISKCON and Vaishnava YouTube channels.
          </p>
        </section>

        {loading ? (
          <p className="mt-10 text-slate-600">Loading playlists...</p>
        ) : (
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlists/${playlist.playlist_id}`}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-md
                  transition
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      playlist.thumbnail ||
                      "http://localhost:3000/images/krishna_40.jpeg"
                    }
                    alt={playlist.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    {playlist.video_count} videos
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {playlist.owner?.channel_name || "ISKCON Channel"}
                  </p>

                  <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-7 text-slate-900 group-hover:text-blue-700">
                    {playlist.title}
                  </h2>

                  <p className="mt-4 text-sm font-semibold text-blue-600">
                    Open playlist →
                  </p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </PageContainer>
    </main>
  );
}