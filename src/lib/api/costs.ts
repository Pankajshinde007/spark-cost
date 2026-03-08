import { apiFetch } from "./config";

export interface DailyCost {
  date: string;
  aws: number;
  gcp: number;
  total: number;
}

export interface ServiceBreakdown {
  name: string;
  cost: number;
  percentage: number;
}

export interface CostData {
  totalCost: number;
  previousMonthCost: number;
  dailyCosts: DailyCost[];
  serviceBreakdown: ServiceBreakdown[];
}

export const costsApi = {
  getCostSummary: () => apiFetch<CostData>("/costs/summary"),
  getDailyCosts: (from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    return apiFetch<DailyCost[]>(`/costs/daily?${params}`);
  },
};
