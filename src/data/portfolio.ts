// Portfolio Data Configuration
// Update this file to modify your portfolio content without touching component code

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface AboutData {
  description: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
  type: 'work' | 'education';
  icon: string;
  phase: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    title: string;
    icon: string; // Icon name from react-icons
    proficiency?: number; // 1-100
  }[];
}

export interface Certification {
  name: string;
  credentialId: string;
  credentialUrl: string;
  logo: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  category: 'cloud' | 'devops' | 'security' | 'programming';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
}

// Personal Information
export const personalInfo: PersonalInfo = {  name: "Shyam Nalluri",
  title: "Senior DevOps Engineer",
  subtitle: "DevSecOps & Platform Engineer",
  description: "Architecting enterprise-grade cloud infrastructure with 5+ years of expertise in DevSecOps and platform automation",
  location: "India",
  email: "shyam.nalluri@example.com", // Update with your actual email
  phone: "+91-XXXXXXXXXX", // Update with your actual phone
  website: "https://shyamnalluri.dev", // Update with your actual website
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/shyamnalluri",
    github: "https://github.com/shyamnalluri",
    // twitter: "https://twitter.com/shyamnalluri", // Optional
    // instagram: "https://instagram.com/shyamnalluri", // Optional
  }
};

// About Section Data
export const aboutData: AboutData = {
  description: [
    "I'm a seasoned DevSecOps and Platform Engineer with over 5 years of experience in delivering scalable, secure infrastructure and platform automation across AWS and Azure. Currently serving as Senior DevOps Engineer at Kyndryl India, I specialize in cloud architecture, CI/CD pipeline optimization, and security-first automation solutions.",
    "My expertise spans Infrastructure as Code, container orchestration with Kubernetes, and implementing GitOps workflows. I hold multiple certifications including Azure AZ-900, AWS Technical Accredited, and HashiCorp Terraform Associate. I've successfully reduced deployment times by 75% while maintaining enterprise-grade security and compliance standards."
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Cloud Platforms", value: "2+" },
    { label: "Certifications", value: "5+" }
  ]
};

// Experience & Education Data
export const experienceData: ExperienceItem[] = [
  {
    id: 'devops-engineer-riversafe',
    title: "DevOps Engineer",
    company: "Riversafe ltd",
    period: "Sep 2022 - Present",
    description: "Leading DevSecOps initiatives and platform automation for enterprise clients, architecting secure cloud-native solutions across AWS and Azure environments.",
    phase: "Enterprise Leadership & Innovation",
    type: 'work',
    icon: '🚀',
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "Ansible", "Jenkins", "Docker", "Python", "GitOps", "Helm"],
    achievements: [
      "Designed and implemented enterprise-grade CI/CD pipelines reducing deployment time by 75%",
      "Led cloud migration projects for 10+ enterprise clients with zero downtime",
      "Architected secure infrastructure serving 100K+ users with 99.99% uptime",
      "Implemented Infrastructure as Code reducing provisioning errors by 90%",
      "Mentored junior team members on DevSecOps best practices and automation"
    ]
  },
  {
    id: 'devops-engineer-bp',
    title: "Developer Tooling Specialist",
    company: "BP p.l.c.",
    period: "May 2023 - Dec 2024",
    description: "Specialized in container orchestration, automation frameworks, and cloud infrastructure management with focus on scalability and security.",
    phase: "Automation & Container Orchestration",
    type: 'work',
    icon: '⚙️',
    technologies: ["Kubernetes", "Docker", "Terraform", "AWS", "Python", "Bash", "Git", "Prometheus", "Grafana"],
    achievements: [
      "Automated infrastructure provisioning using Terraform reducing manual effort by 80%",
      "Implemented comprehensive monitoring and alerting systems",
      "Standardized container deployment processes across multiple environments",
      "Improved system reliability achieving 99.9% uptime SLA"
    ]
  },
  {
    id: 'devops-engineer-globex',
    title: "Junior DevOps Engineer",
    company: "Globex Digital Solutions",
    period: "May 2018 - Dec 2019",
    description: "Foundation building in system administration, automation scripting, and infrastructure management with emphasis on Linux environments.",
    phase: "Foundation & Automation",
    type: 'work',
    icon: '🔧',
    technologies: ["Linux", "Python", "Shell Scripting", "VMware", "Docker", "Git", "Nagios"],
    achievements: [
      "Automated system backup and recovery processes reducing downtime by 60%",
      "Optimized server performance through systematic monitoring and tuning",
      "Implemented configuration management for 50+ servers",
      "Created comprehensive documentation and runbooks for operational procedures"
    ]
  },
  {
    id: 'msc-cs',
    title: "Masters in Computer Science",
    institution: "University of East London",
    period: "2015 - 2017",
    description: "Advanced studies in Cloud Computing, Distributed Systems, and Software Engineering with focus on scalable system architecture and modern DevOps practices.",
    phase: "Advanced Academic Excellence",
    type: 'education',
    icon: '🎓',
    achievements: [
      "Specialized in Cloud Computing and Distributed Systems",
      "Dissertation: 'Automated Infrastructure Management in Cloud Environments'",
      "Research focus on DevOps methodologies and automation frameworks",
      "Merit distinction in Cloud Architecture and System Design modules"
    ]
  },
  {
    id: 'btech-cs',
    title: "Bachelor of Technology in Computer Science",
    institution: "Jawaharlal Nehru Technological University Hyderabad (JNTUH)",
    period: "2011 - 2015",
    description: "Comprehensive foundation in Computer Science and Engineering with emphasis on Software Development, System Architecture, and Programming fundamentals.",
    phase: "Core Engineering Foundation",
    type: 'education',
    icon: '📚',
    achievements: [
      "Strong foundation in Computer Science fundamentals and programming",
      "Final year project on 'Automated System Monitoring and Management'",
      "Active participation in technical societies and coding competitions",
      "Consistent academic performance with focus on system design and architecture"
    ]
  }
];

