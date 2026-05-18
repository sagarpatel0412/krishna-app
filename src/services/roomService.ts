const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getRoomCentres() {
  const res = await fetch(`${API_URL}/rooms/centres`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch centres");
  return data.data || [];
}

export async function getCentreRooms(
  centreId: number,
  checkIn?: string,
  checkOut?: string
) {
  const query = new URLSearchParams();

  if (checkIn) query.append("check_in", checkIn);
  if (checkOut) query.append("check_out", checkOut);

  const res = await fetch(
    `${API_URL}/rooms/centres/${centreId}/rooms?${query.toString()}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch rooms");
  return data.data || [];
}

export async function createRoomBooking(payload: any) {
  const res = await fetch(`${API_URL}/rooms/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to book room");
  return data.data;
}

export async function getMyRoomBookings() {
  const res = await fetch(`${API_URL}/rooms/my-bookings`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data.data || [];
}