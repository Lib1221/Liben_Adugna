/**
 * Stack, in one place. `skills` is the flat list (also consumed by scripts/prerender.mjs
 * for llms.txt and the static /resume body); `stackDomains` is what the UI renders, because
 * a wall of logos says nothing that the sentence next to it does not say better.
 */

export type SkillCategory = "programming" | "ml" | "mlops" | "datascience" | "tools";

export type SkillEntry = {
  label: string;
  /** Retained for the prerendered pages and any consumer that wants brand colour. The UI
   *  deliberately does not use it: one accent, everything else neutral. */
  color: string;
  category: SkillCategory;
};

export type StackDomain = {
  id: SkillCategory;
  /** What this domain is called on the site. */
  title: string;
  /** What I actually do with it. One sentence, concrete, no adjectives. */
  practice: string;
  /** The single strongest piece of evidence that the sentence above is true. */
  evidence: string;
  /** Tools, ordered by how much I reach for them. */
  tools: string[];
};

export const skills: SkillEntry[] = [
  // Programming & software engineering
  { label: "Python", color: "#3776AB", category: "programming" },
  { label: "TypeScript", color: "#3178C6", category: "programming" },
  { label: "Dart", color: "#0175C2", category: "programming" },
  { label: "Java", color: "#ED8B00", category: "programming" },
  { label: "React", color: "#61DAFB", category: "programming" },
  { label: "Node.js", color: "#68A063", category: "programming" },
  { label: "Flutter", color: "#02569B", category: "programming" },
  { label: "Data Structures & Algorithms", color: "#9333EA", category: "programming" },

  // Machine learning & AI
  { label: "Scikit-learn", color: "#F7931E", category: "ml" },
  { label: "TensorFlow", color: "#FF6F00", category: "ml" },
  { label: "Ensemble Models", color: "#10B981", category: "ml" },
  { label: "Anomaly Detection", color: "#EF4444", category: "ml" },
  { label: "NLP", color: "#8B5CF6", category: "ml" },
  { label: "Feature Engineering", color: "#F59E0B", category: "ml" },
  { label: "Model Evaluation", color: "#06B6D4", category: "ml" },
  { label: "Benchmark Design (Terminal-Bench, SWE-bench)", color: "#F5B800", category: "ml" },

  // Delivery & MLOps
  { label: "Docker", color: "#2496ED", category: "mlops" },
  { label: "Django REST Framework", color: "#092E20", category: "mlops" },
  { label: "ML Pipelines", color: "#22C55E", category: "mlops" },
  { label: "CI and Workflow Automation", color: "#A855F7", category: "mlops" },
  { label: "Databricks", color: "#FF3621", category: "mlops" },

  // Data science & analytics
  { label: "Pandas", color: "#150458", category: "datascience" },
  { label: "NumPy", color: "#013243", category: "datascience" },
  { label: "Jupyter", color: "#F37626", category: "datascience" },
  { label: "Data Visualization", color: "#EC4899", category: "datascience" },
  { label: "Statistical Analysis", color: "#14B8A6", category: "datascience" },

  // Tools & platforms
  { label: "Git", color: "#F05032", category: "tools" },
  { label: "PostgreSQL", color: "#336791", category: "tools" },
  { label: "MongoDB", color: "#47A248", category: "tools" },
  { label: "Linux", color: "#FCC624", category: "tools" },
  { label: "Firebase", color: "#FFCA28", category: "tools" },
  { label: "Postman", color: "#FF6C37", category: "tools" },
];

export const stackDomains: StackDomain[] = [
  {
    id: "ml",
    title: "Machine learning",
    practice:
      "Classical ML on tabular and text data: feature engineering, clustering, ensembles, and anomaly detection. I pick the simplest model that clears the bar and spend the time on the features and the evaluation instead.",
    evidence: "Behavioural segmentation over 450k+ records; transaction anomaly detection over 110k+ samples.",
    tools: ["Scikit-learn", "TensorFlow", "Feature Engineering", "Anomaly Detection", "NLP", "Ensemble Models"],
  },
  {
    id: "mlops",
    title: "Evaluation and benchmarks",
    practice:
      "I author the tasks that measure AI coding agents: a Docker environment, a hidden test suite, a golden solution, then stress-testing against frontier models until the task neither leaks its answer nor rewards guessing.",
    evidence: "Terminal-Bench 2.0/3.0 and SWE-bench style tasks for Revelo, AfterQuery and Turing.",
    tools: ["Docker", "Model Evaluation", "Benchmark Design (Terminal-Bench, SWE-bench)", "ML Pipelines", "Databricks", "CI and Workflow Automation"],
  },
  {
    id: "programming",
    title: "Product engineering",
    practice:
      "Django or Node behind React and Flutter clients. Offline-first where the network cannot be trusted, and API contracts that survive a mobile release cycle.",
    evidence: "5+ client systems delivered; Django REST APIs serving 5,000+ requests a month.",
    tools: ["Python", "TypeScript", "Dart", "Django REST Framework", "React", "Flutter", "Node.js", "Java"],
  },
  {
    id: "datascience",
    title: "Data work",
    practice:
      "Getting from a messy export to something a model or a stakeholder can use: cleaning, joins, distributions, and the plot that shows whether the idea is worth building.",
    evidence: "Data schemas designed for the training and evaluation of 4 AI systems.",
    tools: ["Pandas", "NumPy", "Jupyter", "Statistical Analysis", "Data Visualization"],
  },
  {
    id: "tools",
    title: "Foundations",
    practice:
      "Storage, version control and the Linux box everything runs on. 400+ algorithm problems through A2SV, which is why data-structure choices are not the part of a build I have to think hard about.",
    evidence: "400+ problems on LeetCode and Codeforces across DP, graphs and optimisation.",
    tools: ["PostgreSQL", "MongoDB", "Git", "Linux", "Data Structures & Algorithms", "Firebase", "Postman"],
  },
];

/** What I reach for on an ordinary working day. */
export const dailyStack = ["Python", "Django REST Framework", "Docker", "Flutter", "TypeScript", "React", "PostgreSQL"];
