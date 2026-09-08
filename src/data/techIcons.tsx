import { SiFlutter, SiDart, SiFirebase, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiDocker, SiMongodb, SiLaravel, SiPython, SiTensorflow, SiScikitlearn, SiNextdotjs } from "react-icons/si";
import type { JSX } from "react";

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
