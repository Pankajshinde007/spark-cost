import { DashboardLayout } from "@/components/DashboardLayout";
import { mockAnomalies, mockCostData } from "@/lib/mockData";
import { AlertTriangle, Filter, Search, Activity, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceDot,
} from "recharts";

const anomalyDates = new Set(
  mockAnomalies.filter(a => a.status === "anomaly").map(a => a.date)
);

const chartData = mockCostData.dailyCosts.map(d => ({
  ...d,
  isAnomaly: anomalyDates.has(d.date),
}));

const services = Array.from(new Set(mockAnomalies.map(a => a.service)));

const AnomaliesPage = () => {
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockAnomalies.filter(a => {
      if (serviceFilter !== "all" && a.service !== serviceFilter) return false;
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (search && !a.service.toLowerCase().includes(search.toLowerCase()) && !a.date.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [serviceFilter, statusFilter, search]);

  const avgCost = mockCostData.dailyCosts.reduce((s, d) => s + d.total, 0) / mockCostData.dailyCosts.length;
  const anomalyCount = mockAnomalies.filter(a => a.status === "anomaly").length;

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">ML-Powered Detection</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Anomaly Detection</h1>
          <p className="text-sm text-muted-foreground">Cloud cost anomalies detected using AI analysis</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-card px-4 py-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <div>
              <p className="text-[10px] text-muted-foreground">Anomalies Found</p>
              <p className="text-lg font-bold text-destructive">{anomalyCount}</p>
            </div>
          </div>
          <div className="glass-card px-4 py-2.5 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Services Monitored</p>
              <p className="text-lg font-bold text-foreground">{services.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly Spike Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-destructive to-primary" />
          <h3 className="text-sm font-semibold text-foreground">Cost Trend with Anomaly Highlights</h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 14%)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 7%)",
                border: "1px solid hsl(222, 30%, 14%)",
                borderRadius: "10px",
                fontSize: 12,
                boxShadow: "0 8px 32px hsl(0 0% 0% / 0.3)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
            />
            <ReferenceLine
              y={avgCost}
              stroke="hsl(160, 84%, 39%)"
              strokeDasharray="5 5"
              label={{ value: "Expected Avg", fill: "hsl(160, 84%, 39%)", fontSize: 10, position: "right" }}
            />
            <Area type="monotone" dataKey="total" stroke="hsl(217, 91%, 60%)" fill="url(#costGrad)" strokeWidth={2} />
            {chartData.filter(d => d.isAnomaly).map((d, i) => (
              <ReferenceDot key={i} x={d.date} y={d.total} r={6} fill="hsl(0, 84%, 60%)" stroke="hsl(0, 84%, 70%)" strokeWidth={2} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive shadow-sm shadow-destructive/30" /> Anomaly detected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0 border-t border-dashed border-success" /> Expected average
          </span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by service or date..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40">
            <option value="all">All Services</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40">
            <option value="all">All Status</option>
            <option value="anomaly">Anomaly</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </motion.div>

      {/* Anomalies Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-warning to-destructive" />
          <h3 className="text-sm font-semibold text-foreground">Detection Results ({filtered.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border/40">
                <th className="text-left py-2.5 font-medium">Date</th>
                <th className="text-left py-2.5 font-medium">Cloud Service</th>
                <th className="text-right py-2.5 font-medium">Expected Cost</th>
                <th className="text-right py-2.5 font-medium">Actual Cost</th>
                <th className="text-right py-2.5 font-medium">Deviation</th>
                <th className="text-right py-2.5 font-medium">Score</th>
                <th className="text-left py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const deviation = ((a.actual - a.expected) / a.expected * 100).toFixed(1);
                const isAnomaly = a.status === "anomaly";
                return (
                  <tr key={i} className={`border-b border-border/20 hover:bg-secondary/20 transition-colors ${isAnomaly ? "bg-destructive/[0.03]" : ""}`}>
                    <td className="py-3 text-foreground font-medium">{a.date}</td>
                    <td className="py-3 text-foreground">{a.service}</td>
                    <td className="py-3 text-right text-muted-foreground">${a.expected.toLocaleString()}</td>
                    <td className={`py-3 text-right font-semibold ${isAnomaly ? "text-destructive" : "text-foreground"}`}>
                      ${a.actual.toLocaleString()}
                    </td>
                    <td className={`py-3 text-right font-mono ${isAnomaly ? "text-destructive" : "text-muted-foreground"}`}>
                      +{deviation}%
                    </td>
                    <td className="py-3 text-right font-mono text-foreground">{a.score.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        isAnomaly ? "bg-destructive/10 text-destructive ring-1 ring-destructive/20" : "bg-success/10 text-success ring-1 ring-success/20"
                      }`}>
                        {isAnomaly && <AlertTriangle className="w-3 h-3" />}
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">No anomalies match the current filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AnomaliesPage;
