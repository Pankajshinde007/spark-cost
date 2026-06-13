import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cloud, Shield, TrendingDown, Zap, BarChart3,
  Mail, Phone, MapPin, Linkedin, Twitter, Menu, X,
  ArrowRight, CheckCircle2, Sparkles, Globe, Lock, Bell,
  LineChart, AlertTriangle, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { WaveDivider } from "@/components/WaveDivider";
import dashboardPreview from "@/assets/dashboard-preview.png";
import avatarSarah from "@/assets/avatar-sarah.png";
import avatarMarcus from "@/assets/avatar-marcus.png";
import avatarPriya from "@/assets/avatar-priya.png";
import logoAws from "@/assets/logo-aws.png";
import logoAzure from "@/assets/logo-azure.png";
import logoGcp from "@/assets/logo-gcp.png";
import logoKubernetes from "@/assets/logo-kubernetes.png";
import logoTerraform from "@/assets/logo-terraform.png";

const cloudLogos: Record<string, string> = {
  "Amazon Web Services": logoAws,
  "Google Cloud": logoGcp,
  "Microsoft Azure": logoAzure,
  "Kubernetes": logoKubernetes,
  "Terraform": logoTerraform,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stats = [
  { value: 70, suffix: "%", label: "Faster anomaly detection", icon: Zap },
  { value: 24, suffix: "h", label: "Average alert time", icon: Bell },
  { value: 100, suffix: "%", label: "Cloud billing visibility", icon: Globe },
  { value: 2, suffix: "x", label: "ROI in first quarter", icon: DollarSign },
];

const features = [
  {
    icon: BarChart3,
    title: "Cloud Spend Monitoring",
    desc: "Track your AWS and Google Cloud costs in real time with a unified dashboard. See every dollar flowing through your infrastructure.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Anomaly Detection",
    desc: "AI automatically detects unusual spending spikes and alerts your team instantly. Never get a surprise bill again.",
    color: "text-[hsl(var(--warning))]",
    bgColor: "bg-[hsl(var(--warning))]/10",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimization",
    desc: "Get actionable recommendations to reduce unnecessary cloud expenses. Save up to 40% on monthly cloud bills.",
    color: "text-[hsl(var(--success))]",
    bgColor: "bg-[hsl(var(--success))]/10",
  },
];

const howItWorks = [
  { step: "01", title: "Connect Your Cloud", desc: "Link your AWS or GCP account with read-only access in under 2 minutes.", icon: Cloud },
  { step: "02", title: "AI Analyzes Costs", desc: "Our ML models learn your spending patterns and establish cost baselines.", icon: LineChart },
  { step: "03", title: "Get Alerted Instantly", desc: "Receive alerts via email or Slack when anomalies are detected.", icon: AlertTriangle },
  { step: "04", title: "Optimize & Save", desc: "Apply one-click recommendations to cut waste and reduce bills.", icon: TrendingDown },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechScale Inc.", quote: "We detected a $12K/month anomaly in our AWS account within the first week. The AI flagged an unused RDS cluster that no one noticed. This tool literally pays for itself.", avatar: avatarSarah, saved: "$48K/year saved" },
  { name: "Marcus Rivera", role: "DevOps Lead, CloudNine Systems", quote: "The real-time Slack alerts have saved us from 3 critical billing incidents. Last month it caught a misconfigured auto-scaling group before it cost us thousands.", avatar: avatarMarcus, saved: "$23K/year saved" },
  { name: "Priya Sharma", role: "VP Engineering, DataFlow AI", quote: "Best cloud cost tool we've used. Connected both AWS and GCP in under 5 minutes. The optimization recommendations alone cut our monthly bill by 30%.", avatar: avatarPriya, saved: "$67K/year saved" },
];

const faqs = [
  {
    q: "How does the platform detect abnormal cloud spending?",
    a: "Our platform uses machine learning models trained on your historical billing data to establish baseline spending patterns. When actual costs deviate significantly from expected values, the system flags them as anomalies and alerts your team.",
  },
  {
    q: "Which cloud platforms are supported?",
    a: "The cloud cost monitoring system currently supports Amazon Web Services (AWS) and Google Cloud Platform (GCP). We continuously work on adding more cloud providers.",
  },
  {
    q: "How do I connect my cloud accounts?",
    a: "Simply provide your cloud account credentials or API keys through our secure onboarding process. The platform uses read-only access to fetch billing data without modifying your infrastructure.",
  },
  {
    q: "What happens after a cost anomaly is detected?",
    a: "You receive instant alerts via email or Slack with details about the anomaly — including the service, region, expected cost, and actual cost. You can then take action directly from the dashboard.",
  },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    setHasAnimated(true);
    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  return <span>{count}{suffix}</span>;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 neon-glow"
              >
                <Zap className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-lg font-bold text-foreground">Spark<span className="gradient-text">Cost</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 relative z-10">
              <Button variant="ghost" size="sm" type="button" onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
              <Button variant="outline" size="sm" type="button" onClick={() => (window.location.href = "/admin-login")}>
                Admin Login
              </Button>
              <Button
                size="sm"
                type="button"
                className="shadow-lg shadow-primary/25"
                onClick={() => (window.location.href = "/login")}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Get Started Free
              </Button>
            </div>

            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden pb-4 space-y-2">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item}
                </button>
              ))}
              <div className="flex flex-wrap gap-2 px-3 pt-2 relative z-10">
                <Button variant="ghost" size="sm" type="button" onClick={() => (window.location.href = "/login")}>
                  Login
                </Button>
                <Button variant="outline" size="sm" type="button" onClick={() => (window.location.href = "/admin-login")}>
                  Admin Login
                </Button>
                <Button size="sm" type="button" onClick={() => (window.location.href = "/login")}>
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden min-h-[95vh] flex items-center ocean-gradient-bg">
        <div className="hero-glow -top-40 -left-40" />
        <div className="hero-glow-purple bottom-20 right-10" />
        <div className="hero-glow-cyan bottom-0 right-0 opacity-40" />
        <div className="ocean-aurora" />
        <div className="ocean-wave" />
        <div className="ocean-wave-2" />
        {[...Array(6)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="ocean-bubble"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              left: `${10 + i * 15}%`,
              bottom: "0",
              animationDuration: `${6 + i * 2}s`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(hsl(192 80% 48% / 0.12) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8 pulse-glow"
                >
                  <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                  Cloud Cost Monitoring — Live
                </motion.div>
              </motion.div>

              <motion.h1 custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] text-foreground tracking-tight">
                Detect. Optimize. <span className="gradient-text">Save Big</span> on Cloud.
              </motion.h1>

              <motion.p custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                AI-powered anomaly detection for AWS & Google Cloud. Spot cost spikes instantly, optimize spending, and never overpay again.
              </motion.p>

              <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 flex flex-wrap gap-4 relative z-10">
                <Button
                  size="lg"
                  type="button"
                  onClick={() => (window.location.href = "/login")}
                  className="px-8 h-12 text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
                >
                  <Zap className="w-4 h-4 mr-2" /> User Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  type="button"
                  onClick={() => (window.location.href = "/admin-login")}
                  className="px-8 h-12 text-base border-border/50 hover:border-primary/50"
                >
                  Admin Login
                </Button>
              </motion.div>

              <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-6">
                {[
                  { icon: Shield, text: "SOC 2 Compliant", color: "text-[hsl(var(--success))]" },
                  { icon: Cloud, text: "Multi-cloud", color: "text-primary" },
                  { icon: Lock, text: "Read-only access", color: "text-[hsl(var(--warning))]" },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
                    <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
                    {badge.text}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight} className="relative z-10">
              <div className="floating">
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/15 gradient-border">
                  <img src={dashboardPreview} alt="Cloud cost monitoring dashboard showing cost charts and anomaly alerts" className="w-full" />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-6 top-1/4 glass-card p-3 shadow-xl hidden lg:flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--success))]/20 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-[hsl(var(--success))]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Savings</p>
                  <p className="text-sm font-bold text-[hsl(var(--success))]">-$12,450</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-4 bottom-1/4 glass-card p-3 shadow-xl hidden lg:flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Anomaly</p>
                  <p className="text-sm font-bold text-destructive">+340% spike</p>
                </div>
              </motion.div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent opacity-10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <WaveDivider variant="primary" />

      <section className="py-16 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
            Trusted by cloud-native teams worldwide
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {["Amazon Web Services", "Google Cloud", "Microsoft Azure", "Kubernetes", "Terraform"].map((name, i) => (
              <motion.div
                key={name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-border/30 flex items-center justify-center group-hover:border-primary/40 transition-all duration-300 group-hover:bg-white/10">
                  <img src={cloudLogos[name]} alt={name} className="w-9 h-9 object-contain" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider variant="subtle" flip />

      <section id="features" className="py-24 lg:py-32 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              Core capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Everything you need to <span className="gradient-text">control cloud costs</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered monitoring, anomaly detection, and optimization recommendations — all in one beautiful dashboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card-hover p-8 group relative overflow-hidden"
              >
                <span className="feature-number text-foreground">{`0${i + 1}`}</span>
                <div className={`w-14 h-14 rounded-2xl ${f.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-4 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider variant="accent" />

      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative rounded-3xl overflow-hidden cta-gradient border border-border/30 p-12 sm:p-16 text-center">
            <div className="hero-glow -top-20 left-1/2 -translate-x-1/2 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Ready to cut your cloud costs?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Join hundreds of teams saving thousands every month with AI-powered cloud cost monitoring.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Button
                  size="lg"
                  type="button"
                  onClick={() => (window.location.href = "/login")}
                  className="px-10 h-12 text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
                >
                  <Zap className="w-4 h-4 mr-2" /> User Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  type="button"
                  onClick={() => (window.location.href = "/admin-login")}
                  className="px-10 h-12 text-base"
                >
                  Admin Login
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider variant="accent" />

      <section id="contact" className="py-24 lg:py-32 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
              <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">Get in touch</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Let's discuss your <span className="gradient-text">cloud costs</span></h2>
              <p className="mt-4 text-muted-foreground text-lg">Fill out the form below or call us directly. We'll review your cloud setup and show you where you can cut expenses.</p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Mail, text: "pankjbs8298@gmail.com" },
                  { icon: Phone, text: "+917620755615" },
                  { icon: MapPin, text: "Pune, Maharashtra, India" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-muted-foreground group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
              <form onSubmit={handleContactSubmit} className="glass-card p-8 space-y-5">
                {[
                  { label: "Your Name", type: "text", key: "name" as const },
                  { label: "Email Address", type: "email", key: "email" as const },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm text-muted-foreground block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={contactForm[field.key]}
                      onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Tell us about your cloud setup</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8 shadow-lg shadow-primary/20">
                  Send Message <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" flip />

      <footer className="border-t border-border/30 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">Spark<span className="gradient-text">Cost</span></span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered Cloud Cost Anomaly Detection & Optimization for modern teams.</p>
              <div className="flex gap-3 mt-4">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Dashboard"] },
              { title: "Company", links: ["About", "Contact", "Blog"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button onClick={() => scrollTo(link.toLowerCase())} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SparkCost. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Built with ❤️ for cloud-native teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;