// services/donationService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getDonationCentres() {
  const res = await fetch(`${API_URL}/donations/centres`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch centres");
  return data.data || [];
}

export async function getCentreSevas(centreId: number) {
  const res = await fetch(`${API_URL}/donations/centres/${centreId}/sevas`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch sevas");
  return data.data || [];
}

export async function createDonation(payload: any) {
  const res = await fetch(`${API_URL}/donations/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to create donation");
  return data.data;
}

export async function getMyDonations() {
  const res = await fetch(`${API_URL}/donations/my-donations`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch donations");
  return data.data || [];
}