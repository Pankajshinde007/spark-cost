import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Cloud,
  AlertTriangle,
  Lightbulb,
  Shield,
  LogOut,
  Activity,
  ChevronLeft,
  ChevronRight,
  Settings,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/cloud-accounts", label: "Cloud Accounts", icon: Cloud },
  { path: "/anomalies", label: "Anomalies", icon: Activity },
  { path: "/alerts", label: "Alerts", icon: AlertTriangle },
  { path: "/recommendations", label: "Optimization", icon: Lightbulb },
  { path: "/settings", label: "Settings", icon: Settings },
];

const adminItems = [
  { path: "/admin", label: "Admin Panel", icon: Shield },
];

export const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const allItems = user?.role === "admin" ? [...navItems, ...adminItems] : navItems;

  return (
    <aside
      className={cn(
        "h-screen flex flex-col transition-all duration-300 border-r border-border/30",
        collapsed ? "w-[68px]" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 4%) 100%)",
      }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/20 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden"
          >
            <h1 className="text-sm font-bold text-foreground leading-tight">SparkCost</h1>
            <p className="text-[10px] text-muted-foreground">AI Cloud Monitor</p>
          </motion.div>
        )}
      </div>

      {/* Nav label */}
      {!collapsed && (
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Navigation</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto" style={{ paddingTop: collapsed ? '12px' : '0' }}>
        {allItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(217 91% 60% / 0.12), hsl(262 83% 58% / 0.06))",
                    border: "1px solid hsl(217 91% 60% / 0.15)",
                  }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
              <item.icon className={cn(
                "w-[18px] h-[18px] flex-shrink-0 relative z-10 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && <span className="relative z-10">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/20 space-y-2">
        {!collapsed && user && (
          <div className="px-3 py-2.5 rounded-lg bg-secondary/30">
            <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 text-primary capitalize font-medium">
              {user.role}
            </span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-1.5 text-muted-foreground/50 hover:text-foreground transition-colors rounded-lg hover:bg-secondary/30"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
