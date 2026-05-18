const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getCentreEvents(status?: string) {
  const query = status ? `?status=${status}` : "";

  const res = await fetch(`${API_URL}/centre-admin/events/events${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch events");

  return data.data || [];
}

export async function getCentreEvent(eventId: number) {
  const res = await fetch(`${API_URL}/centre-admin/events/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch event");

  return data.data;
}

export async function createCentreEvent(payload: any) {
  const res = await fetch(`${API_URL}/centre-admin/events/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create event");

  return data.data;
}

export async function updateCentreEvent(eventId: number, payload: any) {
  const res = await fetch(`${API_URL}/centre-admin/events/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update event");

  return data.data;
}

export async function deleteCentreEvent(eventId: number) {
  const res = await fetch(`${API_URL}/centre-admin/events/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete event");

  return data;
}