import { apiFetch } from "./config";

export interface LoginResponse {
  token: string;
  user: { name: string; email: string; role: "admin" | "user" };
}

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" }),
};
