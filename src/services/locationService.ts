const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getCountries() {
  const res = await fetch(`${API_URL}/locations/countries`);
  const data = await res.json();
  return data.data || [];
}

export async function getStates(countryCode: string) {
  const res = await fetch(`${API_URL}/locations/states/${countryCode}`);
  const data = await res.json();
  return data.data || [];
}

export async function getCities(countryCode: string, stateCode: string) {
  const res = await fetch(`${API_URL}/locations/cities/${countryCode}/${stateCode}`);
  const data = await res.json();
  return data.data || [];
}