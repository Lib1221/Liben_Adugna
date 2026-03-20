import { projects } from './projects';
import { skills } from './skills';

/**
 * Portfolio Context - Comprehensive knowledge base for AI Assistant
 * This aggregates all portfolio data for Liben Adugna
 */

export const portfolioData = {
    personalInfo: {
        name: "Liben Adugna",
        role: "Software Engineer | Machine Learning | Code Evaluation & AI Systems Reviewer",
        expertise: "Machine Learning Systems, Code Evaluation, Full-Stack Development, AI Systems Review",
        specialties: [
            "Machine Learning model development and evaluation",
            "Code evaluation and AI systems review",
            "Full-stack web and mobile development",
            "NLP and text processing applications",
            "Data preprocessing and feature engineering",
            "Anomaly detection and classification",
            "Django REST API development",
            "Performance optimization and debugging",
        ],
        description: `Software Engineer with expertise in machine learning systems, code evaluation, and full-stack development. Experienced in validating AI-generated outputs, reviewing system implementations, and building scalable web and mobile applications.

Strong in debugging, performance optimization, and designing reliable, maintainable software systems. Have processed datasets with 450k+ records for behavioral segmentation, built anomaly detection systems on 110k+ transactional records, and designed NLP-based semantic matching engines.

Foundation in data structures and algorithms with 400+ competitive programming problems solved on LeetCode and Codeforces.`,
        approach: "Software Engineer specializing in ML systems, code evaluation, and AI-powered solutions — building reliable, scalable systems that solve real-world problems.",
        services: [
            "Machine Learning & AI Development",
            "Code Evaluation & Review",
            "Full-Stack Web Development",
            "Mobile App Development (Flutter)",
            "Data Science & Analytics",
            "MLOps & Automation",
        ],
    },

    experience: [
        {
            role: "Freelance Machine Learning Engineer",
            company: "Remote",
            period: "Jul 2022 – Present",
            highlights: [
                "Built NLP and analytics models (TF-IDF, clustering, ensemble) on 50,000+ records, improving prediction accuracy by ~18%",
                "Developed Django REST APIs serving 5,000+ requests/month for scalable ML integration",
                "Deployed full-stack web applications, reducing client data-processing time by ~40%",
            ],
        },
        {
            role: "AI Systems Evaluator & Data Architecture Contributor",
            company: "Revelo",
            period: "Mar 2025 – Mar 2026",
            highlights: [
                "Evaluated AI outputs on 8 ML models for correctness, consistency, and reliability",
                "Designed behavioral data schemas supporting training and evaluation of 4 AI systems",
                "Reviewed pull requests and refined evaluation guidelines, improving code quality and reproducibility",
            ],
        },
        {
            role: "Full-Stack Software Engineer",
            company: "Faris Technology Private Limited",
            period: "Aug 2023 – Feb 2025",
            highlights: [
                "Developed full-stack web and Flutter mobile apps for 5+ clients",
                "Designed and implemented REST APIs for authentication, database integration, and dynamic workflows",
                "Reduced platform errors by ~25% through debugging, code reviews, and edge-case testing",
            ],
        },
        {
            role: "Senior Technical Mentor – Machine Learning",
            company: "CSEC-ASTU",
            period: "Sep 2022 – Jun 2023",
            highlights: ["Mentored 40+ students in ML system design, evaluation, and deployment", "Supervised 8+ ML projects (NLP, anomaly detection)"],
        },
    ],

    skills: skills.map((skill: any) => skill.label),

    skillsByCategory: {
        programming: skills.filter((s: any) => s.category === 'programming').map((s: any) => s.label),
        ml: skills.filter((s: any) => s.category === 'ml').map((s: any) => s.label),
        mlops: skills.filter((s: any) => s.category === 'mlops').map((s: any) => s.label),
        datascience: skills.filter((s: any) => s.category === 'datascience').map((s: any) => s.label),
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
        portfolio: "https://www.liben.dev",
        github: "https://github.com/lib1221",
        linkedin: "https://www.linkedin.com/in/liben-adugna-6b192a2b9/",
        email: "libenadugna285@gmail.com",
        leetcode: "https://leetcode.com/libenadugna",
        codeforces: "https://codeforces.com/profile/Hehehc",
        message: "Feel free to explore the portfolio for more details or connect for collaboration opportunities.",
    }
};

/**
 * System Prompt for AI Assistant
 * Defines personality, constraints, and behavior
 */
export const systemPrompt = `You are the "Liben Adugna AI Assistant", a helpful and professional AI assistant embedded in Liben Adugna's portfolio website.

**Your Identity:**
- You represent Liben Adugna, a Software Engineer specializing in Machine Learning and AI Systems
- You can ONLY answer questions about Liben's portfolio, projects, skills, and professional experience
- You are knowledgeable, friendly, and concise

**Your Knowledge Base:**

**Personal Information:**
- Name: ${portfolioData.personalInfo.name}
- Role: ${portfolioData.personalInfo.role}
- Expertise: ${portfolioData.personalInfo.expertise}
- Description: ${portfolioData.personalInfo.description}
- Power Statement: "${portfolioData.personalInfo.approach}"

**Professional Experience:**
${portfolioData.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.period})`).join('\n')}

**Services Offered:**
${portfolioData.personalInfo.services.map(s => `- ${s}`).join('\n')}

**Skills & Technologies by Category:**
- Programming: ${portfolioData.skillsByCategory.programming.join(', ')}
- ML/AI: ${portfolioData.skillsByCategory.ml.join(', ')}
- MLOps: ${portfolioData.skillsByCategory.mlops.join(', ')}
- Data Science: ${portfolioData.skillsByCategory.datascience.join(', ')}
- Tools: ${portfolioData.skillsByCategory.tools.join(', ')}

**Projects (${portfolioData.projects.length} total):**
${portfolioData.projects.map((p: any, i: number) => `
${i + 1}. **${p.title}** (${p.category})${p.isPrivate ? ' [PRIVATE]' : ''}
   - Role: ${p.role}
   - Description: ${p.description}
   - Technologies: ${p.technologies.join(', ')}
   ${p.features.length > 0 ? `- Key Features: ${p.features.slice(0, 3).join('; ')}` : ''}
`).join('\n')}

**Contact:**
- Portfolio: ${portfolioData.contactInfo.portfolio}
- GitHub: ${portfolioData.contactInfo.github}
- LinkedIn: ${portfolioData.contactInfo.linkedin}
- Email: ${portfolioData.contactInfo.email}
- LeetCode: ${portfolioData.contactInfo.leetcode}

**STRICT Rules:**
1. ONLY answer questions related to Liben's portfolio, projects, skills, experience, and contact information
2. If asked about topics outside this scope, politely decline
3. Keep responses concise but informative (2-4 sentences unless more detail is requested)
4. Use a professional yet friendly tone
5. When discussing projects, highlight specific technologies and features
6. For PRIVATE projects, explain they are proprietary work but describe the technologies and problem solved
7. If asked about availability or hiring, direct them to the portfolio's contact section
8. Never make up information - stick strictly to the knowledge base above
9. Emphasize Liben's expertise in ML systems, code evaluation, and full-stack development

**Response Style:**
- Be enthusiastic about Liben's work
- Use bullet points for lists
- Mention specific project names and technologies
- Highlight the ML/Data Science projects
- Always maintain first-person perspective when speaking as "Liben's assistant"`;

export default portfolioData;
