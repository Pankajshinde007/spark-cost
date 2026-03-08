import { DashboardLayout } from "@/components/DashboardLayout";
import { mockCostData, mockAlerts, mockAnomalies, mockRecommendations } from "@/lib/mockData";
import { DollarSign, AlertTriangle, Cloud, TrendingUp, TrendingDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const statCards = [
  { icon: DollarSign, gradient: "from-primary/20 to-primary/5", iconColor: "text-primary", borderGlow: "hover:shadow-primary/10" },
  { icon: AlertTriangle, gradient: "from-destructive/20 to-destructive/5", iconColor: "text-destructive", borderGlow: "hover:shadow-destructive/10" },
  { icon: Cloud, gradient: "from-[hsl(var(--cyan))]/20 to-[hsl(var(--cyan))]/5", iconColor: "text-[hsl(var(--cyan))]", borderGlow: "hover:shadow-[hsl(var(--cyan))]/10" },
  { icon: ArrowUpRight, gradient: "from-success/20 to-success/5", iconColor: "text-success", borderGlow: "hover:shadow-success/10" },
];

const StatCard = ({ icon: Icon, label, value, change, changeType, index, gradient, iconColor }: any) => (
  <motion.div custom={index} initial="hidden" animate="visible" variants={cardVariants} className="stat-card group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center ring-1 ring-border/30`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      {change && (
        <span className={`flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          changeType === 'up' ? 'text-destructive bg-destructive/10' : 'text-success bg-success/10'
        }`}>
          {changeType === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
    <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const DashboardPage = () => {
  const activeAlerts = mockAlerts.filter(a => a.status === "active").length;
  const costChange = ((mockCostData.totalCost - mockCostData.previousMonthCost) / mockCostData.previousMonthCost * 100).toFixed(1);
  const totalSavings = mockRecommendations.reduce((s, r) => s + r.potentialSavings, 0);

  const COLORS = [
    "hsl(217, 91%, 60%)", "hsl(160, 84%, 39%)", "hsl(38, 92%, 50%)",
    "hsl(0, 84%, 60%)", "hsl(262, 83%, 58%)", "hsl(187, 92%, 43%)",
  ];

  const labels = ["Total Cloud Cost (MTD)", "Active Alerts", "Connected Accounts", "Potential Savings"];
  const values = [
    `$${mockCostData.totalCost.toLocaleString()}`,
    activeAlerts,
    "2",
    `$${totalSavings.toLocaleString()}/mo`,
  ];
  const changes = [`${costChange}%`, `${activeAlerts} new`, undefined, "Available"];
  const changeTypes = ["up", "up", undefined, "down"];

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">AI-Powered Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Cost Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor your cloud spending and anomalies in real-time</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <StatCard
            key={i}
            index={i}
            icon={card.icon}
            label={labels[i]}
            value={values[i]}
            change={changes[i]}
            changeType={changeTypes[i]}
            gradient={card.gradient}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Cost Trend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daily Cost Trend</h3>
              <p className="text-[10px] text-muted-foreground">Last 30 days — real-time AWS & GCP spending</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] text-muted-foreground">AWS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-[10px] text-muted-foreground">GCP</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockCostData.dailyCosts}>
              <defs>
                <linearGradient id="awsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gcpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 14%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} interval={4} angle={-30} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 7%)",
                  border: "1px solid hsl(222, 30%, 14%)",
                  borderRadius: "10px",
                  fontSize: 12,
                  boxShadow: "0 8px 32px hsl(0 0% 0% / 0.3)",
                }}
              />
              <Area type="monotone" dataKey="aws" stroke="hsl(217, 91%, 60%)" fill="url(#awsGrad)" strokeWidth={2} name="AWS" />
              <Area type="monotone" dataKey="gcp" stroke="hsl(160, 84%, 39%)" fill="url(#gcpGrad)" strokeWidth={2} name="GCP" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Breakdown */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
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
                  backgroundColor: "hsl(222, 47%, 7%)",
                  border: "1px solid hsl(222, 30%, 14%)",
                  borderRadius: "10px",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mockCostData.serviceBreakdown.slice(0, 4).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="text-foreground font-semibold">${s.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Anomaly + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-primary to-accent" />
            <h3 className="text-sm font-semibold text-foreground">Anomaly Detection Results</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border/40">
                  <th className="text-left py-2.5 font-medium">Date</th>
                  <th className="text-left py-2.5 font-medium">Service</th>
                  <th className="text-right py-2.5 font-medium">Actual</th>
                  <th className="text-right py-2.5 font-medium">Expected</th>
                  <th className="text-right py-2.5 font-medium">Score</th>
                  <th className="text-left py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAnomalies.map((a, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="py-2.5 text-foreground">{a.date}</td>
                    <td className="py-2.5 text-foreground">{a.service}</td>
                    <td className="py-2.5 text-right text-foreground font-medium">${a.actual.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-muted-foreground">${a.expected.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-mono">{a.score.toFixed(2)}</td>
                    <td className="py-2.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        a.status === "anomaly"
                          ? "bg-destructive/10 text-destructive ring-1 ring-destructive/20"
                          : "bg-success/10 text-success ring-1 ring-success/20"
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

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-success to-[hsl(var(--cyan))]" />
            <h3 className="text-sm font-semibold text-foreground">Top Optimization Suggestions</h3>
          </div>
          <div className="space-y-2.5">
            {mockRecommendations.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/20 hover:border-border/40 hover:bg-secondary/40 transition-all duration-200 group">
                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                  r.impact === "high" ? "bg-destructive shadow-sm shadow-destructive/30" : r.impact === "medium" ? "bg-warning shadow-sm shadow-warning/30" : "bg-success shadow-sm shadow-success/30"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{r.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{r.description}</p>
                </div>
                <span className="text-xs font-bold text-success whitespace-nowrap">
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
