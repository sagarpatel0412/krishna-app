// services/festivalCalendarService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getFestivalCalendar(params: {
  year: number;
  city?: string;
  country?: string;
}) {
  const query = new URLSearchParams();

  query.append("year", String(params.year));

  if (params.city) query.append("city", params.city);
  if (params.country) query.append("country", params.country);

  const res = await fetch(`${API_URL}/festival-calendar?${query.toString()}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch festival calendar");
  }

  return data.data || [];
}