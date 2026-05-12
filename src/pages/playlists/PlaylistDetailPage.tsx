import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Video = {
  id: number;
  video_id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  duration: number;
  duration_str: string;
  uploader: string;
  position: number;
};

type PlaylistResponse = {
  playlist: {
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

  data: Video[];
};

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  const [playlistData, setPlaylistData] =
    useState<PlaylistResponse | null>(null);

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playlistId) return;

    async function fetchPlaylist() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/playlists/${playlistId}/videos`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setPlaylistData(result);

          if (result.data.length > 0) {
            setSelectedVideo(result.data[0]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, [playlistId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Loading playlist...</p>
      </main>
    );
  }

  if (!playlistData) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Playlist not found.</p>
      </main>
    );
  }

  const { playlist, data: videos } = playlistData;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <PageContainer>
        <div className="mb-8">
          <Link
            to="/playlists"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Playlists
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                {playlist.owner?.channel_name || "ISKCON Channel"}
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                {playlist.title}
              </h1>

              <p className="mt-6 leading-8 text-slate-700">
                Watch devotional lectures, kirtans, conversations, and Krishna
                consciousness discussions from this playlist.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">
                    {playlist.video_count}
                  </p>

                  <p className="text-sm text-slate-600">Videos</p>
                </div>
              </div>

              <a
                href={playlist.url}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-8
                  inline-flex
                  rounded-full
                  bg-red-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-red-700
                "
              >
                Watch on YouTube
              </a>
            </div>

            <div className="h-[320px] lg:h-full">
              <img
                src={
                  playlist.thumbnail ||
                  "http://localhost:3000/images/krishna_40.jpeg"
                }
                alt={playlist.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              Playlist Videos
            </h2>

            <p className="text-sm text-slate-600">
              {videos.length} videos
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`
                  w-full
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-md
                  transition
                  hover:shadow-xl

                  ${
                    selectedVideo?.id === video.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }
                `}
              >
                <Link
                key={video.id}
                to={`/playlists/${playlist.playlist_id}/videos/${video.video_id}`}
                className={`
                    block
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-md
                    transition
                    hover:shadow-xl
                `}
                >
                <div className="flex flex-col md:flex-row">
                    <div className="relative h-52 md:h-40 md:w-72">
                    <img
                        src={
                        `https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`
                        }
                        alt={video.title}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                        {video.duration_str}
                    </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-5 text-left">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                        Video {video.position}
                    </p>

                    <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900">
                        {video.title}
                    </h3>

                    <p className="mt-4 text-sm text-slate-600">
                        {video.uploader}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-blue-600">
                        Watch video →
                    </p>
                    </div>
                </div>
                </Link>
              </button>
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}