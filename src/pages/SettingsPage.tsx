import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, DollarSign, Mail, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [thresholds, setThresholds] = useState({
    dailyCostSpike: 50,
    weeklyCostIncrease: 20,
    anomalyScore: 0.8,
    idleResourceDays: 7,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dashboardAlerts: true,
    dailyDigest: false,
    weeklyReport: true,
    highSeverityOnly: false,
    email: "admin@company.com",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    setThresholds({ dailyCostSpike: 50, weeklyCostIncrease: 20, anomalyScore: 0.8, idleResourceDays: 7 });
    setNotifications({ emailAlerts: true, dashboardAlerts: true, dailyDigest: false, weeklyReport: true, highSeverityOnly: false, email: "admin@company.com" });
    toast.info("Settings reset to defaults");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure alert thresholds and notifications</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-muted transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alert Thresholds */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" /> Alert Thresholds
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-muted-foreground">Daily Cost Spike Threshold</label>
                <span className="text-xs font-semibold text-foreground">{thresholds.dailyCostSpike}%</span>
              </div>
              <input type="range" min={10} max={200} value={thresholds.dailyCostSpike}
                onChange={e => setThresholds(p => ({ ...p, dailyCostSpike: +e.target.value }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Alert when daily cost exceeds this % above average</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-muted-foreground">Weekly Cost Increase</label>
                <span className="text-xs font-semibold text-foreground">{thresholds.weeklyCostIncrease}%</span>
              </div>
              <input type="range" min={5} max={100} value={thresholds.weeklyCostIncrease}
                onChange={e => setThresholds(p => ({ ...p, weeklyCostIncrease: +e.target.value }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Alert when weekly cost increases by this %</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-muted-foreground">Anomaly Score Threshold</label>
                <span className="text-xs font-semibold text-foreground">{thresholds.anomalyScore.toFixed(2)}</span>
              </div>
              <input type="range" min={50} max={99} value={thresholds.anomalyScore * 100}
                onChange={e => setThresholds(p => ({ ...p, anomalyScore: +e.target.value / 100 }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Isolation Forest score above which a data point is flagged</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-muted-foreground">Idle Resource Detection (days)</label>
                <span className="text-xs font-semibold text-foreground">{thresholds.idleResourceDays}d</span>
              </div>
              <input type="range" min={1} max={30} value={thresholds.idleResourceDays}
                onChange={e => setThresholds(p => ({ ...p, idleResourceDays: +e.target.value }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Flag resources idle for longer than this</p>
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" /> Notification Preferences
          </h3>
          <div className="space-y-4">
            {([
              { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive alert notifications via email" },
              { key: "dashboardAlerts" as const, label: "Dashboard Alerts", desc: "Show alert banners in the dashboard" },
              { key: "dailyDigest" as const, label: "Daily Digest", desc: "Receive a daily cost summary email" },
              { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive a weekly optimization report" },
              { key: "highSeverityOnly" as const, label: "High Severity Only", desc: "Only notify for high severity anomalies" },
            ]).map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    notifications[item.key] ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${
                    notifications[item.key] ? "left-5" : "left-0.5"
                  }`} />
                </button>
              </div>
            ))}

            <div className="pt-3 border-t border-border">
              <label className="text-xs text-muted-foreground block mb-1.5 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Notification Email
              </label>
              <input
                type="email"
                value={notifications.email}
                onChange={e => setNotifications(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
