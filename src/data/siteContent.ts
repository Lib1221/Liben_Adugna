export type ImpactMetric = {
  label: string;
  value: string;
  note: string;
};

/** One identity, stated once. Everything else on the site is evidence for this line. */
export const headline = {
  title: "I build ML-backed products and write the benchmarks that test AI coding agents.",
  summary:
    "Five years with Python and Django, plus Flutter for mobile. On the evaluation side I author and review " +
    "software-engineering tasks, rubrics and test harnesses used to measure frontier AI models and coding agents.",
};

export const availability = {
  location: "Adama, Ethiopia (UTC+3, full overlap with European working hours)",
  note: "Open to remote roles and to relocating within the EU.",
};

export const impactMetrics: ImpactMetric[] = [
  { label: "Records Processed", value: "450k+", note: "Behavioral segmentation pipeline" },
  { label: "Anomaly Samples", value: "110k+", note: "Transaction anomaly detection" },
  { label: "DSA Problems Solved", value: "400+", note: "LeetCode + Codeforces via A2SV" },
  { label: "Client Systems", value: "5+", note: "Delivered web and mobile products" },
];

export const contactConversion = {
  responseTime: "Usually replies within 24 hours",
  bookingUrl: "https://calendly.com/libenadugna285/30min",
  acceptedProjects: [
    "Machine learning and NLP systems",
    "Full-stack web and mobile products",
    "AI evaluation, benchmark and rubric design",
  ],
};

export const sections = ["About", "Resume", "Portfolio", "Blog", "Contact"] as const;
export type Section = (typeof sections)[number];

export const commandPaletteItems = [
  { id: "about", label: "Go to About", section: "About" as const, keywords: ["intro", "overview", "bio"] },
  { id: "resume", label: "Go to Resume", section: "Resume" as const, keywords: ["experience", "career", "cv"] },
  { id: "portfolio", label: "Go to Portfolio", section: "Portfolio" as const, keywords: ["projects", "work", "case studies"] },
  { id: "blog", label: "Go to Blog", section: "Blog" as const, keywords: ["articles", "medium", "writing"] },
  { id: "contact", label: "Go to Contact", section: "Contact" as const, keywords: ["hire", "email", "reach out"] },
];
