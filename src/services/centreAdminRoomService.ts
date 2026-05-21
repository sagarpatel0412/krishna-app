// services/centreAdminRoomService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getAdminRooms() {
  const res = await fetch(`${API_URL}/centre-admin/rooms/rooms`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch rooms");

  return data.data || [];
}

export async function createAdminRoom(payload: any) {
  const res = await fetch(`${API_URL}/centre-admin/rooms/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create room");

  return data.data;
}

export async function updateAdminRoom(roomId: number, payload: any) {
  const res = await fetch(`${API_URL}/centre-admin/rooms/rooms/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update room");

  return data.data;
}

export async function deleteAdminRoom(roomId: number) {
  const res = await fetch(`${API_URL}/centre-admin/rooms/rooms/${roomId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete room");

  return data;
}
export async function getAdminRoomBookings() {
  const res = await fetch(`${API_URL}/centre-admin/rooms/room-bookings`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data.data || [];
}

export async function updateAdminRoomBookingStatus(
  bookingId: number,
  payload: any
) {
  const res = await fetch(
    `${API_URL}/centre-admin/rooms/room-bookings/${bookingId}/status`,
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
    throw new Error(data.message || "Failed to update booking");
  }

  return data.data;
}