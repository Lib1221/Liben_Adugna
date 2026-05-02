export type ImpactMetric = {
  label: string;
  value: string;
  note: string;
};

export const impactMetrics: ImpactMetric[] = [
  { label: "Records Processed", value: "450k+", note: "Behavioral segmentation pipeline" },
  { label: "Anomaly Samples", value: "110k+", note: "Transaction anomaly detection" },
  { label: "DSA Problems Solved", value: "400+", note: "LeetCode + Codeforces" },
  { label: "Client Systems", value: "5+", note: "Delivered web and mobile products" },
];

export const contactConversion = {
  responseTime: "Usually replies within 24 hours",
  bookingUrl: "https://calendly.com/libenadugna285/30min",
  acceptedProjects: [
    "Machine Learning and NLP systems",
    "Full-stack web and mobile products",
    "AI quality evaluation and audits",
  ],
};

export const commandPaletteItems = [
  { id: "about", label: "Go to About", section: "About" as const, keywords: ["intro", "overview", "bio"] },
  { id: "resume", label: "Go to Resume", section: "Resume" as const, keywords: ["experience", "career", "cv"] },
  { id: "portfolio", label: "Go to Portfolio", section: "Portfolio" as const, keywords: ["projects", "work", "case studies"] },
  { id: "blog", label: "Go to Blog", section: "Blog" as const, keywords: ["articles", "medium", "writing"] },
  { id: "contact", label: "Go to Contact", section: "Contact" as const, keywords: ["hire", "email", "reach out"] },
];
