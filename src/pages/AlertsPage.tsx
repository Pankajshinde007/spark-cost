import { DashboardLayout } from "@/components/DashboardLayout";
import { mockAlerts } from "@/lib/mockData";
import { AlertTriangle, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const AlertsPage = () => {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const filtered = filter === "all" ? mockAlerts : mockAlerts.filter(a => a.status === filter);

  const severityIcon = (s: string) => {
    if (s === "high") return <AlertTriangle className="w-4 h-4 text-destructive" />;
    if (s === "medium") return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <AlertTriangle className="w-4 h-4 text-success" />;
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">Cost anomaly notifications</p>
        </div>
        <div className="flex gap-2">
          {(["all", "active", "resolved"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 hover:glow-primary transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5">{severityIcon(alert.severity)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    alert.status === "active" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </span>
                  <span>Service: {alert.service}</span>
                  <span>Actual: ${alert.amount.toLocaleString()}</span>
                  <span>Expected: ${alert.expected.toLocaleString()}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
