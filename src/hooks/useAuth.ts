import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUser(data.user);
    //   localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();

    function handleAuthChange() {
      fetchProfile();
    }

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  const roles = user?.roles || [];
  console.log(roles,"roles")

  return {
    user,
    loading,
    isLoggedIn: !!user,
    isUser: roles.includes("SEEKER"),
    isDevotee: roles.includes("VERIFIED_DEVOTEE"),
    isAdmin: roles.includes("ADMIN"),
    isCenterAdmin: roles.includes("CENTER_ADMIN"),
    isSuperAdmin: roles.includes("SUPER_ADMIN")
  };
}