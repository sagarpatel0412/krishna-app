const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getAdminFeedback(params: any = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]: any) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/admin/feedback?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch feedback");
  }

  return data;
}

export async function updateFeedbackStatus(uuid: string, status: string) {
  const res = await fetch(`${API_URL}/admin/feedback/${uuid}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update feedback");
  }

  return data.data;
}

export async function deleteFeedback(uuid: string) {
  const res = await fetch(`${API_URL}/admin/feedback/${uuid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete feedback");
  }

  return data;
}