import { Bell, Search, Sparkles, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TopNavbar = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Anomaly detected in EC2 spending", time: "2m ago", type: "alert" },
    { id: 2, text: "New optimization: save $340/mo", time: "1h ago", type: "success" },
    { id: 3, text: "GCP costs exceeded threshold", time: "3h ago", type: "warning" },
  ];

  return (
    <header className="h-14 border-b border-border/40 flex items-center justify-between px-6 backdrop-blur-md bg-background/60">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services, anomalies, costs..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-secondary/50 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
          <kbd className="absolute right-3 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* AI Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-medium text-accent">AI Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Bell className="w-4.5 h-4.5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-card border border-border/40 rounded-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-border/40">
                  <h4 className="text-xs font-semibold text-foreground">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-3 py-2.5 hover:bg-secondary/30 transition-colors border-b border-border/20 last:border-0">
                      <p className="text-xs text-foreground">{n.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border/40">
                  <button className="w-full text-[11px] text-primary hover:text-primary/80 transition-colors py-1">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-3 border-l border-border/40">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-foreground leading-tight">{user?.name || "User"}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{user?.role || "user"}</p>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
};
