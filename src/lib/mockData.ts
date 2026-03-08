import { format, subDays } from "date-fns";

// Generate 30 days of realistic cost data with real dates
const generateDailyCosts = () => {
  const today = new Date();
  const baseCosts = { aws: 1300, gcp: 890 };
  const data = [];

  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    const dayOfWeek = date.getDay();
    // Lower costs on weekends
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    // Random daily variation ±15%
    const awsVariation = 1 + (Math.sin(i * 0.8) * 0.12 + (Math.random() - 0.5) * 0.1);
    const gcpVariation = 1 + (Math.sin(i * 0.6 + 1) * 0.1 + (Math.random() - 0.5) * 0.08);

    let aws = Math.round(baseCosts.aws * weekendFactor * awsVariation);
    let gcp = Math.round(baseCosts.gcp * weekendFactor * gcpVariation);

    // Inject anomaly spikes on specific days
    if (i === 23) aws = 3850; // spike ~week 1
    if (i === 9) { aws = 4200; gcp = 3100; } // spike ~week 3

    data.push({
      date: format(date, "MMM d"),
      fullDate: format(date, "yyyy-MM-dd"),
      aws,
      gcp,
      total: aws + gcp,
    });
  }
  return data;
};

const dailyCosts = generateDailyCosts();

export const mockCostData = {
  totalCost: dailyCosts.reduce((sum, d) => sum + d.total, 0),
  previousMonthCost: 42150.30,
  dailyCosts,
  serviceBreakdown: [
    { name: "EC2 / Compute", cost: 18500, percentage: 38.7 },
    { name: "S3 / Storage", cost: 8200, percentage: 17.1 },
    { name: "Lambda / Functions", cost: 5600, percentage: 11.7 },
    { name: "RDS / Database", cost: 7800, percentage: 16.3 },
    { name: "CloudFront / CDN", cost: 3200, percentage: 6.7 },
    { name: "Other", cost: 4532, percentage: 9.5 },
  ],
};

export const mockAlerts = [
  {
    id: "1",
    severity: "high" as const,
    title: "Unusual EC2 spending spike detected",
    description: "EC2 costs increased by 205% on Mar 6, deviating significantly from the 7-day average.",
    service: "AWS EC2",
    amount: 3850,
    expected: 1260,
    timestamp: "2026-03-06T14:23:00Z",
    status: "active" as const,
  },
  {
    id: "2",
    severity: "high" as const,
    title: "Multi-service cost anomaly",
    description: "Both AWS and GCP costs spiked simultaneously on Mar 14, indicating potential misconfiguration.",
    service: "Multiple",
    amount: 7300,
    expected: 2200,
    timestamp: "2026-03-14T09:15:00Z",
    status: "active" as const,
  },
  {
    id: "3",
    severity: "medium" as const,
    title: "S3 storage costs trending upward",
    description: "S3 storage costs have increased 15% week-over-week for the past 3 weeks.",
    service: "AWS S3",
    amount: 8200,
    expected: 7100,
    timestamp: "2026-03-12T11:00:00Z",
    status: "active" as const,
  },
  {
    id: "4",
    severity: "low" as const,
    title: "Lambda invocation cost increase",
    description: "Lambda costs are 8% above the monthly forecast.",
    service: "AWS Lambda",
    amount: 5600,
    expected: 5180,
    timestamp: "2026-03-10T16:45:00Z",
    status: "resolved" as const,
  },
];

export const mockRecommendations = [
  {
    id: "1",
    category: "compute",
    title: "Stop 4 idle EC2 instances",
    description: "Instances i-0a1b2c, i-3d4e5f, i-6g7h8i, i-9j0k1l have been idle (< 5% CPU) for 7+ days.",
    potentialSavings: 1240,
    impact: "high" as const,
    provider: "AWS",
  },
  {
    id: "2",
    category: "storage",
    title: "Delete 2.3TB of unused S3 objects",
    description: "Objects in buckets 'backup-archive' and 'temp-uploads' haven't been accessed in 90+ days.",
    potentialSavings: 680,
    impact: "medium" as const,
    provider: "AWS",
  },
  {
    id: "3",
    category: "compute",
    title: "Right-size 6 over-provisioned VMs",
    description: "6 Compute Engine instances are running at < 20% CPU utilization. Consider downsizing.",
    potentialSavings: 890,
    impact: "high" as const,
    provider: "GCP",
  },
  {
    id: "4",
    category: "scheduling",
    title: "Schedule dev environment shutdown",
    description: "Development instances run 24/7 but are only accessed during business hours (9AM-6PM).",
    potentialSavings: 1560,
    impact: "high" as const,
    provider: "AWS",
  },
  {
    id: "5",
    category: "storage",
    title: "Enable lifecycle policies on GCS buckets",
    description: "3 Cloud Storage buckets lack lifecycle policies. Moving old objects to Nearline could save costs.",
    potentialSavings: 340,
    impact: "low" as const,
    provider: "GCP",
  },
];

export const mockCloudAccounts = [
  {
    id: "1",
    provider: "AWS" as const,
    name: "Production Account",
    accountId: "123456789012",
    status: "connected" as const,
    lastSync: "2026-03-07T08:00:00Z",
    monthlyCost: 32500,
  },
  {
    id: "2",
    provider: "GCP" as const,
    name: "GCP Project Alpha",
    accountId: "project-alpha-382910",
    status: "connected" as const,
    lastSync: "2026-03-07T07:45:00Z",
    monthlyCost: 15332,
  },
];

export const mockAnomalies = [
  { date: "Mar 6", service: "EC2", actual: 3850, expected: 1260, score: 0.92, status: "anomaly" as const },
  { date: "Mar 14", service: "Multi", actual: 7300, expected: 2200, score: 0.97, status: "anomaly" as const },
  { date: "Mar 3", service: "S3", actual: 870, expected: 750, score: 0.45, status: "normal" as const },
  { date: "Mar 9", service: "Lambda", actual: 1310, expected: 1200, score: 0.38, status: "normal" as const },
  { date: "Mar 11", service: "RDS", actual: 1190, expected: 1180, score: 0.12, status: "normal" as const },
];

export const mockUsers = [
  { id: "1", name: "Pankaj Shinde", email: "pankaj@company.com", role: "admin" as const, lastLogin: "2026-03-07T08:00:00Z", status: "active" as const },
  { id: "2", name: "Sarah Ops", email: "sarah@company.com", role: "user" as const, lastLogin: "2026-03-06T14:30:00Z", status: "active" as const },
  { id: "3", name: "Mike Dev", email: "mike@company.com", role: "user" as const, lastLogin: "2026-03-05T09:15:00Z", status: "active" as const },
  { id: "4", name: "Lisa Finance", email: "lisa@company.com", role: "user" as const, lastLogin: "2026-02-28T11:00:00Z", status: "inactive" as const },
];
