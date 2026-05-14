// services/chatService.ts

const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getDevoteesByCentre(centreId: number) {
  const res = await fetch(`${API_URL}/chat/devotees?centre_id=${centreId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch devotees");

  return data.data || [];
}

export async function createConversation(payload: {
  devotee_user_id: number;
  iskcon_centre_id: number;
}) {
  const res = await fetch(`${API_URL}/chat/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create conversation");

  return data.data;
}

export async function getConversationMessages(conversationId: number) {
  const res = await fetch(
    `${API_URL}/chat/conversations/${conversationId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch messages");

  return data.data || [];
}

export async function sendMessage(conversationId: number, message: string) {
  const res = await fetch(
    `${API_URL}/chat/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ message }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send message");

  return data.data;
}