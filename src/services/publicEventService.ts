// services/publicEventService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getPublicEvent(eventCode: string) {
  const res = await fetch(`${API_URL}/events/${eventCode}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch event");
  return data.data;
}

export async function registerForEvent(eventCode: string, formData: any) {
  const res = await fetch(`${API_URL}/events/${eventCode}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      form_data: formData,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to register");
  return data.data;
}