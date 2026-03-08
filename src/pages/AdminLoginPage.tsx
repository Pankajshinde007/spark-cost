import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ADMIN_CREDENTIALS = {
  email: "admin@sparkcost.com",
  password: "admin123",
};

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const success = login(email, password);
      if (success) {
        navigate("/admin");
        return;
      }
    }
    setError("Invalid admin credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="hero-glow -top-40 -left-40 opacity-30" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(hsl(215 20% 25% / 0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to user login
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive/80 to-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-destructive/20">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Restricted — authorized personnel only</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8 border-destructive/20">
          <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-destructive/5 border border-destructive/20">
            <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
            <p className="text-[11px] text-destructive">This area is restricted to system administrators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@sparkcost.com"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30 transition-all"
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
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <Link to="/forgot-password?type=admin" className="text-xs text-muted-foreground hover:text-destructive transition-colors">
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
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-destructive/80 to-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-destructive/10"
            >
              <span className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Sign In as Admin
              </span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground text-center">
              Demo credentials: <span className="text-foreground font-mono">admin@sparkcost.com</span> / <span className="text-foreground font-mono">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
