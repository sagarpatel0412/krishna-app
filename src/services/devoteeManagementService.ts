// services/devoteeManagementService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getCentreSeekers(params?: {
  search?: string;
  status?: string;
}) {
  const query = new URLSearchParams();

  if (params?.search) query.append("search", params.search);
  if (params?.status) query.append("status", params.status);

  const res = await fetch(
    `${API_URL}/devotee-management/seekers?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch seekers");
  }

  return data.data || [];
}

export async function updateSeekerStatus(
  seekerId: number,
  status: "pending" | "approved" | "rejected" | "blocked"
) {
  const res = await fetch(
    `${API_URL}/devotee-management/seekers/${seekerId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update seeker");
  }

  return data.data;
}