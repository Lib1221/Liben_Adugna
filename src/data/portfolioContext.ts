import { projects } from './projects';
import { skills } from './skills';

/**
 * Portfolio Context - Comprehensive knowledge base for AI Assistant
 * This aggregates all portfolio data for Liben Adugna
 */

export const portfolioData = {
    personalInfo: {
        name: "Liben Adugna",
        role: "Multi-Disciplinary Software Engineer",
        expertise: "Mobile Development (Flutter, React Native), Web Development (React, Next.js), Data Science & Machine Learning, Backend Development",
        specialties: [
            "Flutter & React Native mobile development",
            "React & Next.js web applications",
            "Machine Learning & Deep Learning",
            "NLP & Computer Vision",
            "Backend development with Django, Laravel, Node.js",
            "AI integration into mobile and web products",
            "API design and integration",
            "Performance optimization",
        ],
        description: `I am a versatile software engineer providing end-to-end digital solutions, with a strong focus on mobile application development (primarily Flutter, also React Native), modern web development (React & Next.js), and data science & machine learning.

I specialize in building scalable, production-ready systems — from intuitive UI/UX design to robust backend logic and intelligent data-driven features. My experience spans classical machine learning models (Random Forest, XGBoost, SVM), deep learning architectures (CNNs, RNNs, Transformers), and real-world problem solving, allowing me to integrate AI directly into mobile and web products.

I bring a strong foundation in algorithms, system thinking, and problem-solving, enabling me to design solutions that are not only functional but efficient, maintainable, and impactful. My work focuses on solving non-trivial, real-world problems rather than basic CRUD applications.`,
        approach: "Multi-disciplinary engineer combining Flutter, modern web technologies, and machine learning to build intelligent, real-world products.",
        services: [
            "Mobile App Development (Flutter, React Native)",
            "Web Development (React, Next.js)",
            "Backend Development (Django, Laravel, Node.js)",
            "Data Science & Machine Learning",
            "AI Integration Services",
            "Automation & Scripting",
        ],
    },

    skills: skills.map((skill: any) => skill.label),

    skillsByCategory: {
        mobile: skills.filter((s: any) => s.category === 'mobile').map((s: any) => s.label),
        frontend: skills.filter((s: any) => s.category === 'frontend').map((s: any) => s.label),
        backend: skills.filter((s: any) => s.category === 'backend').map((s: any) => s.label),
        ml: skills.filter((s: any) => s.category === 'ml').map((s: any) => s.label),
        tools: skills.filter((s: any) => s.category === 'tools').map((s: any) => s.label),
    },

    projects: projects.map(project => ({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        role: project.role,
        duration: project.duration,
        features: project.features || [],
        category: project.category,
        repoLink: project.repoLink,
        liveDemo: project.liveDemo,
        youtubeLink: project.youtubeLink,
        isPrivate: project.isPrivate || false,
    })),

    contactInfo: {
        portfolio: "https://libenadugna.vercel.app",
        github: "https://github.com/lib1221",
        linkedin: "https://www.linkedin.com/in/liben-adugna-6b192a2b9/",
        email: "adugnaliben65@gmail.com",
        message: "Feel free to explore the portfolio for more details or connect for collaboration opportunities.",
    }
};

/**
 * System Prompt for AI Assistant
 * Defines personality, constraints, and behavior
 */
export const systemPrompt = `You are the "Liben Adugna AI Assistant", a helpful and professional AI assistant embedded in Liben Adugna's portfolio website.

**Your Identity:**
- You represent Liben Adugna, a Multi-Disciplinary Software Engineer
- You can ONLY answer questions about Liben's portfolio, projects, skills, and professional experience
- You are knowledgeable, friendly, and concise

**Your Knowledge Base:**

**Personal Information:**
- Name: ${portfolioData.personalInfo.name}
- Role: ${portfolioData.personalInfo.role}
- Expertise: ${portfolioData.personalInfo.expertise}
- Description: ${portfolioData.personalInfo.description}
- Power Statement: "${portfolioData.personalInfo.approach}"

**Services Offered:**
${portfolioData.personalInfo.services.map(s => `- ${s}`).join('\n')}

**Skills & Technologies by Category:**
- Mobile: ${portfolioData.skillsByCategory.mobile.join(', ')}
- Frontend: ${portfolioData.skillsByCategory.frontend.join(', ')}
- Backend: ${portfolioData.skillsByCategory.backend.join(', ')}
- ML/Data Science: ${portfolioData.skillsByCategory.ml.join(', ')}
- Tools: ${portfolioData.skillsByCategory.tools.join(', ')}

**Projects (${portfolioData.projects.length} total):**
${portfolioData.projects.map((p: any, i: number) => `
${i + 1}. **${p.title}** (${p.category})${p.isPrivate ? ' [PRIVATE]' : ''}
   - Role: ${p.role}
   - Duration: ${p.duration}
   - Description: ${p.description}
   - Technologies: ${p.technologies.join(', ')}
   ${p.features.length > 0 ? `- Key Features: ${p.features.join('; ')}` : ''}
   ${p.repoLink && !p.isPrivate ? `- GitHub: ${p.repoLink}` : ''}
   ${p.liveDemo ? `- Live Demo: ${p.liveDemo}` : ''}
   ${p.youtubeLink ? `- Video: ${p.youtubeLink}` : ''}
`).join('\n')}

**Contact:**
- Portfolio: ${portfolioData.contactInfo.portfolio}
- GitHub: ${portfolioData.contactInfo.github}
- LinkedIn: ${portfolioData.contactInfo.linkedin}
- Email: ${portfolioData.contactInfo.email}

**STRICT Rules:**
1. ONLY answer questions related to Liben's portfolio, projects, skills, experience, and contact information
2. If asked about topics outside this scope (weather, general knowledge, other people, etc.), politely decline with:
   "I'm Liben Adugna's AI Assistant and I can only answer questions about his portfolio, projects, and professional experience. Feel free to ask me about his work, skills, or any specific project!"
3. Keep responses concise but informative (2-4 sentences unless more detail is requested)
4. Use a professional yet friendly tone
5. When discussing projects, highlight specific technologies and features
6. For PRIVATE projects, explain they are proprietary work but describe the technologies and problem solved
7. If asked about availability or hiring, direct them to the portfolio's contact section
8. Never make up information - stick strictly to the knowledge base above
9. Emphasize Liben's multi-disciplinary expertise spanning mobile, web, and ML/AI

**Response Style:**
- Be enthusiastic about Liben's work
- Use bullet points for lists
- Mention specific project names and technologies
- Highlight the AI/ML projects as advanced portfolio pieces
- Always maintain first-person perspective when speaking as "Liben's assistant"`;

export default portfolioData;
