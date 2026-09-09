/**
 * Resume data. Rendered by ResumeSection, the chatbot context, the prerendered /resume page,
 * resume.json and llms.txt. Change facts here, nowhere else.
 */
export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  /** Omitted for on-site roles; "Remote" is an arrangement, not a whereabouts. */
  location?: string;
  points: string[];
};

export type EducationEntry = {
  title: string;
  degree: string;
  period: string;
  details?: string;
  links?: { label: string; url: string }[];
};

export type Certification = {
  title: string;
  issuer: string;
  description: string;
  skills: string[];
  link: string;
};

const education: EducationEntry[] = [
  {
    title: "Adama Science and Technology University",
    degree: "B.Sc. in Software Engineering",
    period: "Graduated 2022",
    details: "Software development, data structures and algorithms, system design, and database systems.",
  },
  {
    title: "Algorithms & Data Structures Training Program",
    degree: "Africa to Silicon Valley (A2SV)",
    period: "Jun 2024 — Jun 2025",
    details: "Solved 400+ problems (DP, graphs, optimization)",
    links: [
      { label: "LeetCode", url: "https://leetcode.com/libenadugna" },
      { label: "Codeforces", url: "https://codeforces.com/profile/Hehehc" },
    ],
  },
];

const experience: ExperienceEntry[] = [
  {
    role: "Freelance Machine Learning Engineer",
    company: "Remote",
    period: "Jul 2022 — Present",
    location: "Remote",
    points: [
      "Built NLP and analytics models (TF-IDF, clustering, ensemble) on 50,000+ records, improving prediction accuracy by ~18%.",
      "Developed Django REST APIs serving 5,000+ requests/month for scalable ML integration in web and mobile apps.",
      "Deployed full-stack web applications, reducing client data-processing time by ~40% through automation and optimized workflows.",
    ],
  },
  {
    role: "AI Benchmark Task Author (Terminal-Bench, SWE-bench)",
    company: "Revelo · AfterQuery · Turing",
    period: "2024 — Present",
    location: "Remote",
    points: [
      "Author Terminal-Bench 2.0 and 3.0 tasks at Revelo and Terminal-Bench 2 tasks (Project Claw) at AfterQuery: Docker environments, hidden test suites, golden solutions, and stress-testing against frontier models.",
      "Design SWE-bench style repository tasks, function-level problems (HumanEval/MBPP style) and WebArena/BrowserGym browser tasks on the Turing platform.",
      "Build and review evaluation tasks over database-backed systems, including MongoDB and PostgreSQL: schema design, query correctness and data-integrity checks verified against seeded data.",
      "Review other authors' tasks for ambiguity, solution leakage and gameable tests; refine rubrics and grading guidelines.",
    ],
  },
  {
    role: "AI Systems Evaluator & Data Architecture Contributor",
    company: "Revelo",
    period: "Mar 2025 — Mar 2026",
    points: [
      "Evaluated AI outputs on 8 ML models for correctness, consistency, and reliability using structured validation metrics.",
      "Designed behavioral data schemas supporting training and evaluation of 4 AI systems.",
      "Reviewed pull requests and refined evaluation guidelines, improving system code quality and reproducibility.",
    ],
  },
  {
    role: "AI Model Evaluator & Training Specialist",
    company: "Afriwork (Turing)",
    period: "Mar 2024 — May 2025",
    location: "Remote",
    points: [
      "Evaluated model performance on MacroBenchmark tasks for correctness, reasoning quality, and reliability.",
      "Supported models in solving Kaggle-style machine learning problems, guiding approach quality and solution validity.",
      "Configured Databricks workflows for agent-based model training, including dataset preparation and experiment setup.",
      "Monitored agent training runs end-to-end and scored outputs using structured rubric-based evaluations.",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Faris Technology Private Limited",
    period: "Aug 2023 — Feb 2025",
    points: [
      "Developed full-stack web and Flutter mobile apps for 5+ clients, delivering real-time data updates and responsive interfaces.",
      "Designed and implemented REST APIs for user authentication, database integration, and dynamic workflows.",
      "Conducted debugging, code reviews, and edge-case testing, reducing platform errors by ~25% and improving reliability.",
    ],
  },
  {
    role: "Senior Technical Mentor – Machine Learning",
    company: "CSEC-ASTU",
    period: "Sep 2022 — Jun 2023",
    points: [
      "Mentored 40+ students in ML system design, evaluation, and deployment.",
      "Supervised 8+ ML projects covering NLP and anomaly detection.",
    ],
  },
];

// Only entries with a verifiable link get a "View Certificate" button.
const certifications: Certification[] = [
  {
    title: "Data Analysis Fundamentals",
    issuer: "Udacity",
    description: "Collecting, cleaning, and analyzing data with Python, NumPy, and pandas.",
    skills: ["Data Analysis", "Python", "NumPy", "pandas"],
    link: "https://www.udacity.com/certificate/e/1f7abfaa-309d-11f0-a6fd-832dd500790a",
  },
  {
    title: "ALX AI Career Essentials",
    issuer: "ALX",
    description: "AI tooling, prompt engineering, and applied workflows.",
    skills: ["AI Tools", "Prompt Engineering"],
    link: "https://intranet.alxswe.com/certificates/nryHeJML8T",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "Udacity",
    description: "Search algorithms, machine learning, and neural networks with hands-on examples.",
    skills: ["Artificial Intelligence", "Machine Learning", "Python"],
    link: "",
  },
  {
    title: "Android Developer Fundamentals",
    issuer: "Udacity",
    description: "Android applications with Java and Android Studio: layouts, activities, and navigation.",
    skills: ["Android", "Java", "Mobile Development"],
    link: "",
  },
  {
    title: "Programming Fundamentals",
    issuer: "Udacity",
    description: "Core programming concepts, data structures, and problem-solving techniques.",
    skills: ["Programming Logic", "Python", "Algorithms"],
    link: "",
  },
  {
    title: "Dart & Flutter: The Ultimate Mobile App Development Course",
    issuer: "Udemy",
    description: "Flutter app development, Dart, state management, and responsive UI design.",
    skills: ["Flutter", "Dart", "UI Design", "Mobile Apps"],
    link: "",
  },
];

const timelineSummary = [
  { year: "2022", title: "B.Sc. Software Engineering (ASTU). Started freelance ML work and mentoring at CSEC-ASTU." },
  { year: "2023", title: "Full-stack engineer at Faris Technology: Django APIs and Flutter apps for 5+ clients." },
  { year: "2024", title: "A2SV algorithms program. Benchmark and evaluation work begins at Afriwork (Turing)." },
  { year: "2025", title: "Terminal-Bench 2.0/3.0 task authoring at Revelo and AfterQuery. Smart Gebere released." },
];


export const resume = { education, experience, certifications, timelineSummary };
