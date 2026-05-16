const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMyCentre() {
  const res = await fetch(
    `${API_URL}/centre-management/my-centre`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch centre");
  }

  return data.data;
}

export async function updateMyCentre(payload: any) {
  const res = await fetch(
    `${API_URL}/centre-management/my-centre`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update centre");
  }

  return data.data;
}