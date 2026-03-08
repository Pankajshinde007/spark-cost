import { apiFetch } from "./config";

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  potentialSavings: number;
  impact: "high" | "medium" | "low";
  provider: string;
}

export const recommendationsApi = {
  getAll: () => apiFetch<Recommendation[]>("/recommendations"),
  dismiss: (id: string) =>
    apiFetch<{ success: boolean }>(`/recommendations/${id}/dismiss`, { method: "PUT" }),
};
