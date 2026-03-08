import { DashboardLayout } from "@/components/DashboardLayout";
import { mockUsers, mockAlerts, mockCloudAccounts, mockAnomalies } from "@/lib/mockData";
import { Users, Shield, Cloud, AlertTriangle, Activity, Bell, BellOff, Gauge, RefreshCw, ChevronDown, UserX, UserCheck, ShieldCheck, ShieldOff, Clock, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const usageData = [
  { month: "Oct", cost: 38200 },
  { month: "Nov", cost: 41500 },
  { month: "Dec", cost: 39800 },
  { month: "Jan", cost: 43200 },
  { month: "Feb", cost: 42150 },
  { month: "Mar", cost: 47832 },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  lastLogin: string;
  status: "active" | "inactive";
}

interface ActivityLogEntry {
  id: string;
  action: "role_change" | "status_change" | "settings_change" | "analysis";
  description: string;
  user: string;
  timestamp: Date;
}

const initialLogs: ActivityLogEntry[] = [
  { id: "seed-1", action: "role_change", description: "Promoted Sarah Ops to admin", user: "John Admin", timestamp: new Date(Date.now() - 86400000 * 2) },
  { id: "seed-2", action: "status_change", description: "Disabled account for Lisa Finance", user: "John Admin", timestamp: new Date(Date.now() - 86400000 * 3) },
  { id: "seed-3", action: "settings_change", description: "Updated anomaly threshold to 25%", user: "John Admin", timestamp: new Date(Date.now() - 86400000 * 5) },
  { id: "seed-4", action: "analysis", description: "Triggered manual cost analysis", user: "John Admin", timestamp: new Date(Date.now() - 86400000 * 6) },
  { id: "seed-5", action: "status_change", description: "Enabled account for Mike Dev", user: "John Admin", timestamp: new Date(Date.now() - 86400000 * 7) },
];

const AdminPage = () => {
  const [threshold, setThreshold] = useState(30);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [users, setUsers] = useState<UserData[]>(mockUsers.map(u => ({ ...u })));
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(initialLogs);

  const addLog = (action: ActivityLogEntry["action"], description: string) => {
    setActivityLog(prev => [{
      id: crypto.randomUUID(),
      action,
      description,
      user: "John Admin",
      timestamp: new Date(),
    }, ...prev]);
  };

  const handleRunAnalysis = () => {
    toast.success("Cost analysis triggered", { description: "Analysis will complete in ~2 minutes" });
    addLog("analysis", "Triggered manual cost analysis");
  };

  const handleSaveSettings = () => {
    toast.success("Admin settings saved", { description: `Threshold: ${threshold}%, Alerts: ${alertsEnabled ? "On" : "Off"}` });
    addLog("settings_change", `Updated settings — Threshold: ${threshold}%, Alerts: ${alertsEnabled ? "On" : "Off"}`);
  };

  const handleToggleRole = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newRole = u.role === "admin" ? "user" as const : "admin" as const;
        toast.success(`Role updated`, { description: `${u.name} is now ${newRole}` });
        addLog("role_change", `${u.role === "admin" ? "Demoted" : "Promoted"} ${u.name} to ${newRole}`);
        return { ...u, role: newRole };
      }
      return u;
    }));
    setActionMenuOpen(null);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "active" ? "inactive" as const : "active" as const;
        toast.success(`Account ${newStatus === "active" ? "enabled" : "disabled"}`, { description: u.name });
        addLog("status_change", `${newStatus === "active" ? "Enabled" : "Disabled"} account for ${u.name}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
    setActionMenuOpen(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">System overview, user management, and detection settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: "Total Users", value: mockUsers.length, color: "text-primary" },
          { icon: Cloud, label: "Cloud Accounts", value: mockCloudAccounts.length, color: "text-primary" },
          { icon: AlertTriangle, label: "Active Alerts", value: mockAlerts.filter(a => a.status === "active").length, color: "text-destructive" },
          { icon: Activity, label: "Anomalies Detected", value: mockAnomalies.filter(a => a.status === "anomaly").length, color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* User Management */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> User Management
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2 font-medium">User</th>
                  <th className="text-left py-2 font-medium">Role</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Last Login</th>
                  <th className="text-right py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-border/50 group">
                    <td className="py-2.5">
                      <p className="text-foreground font-medium">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        u.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                      }`}>{u.role}</span>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        u.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                      }`}>{u.status}</span>
                    </td>
                    <td className="py-2.5 text-muted-foreground">{new Date(u.lastLogin).toLocaleDateString()}</td>
                    <td className="py-2.5 text-right relative">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === u.id ? null : u.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        Manage <ChevronDown className="w-3 h-3" />
                      </button>
                      <AnimatePresence>
                        {actionMenuOpen === u.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-1 z-20 w-48 glass-card shadow-xl p-1.5 space-y-0.5"
                          >
                            <button
                              onClick={() => handleToggleRole(u.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-foreground hover:bg-secondary transition-colors text-left"
                            >
                              {u.role === "admin" ? (
                                <><ShieldOff className="w-3.5 h-3.5 text-muted-foreground" /> Demote to User</>
                              ) : (
                                <><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Promote to Admin</>
                              )}
                            </button>
                            <button
                              onClick={() => handleToggleStatus(u.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs hover:bg-secondary transition-colors text-left"
                            >
                              {u.status === "active" ? (
                                <><UserX className="w-3.5 h-3.5 text-destructive" /> <span className="text-destructive">Disable Account</span></>
                              ) : (
                                <><UserCheck className="w-3.5 h-3.5 text-[hsl(var(--success))]" /> <span className="text-[hsl(var(--success))]">Enable Account</span></>
                              )}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cost Report */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Cost Report</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
              />
              <Bar dataKey="cost" fill="hsl(213, 94%, 56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detection Settings & Alert Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Anomaly Threshold */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-warning" /> Anomaly Detection Settings
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-muted-foreground">Cost spike threshold</label>
                <span className="text-sm font-bold text-foreground">{threshold}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>Sensitive (5%)</span>
                <span>Lenient (100%)</span>
              </div>
            </div>

            <button
              onClick={handleRunAnalysis}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Run Cost Analysis Now
            </button>
          </div>
        </motion.div>

        {/* Alert Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            {alertsEnabled ? <Bell className="w-4 h-4 text-success" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
            Alert Configuration
          </h3>

          <div className="space-y-4">
            {[
              { label: "Enable Alerts", description: "Receive notifications for anomalies", value: alertsEnabled, onChange: setAlertsEnabled },
              { label: "Email Notifications", description: "Send alerts via email", value: emailAlerts, onChange: setEmailAlerts },
              { label: "Slack Notifications", description: "Post alerts to Slack channel", value: slackAlerts, onChange: setSlackAlerts },
            ].map((toggle, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-xs font-medium text-foreground">{toggle.label}</p>
                  <p className="text-[10px] text-muted-foreground">{toggle.description}</p>
                </div>
                <button
                  onClick={() => toggle.onChange(!toggle.value)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    toggle.value ? "bg-success" : "bg-muted"
                  }`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    toggle.value ? "left-5.5 translate-x-0" : "left-0.5"
                  }`} style={{ left: toggle.value ? "22px" : "2px" }} />
                </button>
              </div>
            ))}

            <button
              onClick={handleSaveSettings}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-muted transition-colors"
            >
              Save Settings
            </button>
          </div>
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="glass-card p-5 mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-primary" /> Activity Log
        </h3>
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {activityLog.map((entry) => {
              const iconMap = {
                role_change: <ShieldCheck className="w-3.5 h-3.5 text-primary" />,
                status_change: <UserCheck className="w-3.5 h-3.5 text-[hsl(var(--warning))]" />,
                settings_change: <Gauge className="w-3.5 h-3.5 text-[hsl(var(--success))]" />,
                analysis: <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />,
              };
              const colorMap = {
                role_change: "border-l-primary",
                status_change: "border-l-[hsl(var(--warning))]",
                settings_change: "border-l-[hsl(var(--success))]",
                analysis: "border-l-muted-foreground",
              };
              const timeAgo = (date: Date) => {
                const diff = Date.now() - date.getTime();
                const mins = Math.floor(diff / 60000);
                if (mins < 1) return "Just now";
                if (mins < 60) return `${mins}m ago`;
                const hrs = Math.floor(mins / 60);
                if (hrs < 24) return `${hrs}h ago`;
                const days = Math.floor(hrs / 24);
                return `${days}d ago`;
              };

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary/30 border-l-2 ${colorMap[entry.action]}`}
                >
                  <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    {iconMap[entry.action]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground">{entry.description}</p>
                    <p className="text-[10px] text-muted-foreground">by {entry.user}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {timeAgo(entry.timestamp)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminPage;
