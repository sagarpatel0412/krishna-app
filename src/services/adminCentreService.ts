const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getAdminCentres(params: any = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]: any) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/admin/centres?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch centres");

  return data;
}

export async function updateAdminCentre(centreId: number, payload: any) {
  const res = await fetch(`${API_URL}/admin/centres/${centreId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update centre");

  return data.data;
}

export async function deleteAdminCentre(centreId: number) {
  const res = await fetch(`${API_URL}/admin/centres/${centreId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete centre");

  return data;
}