import { DashboardLayout } from "@/components/DashboardLayout";
import { mockRecommendations } from "@/lib/mockData";
import { Lightbulb, Server, HardDrive, Clock, TrendingDown, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categoryIcons: Record<string, any> = {
  compute: Server,
  storage: HardDrive,
  scheduling: Clock,
};

const categoryLabels: Record<string, string> = {
  compute: "Compute",
  storage: "Storage",
  scheduling: "Scheduling",
};

const RecommendationsPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const totalSavings = mockRecommendations
    .filter(r => !dismissed.has(r.id))
    .reduce((s, r) => s + r.potentialSavings, 0);

  const categories = Array.from(new Set(mockRecommendations.map(r => r.category)));
  const filtered = mockRecommendations.filter(r => {
    if (dismissed.has(r.id)) return false;
    if (filter !== "all" && r.category !== filter) return false;
    return true;
  });

  const handleDismiss = (id: string) => {
    setDismissed(prev => new Set(prev).add(id));
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Optimization Recommendations</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered suggestions to reduce your cloud costs
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card px-5 py-3 flex items-center gap-3"
        >
          <TrendingDown className="w-5 h-5 text-success" />
          <div>
            <p className="text-xs text-muted-foreground">Total Potential Savings</p>
            <p className="text-xl font-bold text-success">${totalSavings.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
          </div>
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {categoryLabels[c] || c}
          </button>
        ))}
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((rec, i) => {
          const Icon = categoryIcons[rec.category] || Lightbulb;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-5 hover:glow-primary transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  rec.impact === "high" ? "bg-destructive/10" : rec.impact === "medium" ? "bg-warning/10" : "bg-success/10"
                }`}>
                  <Icon className={`w-5 h-5 ${
                    rec.impact === "high" ? "text-destructive" : rec.impact === "medium" ? "text-warning" : "text-success"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      rec.impact === "high" ? "bg-destructive/10 text-destructive"
                        : rec.impact === "medium" ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground font-medium">
                        {rec.provider}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground font-medium capitalize">
                        {rec.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDismiss(rec.id)}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary"
                      >
                        Dismiss
                      </button>
                      <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-primary/10">
                        Apply <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings bar */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Estimated monthly savings</span>
                <span className="text-base font-bold text-success flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  -${rec.potentialSavings.toLocaleString()}/mo
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium">All recommendations addressed!</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later for new optimization opportunities.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecommendationsPage;
