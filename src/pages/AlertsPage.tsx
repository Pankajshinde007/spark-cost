import { DashboardLayout } from "@/components/DashboardLayout";
import { mockAlerts } from "@/lib/mockData";
import { AlertTriangle, CheckCircle, Clock, ChevronRight, Bell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const AlertsPage = () => {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const filtered = filter === "all" ? mockAlerts : mockAlerts.filter(a => a.status === filter);
  const activeCount = mockAlerts.filter(a => a.status === "active").length;

  const severityIcon = (s: string) => {
    if (s === "high") return <AlertTriangle className="w-4 h-4 text-destructive" />;
    if (s === "medium") return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <AlertTriangle className="w-4 h-4 text-success" />;
  };

  const severityBg = (s: string) => {
    if (s === "high") return "bg-destructive/10 ring-1 ring-destructive/20";
    if (s === "medium") return "bg-warning/10 ring-1 ring-warning/20";
    return "bg-success/10 ring-1 ring-success/20";
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Smart Alerts</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">Cost anomaly notifications powered by AI</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-destructive" />
            <span className="text-xs font-bold text-foreground">{activeCount} active</span>
          </div>
          <div className="flex gap-1 bg-secondary/30 rounded-lg p-1 border border-border/30">
            {(["all", "active", "resolved"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card p-5 hover:border-border/60 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${severityBg(alert.severity)}`}>
                {severityIcon(alert.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    alert.status === "active" ? "bg-destructive/10 text-destructive ring-1 ring-destructive/20" : "bg-success/10 text-success ring-1 ring-success/20"
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{alert.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-secondary/50 font-medium">{alert.service}</span>
                  <span>Actual: <span className="text-foreground font-medium">${alert.amount.toLocaleString()}</span></span>
                  <span>Expected: <span className="text-foreground font-medium">${alert.expected.toLocaleString()}</span></span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
