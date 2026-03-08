import { DashboardLayout } from "@/components/DashboardLayout";
import { mockAnomalies, mockCostData } from "@/lib/mockData";
import { AlertTriangle, Filter, Search } from "lucide-react";
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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Anomaly Detection</h1>
        <p className="text-sm text-muted-foreground">
          Cloud cost anomalies detected using ML-based analysis
        </p>
      </div>

      {/* Anomaly Spike Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mb-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Cost Trend with Anomaly Highlights
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(213, 94%, 56%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(213, 94%, 56%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 9%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
            />
            <ReferenceLine
              y={avgCost}
              stroke="hsl(142, 71%, 45%)"
              strokeDasharray="5 5"
              label={{ value: "Expected Avg", fill: "hsl(142, 71%, 45%)", fontSize: 10, position: "right" }}
            />
            <Area type="monotone" dataKey="total" stroke="hsl(213, 94%, 56%)" fill="url(#costGrad)" strokeWidth={2} />
            {chartData.filter(d => d.isAnomaly).map((d, i) => (
              <ReferenceDot
                key={i}
                x={d.date}
                y={d.total}
                r={6}
                fill="hsl(0, 72%, 51%)"
                stroke="hsl(0, 72%, 70%)"
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive" /> Anomaly detected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0 border-t border-dashed border-success" /> Expected average
          </span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center gap-3 mb-4"
      >
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by service or date..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Services</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="anomaly">Anomaly</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </motion.div>

      {/* Anomalies Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Detection Results ({filtered.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
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
                  <tr
                    key={i}
                    className={`border-b border-border/50 transition-colors ${
                      isAnomaly ? "bg-destructive/5" : ""
                    }`}
                  >
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
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        isAnomaly
                          ? "bg-destructive/15 text-destructive"
                          : "bg-success/15 text-success"
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
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No anomalies match the current filters
                  </td>
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
