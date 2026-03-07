import { DashboardLayout } from "@/components/DashboardLayout";
import { mockCostData, mockAlerts, mockAnomalies, mockRecommendations } from "@/lib/mockData";
import { DollarSign, AlertTriangle, Cloud, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie,
} from "recharts";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const StatCard = ({ icon: Icon, label, value, change, changeType, index }: any) => (
  <motion.div custom={index} initial="hidden" animate="visible" variants={cardVariants} className="stat-card">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {change && (
        <span className={`flex items-center text-xs font-medium ${changeType === 'up' ? 'text-destructive' : 'text-success'}`}>
          {changeType === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const DashboardPage = () => {
  const activeAlerts = mockAlerts.filter(a => a.status === "active").length;
  const costChange = ((mockCostData.totalCost - mockCostData.previousMonthCost) / mockCostData.previousMonthCost * 100).toFixed(1);
  const totalSavings = mockRecommendations.reduce((s, r) => s + r.potentialSavings, 0);

  const COLORS = [
    "hsl(213, 94%, 56%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)",
    "hsl(0, 72%, 51%)", "hsl(270, 70%, 60%)", "hsl(190, 80%, 50%)",
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Cost Dashboard</h1>
        <p className="text-sm text-muted-foreground">Monitor your cloud spending and anomalies</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard index={0} icon={DollarSign} label="Total Cloud Cost (MTD)" value={`$${mockCostData.totalCost.toLocaleString()}`} change={`${costChange}%`} changeType="up" />
        <StatCard index={1} icon={AlertTriangle} label="Active Alerts" value={activeAlerts} change={`${activeAlerts} new`} changeType="up" />
        <StatCard index={2} icon={Cloud} label="Connected Accounts" value="2" />
        <StatCard index={3} icon={ArrowUpRight} label="Potential Savings" value={`$${totalSavings.toLocaleString()}/mo`} change="Available" changeType="down" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Cost Trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Cost Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockCostData.dailyCosts}>
              <defs>
                <linearGradient id="awsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213, 94%, 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(213, 94%, 56%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gcpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
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
              />
              <Area type="monotone" dataKey="aws" stroke="hsl(213, 94%, 56%)" fill="url(#awsGrad)" strokeWidth={2} name="AWS" />
              <Area type="monotone" dataKey="gcp" stroke="hsl(142, 71%, 45%)" fill="url(#gcpGrad)" strokeWidth={2} name="GCP" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Breakdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Cost by Service</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={mockCostData.serviceBreakdown}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={75}
                dataKey="cost"
                nameKey="name"
                stroke="none"
              >
                {mockCostData.serviceBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {mockCostData.serviceBreakdown.slice(0, 4).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="text-foreground font-medium">${s.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Anomaly Detection Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Anomaly Detection Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2 font-medium">Date</th>
                  <th className="text-left py-2 font-medium">Service</th>
                  <th className="text-right py-2 font-medium">Actual</th>
                  <th className="text-right py-2 font-medium">Expected</th>
                  <th className="text-right py-2 font-medium">Score</th>
                  <th className="text-left py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAnomalies.map((a, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2.5 text-foreground">{a.date}</td>
                    <td className="py-2.5 text-foreground">{a.service}</td>
                    <td className="py-2.5 text-right text-foreground">${a.actual.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-muted-foreground">${a.expected.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-mono">{a.score.toFixed(2)}</td>
                    <td className="py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        a.status === "anomaly"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-success/10 text-success"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Recommendations */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Optimization Suggestions</h3>
          <div className="space-y-3">
            {mockRecommendations.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                  r.impact === "high" ? "bg-destructive" : r.impact === "medium" ? "bg-warning" : "bg-success"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{r.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{r.description}</p>
                </div>
                <span className="text-xs font-semibold text-success whitespace-nowrap">
                  -${r.potentialSavings.toLocaleString()}/mo
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
