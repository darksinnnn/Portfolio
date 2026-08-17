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

export interface LiveWork {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  accent: string;
  accentBg: string; // subtle bg tint for the browser mockup
  image: string; // path to real screenshot in public directory
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

export const LIVE_WORKS: LiveWork[] = [
  {
    id: "bajrang-fitness",
    title: "Bajrang Fitness Hub",
    subtitle: "Gym Membership Management System",
    description:
      "A live production app used by real trainers to track gym memberships, payments and member activity — deployed on Vercel.",
    techStack: ["Next.js", "React", "Vercel", "Full Stack"],
    liveUrl: "https://bajrangfitnesshub.vercel.app/",
    githubUrl: "https://github.com/darksinnnn/GymManagementApp",
    accent: "#ec4899",
    accentBg: "rgba(236,72,153,0.05)",
    image: "/live-works/bajrang-fitness.png",
  },
  {
    id: "hr-workflow",
    title: "HR Workflow Designer",
    subtitle: "Visual HR Process Automation Platform",
    description:
      "A premium SaaS-grade drag-and-drop workflow designer for HR admins. Build, configure and simulate onboarding, leave approval and document verification pipelines visually.",
    techStack: ["React 19", "TypeScript", "Vite", "React Flow", "Zustand"],
    liveUrl: "https://hr-automation-kappa.vercel.app",
    githubUrl: "https://github.com/darksinnnn/HR-automation",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,0.05)",
    image: "/live-works/hr-workflow.png",
  },
  {
    id: "golf-heroes",
    title: "Golf Heroes",
    subtitle: "Play, Win & Give Back",
    description:
      "A full-stack golf community platform with Stableford score tracking, monthly prize draws, subscription billing via Stripe, and charitable contribution routing. Built on Next.js + Supabase.",
    techStack: ["Next.js", "Supabase", "Stripe", "React", "Lenis"],
    liveUrl: "https://golfclub-xi.vercel.app",
    githubUrl: "https://github.com/darksinnnn/golfclub",
    accent: "#22c55e",
    accentBg: "rgba(34,197,94,0.05)",
    image: "/live-works/golf-heroes.png",
  },
];

export const PROJECTS: ProjectData[] = [
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
      dates: "June 2025 – Feb 2026",
      accomplishments: [
        "Engineered a React Native full-stack mobile app serving 10,000+ users; built responsive UI components and a high-performance WebView layer for cross-platform consistency",
        "Implemented OAuth 2.0 authentication flows with secure session management, diagnosing and resolving critical authentication failures across frontend and backend layers",
        "Built an automation service in Go to handle leave/attendance workflows via the Telegram Bot API, integrating backend logic with third-party messaging for real-time processing",
        "Architected the iOS counterpart using robust software engineering principles, ensuring parity with the Android experience",
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
