import { DashboardLayout } from "@/components/DashboardLayout";
import { mockCloudAccounts } from "@/lib/mockData";
import { Plus, CheckCircle, RefreshCw, Sparkles, Link2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import logoAws from "@/assets/logo-aws.png";
import logoGcp from "@/assets/logo-gcp.png";
import logoAzure from "@/assets/logo-azure.png";

const CloudAccountsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [provider, setProvider] = useState<"AWS" | "GCP">("AWS");

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Cloud Integration</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Cloud Accounts</h1>
          <p className="text-sm text-muted-foreground">Manage your connected cloud providers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-all neon-glow"
        >
          <Plus className="w-4 h-4" /> Connect Account
        </button>
      </div>

      {/* Connect Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6 gradient-border">
          <div className="flex items-center gap-2 mb-5">
            <Link2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Connect New Cloud Account</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Cloud Provider</label>
              <div className="flex gap-2">
                {(["AWS", "GCP"] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setProvider(p)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      provider === p ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "bg-secondary/50 text-secondary-foreground border border-border/30 hover:border-border/60"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Account Name</label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Production" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                {provider === "AWS" ? "Access Key ID" : "Service Account Key (JSON)"}
              </label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                {provider === "AWS" ? "Secret Access Key" : "Project ID"}
              </label>
              <input className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
              <Shield className="w-3.5 h-3.5" /> Validate & Connect
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/30 text-secondary-foreground text-sm hover:bg-secondary transition-colors">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 hover:border-border/60 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  account.provider === "AWS" ? "bg-primary/10 ring-1 ring-primary/20" : "bg-[hsl(var(--cyan))]/10 ring-1 ring-[hsl(var(--cyan))]/20"
                }`}>
                  <img 
                    src={account.provider === "AWS" ? logoAws : logoGcp} 
                    alt={account.provider} 
                    className="w-7 h-7 object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{account.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-mono">{account.accountId}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-success font-semibold px-2 py-0.5 rounded-full bg-success/10 ring-1 ring-success/20">
                <CheckCircle className="w-3 h-3" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-secondary/30">
              <div>
                <span className="text-muted-foreground">Provider: </span>
                <span className="text-foreground font-semibold">{account.provider}</span>
              </div>
              <div>
                <span className="text-muted-foreground">MTD Cost: </span>
                <span className="text-foreground font-bold">${account.monthlyCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[10px] text-muted-foreground">
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