// Skills Data
export const skillsData: SkillCategory[] = [
  {
    name: "Cloud Platforms",
    skills: [
      { title: "AWS", icon: "FaAws", proficiency: 90 },
      { title: "Azure", icon: "FaMicrosoft", proficiency: 85 },
      { title: "Google Cloud", icon: "FaGoogle", proficiency: 70 }
    ]
  },
  {
    name: "Infrastructure & Config",
    skills: [
      { title: "Terraform", icon: "SiTerraform", proficiency: 95 },
      { title: "Ansible", icon: "SiAnsible", proficiency: 85 },
      { title: "CloudFormation", icon: "FaAws", proficiency: 80 },
      { title: "Pulumi", icon: "SiPulumi", proficiency: 70 }
    ]
  },
  {
    name: "CI/CD & DevOps",
    skills: [
      { title: "Jenkins", icon: "FaJenkins", proficiency: 90 },
      { title: "GitLab CI", icon: "FaGitlab", proficiency: 85 },
      { title: "GitHub Actions", icon: "FaGithub", proficiency: 80 },
      { title: "Azure DevOps", icon: "FaMicrosoft", proficiency: 75 },
      { title: "Git", icon: "FaGitAlt", proficiency: 95 }
    ]
  },
  {
    name: "Programming & Scripting",
    skills: [
      { title: "Python", icon: "FaPython", proficiency: 90 },
      { title: "Bash", icon: "SiGnubash", proficiency: 85 },
      { title: "PowerShell", icon: "FaTerminal", proficiency: 75 },
      { title: "YAML", icon: "SiYaml", proficiency: 90 },
      { title: "JSON", icon: "SiJson", proficiency: 95 }
    ]
  },
  {
    name: "Containers & Orchestration",
    skills: [
      { title: "Docker", icon: "FaDocker", proficiency: 95 },
      { title: "Kubernetes", icon: "SiKubernetes", proficiency: 90 },
      { title: "Helm", icon: "SiHelm", proficiency: 80 },
      { title: "OpenShift", icon: "SiRedhatopenshift", proficiency: 70 }
    ]
  },
  {
    name: "Monitoring & Observability",
    skills: [
      { title: "Prometheus", icon: "SiPrometheus", proficiency: 85 },
      { title: "Grafana", icon: "SiGrafana", proficiency: 80 },
      { title: "ELK Stack", icon: "SiElastic", proficiency: 75 },
      { title: "Datadog", icon: "SiDatadog", proficiency: 70 },
      { title: "Nagios", icon: "FaServer", proficiency: 75 }
    ]
  },
  {
    name: "Security & Compliance",
    skills: [
      { title: "Vault", icon: "SiVault", proficiency: 80 },
      { title: "SAST/DAST", icon: "FaShieldAlt", proficiency: 75 },
      { title: "Compliance", icon: "FaCertificate", proficiency: 80 }
    ]
  }
];

// Certifications Data
export const certificationsData: Certification[] = [
  {
    name: "Microsoft Azure Fundamentals",
    credentialId: "AZ-900",
    credentialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    logo: "/certifications/azure-cert.svg",
    issuer: "Microsoft",
    issueDate: "2023",
    validUntil: "Never expires",
    category: 'cloud'
  },
  {
    name: "AWS Technical Accredited",
    credentialId: "AWS-TA",
    credentialUrl: "https://aws.amazon.com/training/",
    logo: "/certifications/aws-cert.svg",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    validUntil: "2026",
    category: 'cloud'
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    credentialId: "TERRAFORM-003",
    credentialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    logo: "/certifications/terraform-cert.svg",
    issuer: "HashiCorp",
    issueDate: "2023",
    validUntil: "2025",
    category: 'devops'
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    credentialId: "CKA-2024",
    credentialUrl: "https://www.cncf.io/certification/cka/",
    logo: "/certifications/kubernetes-cert.svg",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2024",
    validUntil: "2027",
    category: 'devops'
  }
  // Add more certifications as needed
];

// Projects Data (for future use)
export const projectsData: ProjectItem[] = [
  // Add your projects here when you're ready to update the Projects section
  {
    id: 'enterprise-cicd',
    title: "Enterprise CI/CD Pipeline",
    description: "Automated deployment pipeline for microservices architecture",
    technologies: ["Jenkins", "Kubernetes", "Docker", "Terraform"],
    features: [
      "Zero-downtime deployments",
      "Automated testing integration",
      "Multi-environment support",
      "Security scanning"
    ],
    githubUrl: "https://github.com/shyamnalluri/enterprise-cicd",
    image: "/images/projects/cicd-pipeline.jpg",
    category: "DevOps",
    status: "completed"
  }
  // Add more projects as needed
];
