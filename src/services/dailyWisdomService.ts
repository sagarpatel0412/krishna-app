const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getTodayShlok() {
  const res = await fetch(`${API_URL}/daily-wisdom/today`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch daily shlok");
  }

  return data.data;
}

export async function getTodaySbShlok() {
  const res = await fetch(`${API_URL}/daily-wisdom/today/sb`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch daily shlok");
  }

  return data.data;
}

export async function getFeaturedChannels() {
  const res = await fetch(`${API_URL}/random/channels/featured`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch channels");
  }

  return data.data || [];
}