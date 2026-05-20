const API_BASE_URL = "http://localhost:3000/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function loginUser(payload: LoginPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Login failed");
  }

  // localStorage.setItem("token", json.token || json.data?.token);
  // localStorage.setItem("user", JSON.stringify(json.user || json.data?.user));
  // window.dispatchEvent(new Event("auth-changed"));

  return json;
}

export async function registerUser(payload: any) {
  const res = await fetch(`${API_BASE_URL}/auth/register/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function registerDevotee(payload: any) {
  const res = await fetch(`${API_BASE_URL}/auth/register/devotee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Devotee registration failed");
  return data;
}

export async function verifyLoginOtp(payload: {
  temp_user_id: number;
  otp: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  window.dispatchEvent(new Event("auth-changed"));

  return data;
}

export function saveLoginSession(data: any) {
  localStorage.setItem("token", data.token);
  window.dispatchEvent(new Event("auth-changed"));
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("auth-changed"));

  window.location.href = "/login";
}

export function getToken() {
  return localStorage.getItem("token");
}
