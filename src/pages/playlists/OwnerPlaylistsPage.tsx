import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Owner = {
  id: number;
  channel_id: string;
  channel_name: string;
  channel_url: string;
  uploader_id: string;
  thumbnail: string;
};

type Playlist = {
  id: number;
  playlist_id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  video_count: number;
};

type ResponseData = {
  owner: Owner;
  data: Playlist[];
};

export default function OwnerPlaylistsPage() {
  const { channelId } = useParams();

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Playlist[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);

  async function fetchPlaylists(search = "") {
    if (!channelId) return;

    try {
      setSearching(Boolean(search));

      const url = new URL(
        `${API_BASE_URL}/playlists/owners/${channelId}/playlists`
      );

      if (search.trim()) {
        url.searchParams.set("search", search.trim());
      }

      const response = await fetch(url.toString(), {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const result = await response.json();

      if (result.success) {
        setResponseData(result);
        setSuggestions(result.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }

  useEffect(() => {
    fetchPlaylists();
  }, [channelId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim()) {
        setSuggestions([]);
        return;
      }

      fetchPlaylists(searchText);
      setShowSuggestions(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSearchQuery(searchText);
    setShowSuggestions(false);
    fetchPlaylists(searchText);
  }

  function handleSuggestionClick(playlist: Playlist) {
    setSearchText(playlist.title);
    setSearchQuery(playlist.title);
    setShowSuggestions(false);
    fetchPlaylists(playlist.title);
  }

  function handleClearSearch() {
    setSearchText("");
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    fetchPlaylists();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Loading playlists...</p>
      </main>
    );
  }

  if (!responseData) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Channel not found.</p>
      </main>
    );
  }

  const { owner, data: playlists } = responseData;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <PageContainer>
        <div className="mb-8">
          <Link
            to="/playlists"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Channels
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Devotional Channel
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                {owner.channel_name}
              </h1>

              <p className="mt-5 text-slate-700">{owner.uploader_id}</p>

              <p className="mt-6 leading-8 text-slate-700">
                Explore playlists containing lectures, conversations, kirtans,
                bhajans, and Krishna consciousness discussions.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">
                    {playlists.length}
                  </p>

                  <p className="text-sm text-slate-600">
                    {searchQuery ? "Matched Playlists" : "Playlists"}
                  </p>
                </div>
              </div>

              <a
                href={owner.channel_url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700"
              >
                Open YouTube Channel
              </a>
            </div>

            <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-100 p-10">
              <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl">
                <img
                  src={owner.thumbnail || "http://localhost:3000/images/krishna_40.jpeg"}
                  alt={owner.channel_name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-[2rem] bg-white p-5 shadow-md">
            <form onSubmit={handleSearchSubmit} className="relative">
              <label className="text-sm font-semibold text-slate-700">
                Search playlists
              </label>

              <div className="mt-3 flex flex-col gap-3 md:flex-row">
                <input
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="Type playlist name, lecture, kirtan..."
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  disabled={searching}
                  className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {searching ? "Searching..." : "Search"}
                </button>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="rounded-2xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear
                  </button>
                )}
              </div>

              {showSuggestions && searchText.trim() && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-3 max-h-80 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
                  {suggestions.slice(0, 8).map((playlist) => (
                    <button
                      key={playlist.id}
                      type="button"
                      onClick={() => handleSuggestionClick(playlist)}
                      className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-blue-50"
                    >
                      <p className="line-clamp-1 text-sm font-bold text-slate-900">
                        {playlist.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {playlist.video_count} videos
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              Channel Playlists
            </h2>

            <p className="text-sm text-slate-600">
              {playlists.length} playlists
            </p>
          </div>

          {searchQuery && (
            <p className="mt-3 text-sm text-slate-600">
              Showing results for{" "}
              <span className="font-semibold text-blue-700">{searchQuery}</span>
            </p>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlists/${playlist.playlist_id}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      playlist.thumbnail ||
                      "http://localhost:3000/images/krishna_40.jpeg"
                    }
                    alt={playlist.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    {playlist.video_count} videos
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 group-hover:text-blue-700">
                    {playlist.title}
                  </h2>

                  <p className="mt-4 text-sm font-semibold text-blue-600">
                    Open playlist →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {!searching && playlists.length === 0 && (
            <p className="mt-10 text-center text-slate-600">
              No playlists found.
            </p>
          )}
        </section>
      </PageContainer>
    </main>
  );
}