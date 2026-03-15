import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, UserPlus, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/Particles";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const success = signup(name, email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Could not create account. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Particles count={25} />
      <div className="hero-glow -top-40 -right-40 opacity-20" />
      <div className="hero-glow-purple bottom-0 left-0 opacity-15" />
      <div className="hero-glow-cyan top-1/3 left-1/4 opacity-10" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(hsl(215 20% 25% / 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg neon-glow">
            <Zap className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">SparkCost</h1>
          <p className="text-sm text-muted-foreground mt-1">Create your account</p>
        </div>

        <div className="glass-card p-8 gradient-border">
          {/* Free trial badge */}
          <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg bg-[hsl(var(--success))]/5 border border-[hsl(var(--success))]/20">
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))] flex-shrink-0" />
            <p className="text-[11px] text-[hsl(var(--success))] font-medium">🎉 14-day free trial included — no credit card needed</p>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-base font-semibold text-foreground">Sign up for free</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
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

            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
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
                <UserPlus className="w-4 h-4" /> Create Account
              </span>
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
