const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getIskconCentres() {
  const res = await fetch(`${API_URL}/iskcon-centres`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch ISKCON centres");
  }

  return data.data;
}