import React, { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { SiFlutter, SiDart, SiFirebase, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiDocker, SiMongodb } from "react-icons/si";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
  features?: string[];
  image?: string;
  repoLink?: string;
  liveDemo?: string;
  youtubeLink?: string;
  category: "Mobile" | "Web";
}


  const projects: Project[] = [
  // 🛒 Full Stack eCommerce App

  

  

  // 💰 Mela Loan Comparison App
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

  // 🌾 Smart Gebere
  {
    title: "Smart Gebere",
    description:
      "A smarter way for farmers to cultivate success! With AI-powered crop recommendations, disease detection, and weather forecasting, this app helps farmers grow better crops and plan their days efficiently.",
    technologies: ["Flutter", "Firebase"],
    role: "Mobile App Developer",
    duration: "2025",
    features: [
      "AI-driven crop recommendations using GPS and manual inputs",
      "Disease detection via image recognition with treatment advice",
      "Real-time weather forecasts for efficient planning",
      "Farmer-friendly, intuitive UI design",
    ],
    image: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760337483/Blue_Modern_Money_Managing_Mobile_App_Promotion_Facebook_Ad_2_xmic9m.png",
    repoLink: "https://github.com/lib1221/Smart_Gebere",
    youtubeLink: "https://youtu.be/C8Kw2S8Khf0",
    category: "Mobile",
  },
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
    repoLink: "https://github.com/your-username/Advanced_java_shopping",
    youtubeLink: "https://www.youtube.com/watch?v=qLFG0Y1u77g",
    category: "Web",
  },

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
  

  // 🍔 Flutter Food Delivery
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

  {
    title: "eCommerce App",
    description:
      "A full-featured mobile-first eCommerce platform built with Django and Flutter. Includes secure authentication, Stripe payments, and a powerful admin panel.",
    technologies: [
      "Django",
      "Django REST Framework",
      "Flutter",
      "Stripe API",
      "PostgreSQL",
      "GetX",
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
    category: "Mobile",
  },

 

  // 💼 Portfolio Website
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React, TypeScript, and Tailwind CSS — showcasing projects, skills, and resume downloads.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer",
    duration: "2025",
    features: [
      "Responsive, mobile-first design",
      "Dark/light mode toggle",
      "Integrated resume download and GitHub links",
    ],
    image:
      "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1760339187/Contact_j5lvc6.png",
    repoLink: "https://github.com/libenadugna/portfolio",
    liveDemo: "https://libenadugna.vercel.app",
    category: "Web",
  },

  
];




const techIcons: Record<string, JSX.Element> = {
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
};

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Mobile" | "Backend" | "Web">("All");

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  const categories: Array<"All" | "Mobile" | "Web"> = ["All", "Mobile", "Web"];

  return (
    <div className=" px-4 max-w-5xl mx-auto text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold"
      >
        Projects
      </motion.h1>
      <div className="h-1 w-20 bg-yellow-400 rounded mt-3 mb-6"></div>

      {/* Category Selector */}
      <div className="flex gap-3 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Timeline */}
      <div className="border-l-2 border-gray-700 pl-6 relative">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="mb-12 relative"
          >
            <div className="absolute -left-[30px] w-3 h-3 bg-yellow-400 rounded-full"></div>

            <h4 className="font-bold text-white text-lg">{project.title}</h4>
            <p className="text-yellow-500">{project.role}</p>

            {project.image && project.image.trim() !== "" && (
  <img
    src={project.image}
    alt={project.title}
    className="w-full max-w-md max-h-48 object-cover rounded-lg mb-4 shadow-lg"
  />
)}


            <h4 className="text-gray-400 italic mb-2">{project.description}</h4>

            {project.features && (
              <ul className="list-disc list-inside text-gray-400 mb-2 space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1 bg-gray-800 text-yellow-400 px-2 py-1 rounded-full text-xs"
                >
                  {techIcons[tech] || null}
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 text-blue-400">
              {project.youtubeLink && (
                <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  YouTube
                </a>
              )}
              {project.repoLink && (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
