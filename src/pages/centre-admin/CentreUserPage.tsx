import { useEffect, useState } from "react";
import {
  getCentreUsers,
  updateCentreUserRoles,
  updateCentreUserStatus,
} from "../../services/centreAdminService";

const ROLE_OPTIONS = ["SEEKER", "VERIFIED_DEVOTEE", "MODERATOR"];

export default function CentreUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await getCentreUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    const roles = user.roles?.map((role: any) => role.name) || [];

    const matchesSearch =
      !query ||
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query) ||
      user.city?.toLowerCase().includes(query);

    const matchesRole = !roleFilter || roles.includes(roleFilter);
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  function getUserRoles(user: any) {
    return user.roles?.map((role: any) => role.name) || [];
  }

  async function toggleRole(user: any, roleName: string) {
    const currentRoles = getUserRoles(user);

    const nextRoles = currentRoles.includes(roleName)
      ? currentRoles.filter((role: string) => role !== roleName)
      : [...currentRoles, roleName];

    try {
      await updateCentreUserRoles(user.id, nextRoles);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || "Failed to update role");
    }
  }

  async function handleStatusChange(userId: number, status: string) {
    try {
      await updateCentreUserStatus(userId, status);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Manage Centre Users
          </h1>

          <p className="mt-4 text-slate-600">
            Manage seekers, devotees and moderators registered under your ISKCON
            centre.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_220px_220px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, city..."
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Roles</option>
              <option value="SEEKER">Seeker</option>
              <option value="VERIFIED_DEVOTEE">Verified Devotee</option>
              <option value="MODERATOR">Moderator</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-red-600 shadow">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-orange-600 shadow">
            Loading users...
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="bg-orange-50 text-sm uppercase tracking-wider text-orange-700">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Roles</th>
                    <th className="px-6 py-4">Manage Roles</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-orange-100">
                  {filteredUsers.map((user) => {
                    const roles = getUserRoles(user);

                    return (
                      <tr key={user.id} className="hover:bg-orange-50/40">
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID: {user.id}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm text-slate-700">
                            {user.email}
                          </p>
                          <p className="text-sm text-slate-500">
                            {user.phone || "No phone"}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {[user.city, user.state, user.country]
                            .filter(Boolean)
                            .join(", ") || "N/A"}
                        </td>

                        <td className="px-6 py-5">
                          <select
                            value={user.status}
                            onChange={(e) =>
                              handleStatusChange(user.id, e.target.value)
                            }
                            className="rounded-xl border border-orange-100 px-3 py-2 text-sm capitalize outline-none focus:border-orange-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="blocked">Blocked</option>
                          </select>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {roles.map((role: string) => (
                              <span
                                key={role}
                                className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {ROLE_OPTIONS.map((role) => {
                              const active = roles.includes(role);

                              return (
                                <button
                                  key={role}
                                  onClick={() => toggleRole(user, role)}
                                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                                    active
                                      ? "bg-orange-600 text-white"
                                      : "bg-slate-100 text-slate-600 hover:bg-orange-100"
                                  }`}
                                >
                                  {role}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No users found.
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}