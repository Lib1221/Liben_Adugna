import {
    SiFlutter,
    SiFirebase,
    SiTypescript,
    SiReact,
    SiDjango,
    SiPython,
    SiPostman,
    SiTailwindcss,
    SiPostgresql,
    SiGit,
    SiGithub,
    SiNodedotjs,
    SiTensorflow,
    SiScikitlearn,
    SiPandas,
    SiNumpy,
    SiJupyter,
    SiDocker,
    SiNextdotjs,
} from "react-icons/si";
import { FaJava, FaDatabase, FaLinux, FaBrain, FaChartLine, FaRobot, FaCogs } from "react-icons/fa";

export const skills = [
    // Programming & Software Engineering
    { icon: SiPython, label: "Python", color: "#3776AB", category: "programming" },
    { icon: FaJava, label: "Java", color: "#ED8B00", category: "programming" },
    { icon: SiTypescript, label: "TypeScript", color: "#3178C6", category: "programming" },
    { icon: SiReact, label: "React", color: "#61DAFB", category: "programming" },
    { icon: SiNodedotjs, label: "Node.js", color: "#68A063", category: "programming" },
    { icon: SiFlutter, label: "Flutter", color: "#02569B", category: "programming" },
    { icon: FaCogs, label: "Data Structures & Algorithms", color: "#9333EA", category: "programming" },
    
    // Machine Learning & AI
    { icon: SiScikitlearn, label: "Scikit-learn", color: "#F7931E", category: "ml" },
    { icon: SiTensorflow, label: "TensorFlow", color: "#FF6F00", category: "ml" },
    { icon: FaBrain, label: "Ensemble Models", color: "#10B981", category: "ml" },
    { icon: FaRobot, label: "Anomaly Detection", color: "#EF4444", category: "ml" },
    { icon: FaBrain, label: "NLP", color: "#8B5CF6", category: "ml" },
    { icon: FaCogs, label: "Feature Engineering", color: "#F59E0B", category: "ml" },
    { icon: FaChartLine, label: "Model Evaluation", color: "#06B6D4", category: "ml" },
    
    // MLOps & Automation
    { icon: SiDocker, label: "Docker", color: "#2496ED", category: "mlops" },
    { icon: SiDjango, label: "Django REST APIs", color: "#092E20", category: "mlops" },
    { icon: FaCogs, label: "ML Pipelines", color: "#22C55E", category: "mlops" },
    { icon: FaCogs, label: "Workflow Automation", color: "#A855F7", category: "mlops" },
    
    // Data Science & Analytics
    { icon: SiPandas, label: "Pandas", color: "#150458", category: "datascience" },
    { icon: SiNumpy, label: "NumPy", color: "#013243", category: "datascience" },
    { icon: SiJupyter, label: "Jupyter", color: "#F37626", category: "datascience" },
    { icon: FaChartLine, label: "Data Visualization", color: "#EC4899", category: "datascience" },
    { icon: FaChartLine, label: "Statistical Analysis", color: "#14B8A6", category: "datascience" },
    
    // Tools & Platforms
    { icon: SiGit, label: "Git", color: "#F05032", category: "tools" },
    { icon: SiGithub, label: "GitHub", color: "#FFFFFF", category: "tools" },
    { icon: FaDatabase, label: "SQL Databases", color: "#336791", category: "tools" },
    { icon: FaLinux, label: "Linux", color: "#FCC624", category: "tools" },
    { icon: SiPostman, label: "Postman", color: "#FF6C37", category: "tools" },
    { icon: SiFirebase, label: "Firebase", color: "#FFCA28", category: "tools" },
];
