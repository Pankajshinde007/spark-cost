import { DashboardLayout } from "@/components/DashboardLayout";
import { mockUsers, mockAlerts, mockCloudAccounts } from "@/lib/mockData";
import { Users, Shield, Cloud, AlertTriangle, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const usageData = [
  { month: "Oct", cost: 38200 },
  { month: "Nov", cost: 41500 },
  { month: "Dec", cost: 39800 },
  { month: "Jan", cost: 43200 },
  { month: "Feb", cost: 42150 },
  { month: "Mar", cost: 47832 },
];

const AdminPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">System overview and user management</p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: "Total Users", value: mockUsers.length },
          { icon: Cloud, label: "Cloud Accounts", value: mockCloudAccounts.length },
          { icon: AlertTriangle, label: "Active Alerts", value: mockAlerts.filter(a => a.status === "active").length },
          { icon: Activity, label: "System Status", value: "Healthy" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <s.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Users Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> User Management
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2 font-medium">Name</th>
                  <th className="text-left py-2 font-medium">Role</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-border/50">
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
                        u.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>{u.status}</span>
                    </td>
                    <td className="py-2.5 text-muted-foreground">{new Date(u.lastLogin).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Usage Report */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Cost Report</h3>
          <ResponsiveContainer width="100%" height={250}>
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
    </DashboardLayout>
  );
};

export default AdminPage;
