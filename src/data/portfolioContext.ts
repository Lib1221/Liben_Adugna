import { projects } from './projects';
import { skills } from './skills';
import { resume } from './resume';
import { projectPath } from '../lib/site';

/**
 * Portfolio Context - Comprehensive knowledge base for AI Assistant
 * This aggregates all portfolio data for Liben Adugna
 */

export const portfolioData = {
    personalInfo: {
        name: "Liben Adugna",
        role: "Software Engineer. Builds ML-backed products (Python, Django, Flutter) and authors evaluation benchmarks for AI coding agents.",
        expertise: "ML systems, AI evaluation and benchmark design, full-stack web and mobile development",
        specialties: [
            "Machine Learning model development and evaluation",
            "Code evaluation and AI systems review",
            "Full-stack web and mobile development",
            "NLP and text processing applications",
            "Data preprocessing and feature engineering",
            "Anomaly detection and classification",
            "Django REST API development",
            "Terminal-Bench, SWE-bench and Harbor-format task authoring",
            "MongoDB and PostgreSQL data modeling and evaluation",
            "Performance optimization and debugging",
        ],
        description: `Software Engineer with expertise in machine learning systems, code evaluation, and full-stack development. Experienced in validating AI-generated outputs, reviewing system implementations, and building scalable web and mobile applications.

Strong in debugging, performance optimization, and designing reliable, maintainable software systems. Have processed datasets with 450k+ records for behavioral segmentation, built anomaly detection systems on 110k+ transactional records, and designed NLP-based semantic matching engines.

Foundation in data structures and algorithms with 400+ competitive programming problems solved on LeetCode and Codeforces.`,
        approach: "Based in Adama, Ethiopia (UTC+3). Open to remote roles and to relocating within the EU.",
        services: [
            "Machine Learning & AI Development",
            "AI Evaluation, Benchmark and Rubric Design",
            "Full-Stack Web Development",
            "Mobile App Development (Flutter)",
            "Data Science & Analytics",
            "MLOps & Automation",
        ],
    },

    experience: resume.experience.map((entry) => ({
        role: entry.role,
        company: entry.company,
        period: entry.period,
        highlights: entry.points,
    })),

    skills: skills.map((skill) => skill.label),

    skillsByCategory: {
        programming: skills.filter((s) => s.category === 'programming').map((s) => s.label),
        ml: skills.filter((s) => s.category === 'ml').map((s) => s.label),
        mlops: skills.filter((s) => s.category === 'mlops').map((s) => s.label),
        datascience: skills.filter((s) => s.category === 'datascience').map((s) => s.label),
        tools: skills.filter((s) => s.category === 'tools').map((s) => s.label),
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
        page: `https://www.liben.dev${projectPath(project)}`,
    })),

    contactInfo: {
        portfolio: "https://www.liben.dev",
        github: "https://github.com/Lib1221",
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
${portfolioData.projects.map((p, i) => `
${i + 1}. **${p.title}** (${p.category})${p.isPrivate ? ' [PRIVATE]' : ''}
   - Role: ${p.role}
   - Description: ${p.description}
   - Technologies: ${p.technologies.join(', ')}
   - Page: ${p.page}
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
8b. When a project comes up, include its page link so the visitor can read the case study. Site pages: https://www.liben.dev/ (about), /resume, /projects, /writing, /contact
9. Emphasize Liben's expertise in ML systems, AI evaluation and benchmark design, and full-stack development

**Response Style:**
- Be enthusiastic about Liben's work
- Use bullet points for lists
- Mention specific project names and technologies
- Highlight the ML/Data Science projects
- Always maintain first-person perspective when speaking as "Liben's assistant"`;

export default portfolioData;
