import { DashboardLayout } from "@/components/DashboardLayout";
import { mockRecommendations } from "@/lib/mockData";
import { Lightbulb, Server, HardDrive, Clock } from "lucide-react";
import { motion } from "framer-motion";

const categoryIcons: Record<string, any> = {
  compute: Server,
  storage: HardDrive,
  scheduling: Clock,
};

const RecommendationsPage = () => {
  const totalSavings = mockRecommendations.reduce((s, r) => s + r.potentialSavings, 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Optimization Recommendations</h1>
        <p className="text-sm text-muted-foreground">
          Potential monthly savings: <span className="text-success font-semibold">${totalSavings.toLocaleString()}</span>
        </p>
      </div>

      <div className="space-y-3">
        {mockRecommendations.map((rec, i) => {
          const Icon = categoryIcons[rec.category] || Lightbulb;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      rec.impact === "high" ? "bg-destructive/10 text-destructive"
                        : rec.impact === "medium" ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                    }`}>
                      {rec.impact} impact
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">{rec.provider}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-success">-${rec.potentialSavings.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">per month</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default RecommendationsPage;
