import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type VideoResponse = {
  data: {
    id: number;
    video_id: string;
    title: string;
    url: string;
    thumbnail: string | null;
    duration_str: string;
    uploader: string;
    position: number;

    playlist?: {
      playlist_id: string;
      title: string;

      owner?: {
        channel_name: string;
      };
    };
  };
};

export default function PlaylistVideoDetailPage() {
  const { playlistId, videoId } = useParams();

  const [video, setVideo] = useState<VideoResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  const [transcript, setTranscript] = useState("");
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  useEffect(() => {
    if (!videoId) return;

    async function fetchVideo() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/playlists/videos/${videoId}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setVideo(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    if (!videoId) return;

    async function fetchTranscript() {
      try {
        setTranscriptLoading(true);
        setTranscriptError("");

        const response = await fetch(
          `${API_BASE_URL}/youtube/transcript/${videoId}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Transcript unavailable");
        }

        setTranscript(result.combined_text || "");
      } catch (error: any) {
        setTranscriptError(error.message || "Transcript unavailable");
      } finally {
        setTranscriptLoading(false);
      }
    }

    fetchTranscript();
  }, [videoId]);

  async function handleExplainVideo() {
    if (!videoId) return;

    try {
      setSummaryLoading(true);
      setSummaryError("");

      const response = await fetch(
        `${API_BASE_URL}/youtube/ai/explain/${videoId}`,
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to explain this video");
      }

      setSummary(result.explanation || "");
    } catch (error: any) {
      setSummaryError(error.message || "Unable to explain this video");
    } finally {
      setSummaryLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Loading video...</p>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Video not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <PageContainer>
        <div className="mb-8">
          <Link
            to={`/playlists/${playlistId}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Playlist
          </Link>
        </div>

        <section className="overflow-hidden rounded-[2rem] bg-black shadow-2xl">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.video_id}`}
              title={video.title}
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {video.playlist?.owner?.channel_name || "ISKCON Channel"}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900">
            {video.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              {video.duration_str}
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {video.uploader}
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Video {video.position}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700"
            >
              Watch on YouTube
            </a>

            <button
              onClick={handleExplainVideo}
              disabled={summaryLoading}
              className="inline-flex rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
            >
              {summaryLoading ? "Explaining..." : "Explain this video in short"}
            </button>
          </div>
        </section>

        {(summary || summaryLoading || summaryError) && (
          <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Krishna Wisdom AI
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Short Explanation
            </h2>

            {summaryLoading && (
              <div className="mt-8">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              </div>
            )}

            {summary && (
              <p className="mt-6 whitespace-pre-line leading-8 text-slate-700">
                {summary}
              </p>
            )}

            {summaryError && (
              <p className="mt-4 text-sm text-red-600">{summaryError}</p>
            )}
          </section>
        )}

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Transcript
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Video Transcript
              </h2>
            </div>
          </div>

          {transcriptLoading && (
            <div className="mt-8 text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          )}

          {transcriptError && (
            <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
              {transcriptError}
            </p>
          )}

          {transcript && (
            <div className="mt-6 max-h-[520px] overflow-y-auto rounded-3xl bg-slate-50 p-6">
              <p className="whitespace-pre-line leading-8 text-slate-700">
                {transcript}
              </p>
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}