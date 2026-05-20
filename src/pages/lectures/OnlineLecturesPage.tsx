import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteOnlineLecture,
  getOnlineLectures,
} from "../../services/onlineLectureService";
import useAuth from "../../hooks/useAuth";

export default function OnlineLecturesPage() {
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { isDevotee } = useAuth();

  async function loadLectures() {
    try {
      setLoading(true);
      setError("");

      const data = await getOnlineLectures();
      setLectures(data);
    } catch (err: any) {
      setError(err.message || "Failed to load lectures");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLectures();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this lecture?");
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteOnlineLecture(id);
      setSuccess("Lecture deleted successfully");
      await loadLectures();
    } catch (err: any) {
      setError(err.message || "Failed to delete lecture");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Krishna Wisdom Live
          </p>

          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">
                Online Lectures
              </h1>

              <p className="mt-4 max-w-3xl leading-8 text-slate-600">
                Attend live Krishna consciousness lectures, satsangs, kirtans,
                seminars and Q&A sessions from your ISKCON centre.
              </p>
            </div>

            {isDevotee && (
              <Link
                to="/devotee/lectures/create"
                className="rounded-full bg-orange-600 px-6 py-3 text-center font-bold text-white shadow hover:bg-orange-700"
              >
                Create Lecture
              </Link>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-2xl bg-green-50 px-5 py-4 text-green-700 shadow">
            {success}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading lectures...
          </div>
        ) : lectures.length === 0 ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-slate-600 shadow">
            No online lectures available right now.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lectures.map((lecture) => (
              <article
                key={lecture.id}
                className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
              >
                <div className="h-44 bg-gradient-to-br from-orange-200 to-yellow-100">
                  {lecture.thumbnail_url && (
                    <img
                      src={lecture.thumbnail_url}
                      alt={lecture.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold capitalize text-orange-700">
                      {lecture.lecture_type}
                    </span>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold capitalize text-blue-700">
                      {lecture.visibility?.replace("_", " ")}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold capitalize text-green-700">
                      {lecture.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    {lecture.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    By {lecture.created_by?.name || "Devotee"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {lecture.iskcon_centre?.name}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                    {lecture.description || "No description available."}
                  </p>

                  <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700">
                    Starts: {new Date(lecture.starts_at).toLocaleString()}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/lectures/${lecture.id}/live`}
                      className="rounded-full bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
                    >
                      Join Lecture
                    </Link>

                    {isDevotee && (
                      <button
                        onClick={() => handleDelete(lecture.id)}
                        className="rounded-full bg-red-50 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}