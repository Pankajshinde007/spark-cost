import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cloud, Activity, Shield, TrendingDown, Zap, BarChart3,
  Mail, Phone, MapPin, Linkedin, Twitter, Menu, X,
  ArrowRight, CheckCircle2, Sparkles, Globe, Lock, Bell,
  LineChart, AlertTriangle, DollarSign, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import dashboardPreview from "@/assets/dashboard-preview.png";
import avatarSarah from "@/assets/avatar-sarah.png";
import avatarMarcus from "@/assets/avatar-marcus.png";
import avatarPriya from "@/assets/avatar-priya.png";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
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

/* ─── data ─── */
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

/* ─── animated counter ─── */
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

/* ─── main component ─── */
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
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(270,70%,55%)] flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Cloud className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-lg font-bold text-foreground">Cloud Cost <span className="gradient-text">ADOS</span></span>
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

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
              <Button size="sm" onClick={() => navigate("/login")} className="shadow-lg shadow-primary/25">
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
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground">{item}</button>
              ))}
              <div className="flex gap-2 px-3 pt-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
                <Button size="sm" onClick={() => navigate("/login")}>Get Started</Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative overflow-hidden min-h-[95vh] flex items-center">
        <div className="hero-glow -top-40 -left-40" />
        <div className="hero-glow-purple bottom-20 right-10" />
        <div className="hero-glow bottom-0 right-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(270,70%,50%)]/5" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(hsl(215 20% 25% / 0.25) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
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
                Detect. Optimize.{" "}
                <span className="gradient-text">Save Big</span> on Cloud.
              </motion.h1>

              <motion.p custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                AI-powered anomaly detection for AWS & Google Cloud. Spot cost spikes instantly, optimize spending, and never overpay again.
              </motion.p>

              <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/login")} className="px-8 h-12 text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105">
                  <Zap className="w-4 h-4 mr-2" /> Start Free Monitoring
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("features")} className="px-8 h-12 text-base border-border/50 hover:border-primary/50 group">
                  See How It Works <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight} className="relative">
              <div className="floating">
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/15 gradient-border">
                  <img src={dashboardPreview} alt="Cloud cost monitoring dashboard showing cost charts and anomaly alerts" className="w-full" />
                </div>
              </div>
              {/* Floating metric cards */}
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
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[hsl(270,70%,60%)] opacity-10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
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

      {/* ── Trusted By ── */}
      <section className="py-16 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
            Trusted by cloud-native teams worldwide
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-10 md:gap-16"
          >
            {["Amazon Web Services", "Google Cloud", "Microsoft Azure", "Kubernetes", "Terraform"].map((name, i) => (
              <motion.div
                key={name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="trusted-logo text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-500 cursor-default"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 lg:py-32 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              Core capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Everything you need to{" "}
              <span className="gradient-text">control cloud costs</span>
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

      {/* ── How It Works ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold text-[hsl(var(--success))] uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-[hsl(var(--success))]/5 border border-[hsl(var(--success))]/20">
              Simple setup
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Up and running in <span className="gradient-text">4 easy steps</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative group"
              >
                <div className="glass-card p-7 h-full relative overflow-hidden group-hover:border-primary/30 transition-colors duration-500">
                  <span className="text-6xl font-black text-primary/[0.06] absolute top-2 right-4 select-none">{step.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-muted-foreground/20">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="pricing" className="py-24 lg:py-32 section-divider relative">
        <div className="absolute inset-0 cta-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
              <span className="inline-block text-xs font-semibold text-[hsl(var(--warning))] uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-[hsl(var(--warning))]/5 border border-[hsl(var(--warning))]/20">
                Real results
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Numbers that <span className="gradient-text-warm">speak for themselves</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Organizations using our monitoring system detect cost anomalies faster and cut unnecessary cloud expenses through automated analysis.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/login")} className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Start optimizing today <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="glass-card-hover p-7 text-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-extrabold gradient-text counter-glow">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section id="about" className="py-24 lg:py-32 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Who <span className="gradient-text">We Are</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft} className="space-y-6">
              <p className="text-muted-foreground text-base leading-relaxed">
                Our company focuses on developing innovative cloud monitoring solutions that help businesses manage and control their cloud infrastructure costs efficiently.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                The Cloud Cost Anomaly Detection & Optimization System is designed to analyze cloud usage data, detect unusual spending patterns, and provide intelligent recommendations to reduce unnecessary expenses.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                This platform enables organizations to monitor their cloud costs in real time, identify anomalies quickly, and optimize their resources for better performance and cost savings.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight} className="space-y-8">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Our mission is to help organizations gain better visibility and control over their cloud spending by providing intelligent tools for cost monitoring, anomaly detection, and optimization.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We aim to simplify cloud cost management and support businesses in making data-driven decisions.
                </p>
              </div>

              {/* Feature checklist */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Multi-cloud cost aggregation",
                  "Real-time anomaly alerts",
                  "AI-powered recommendations",
                  "Custom spending thresholds",
                  "Team collaboration tools",
                  "Exportable reports & insights",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/30 border border-border/30">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))] shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative max-w-5xl mx-auto mt-20">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 gradient-border">
              <img src={dashboardPreview} alt="Cloud Cost ADOS dashboard" className="w-full" loading="lazy" />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/8 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Loved by <span className="gradient-text">cloud teams</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card-hover p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Sparkles key={j} className="w-3.5 h-3.5 text-[hsl(var(--warning))]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] text-xs font-medium mb-4">
                    {t.saved}
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-32 section-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <AccordionItem value={`faq-${i}`} className="glass-card px-6 border-none rounded-xl">
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
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
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/login")} className="px-10 h-12 text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
                  <Zap className="w-4 h-4 mr-2" /> Get Started Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("contact")} className="px-10 h-12 text-base">
                  Talk to Sales
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
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

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(270,70%,55%)] flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">Cloud Cost <span className="gradient-text">ADOS</span></span>
              </div>
              <p className="text-sm text-muted-foreground">Cloud Cost Anomaly Detection & Optimization System for modern teams.</p>
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
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Cloud Cost ADOS. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Built with ❤️ for cloud-native teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
