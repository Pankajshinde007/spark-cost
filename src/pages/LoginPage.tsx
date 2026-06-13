import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Zap, Eye, EyeOff, Shield, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      if (!data.access_token) {
        setError("Token not received from server");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userEmail", data.user?.email || "");
      localStorage.setItem("userName", data.user?.name || "");

      setAuthenticatedUser(data.user?.name || "User", data.user?.email || email.trim());

      console.log("Saved token:", localStorage.getItem("token"));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log("Login error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Particles count={25} />

      <div className="hero-glow -top-40 -right-40 opacity-20" />
      <div className="hero-glow-purple bottom-0 left-0 opacity-15" />
      <div className="hero-glow-cyan top-1/3 left-1/4 opacity-10" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(hsl(215 20% 25% / 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg neon-glow">
            <Zap className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">SparkCost</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-Powered Cloud Cost Monitoring</p>
        </div>

        <div className="glass-card p-8 gradient-border">
          <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-[11px] text-primary/90 font-medium">
              🎉 Start your 14-day free trial — no credit card required
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-base font-semibold text-foreground">Sign in to your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
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
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm hover:opacity-90 transition-all neon-glow disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-3 mt-6 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline transition-colors">
                Sign up
              </Link>
            </p>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-muted-foreground" />
              <Link to="/admin-login" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;