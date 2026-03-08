// Base URL for the external Flask backend API
// Change this to your deployed Flask server URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

export const authHeaders = (): HeadersInit => {
  const token = localStorage.getItem("auth_token");
  return {
    ...apiHeaders(),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}
