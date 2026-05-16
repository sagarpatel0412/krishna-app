// services/centreAdminService.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getCentreUsers() {
  const res = await fetch(`${API_URL}/centre-admin/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.data || [];
}

export async function updateCentreUserRoles(userId: number, roles: string[]) {
  const res = await fetch(`${API_URL}/centre-admin/users/${userId}/roles`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ roles }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update roles");
  }

  return data;
}

export async function updateCentreUserStatus(userId: number, status: string) {
  const res = await fetch(`${API_URL}/centre-admin/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
}