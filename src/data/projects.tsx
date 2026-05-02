import { SiFlutter, SiDart, SiFirebase, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiDocker, SiMongodb, SiLaravel, SiPython, SiTensorflow, SiScikitlearn, SiNextdotjs } from "react-icons/si";
import type { JSX } from "react";

export type Project = {
    title: string;
    description: string;
    technologies: string[];
    role: string;
    duration: string;
    features?: string[];
    challenges?: string[];
    architecture?: string;
    impactMetrics?: string[];
    image?: string;
    repoLink?: string;
    liveDemo?: string;
    youtubeLink?: string;
    category: "Mobile" | "Web" | "AI/ML" | "Data Science" | "MLOps";
    isPrivate?: boolean;
};

export const projects: Project[] = [
    // ============ TOP PROJECTS FROM RESUME ============
    
    // 1. Behavioral User Segmentation System
    {
        title: "Behavioral User Segmentation System",
        description:
            "A machine learning system that processes ~450k user interaction records to extract behavioral features and segment users using clustering techniques. Engineered session-based and frequency-based features from raw logs.",
        technologies: ["Python", "Pandas", "Scikit-learn", "K-Means", "PCA"],
        role: "ML Engineer",
        duration: "2025",
        features: [
            "Processed ~450k user interaction records for behavioral analysis",
            "Engineered session-based and frequency-based features from raw logs",
            "Applied K-Means clustering with PCA for stable segmentation",
            "Evaluated cluster quality using silhouette score",
            "Interpretability checks for business insights",
        ],
        challenges: [
            "Large volume preprocessing and feature quality consistency",
            "Maintaining cluster interpretability for business users",
        ],
        architecture: "Python data pipeline -> feature engineering -> PCA + clustering -> quality evaluation",
        impactMetrics: ["450k+ records", "stable segments", "silhouette-driven validation"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        category: "Data Science",
        isPrivate: true,
    },

    // 2. Transaction Anomaly Detection Pipeline
    {
        title: "Transaction Anomaly Detection Pipeline",
        description:
            "Built anomaly detection models on ~110k transactional records using Isolation Forest and Random Forest-based classification approaches. Addressed class imbalance and improved precision through threshold tuning.",
        technologies: ["Python", "Scikit-learn", "Isolation Forest", "Random Forest", "Statistical Modeling"],
        role: "ML Engineer",
        duration: "2025",
        features: [
            "Built anomaly detection on ~110k transactional records",
            "Implemented Isolation Forest and Random Forest classification",
            "Addressed class imbalance using resampling techniques",
            "Improved precision by tuning decision thresholds",
            "Feature refinement for better model accuracy",
        ],
        challenges: [
            "High class imbalance and low anomaly frequency",
            "Balancing recall and precision for production alerts",
        ],
        architecture: "Data preprocessing -> anomaly modeling -> threshold tuning -> validation pipeline",
        impactMetrics: ["110k+ records", "precision improvements", "production-ready thresholds"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        category: "Data Science",
        isPrivate: true,
    },

    // 3. NLP-Based Resume–Job Matching Engine
    {
        title: "NLP-Based Resume–Job Matching Engine",
        description:
            "Designed a text preprocessing and TF-IDF vectorization pipeline for semantic matching between resumes and job descriptions. Automated candidate scoring and ranking logic with precision@k evaluation.",
        technologies: ["Python", "NLP", "Scikit-learn", "TF-IDF", "Cosine Similarity"],
        role: "NLP Engineer",
        duration: "2025",
        features: [
            "Text preprocessing and TF-IDF vectorization pipeline",
            "Computed semantic similarity using cosine similarity ranking",
            "Automated candidate scoring and ranking logic",
            "Evaluated ranking quality using precision@k metrics",
            "Scalable design for large resume databases",
        ],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // 4. Smart Gebere – AI-Powered Agricultural Assistant
    {
        title: "Smart Gebere – AI Agricultural Assistant",
        description:
            "A cross-platform mobile application to assist farmers with AI-driven insights and decision support. Integrated ML models for crop recommendations, disease detection, and advisory services with offline optimization.",
        technologies: ["Flutter", "Firebase", "Machine Learning APIs", "TensorFlow Lite", "Cloud Integration"],
        role: "Full Stack ML Developer",
        duration: "2025",
        features: [
            "AI-driven crop recommendations and disease detection",
            "Scalable backend using Firebase for real-time sync",
            "User-friendly UI/UX for low-resource environments",
            "Optimized for offline/low-connectivity scenarios",
            "Translates agricultural challenges into data-driven solutions",
        ],
        image: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760337483/Blue_Modern_Money_Managing_Mobile_App_Promotion_Facebook_Ad_2_xmic9m.png",
        repoLink: "https://github.com/lib1221/Smart_Gebere",
        youtubeLink: "https://youtu.be/C8Kw2S8Khf0",
        category: "AI/ML",
    },

    // ============ OTHER AI/ML PROJECTS ============

    // AI-Powered Personal Finance Behavior Analyzer
    {
        title: "AI-Powered Personal Finance Behavior Analyzer",
        description:
            "An intelligent finance app that predicts user spending behavior using ML, not just tracking expenses. Detects unhealthy financial patterns and provides behavioral recommendations rather than rigid rules.",
        technologies: ["Flutter", "Next.js", "Python", "TensorFlow", "Firebase"],
        role: "Full Stack ML Engineer",
        duration: "2025",
        features: [
            "Behavioral spending prediction using ML models",
            "Pattern detection for unhealthy financial habits",
            "Personalized AI-driven recommendations",
            "Real-time sync between mobile and web dashboards",
            "Secure financial data handling with encryption",
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // Offline-First Smart Field Data Collection App
    {
        title: "Offline-First Smart Field Data Collection App",
        description:
            "A Flutter app designed for rural/low-connectivity environments. Works fully offline with intelligent sync and uses ML to detect anomalous or fake data entries in real-time.",
        technologies: ["Flutter", "TensorFlow Lite", "SQLite", "Firebase"],
        role: "Mobile ML Developer",
        duration: "2025",
        features: [
            "Full offline functionality with local ML models",
            "Intelligent data sync when connectivity returns",
            "Anomaly detection for fake/inconsistent entries",
            "GPS-based location verification",
            "Edge computing for real-time predictions",
        ],
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // Real-Time Skill Gap Analyzer for Developers
    {
        title: "Real-Time Skill Gap Analyzer for Developers",
        description:
            "A unique tool that connects to GitHub profiles, analyzes repos/commits/tech stacks using ML, and recommends personalized learning paths based on market demand.",
        technologies: ["React", "Python", "TensorFlow", "GitHub API", "MongoDB"],
        role: "ML Engineer",
        duration: "2025",
        features: [
            "GitHub profile and repository analysis",
            "Tech stack detection from code patterns",
            "Market demand correlation analysis",
            "Personalized learning path generation",
            "Progress tracking and skill growth metrics",
        ],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // Intelligent News Credibility & Bias Detector
    {
        title: "Intelligent News Credibility & Bias Detector",
        description:
            "Advanced NLP application that detects bias levels and emotional manipulation in news articles. Scores credibility using linguistic features and works across web and mobile platforms.",
        technologies: ["Next.js", "Flutter", "Python", "Transformers", "NLP"],
        role: "NLP & Deep Learning Engineer",
        duration: "2025",
        features: [
            "Real-time bias detection and scoring",
            "Emotional manipulation analysis",
            "Source credibility verification",
            "Cross-reference with fact-checking databases",
            "Browser extension and mobile reader",
        ],
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // Smart Health Symptom Progression Predictor
    {
        title: "Smart Health Symptom Progression Predictor",
        description:
            "A responsible AI mobile app that tracks symptom trends over time and predicts risk escalation using time-series modeling. Focuses on data trends, not medical diagnosis.",
        technologies: ["Flutter", "Python", "TensorFlow", "Firebase", "Time Series ML"],
        role: "ML Mobile Developer",
        duration: "2025",
        features: [
            "Symptom tracking with trend visualization",
            "Time-series risk escalation prediction",
            "Non-diagnostic health insights",
            "Privacy-first local data processing",
            "Integration with health tracking devices",
        ],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // AI-Driven UI Personalization Engine
    {
        title: "AI-Driven UI Personalization Engine",
        description:
            "An innovative Flutter app where the UI dynamically adapts based on user behavior. Layout, colors, and navigation flow change using reinforcement learning-style optimization.",
        technologies: ["Flutter", "Python", "Reinforcement Learning", "Firebase ML"],
        role: "ML Mobile Developer",
        duration: "2025",
        features: [
            "Dynamic UI adaptation based on usage patterns",
            "Reinforcement learning for layout optimization",
            "A/B testing automation with ML",
            "User preference learning over time",
            "Accessibility-aware personalization",
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        category: "AI/ML",
        isPrivate: true,
    },

    // ============ MOBILE PROJECTS ============

    // Mela Loan Comparison App
    {
        title: "Mela Loan App",
        description:
            "A Flutter mobile app that helps users compare loan options from different banks and choose the best offer. Includes smart loan calculators and intuitive comparison charts.",
        technologies: ["Flutter", "Dart", "GetX", "Firebase"],
        role: "Mobile App Developer",
        duration: "2025",
        features: [
            "Loan comparison by interest rate, amount, and duration",
            "Real-time data with Firebase integration",
            "Modern, responsive UI with GetX state management",
            "User-friendly loan calculator and detailed breakdowns",
        ],
        image:
            "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760337483/Blue_Modern_Money_Managing_Mobile_App_Promotion_Facebook_Ad_wpj5hv.png",
        repoLink: "https://github.com/wako-coder/mela-App",
        category: "Mobile",
    },

    // Gosho Dating App
    {
        title: "Gosho Dating App",
        description:
            "A modern dating app designed for genuine connections. Built with Flutter and Firebase using Riverpod and Cubit for efficient state management. Includes real-time chat, social login, and secure profile management.",
        technologies: [
            "Flutter",
            "Firebase",
            "Riverpod",
            "Cubit",
            "Google Sign-In",
            "Facebook Login",
            "Cloud Firestore",
        ],
        role: "Mobile App Developer",
        duration: "2025",
        features: [
            "Google, Facebook, and Email authentication integration",
            "Swipe-based matching with like/dislike system",
            "Real-time chat with message reactions and typing indicators",
            "Profile customization with photo upload and bio editing",
            "User discovery with distance and interest filters",
            "Dark/Light theme support with persistent settings",
        ],
        image:
            "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760337483/Blue_Modern_Money_Managing_Mobile_App_Promotion_Facebook_Ad_1_xqfntf.png",
        repoLink: "https://github.com/lib1221/gosho-dating-app",
        category: "Mobile",
    },

    // Crazy Game
    {
        title: "Crazy Game",
        description:
            "A real-time multiplayer card game built with Flutter and Firebase, featuring chat, game rooms, leaderboards, and themed UI design.",
        technologies: ["Flutter", "Firebase", "Provider", "Firestore"],
        role: "Mobile App Developer",
        duration: "2025",
        features: [
            "Real-time multiplayer game logic and chat",
            "Turn-based gameplay mechanics",
            "User authentication and profiles",
            "Leaderboards and achievements",
            "Dynamic, themed game UI",
        ],
        image: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760337483/Blue_Modern_Money_Managing_Mobile_App_Promotion_Facebook_Ad_3_q0ftqx.png",
        repoLink: "https://github.com/Lib1221/Crazy-Game",
        category: "Mobile",
    },

    // Flutter Exam App
    {
        title: "Flutter Exam App",
        description:
            "A productivity and learning companion for students preparing for exams. Built with Flutter using Riverpod and Firebase integration. It features Pomodoro-based study sessions, AI-generated explanations, progress tracking, and community discussions.",
        technologies: [
            "Flutter",
            "Firebase",
            "Riverpod",
            "Gemini API",
            "Cloud Firestore",
            "Charts Flutter",
        ],
        role: "Flutter Developer",
        duration: "2025",
        features: [
            "Pomodoro technique timer with custom study/break intervals",
            "AI-generated answers and explanations for selected topics",
            "Daily heatmap visualization of study activity",
            "Discussion and Q&A forum integrated with LeetCode-style challenges",
            "User authentication and progress tracking via Firebase",
            "Dark/Light mode support with adaptive UI",
        ],
        image:
            "https://cdn.dribbble.com/userupload/14399174/file/original-7e7f9a4a0de5ad54b3c3bb6d9159e47a.png?resize=1200x900",
        repoLink: "https://github.com/lib1221/flutter-exam",
        category: "Mobile",
    },

    // Flutter Food Delivery
    {
        title: "Flutter Food Delivery",
        description:
            "A modern Flutter-based food ordering app where users can browse food categories, place orders, make payments via Stripe, and track deliveries with map integration.",
        technologies: [
            "Flutter",
            "Firebase Authentication",
            "Cloud Firestore",
            "Stripe",
            "Dio",
            "OpenStreetMap API",
        ],
        role: "Mobile App Developer",
        duration: "2025",
        features: [
            "User signup/login with Firebase Authentication",
            "Category-based food browsing and order placement",
            "Stripe-powered secure payment integration",
            "Map view for delivery tracking and restaurant locations",
            "Real-time order and data storage with Firestore",
        ],
        image:
            "https://cdn.dribbble.com/users/1162077/screenshots/16288806/media/ed43ec25e7808c7bfb54f8de52f265e8.png",
        repoLink: "https://github.com/Lib1221/flutter-food_delivery",
        category: "Mobile",
    },

    // ============ WEB PROJECTS ============

    // Private Enterprise System
    {
        title: "Private Enterprise System",
        description:
            "A large-scale enterprise application built with Laravel and Vue.js. Features complex role-based access control, real-time reporting, and integration with multiple third-party services.",
        technologies: ["Laravel", "Vue.js", "MySQL", "Redis"],
        role: "Full Stack Developer",
        duration: "2025",
        features: [
            "Role-Based Access Control (RBAC)",
            "Real-time data visualization",
            "Automated reporting system",
            "Secure API integration",
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        category: "Web",
        isPrivate: true,
    },

    // Advanced Java Shopping
    {
        title: "Advanced Java Shopping Web Application",
        description:
            "A full-featured e-commerce web application built using Java Servlets and JSP, featuring product search, cart management, and an admin panel.",
        technologies: ["Java", "Servlet", "JSP", "MySQL", "Tomcat"],
        role: "Full Stack Java Developer",
        duration: "2025",
        features: [
            "User and admin authentication system",
            "Product listing, search, and details pages",
            "Shopping cart functionality with order management",
            "Admin dashboard for user and product management",
        ],
        image: "https://img.youtube.com/vi/qLFG0Y1u77g/0.jpg",
        repoLink: "https://github.com/lib1221/Advanced_java_shopping",
        youtubeLink: "https://www.youtube.com/watch?v=qLFG0Y1u77g",
        category: "Web",
    },

    // eCommerce App
    {
        title: "Full Stack eCommerce Platform",
        description:
            "A full-featured mobile-first eCommerce platform built with Django and Flutter. Includes secure authentication, Stripe payments, and a powerful admin panel.",
        technologies: [
            "Django",
            "Django REST Framework",
            "Flutter",
            "Stripe API",
            "PostgreSQL",
        ],
        role: "Full Stack Developer",
        duration: "2025",
        features: [
            "OAuth2 authentication with refresh tokens",
            "Product catalog, search, and categories",
            "Cart management and order tracking",
            "Stripe PaymentSheet integration",
            "Django Admin for user and product management",
        ],
        image:
            "https://cdn.dribbble.com/userupload/12505408/file/original-4a4cb74637e6d92fcd0379878678de06.png?resize=1200x900",
        repoLink: "https://github.com/lib1221/ecommerce-full-stack-mobile",
        category: "Web",
    },

    // Portfolio Website
    {
        title: "Portfolio Website",
        description:
            "A personal portfolio built with React, TypeScript, and Tailwind CSS — showcasing projects, skills, and resume downloads with AI chatbot integration.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Gemini AI"],
        role: "Frontend Developer",
        duration: "2025",
        features: [
            "Responsive, mobile-first design",
            "AI-powered chatbot for visitor interactions",
            "Integrated resume download and GitHub links",
        ],
        image:
            "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760339187/Contact_j5lvc6.png",
        repoLink: "https://github.com/lib1221/portfolio",
        liveDemo: "https://www.liben.dev",
        category: "Web",
    },
];

export const techIcons: Record<string, JSX.Element> = {
    Flutter: <SiFlutter className="text-blue-400 w-4 h-4" />,
    Dart: <SiDart className="text-blue-600 w-4 h-4" />,
    Firebase: <SiFirebase className="text-yellow-400 w-4 h-4" />,
    React: <SiReact className="text-cyan-400 w-4 h-4" />,
    "TypeScript": <SiTypescript className="text-blue-500 w-4 h-4" />,
    "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-4 h-4" />,
    "Framer Motion": <SiFramer className="text-purple-400 w-4 h-4" />,
    Django: <SiDjango className="text-green-700 w-4 h-4" />,
    PostgreSQL: <SiPostgresql className="text-blue-700 w-4 h-4" />,
    Docker: <SiDocker className="text-blue-500 w-4 h-4" />,
    MongoDB: <SiMongodb className="text-green-600 w-4 h-4" />,
    Laravel: <SiLaravel className="text-red-600 w-4 h-4" />,
    Python: <SiPython className="text-yellow-500 w-4 h-4" />,
    TensorFlow: <SiTensorflow className="text-orange-500 w-4 h-4" />,
    "Scikit-learn": <SiScikitlearn className="text-orange-400 w-4 h-4" />,
    "Next.js": <SiNextdotjs className="text-white w-4 h-4" />,
};
