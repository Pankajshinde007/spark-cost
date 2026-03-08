import { apiFetch } from "./config";

export interface Alert {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  service: string;
  amount: number;
  expected: number;
  timestamp: string;
  status: "active" | "resolved";
}

export interface Anomaly {
  date: string;
  service: string;
  actual: number;
  expected: number;
  score: number;
  status: "anomaly" | "normal";
}

export const alertsApi = {
  getAlerts: (status?: "active" | "resolved") => {
    const params = status ? `?status=${status}` : "";
    return apiFetch<Alert[]>(`/alerts${params}`);
  },
  getAnomalies: () => apiFetch<Anomaly[]>("/alerts/anomalies"),
  resolveAlert: (id: string) =>
    apiFetch<Alert>(`/alerts/${id}/resolve`, { method: "PUT" }),
};
