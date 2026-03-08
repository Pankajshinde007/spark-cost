import { apiFetch } from "./config";

export interface CloudAccount {
  id: string;
  provider: "AWS" | "GCP";
  name: string;
  accountId: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  monthlyCost: number;
}

export const cloudAccountsApi = {
  getAll: () => apiFetch<CloudAccount[]>("/cloud-accounts"),
  connect: (data: { provider: "AWS" | "GCP"; name: string; credentials: string }) =>
    apiFetch<CloudAccount>("/cloud-accounts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  sync: (id: string) =>
    apiFetch<CloudAccount>(`/cloud-accounts/${id}/sync`, { method: "POST" }),
  disconnect: (id: string) =>
    apiFetch<{ success: boolean }>(`/cloud-accounts/${id}`, { method: "DELETE" }),
};
