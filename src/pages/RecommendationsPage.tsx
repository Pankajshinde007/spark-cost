import { DashboardLayout } from "@/components/DashboardLayout";
import { mockRecommendations } from "@/lib/mockData";
import { Lightbulb, Server, HardDrive, Clock, TrendingDown, CheckCircle, ArrowRight, Sparkles, Zap } from "lucide-react";
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
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">AI Recommendations</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Optimization Recommendations</h1>
          <p className="text-sm text-muted-foreground">AI-powered suggestions to reduce your cloud costs</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card px-5 py-3 flex items-center gap-3 gradient-border"
        >
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Total Potential Savings</p>
            <p className="text-xl font-bold text-success">${totalSavings.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
          </div>
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-1 mb-5 flex-wrap bg-secondary/30 rounded-lg p-1 border border-border/30 w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
            filter === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
              filter === c ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 hover:border-border/60 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ${
                  rec.impact === "high" ? "bg-destructive/10 ring-destructive/20" : rec.impact === "medium" ? "bg-warning/10 ring-warning/20" : "bg-success/10 ring-success/20"
                }`}>
                  <Icon className={`w-5 h-5 ${
                    rec.impact === "high" ? "text-destructive" : rec.impact === "medium" ? "text-warning" : "text-success"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ring-1 ${
                      rec.impact === "high" ? "bg-destructive/10 text-destructive ring-destructive/20"
                        : rec.impact === "medium" ? "bg-warning/10 text-warning ring-warning/20"
                        : "bg-success/10 text-success ring-success/20"
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-secondary/50 text-[10px] text-muted-foreground font-medium border border-border/20">
                        {rec.provider}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-secondary/50 text-[10px] text-muted-foreground font-medium capitalize border border-border/20">
                        {rec.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDismiss(rec.id)}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary/50"
                      >
                        Dismiss
                      </button>
                      <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2.5 py-1 rounded-md hover:bg-primary/10">
                        <Zap className="w-3 h-3" /> Optimize
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings bar */}
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center gradient-border">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium">All recommendations addressed!</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later for new optimization opportunities.</p>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default RecommendationsPage;
