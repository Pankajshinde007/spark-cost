import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cloud, Activity, Shield, TrendingDown, Zap, BarChart3,
  Mail, Phone, MapPin, Linkedin, Twitter, ChevronDown, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import dashboardPreview from "@/assets/dashboard-preview.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stats = [
  { value: "70%", label: "Faster anomaly detection" },
  { value: "24h", label: "Average alert time" },
  { value: "100%", label: "Cloud billing visibility" },
  { value: "2x", label: "ROI in first quarter" },
];

const features = [
  {
    icon: BarChart3,
    title: "Cloud Spend Monitoring",
    desc: "Track your AWS and Google Cloud costs in real time with a unified dashboard.",
  },
  {
    icon: Shield,
    title: "Anomaly Detection",
    desc: "AI automatically detects unusual spending spikes and alerts your team instantly.",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimization",
    desc: "Get actionable recommendations to reduce unnecessary cloud expenses.",
  },
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

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cloud className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Pankaj</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/login")}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden pb-4 space-y-2"
            >
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-2 px-3 pt-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
                <Button size="sm" onClick={() => navigate("/login")}>Get Started</Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">Cloud Cost Monitoring</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Stop overspending on cloud.{" "}
                <span className="gradient-text">Start optimizing today.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Pankaj automatically analyzes your AWS and Google Cloud billing data to detect cost spikes, anomalies, and optimization opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/login")} className="px-8">
                  <Zap className="w-4 h-4 mr-2" /> Start Monitoring
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("features")} className="px-8">
                  See How It Works
                </Button>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
                <img
                  src={dashboardPreview}
                  alt="Pankaj cloud cost monitoring dashboard showing cost charts and anomaly alerts"
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Core capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Real-time visibility into your cloud spend</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Pankaj automatically collects your AWS and Google Cloud billing data, then uses machine learning to spot cost anomalies and recommend immediate savings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card p-8 hover:glow-primary transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="pricing" className="py-20 lg:py-28 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Real Results</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">See the impact of smarter cloud spending</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Organizations using Pankaj's monitoring system detect cost anomalies faster and cut unnecessary cloud expenses through automated analysis and clear, actionable recommendations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/login")}>Start optimizing today</Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("features")}>View all features</Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass-card p-6 text-center"
                >
                  <p className="text-4xl sm:text-5xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="about" className="py-20 lg:py-28 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Powerful dashboard at your fingertips</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Pankaj automatically collects cloud billing data and highlights cost issues before they become expensive problems.
            </p>
          </motion.div>

          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
              <img
                src={dashboardPreview}
                alt="Pankaj dashboard showing cost monitoring charts, anomaly alerts, and cost breakdown"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Questions about cloud cost monitoring</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <AccordionItem value={`faq-${i}`} className="glass-card px-6 border-none rounded-xl">
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Get in touch</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Let's discuss your cloud costs</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Fill out the form below or call us directly. We'll review your cloud setup and show you where you can cut expenses.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">pankjbs8298@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">+917620755615</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">Pune, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Tell us about your cloud setup</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">Pankaj</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cloud cost monitoring and optimization platform for modern teams.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
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
                      <button
                        onClick={() => scrollTo(link.toLowerCase())}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/30 mt-10 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Pankaj. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
