import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, DollarSign, Mail, Save, RotateCcw, Sparkles, Shield } from "lucide-react";
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
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure alert thresholds and notifications</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/30 text-secondary-foreground text-sm hover:bg-secondary transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-all neon-glow">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alert Thresholds */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-primary to-accent" />
            <DollarSign className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Alert Thresholds</h3>
          </div>
          <div className="space-y-5">
            {[
              { key: "dailyCostSpike", label: "Daily Cost Spike Threshold", unit: "%", min: 10, max: 200, desc: "Alert when daily cost exceeds this % above average" },
              { key: "weeklyCostIncrease", label: "Weekly Cost Increase", unit: "%", min: 5, max: 100, desc: "Alert when weekly cost increases by this %" },
              { key: "idleResourceDays", label: "Idle Resource Detection", unit: "d", min: 1, max: 30, desc: "Flag resources idle for longer than this" },
            ].map(item => (
              <div key={item.key}>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-muted-foreground">{item.label}</label>
                  <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">{(thresholds as any)[item.key]}{item.unit}</span>
                </div>
                <input type="range" min={item.min} max={item.max} value={(thresholds as any)[item.key]}
                  onChange={e => setThresholds(p => ({ ...p, [item.key]: +e.target.value }))}
                  className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
                />
                <p className="text-[10px] text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-muted-foreground">Anomaly Score Threshold</label>
                <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">{thresholds.anomalyScore.toFixed(2)}</span>
              </div>
              <input type="range" min={50} max={99} value={thresholds.anomalyScore * 100}
                onChange={e => setThresholds(p => ({ ...p, anomalyScore: +e.target.value / 100 }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-[hsl(var(--primary))] cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Isolation Forest score above which a data point is flagged</p>
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-warning to-destructive" />
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            {([
              { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive alert notifications via email" },
              { key: "dashboardAlerts" as const, label: "Dashboard Alerts", desc: "Show alert banners in the dashboard" },
              { key: "dailyDigest" as const, label: "Daily Digest", desc: "Receive a daily cost summary email" },
              { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive a weekly optimization report" },
              { key: "highSeverityOnly" as const, label: "High Severity Only", desc: "Only notify for high severity anomalies" },
            ]).map(item => (
              <div key={item.key} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                  className={`w-10 h-5 rounded-full transition-all relative ${
                    notifications[item.key] ? "bg-primary shadow-sm shadow-primary/30" : "bg-secondary border border-border/40"
                  }`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${
                    notifications[item.key] ? "left-5 bg-primary-foreground" : "left-0.5 bg-muted-foreground"
                  }`} />
                </button>
              </div>
            ))}

            <div className="pt-3 border-t border-border/30">
              <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Notification Email
              </label>
              <input
                type="email"
                value={notifications.email}
                onChange={e => setNotifications(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
