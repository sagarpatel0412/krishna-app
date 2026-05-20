const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getOnlineLectures() {
  const res = await fetch(`${API_URL}/online-lectures`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch lectures");

  return data.data || [];
}

export async function getOnlineLecture(lectureId: number) {
  const res = await fetch(`${API_URL}/online-lectures/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch lecture");

  return data.data;
}

export async function createOnlineLecture(payload: any) {
  const res = await fetch(`${API_URL}/online-lectures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create lecture");

  return data.data;
}

export async function updateOnlineLecture(lectureId: number, payload: any) {
  const res = await fetch(`${API_URL}/online-lectures/${lectureId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update lecture");

  return data.data;
}

export async function deleteOnlineLecture(lectureId: number) {
  const res = await fetch(`${API_URL}/online-lectures/${lectureId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete lecture");

  return data;
}

export async function inviteUserToLecture(
  lectureId: number,
  invited_user_id: number
) {
  const res = await fetch(`${API_URL}/online-lectures/${lectureId}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ invited_user_id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to invite user");

  return data.data;
}

export async function getEligibleLectureUsers() {

  const res = await fetch(
    `${API_URL}/online-lectures/t/eligible-users`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch users"
    );
  }

  return data.data || [];
}