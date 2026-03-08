import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";

const AdminLoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      setError("Please fill in all fields");
      return;
    }
    const success = adminLogin(name, password);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Particles count={30} />
      <div className="hero-glow -top-40 -left-40 opacity-20" />
      <div className="hero-glow-purple bottom-0 right-0 opacity-20" />
      <div className="hero-glow-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to user login
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-destructive/80 to-accent flex items-center justify-center mx-auto mb-4 shadow-lg neon-glow">
            <Shield className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Restricted — authorized personnel only</p>
        </div>

        <div className="glass-card p-8 gradient-border">
          <div className="flex items-center gap-2 mb-6 px-3 py-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
            <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
            <p className="text-[11px] text-destructive/90">This area is restricted to system administrators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Admin Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Enter admin name"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-1">
              <Link to="/forgot-password?type=admin" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Forgot password?
              </Link>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm hover:opacity-90 transition-all neon-glow"
            >
              <span className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Sign In as Admin
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
