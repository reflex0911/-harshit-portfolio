export const profile = {
  name: "Harshit Batham",
  handle: "@reflex0911",
  headline: "IT Support & Web Developer",
  tagline: "BCA graduate crafting reliable systems, clean interfaces and helpful experiences.",
  location: "Kanpur, Uttar Pradesh, India",
  email: "hbatham910@gmail.com",
  phone: "+91 9628977111",
  linkedin: "https://linkedin.com/in/harshit-batham",
  github: "https://github.com/reflex0911",
  resumeUrl: "/Harshit_Batham_Resume.pdf",
  summary:
    "Motivated, detail-oriented IT fresher with hands-on experience in technical troubleshooting, web development and digital tools. Comfortable across Windows environments, basic networking and modern productivity stacks. Seeking opportunities in Technology, UI/UX Design, Product, Analyst, Consulting and Operations.",
  objective:
    "To join a forward-thinking team where I can apply technical and creative skills to deliver responsive, high-quality work — and grow into a well-rounded technology professional.",
};

export const typingRoles = [
  "IT Support Specialist",
  "Web Developer",
  "UI/UX Designer",
  "Product Thinker",
  "Data Analyst",
];

export const skillGroups = [
  {
    title: "Technical",
    items: [
      "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
      "Git", "GitHub", "Windows 10/11", "Linux Basics",
      "Networking (LAN/WAN, DNS, DHCP)", "Troubleshooting",
    ],
  },
  {
    title: "Design",
    items: ["UI Design", "UX Design", "Wireframing", "Prototyping", "Figma", "Photoshop", "Premiere Pro", "Canva"],
  },
  {
    title: "Business & Soft",
    items: ["Communication", "Problem Solving", "Team Collaboration", "Data Analysis", "MS Excel", "Google Sheets", "META Ads Manager", "Time Management"],
  },
] as const;

export type Project = {
  title: string;
  category: "Web" | "Design" | "IT Support";
  description: string;
  tech: string[];
  metric: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Smart Learning Planner",
    category: "Web",
    description:
      "Digital planning platform for students with task scheduling, deadline tracking and productivity dashboards. Designed in Figma, built with HTML/CSS/JS.",
    tech: ["HTML", "CSS", "JavaScript", "Figma"],
    metric: "BCA Major Project",
    github: "#",
    live: "https://smart-planner-qovs.vercel.app/",
  },
  {
    title: "Hype Kicks — E-commerce",
    category: "Web",
    description:
      "Responsive sneaker storefront with product listings, navigation and interactive UI components.",
    tech: ["HTML", "CSS", "JavaScript"],
    metric: "100% Responsive",
    github: "#",
    live: "https://hypekicks-gold.vercel.app/",
  },
  {
    title: "Network Troubleshooting Guide",
    category: "IT Support",
    description:
      "Step-by-step Level 1 IT reference covering router failures, IP conflicts, DNS errors and Wi-Fi drops using ipconfig, ping and tracert.",
    tech: ["Windows", "Networking", "Documentation"],
    metric: "Reusable L1 SOP",
    github: "#",
  },
];

export const experience = [
  {
    role: "Graphics Designer & Video Editor",
    company: "K2 Technologies",
    location: "Kanpur",
    period: "Jan 2025 – Aug 2025",
    points: [
      "Delivered creative visual assets and edited marketing video content.",
      "Consistently met project deadlines and client brief requirements.",
    ],
  },
  {
    role: "Social Media Intern",
    company: "Digibask",
    location: "Kanpur",
    period: "Nov 2024 – Dec 2024",
    points: [
      "Assisted in planning and executing social media campaigns.",
      "Tracked engagement metrics and reported performance to the team.",
    ],
  },
];

export const education = [
  { degree: "Bachelor of Computer Applications (BCA)", school: "Vision College of Management, CSJM University, Kanpur", detail: "" },
  { degree: "Class XII — UP Board", school: "St. John's Higher Secondary School, Kanpur", detail: "2023 · 61%" },
  { degree: "Class X — UP Board", school: "St. John's Higher Secondary School, Kanpur", detail: "2023 · 83%" },
];

export const certifications = [
  { name: "Web Development", issuer: "Great Learning", url: "#" },
  { name: "Graphic Designing — Adobe Photoshop", issuer: "Coursera", url: "#" },
  { name: "Artificial Intelligence: Prompt Elements", issuer: "AI Academia", url: "#" },
];

export const achievements = [
  { label: "Projects Shipped", value: 6, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Tools Mastered", value: 15, suffix: "+" },
];

export const testimonials = [
  {
    quote: "Harshit pairs clean execution with a calm, helpful attitude — exactly what a support team needs.",
    name: "Mentor",
    role: "Vision College of Management",
  },
  {
    quote: "Delivered our marketing visuals on time, every time. Reliable and detail-oriented.",
    name: "Team Lead",
    role: "K2 Technologies",
  },
  {
    quote: "A quick learner who understands both the technical and human sides of a problem.",
    name: "Coordinator",
    role: "Digibask",
  },
];

export const posts = [
  { title: "What a Level-1 IT ticket actually teaches you", excerpt: "Hands-on lessons from documenting a real troubleshooting playbook.", tag: "IT Support" },
  { title: "From Figma to a responsive front-end", excerpt: "How I translated student-planner wireframes into a working UI.", tag: "Design" },
  { title: "Tiny habits that compounded my learning", excerpt: "The unsexy routines behind every project I've shipped.", tag: "Growth" },
];