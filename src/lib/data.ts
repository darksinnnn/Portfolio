// ── Interfaces ──────────────────────────────────────────────────────────────

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  techStack: string[];
  bullets: string[];
  githubUrl?: string;
  liveUrl?: string;
  accent: string;
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  accomplishments: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  dates: string;
  location?: string;
  percentage?: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  education: EducationItem[];
  experience: Experience[];
  skills: Record<string, string[]>;
  achievements: string[];
  leadership: string[];
}

// ── Constants ───────────────────────────────────────────────────────────────

export const PROJECTS: ProjectData[] = [
  {
    id: "gym-app",
    title: "Bajrang Fitness Hub",
    subtitle: "Gym Membership Management App",
    techStack: ["Next.js", "React", "Vercel", "Full Stack"],
    bullets: [
      "Live production app for trainers to track gym memberships, payments, and member activity",
      "Full-stack web application deployed on Vercel with real-time data management",
      "Clean dashboard interface for membership tracking and renewal management",
    ],
    githubUrl: "https://github.com/darksinnnn/GymManagementApp",
    liveUrl: "https://bajrangfitnesshub.vercel.app/",
    accent: "#ec4899",
  },
  {
    id: "paypipe",
    title: "PayPipe",
    subtitle: "Distributed FinTech Payment Ecosystem",
    techStack: ["Java", "Spring Boot", "Apache Kafka", "Redis", "PostgreSQL", "Docker"],
    bullets: [
      "4-node event-driven microservices ecosystem using Apache Kafka for topic partitioning and Saga Pattern choreography",
      "High-throughput API Gateway exposing secure RESTful services, integrating Redis distributed locks for idempotency",
      "Event-sourced PostgreSQL ledger with strict ACID compliance for robust data integrity",
    ],
    githubUrl: "https://github.com/darksinnnn/Pay-Pipe.git",
    accent: "#3b82f6",
  },
  {
    id: "inventag",
    title: "InvenTag",
    subtitle: "IoT-Based Inventory Tracking System",
    techStack: ["C/C++", "ESP32", "IoT", "Kotlin", "Firebase"],
    bullets: [
      "Low-level firmware in C/C++ for ESP32 microcontrollers enabling continuous real-time data acquisition",
      "Multi-threaded RESTful web server on the edge device processing concurrent requests with sub-second alerts",
      "Synchronized live IoT hardware data with a custom Android app via Firebase over Wi-Fi",
    ],
    githubUrl: "https://github.com/darksinnnn/InvenTag.git",
    accent: "#f97316",
  },
  {
    id: "hashcracker",
    title: "Distributed Reverse Hash Cracker",
    subtitle: "Master-Slave Compute Cluster",
    techStack: ["Distributed Systems", "OS Kernels", "Network Security", "TCP Sockets"],
    bullets: [
      "Orchestrated a highly resilient Master-Slave compute cluster across 20+ nodes using raw TCP sockets",
      "Engineered a dynamic load-balancing algorithm to distribute concurrent tasks maximizing CPU throughput",
      "Brute-force hash reversal with parallel workload distribution mitigating single points of failure",
    ],
    githubUrl: "https://github.com/darksinnnn",
    accent: "#00ff41",
  },
  {
    id: "legal-assistant",
    title: "Legal Research Assistant",
    subtitle: "AI-Powered Legal Analysis",
    techStack: ["Python", "RAG", "LLMs", "NLP", "Vector Embeddings"],
    bullets: [
      "Intelligent legal assistant using Retrieval-Augmented Generation (RAG) to automate statute analysis and case law retrieval",
      "Vector Embeddings and Semantic Search to query extensive legal databases, categorizing issues under relevant IPC sections",
      "Synthesizes context-aware legal advice from complex texts, reducing manual research time significantly",
    ],
    accent: "#8b5cf6",
  },
  {
    id: "rate-limiter",
    title: "Smart API Rate Limiter",
    subtitle: "Production-Ready Rate Limiting Service",
    techStack: ["Java", "Spring Boot", "Redis", "Token Bucket", "Maven"],
    bullets: [
      "Distributed rate limiting using Redis with Token Bucket algorithm for smooth traffic enforcement",
      "Spring HandlerInterceptor validates every request before reaching controllers with atomic Redis operations",
      "Prevents race conditions during concurrent requests — returns HTTP 429 when limits exceeded",
    ],
    githubUrl: "https://github.com/darksinnnn/API-rate-Limiter",
    accent: "#06b6d4",
  },
];

export const PROFILE: ProfileData = {
  name: "Ashish Singh",
  firstName: "Ashish",
  lastName: "Singh",
  title: "Software Engineer — Java Backend & Cloud Applications",
  location: "Vellore, India",
  email: "ashishsingh667788@gmail.com",
  phone: "8630034904",
  linkedin: "https://www.linkedin.com/in/ashish-singh-907348267/",
  github: "https://github.com/darksinnnn",
  resumeUrl: "https://drive.google.com/drive/folders/1DNn23Bvs2r5-PIPcrjIO8FPWHGTLmW9n?usp=drive_link",
  education: [
    {
      institution: "Kendriya Vidyalaya No. 3, Agra Cantt",
      degree: "Secondary Education (Class X)",
      dates: "Completed",
      location: "Agra",
      percentage: "94.2%",
    },
    {
      institution: "Kendriya Vidyalaya No. 3, Agra Cantt",
      degree: "Senior Secondary Education (Class XII)",
      dates: "Completed",
      location: "Agra",
      percentage: "92.4%",
    },
    {
      institution: "Vellore Institute of Technology",
      degree: "Integrated M.Tech in Software Engineering",
      dates: "Sep 2022 – July 2027",
      location: "Vellore",
    },
  ],
  experience: [
    {
      company: "EaselearnAI",
      role: "Full Stack Developer Intern",
      dates: "June 2025 – July 2025",
      accomplishments: [
        "Engineered mobile app using React Native, launching Android version on Play Store",
        "Architected the iOS counterpart using robust software engineering principles",
        "Solved critical authentication failure with custom Google OAuth flow and secure cookie management",
        "Integrated high-performance WebView architecture for the core dashboard",
      ],
    },
  ],
  skills: {
    "Languages & Frameworks": ["Java (21+)", "Python", "C/C++", "Spring Boot 3"],
    "AI & Automation": ["Agentic AI", "RAG Pipelines", "Google ADK", "LLMs", "NLP", "FAISS Vector DB"],
    "Databases & Cloud": ["PostgreSQL", "MySQL", "Supabase", "Firebase", "Redis", "Kafka", "Docker", "Kubernetes", "AWS (DVA-C02)"],
    "Core Concepts": ["REST APIs", "Client-Server Architecture", "Distributed Systems", "Multi-threading", "Agile", "CI/CD", "Git"],
  },
  achievements: [
    "Caterpillar Hackathon Finalist",
    "Java Full Stack Development Certification",
    "AWS Certified Developer (DVA-C02) Course",
  ],
  leadership: [
    "IEEE-CS Society Core Committee Member",
    "Entrepreneurship Club Senior Committee Member",
    "Volunteered during Gravitas 2024",
  ],
};

// (end of file)
