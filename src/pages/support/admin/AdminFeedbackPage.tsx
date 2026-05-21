import { useEffect, useState } from "react";
import {
    deleteFeedback,
    getAdminFeedback,
    updateFeedbackStatus,
} from "../../../services/adminFeedbackService";

export default function AdminFeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);

    const [filters, setFilters] = useState({
        search: "",
        type: "",
        status: "",
        page: 1,
        limit: 20,
    });

    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadFeedback(nextFilters = filters) {
        try {
            setLoading(true);
            setError("");

            const result = await getAdminFeedback(nextFilters);

            setFeedbacks(result.data || []);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || "Failed to load feedback");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFeedback();
    }, []);

    async function handleFilterChange(key: string, value: string) {
        const nextFilters = {
            ...filters,
            [key]: value,
            page: 1,
        };

        setFilters(nextFilters);
        await loadFeedback(nextFilters);
    }

    async function handleStatusChange(uuid: string, status: string) {
        try {
            setError("");
            setSuccess("");

            await updateFeedbackStatus(uuid, status);

            setSuccess("Feedback status updated");
            await loadFeedback();
        } catch (err: any) {
            setError(err.message || "Failed to update status");
        }
    }

    async function handleDelete(uuid: string) {
        const confirmed = window.confirm("Delete this feedback?");
        if (!confirmed) return;

        try {
            setError("");
            setSuccess("");

            await deleteFeedback(uuid);

            setSuccess("Feedback deleted successfully");
            setSelectedFeedback(null);
            await loadFeedback();
        } catch (err: any) {
            setError(err.message || "Failed to delete feedback");
        }
    }

    async function goToPage(page: number) {
        const nextFilters = {
            ...filters,
            page,
        };

        setFilters(nextFilters);
        await loadFeedback(nextFilters);
    }

    const inputClass =
        "w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none focus:border-orange-500";

    const typeBadge: any = {
        suggestion: "bg-blue-50 text-blue-700",
        contact: "bg-purple-50 text-purple-700",
        problem: "bg-red-50 text-red-700",
    };

    const statusBadge: any = {
        new: "bg-orange-100 text-orange-700",
        reviewing: "bg-blue-100 text-blue-700",
        resolved: "bg-green-100 text-green-700",
        closed: "bg-slate-100 text-slate-700",
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
            <section className="mx-auto max-w-7xl">
                <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        Admin Support
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
                        Suggestions, Contact & Problem Reports
                    </h1>

                    <p className="mt-4 text-slate-600">
                        Review user suggestions, contact messages and reported problems.
                    </p>
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

                <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
                    <div className="grid gap-4 md:grid-cols-4">
                        <input
                            value={filters.search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                            placeholder="Search name, email, subject..."
                            className={inputClass}
                        />

                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange("type", e.target.value)}
                            className={inputClass}
                        >
                            <option value="">All Types</option>
                            <option value="suggestion">Suggestions</option>
                            <option value="contact">Contact</option>
                            <option value="problem">Problems</option>
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange("status", e.target.value)}
                            className={inputClass}
                        >
                            <option value="">All Status</option>
                            <option value="new">New</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>

                        <button
                            onClick={() => loadFeedback()}
                            className="rounded-2xl bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1100px] text-left text-sm">
                            <thead className="bg-orange-50 text-slate-700">
                                <tr>
                                    <th className="px-5 py-4">Type</th>
                                    <th className="px-5 py-4">Subject</th>
                                    <th className="px-5 py-4">User</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Created</th>
                                    <th className="px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-8 text-center text-orange-600">
                                            Loading feedback...
                                        </td>
                                    </tr>
                                ) : feedbacks.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                                            No feedback found.
                                        </td>
                                    </tr>
                                ) : (
                                    feedbacks.map((item) => (
                                        <tr
                                            key={item.uuid}
                                            className="border-t border-slate-100 hover:bg-orange-50/40"
                                        >
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${typeBadge[item.type] || "bg-slate-100 text-slate-700"
                                                        }`}
                                                >
                                                    {item.type}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-bold text-slate-900">
                                                    {item.subject}
                                                </p>

                                                <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                                    {item.message}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                <p>{item.user?.name || "Guest"}</p>
                                                <p className="text-xs text-slate-400">
                                                    {item.user?.email || "-"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(item.uuid, e.target.value)
                                                    }
                                                    className={`rounded-full px-3 py-2 text-xs font-bold capitalize ${statusBadge[item.status] ||
                                                        "bg-slate-100 text-slate-700"
                                                        }`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="reviewing">Reviewing</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>

                                            <td className="px-5 py-4 text-slate-500">
                                                {new Date(item.created_at).toLocaleString()}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setSelectedFeedback(item)}
                                                        className="rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.uuid)}
                                                        className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                            <p className="text-sm text-slate-500">
                                Page {pagination.page} of {pagination.total_pages} — Total{" "}
                                {pagination.total}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    disabled={pagination.page <= 1}
                                    onClick={() => goToPage(pagination.page - 1)}
                                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                <button
                                    disabled={pagination.page >= pagination.total_pages}
                                    onClick={() => goToPage(pagination.page + 1)}
                                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {selectedFeedback && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-8">
                        <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                                        Feedback Details
                                    </p>

                                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                                        {selectedFeedback.subject}
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setSelectedFeedback(null)}
                                    className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${typeBadge[selectedFeedback.type]
                                        }`}
                                >
                                    {selectedFeedback.type}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusBadge[selectedFeedback.status]
                                        }`}
                                >
                                    {selectedFeedback.status}
                                </span>
                            </div>

                            <div className="mt-8 rounded-3xl bg-orange-50 p-6">
                                <p className="whitespace-pre-wrap leading-8 text-slate-700">
                                    {selectedFeedback.message}
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400">
                                        Name
                                    </p>
                                    <p className="mt-1 text-slate-700">
                                        {selectedFeedback.name ||
                                            selectedFeedback.user?.name ||
                                            "Guest"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400">
                                        Email
                                    </p>
                                    <p className="mt-1 text-slate-700">
                                        {selectedFeedback.email ||
                                            selectedFeedback.user?.email ||
                                            "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400">
                                        Page URL
                                    </p>
                                    <p className="mt-1 break-all text-blue-600">
                                        {selectedFeedback.page_url || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400">
                                        Screenshot
                                    </p>

                                    {selectedFeedback.screenshot_url ? (
                                        <a
                                            href={selectedFeedback.screenshot_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-1 block break-all text-blue-600"
                                        >
                                            Open Screenshot
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-slate-700">-</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-end gap-3">
                                {(selectedFeedback?.email || selectedFeedback?.user?.email) && (
                                    <a
                                        href={`mailto:${selectedFeedback.email || selectedFeedback.user?.email
                                            }?subject=${encodeURIComponent(
                                                `Regarding your Krishna Wisdom ${selectedFeedback.type}: ${selectedFeedback.subject}`
                                            )}`}
                                        className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                                    >
                                        Contact User
                                    </a>
                                )}

                                <button
                                    onClick={() => handleStatusChange(selectedFeedback.uuid, "reviewing")}
                                    className="rounded-full bg-yellow-50 px-6 py-3 font-bold text-yellow-700 hover:bg-yellow-100"
                                >
                                    Mark Reviewing
                                </button>

                                <button
                                    onClick={() => handleStatusChange(selectedFeedback.uuid, "resolved")}
                                    className="rounded-full bg-green-50 px-6 py-3 font-bold text-green-700 hover:bg-green-100"
                                >
                                    Mark Resolved
                                </button>

                                <button
                                    onClick={() => handleDelete(selectedFeedback.uuid)}
                                    className="rounded-full bg-red-50 px-6 py-3 font-bold text-red-600 hover:bg-red-100"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => setSelectedFeedback(null)}
                                    className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}