import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Activity, ArrowLeft, Mail, CheckCircle2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Step = "email" | "sent" | "reset";

const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("type") === "admin";
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setStep("sent");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
    toast.success("Password reset successfully!", { description: "You can now sign in with your new password." });
    setStep("email");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const backTo = isAdmin ? "/admin-login" : "/login";
  const backLabel = isAdmin ? "Back to admin login" : "Back to login";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {isAdmin && <div className="hero-glow -top-40 -left-40 opacity-30" />}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(hsl(215 20% 25% / 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to={backTo} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
        </Link>

        <div className="text-center mb-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
            isAdmin ? "bg-gradient-to-br from-destructive/80 to-primary shadow-destructive/20" : "bg-primary glow-primary"
          }`}>
            <KeyRound className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isAdmin ? "Admin account recovery" : "We'll help you get back in"}
          </p>
        </div>

        <div className={`glass-card p-8 ${isAdmin ? "border-destructive/20" : ""}`}>
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendReset}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder={isAdmin ? "admin@sparkcost.com" : "you@company.com"}
                    className={`w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                      isAdmin ? "focus:ring-destructive/30" : "focus:ring-primary/50"
                    }`}
                  />
                </div>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">{error}</motion.p>}
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity text-primary-foreground ${
                    isAdmin ? "bg-gradient-to-r from-destructive/80 to-primary shadow-lg shadow-destructive/10" : "bg-primary"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> Send Reset Link
                  </span>
                </button>
              </motion.form>
            )}

            {step === "sent" && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--success))]/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[hsl(var(--success))]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Check your email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">Didn't receive it? Check your spam folder or try again.</p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("email")}
                    className="flex-1 py-2.5 rounded-lg bg-secondary text-foreground font-medium text-sm hover:bg-muted transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setStep("reset")}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity text-primary-foreground ${
                      isAdmin ? "bg-gradient-to-r from-destructive/80 to-primary" : "bg-primary"
                    }`}
                  >
                    Enter Code
                  </button>
                </div>
              </motion.div>
            )}

            {step === "reset" && (
              <motion.form
                key="reset"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleResetPassword}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-2">Create a new password for your account.</p>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                    placeholder="Min. 6 characters"
                    className={`w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                      isAdmin ? "focus:ring-destructive/30" : "focus:ring-primary/50"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    placeholder="Re-enter password"
                    className={`w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                      isAdmin ? "focus:ring-destructive/30" : "focus:ring-primary/50"
                    }`}
                  />
                </div>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">{error}</motion.p>}
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity text-primary-foreground ${
                    isAdmin ? "bg-gradient-to-r from-destructive/80 to-primary shadow-lg shadow-destructive/10" : "bg-primary"
                  }`}
                >
                  Reset Password
                </button>
                <button type="button" onClick={() => setStep("sent")} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                  ← Back
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
