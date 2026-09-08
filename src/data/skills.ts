
export type SkillEntry = { label: string; color: string; category: "programming" | "ml" | "mlops" | "datascience" | "tools" };

export const skills: SkillEntry[] = [
    // Programming & Software Engineering
    { label: "Python", color: "#3776AB", category: "programming" },
    { label: "Java", color: "#ED8B00", category: "programming" },
    { label: "TypeScript", color: "#3178C6", category: "programming" },
    { label: "React", color: "#61DAFB", category: "programming" },
    { label: "Node.js", color: "#68A063", category: "programming" },
    { label: "Flutter", color: "#02569B", category: "programming" },
    { label: "Data Structures & Algorithms", color: "#9333EA", category: "programming" },
    
    // Machine Learning & AI
    { label: "Scikit-learn", color: "#F7931E", category: "ml" },
    { label: "TensorFlow", color: "#FF6F00", category: "ml" },
    { label: "Ensemble Models", color: "#10B981", category: "ml" },
    { label: "Anomaly Detection", color: "#EF4444", category: "ml" },
    { label: "NLP", color: "#8B5CF6", category: "ml" },
    { label: "Feature Engineering", color: "#F59E0B", category: "ml" },
    { label: "Model Evaluation", color: "#06B6D4", category: "ml" },
    
    // MLOps & Automation
    { label: "Docker", color: "#2496ED", category: "mlops" },
    { label: "Django REST APIs", color: "#092E20", category: "mlops" },
    { label: "ML Pipelines", color: "#22C55E", category: "mlops" },
    { label: "Workflow Automation", color: "#A855F7", category: "mlops" },
    
    // Data Science & Analytics
    { label: "Pandas", color: "#150458", category: "datascience" },
    { label: "NumPy", color: "#013243", category: "datascience" },
    { label: "Jupyter", color: "#F37626", category: "datascience" },
    { label: "Data Visualization", color: "#EC4899", category: "datascience" },
    { label: "Statistical Analysis", color: "#14B8A6", category: "datascience" },
    
    // Tools & Platforms
    { label: "Git", color: "#F05032", category: "tools" },
    { label: "GitHub", color: "#FFFFFF", category: "tools" },
    { label: "SQL Databases", color: "#336791", category: "tools" },
    { label: "Linux", color: "#FCC624", category: "tools" },
    { label: "Postman", color: "#FF6C37", category: "tools" },
    { label: "Firebase", color: "#FFCA28", category: "tools" },
];
