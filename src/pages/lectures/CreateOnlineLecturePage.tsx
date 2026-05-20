import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOnlineLecture, getEligibleLectureUsers } from "../../services/onlineLectureService";

export default function CreateOnlineLecturePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        lecture_type: "gita",
        thumbnail_url: "",
        starts_at: "",
        ends_at: "",
        visibility: "centre_public",
        status: "scheduled",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [eligibleUsers, setEligibleUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    useEffect(() => {

        async function loadUsers() {

            try {

                const users =
                    await getEligibleLectureUsers();

                setEligibleUsers(users);

            } catch (error) {

                console.error(error);

            }
        }

        loadUsers();

    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const lecture =
                await createOnlineLecture({
                    ...form,

                    invited_user_ids:
                        form.visibility === "invite_only"
                            ? selectedUsers
                            : [],

                    thumbnail_url:
                        form.thumbnail_url || null,

                    ends_at:
                        form.ends_at || null,
                });

            navigate(`/lectures/${lecture.id}/live`);
        } catch (err: any) {
            setError(err.message || "Failed to create lecture");
        } finally {
            setLoading(false);
        }
    }

    const inputClass =
        "mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none focus:border-orange-500";

    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
            <section className="mx-auto max-w-4xl">
                <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        Verified Devotee
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
                        Create Online Lecture
                    </h1>

                    <p className="mt-4 text-slate-600">
                        Create a live Krishna Wisdom satsang, class, seminar or Q&A session.
                    </p>
                </div>

                {error && (
                    <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"
                >
                    <label className="block text-sm font-semibold text-slate-700">
                        Lecture Title
                    </label>
                    <input
                        required
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                        placeholder="Bhagavad Gita Chapter 2 Discussion"
                        className={inputClass}
                    />

                    <label className="mt-6 block text-sm font-semibold text-slate-700">
                        Description
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                        placeholder="Write lecture details..."
                        className={`${inputClass} min-h-[120px]`}
                    />

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700">
                                Lecture Type
                            </label>
                            <select
                                value={form.lecture_type}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lecture_type: e.target.value,
                                    })
                                }
                                className={inputClass}
                            >
                                <option value="gita">Bhagavad Gita</option>
                                <option value="bhagavatam">Srimad Bhagavatam</option>
                                <option value="kirtan">Kirtan</option>
                                <option value="seminar">Seminar</option>
                                <option value="qa">Q&A</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700">
                                Visibility
                            </label>
                            <select
                                value={form.visibility}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        visibility: e.target.value,
                                    })
                                }
                                className={inputClass}
                            >
                                <option value="centre_public">Centre Public</option>
                                <option value="invite_only">Invite Only</option>
                            </select>
                        </div>
                        {
                            form.visibility === "invite_only" && (
                                <div className="mt-8 rounded-[2rem] border border-orange-100 bg-orange-50 p-6">

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Invite Devotees
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-600">
                                        Only invited devotees can join this lecture.
                                    </p>

                                    <div className="mt-5 grid gap-3 md:grid-cols-2">

                                        {eligibleUsers.map((user) => {

                                            const checked =
                                                selectedUsers.includes(user.id);

                                            return (
                                                <label
                                                    key={user.id}
                                                    className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                                                >

                                                    <input
                                                        type="checkbox"
                                                        checked={checked}

                                                        onChange={(e) => {

                                                            if (e.target.checked) {

                                                                setSelectedUsers([
                                                                    ...selectedUsers,
                                                                    user.id,
                                                                ]);

                                                            } else {

                                                                setSelectedUsers(
                                                                    selectedUsers.filter(
                                                                        (id) => id !== user.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />

                                                    <div>

                                                        <p className="font-bold text-slate-900">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-sm text-slate-500">
                                                            {user.email}
                                                        </p>

                                                    </div>

                                                </label>
                                            );
                                        })}

                                    </div>

                                </div>
                            )
                        }
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700">
                                Starts At
                            </label>
                            <input
                                required
                                type="datetime-local"
                                value={form.starts_at}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        starts_at: e.target.value,
                                    })
                                }
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700">
                                Ends At
                            </label>
                            <input
                                type="datetime-local"
                                value={form.ends_at}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        ends_at: e.target.value,
                                    })
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <label className="mt-6 block text-sm font-semibold text-slate-700">
                        Thumbnail URL
                    </label>
                    <input
                        value={form.thumbnail_url}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                thumbnail_url: e.target.value,
                            })
                        }
                        placeholder="https://example.com/lecture-image.jpg"
                        className={inputClass}
                    />

                    <label className="mt-6 block text-sm font-semibold text-slate-700">
                        Status
                    </label>
                    <select
                        value={form.status}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value,
                            })
                        }
                        className={inputClass}
                    >
                        <option value="scheduled">Scheduled</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <div className="mt-8 rounded-3xl bg-orange-50 p-5 text-sm leading-7 text-orange-700">
                        For <b>Invite Only</b> lectures, we will add invite user selection
                        next. For now, the lecture will be created as invite-only and you can
                        add invite API later from the lecture management page.
                    </div>

                    <button
                        disabled={loading}
                        className="mt-8 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Lecture"}
                    </button>
                </form>
            </section>
        </main>
    );
}