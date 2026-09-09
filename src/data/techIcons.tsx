import { SiFlutter, SiDart, SiFirebase, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiDocker, SiMongodb, SiLaravel, SiPython, SiTensorflow, SiScikitlearn, SiNextdotjs } from "react-icons/si";
import type { JSX } from "react";

export const techIcons: Record<string, JSX.Element> = {
    Flutter: <SiFlutter className="text-blue-400 w-4 h-4" aria-hidden="true" />,
    Dart: <SiDart className="text-blue-600 w-4 h-4" aria-hidden="true" />,
    Firebase: <SiFirebase className="text-yellow-400 w-4 h-4" aria-hidden="true" />,
    React: <SiReact className="text-cyan-400 w-4 h-4" aria-hidden="true" />,
    "TypeScript": <SiTypescript className="text-blue-500 w-4 h-4" aria-hidden="true" />,
    "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-4 h-4" aria-hidden="true" />,
    "Framer Motion": <SiFramer className="text-purple-400 w-4 h-4" aria-hidden="true" />,
    Django: <SiDjango className="text-green-700 w-4 h-4" aria-hidden="true" />,
    PostgreSQL: <SiPostgresql className="text-blue-700 w-4 h-4" aria-hidden="true" />,
    Docker: <SiDocker className="text-blue-500 w-4 h-4" aria-hidden="true" />,
    MongoDB: <SiMongodb className="text-green-600 w-4 h-4" aria-hidden="true" />,
    Laravel: <SiLaravel className="text-red-600 w-4 h-4" aria-hidden="true" />,
    Python: <SiPython className="text-yellow-500 w-4 h-4" aria-hidden="true" />,
    TensorFlow: <SiTensorflow className="text-orange-500 w-4 h-4" aria-hidden="true" />,
    "Scikit-learn": <SiScikitlearn className="text-orange-400 w-4 h-4" aria-hidden="true" />,
    "Next.js": <SiNextdotjs className="text-white w-4 h-4" aria-hidden="true" />,
};
