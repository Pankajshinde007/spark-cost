import { DashboardLayout } from "@/components/DashboardLayout";
import { mockCloudAccounts } from "@/lib/mockData";
import { Cloud, Plus, CheckCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CloudAccountsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [provider, setProvider] = useState<"AWS" | "GCP">("AWS");

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cloud Accounts</h1>
          <p className="text-sm text-muted-foreground">Manage your connected cloud providers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Connect Account
        </button>
      </div>

      {/* Connect Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-6 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Connect New Cloud Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Cloud Provider</label>
              <div className="flex gap-2">
                {(["AWS", "GCP"] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setProvider(p)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      provider === p ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Account Name</label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Production" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                {provider === "AWS" ? "Access Key ID" : "Service Account Key (JSON)"}
              </label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                {provider === "AWS" ? "Secret Access Key" : "Project ID"}
              </label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              Validate & Connect
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-muted">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCloudAccounts.map((account, i) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{account.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{account.accountId}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-success font-medium">
                <CheckCircle className="w-3 h-3" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-muted-foreground">Provider: </span>
                <span className="text-foreground font-medium">{account.provider}</span>
              </div>
              <div>
                <span className="text-muted-foreground">MTD Cost: </span>
                <span className="text-foreground font-medium">${account.monthlyCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
              <RefreshCw className="w-3 h-3" />
              Last sync: {new Date(account.lastSync).toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CloudAccountsPage;
