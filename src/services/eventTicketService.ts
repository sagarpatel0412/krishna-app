// services/eventTicketService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMyEventRegistrations() {
  const res = await fetch(`${API_URL}/events/user/my-registrations`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");

  return data.data || [];
}

export async function validateTicket(ticket_code: string) {
  const res = await fetch(`${API_URL}/events/validate-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ticket_code }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Invalid ticket");

  return data;
}