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
  detailedDescription: string;
  category: 'Infrastructure' | 'Automation' | 'DevOps';
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string[];
  solutions?: string[];
  metrics?: string[];
  image?: string;
  status?: 'completed' | 'in-progress' | 'planned';
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
    name: "Cloud & Infrastructure",
    skills: [
      { title: "AWS", icon: "FaAws", proficiency: 90 },
      { title: "Azure", icon: "FaMicrosoft", proficiency: 85 },
      { title: "Google Cloud", icon: "FaGoogle", proficiency: 70 },
      { title: "Terraform", icon: "SiTerraform", proficiency: 95 },
      { title: "Ansible", icon: "SiAnsible", proficiency: 85 },
      { title: "CloudFormation", icon: "FaAws", proficiency: 80 },
      { title: "Pulumi", icon: "SiPulumi", proficiency: 70 }
    ]
  },
  {
    name: "Container & Orchestration",
    skills: [
      { title: "Docker", icon: "FaDocker", proficiency: 95 },
      { title: "Kubernetes", icon: "SiKubernetes", proficiency: 90 },
      { title: "Helm", icon: "SiHelm", proficiency: 80 },
      { title: "OpenShift", icon: "SiRedhatopenshift", proficiency: 70 }
    ]
  },
  {
    name: "CI/CD & GitOps",
    skills: [
      { title: "Jenkins", icon: "FaJenkins", proficiency: 90 },
      { title: "GitLab CI", icon: "FaGitlab", proficiency: 85 },
      { title: "GitHub Actions", icon: "FaGithub", proficiency: 80 },
      { title: "Azure DevOps", icon: "FaMicrosoft", proficiency: 75 },
      { title: "Git", icon: "FaGitAlt", proficiency: 95 },
      { title: "ArgoCD", icon: "SiArgo", proficiency: 75 },
      { title: "FluxCD", icon: "SiFlux", proficiency: 70 }
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
    name: "Security & Policy",
    skills: [
      { title: "Vault", icon: "SiVault", proficiency: 80 },
      { title: "SAST/DAST", icon: "FaShieldAlt", proficiency: 75 },
      { title: "Compliance", icon: "FaCertificate", proficiency: 80 },
      { title: "OPA", icon: "SiOpenpolicyagent", proficiency: 70 },
      { title: "Falco", icon: "SiFalco", proficiency: 65 }
    ]
  },
  {
    name: "Programming & OS",
    skills: [
      { title: "Python", icon: "FaPython", proficiency: 90 },
      { title: "Bash", icon: "SiGnubash", proficiency: 85 },
      { title: "PowerShell", icon: "FaTerminal", proficiency: 75 },
      { title: "YAML", icon: "SiYaml", proficiency: 90 },
      { title: "JSON", icon: "SiJson", proficiency: 95 },
      { title: "Linux", icon: "FaLinux", proficiency: 90 },
      { title: "Windows", icon: "FaWindows", proficiency: 80 }
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
  },  {
    name: "Certified Kubernetes Administrator (CKA)",
    credentialId: "CKA-2024",
    credentialUrl: "https://www.cncf.io/certification/cka/",
    logo: "/certifications/kubernetes-cert.svg",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2024",
    validUntil: "2027",
    category: 'devops'
  },
  {
    name: "AWS Solutions Architect Associate",
    credentialId: "AWS-SAA-C03",
    credentialUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    logo: "/certifications/aws-cert.svg",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    validUntil: "2027",
    category: 'cloud'
  },
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    credentialId: "CISSP-2024",
    credentialUrl: "https://www.isc2.org/Certifications/CISSP",
    logo: "/certifications/cissp-cert.svg",
    issuer: "ISC2",
    issueDate: "2023",
    validUntil: "2026",
    category: 'security'
  },
  {
    name: "Docker Certified Associate",
    credentialId: "DCA-2024",
    credentialUrl: "https://www.docker.com/certification/",
    logo: "/certifications/docker-cert.svg",
    issuer: "Docker Inc",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  }
  // Add more certifications as needed
];

// Projects Data
export const projectsData: ProjectItem[] = [
  {
    id: 'cloud-infrastructure-migration',
    title: "Cloud Infrastructure Migration",
    description: "Enterprise-scale on-premise to AWS cloud migration with zero downtime",
    detailedDescription: "Architected and executed a comprehensive cloud migration strategy for a mission-critical infrastructure supporting 100+ microservices.",
    category: 'Infrastructure',
    tags: ["Cloud Migration", "High Availability", "Cost Optimization"],
    technologies: ["AWS", "Terraform", "Docker", "Route53", "EKS", "RDS"],
    githubUrl: "https://github.com/yourusername/cloud-migration",
    challenges: [
      "Complex legacy system dependencies with 24/7 availability requirement",
      "Data migration of 5TB+ with minimal downtime",
      "Multi-region failover requirements"
    ],
    solutions: [
      "Implemented blue-green deployment with automated rollback",
      "Designed custom data migration pipeline with parallel processing",
      "Set up cross-region replication with automated failover"
    ],
    metrics: [
      "Achieved 99.99% uptime during migration",
      "Reduced infrastructure costs by 40%",
      "Improved system response time by 60%"
    ],
    status: "completed"
  },
  {
    id: 'kubernetes-platform-engineering',
    title: "Kubernetes Platform Engineering",
    description: "Production-grade Kubernetes platform with automated scaling and self-healing",
    detailedDescription: "Designed and implemented a robust Kubernetes platform supporting multiple development teams and environments.",
    category: 'Infrastructure',
    tags: ["Container Orchestration", "Platform Engineering"],
    technologies: ["Kubernetes", "Helm", "Prometheus", "Grafana", "ArgoCD", "Istio"],
    githubUrl: "https://github.com/yourusername/k8s-platform",
    challenges: [
      "Multi-tenant cluster security requirements",
      "Complex monitoring and alerting needs",
      "Automated disaster recovery"
    ],
    solutions: [
      "Implemented network policies and pod security policies",
      "Set up comprehensive monitoring with custom dashboards",
      "Automated backup and restore procedures"
    ],
    metrics: [
      "Supporting 200+ microservices",
      "99.99% platform availability",
      "70% reduction in deployment time"
    ],
    status: "completed"
  },
  {
    id: 'gitops-cicd-pipeline',
    title: "GitOps CI/CD Pipeline",
    description: "Fully automated GitOps pipeline with advanced deployment strategies",
    detailedDescription: "End-to-end CI/CD automation implementing GitOps principles for a microservices architecture.",
    category: 'Automation',
    tags: ["CI/CD", "GitOps", "Automation"],
    technologies: ["ArgoCD", "GitHub Actions", "Terraform", "Docker"],
    githubUrl: "https://github.com/yourusername/gitops-pipeline",
    challenges: [
      "Complex dependency management across services",
      "Strict security compliance requirements",
      "Multiple environment configurations"
    ],
    solutions: [
      "Implemented Helm charts for dependency management",
      "Integrated security scanning in pipeline",
      "Created dynamic environment provisioning"
    ],
    metrics: [
      "Reduced deployment time from hours to minutes",
      "Zero failed productions deployments",
      "100% audit compliance"
    ],
    status: "completed"
  },
  {
    id: 'multi-region-disaster-recovery',
    title: "Multi-Region Disaster Recovery",
    description: "Designed and implemented a comprehensive DR strategy with automated failover across multiple regions",
    detailedDescription: "Enterprise-grade disaster recovery solution ensuring business continuity with minimal data loss and downtime.",
    category: 'Infrastructure',
    tags: ["Disaster Recovery", "High Availability", "Cloud Architecture"],
    technologies: ["Azure Site Recovery", "Traffic Manager", "PowerShell", "Terraform"],
    githubUrl: "https://github.com/yourusername/dr-automation",
    challenges: [
      "RPO/RTO requirements under 15 minutes",
      "Complex database synchronization",
      "Regulatory compliance requirements"
    ],
    solutions: [
      "Implemented active-active architecture",
      "Automated failover testing",
      "Real-time data replication"
    ],
    metrics: [
      "Achieved RPO of < 5 minutes",
      "Reduced failover time by 80%",
      "100% successful DR tests"
    ],
    status: "completed"
  },
  {
    id: 'devsecops-pipeline-enhancement',
    title: "DevSecOps Pipeline Enhancement",
    description: "Integrated security scanning and compliance checks into the CI/CD pipeline",
    detailedDescription: "Advanced DevSecOps implementation with automated security testing, vulnerability scanning, and compliance verification.",
    category: 'Automation',
    tags: ["Security", "Compliance", "CI/CD"],
    technologies: ["SonarQube", "Snyk", "OWASP", "Jenkins", "Artifactory"],
    githubUrl: "https://github.com/yourusername/devsecops-pipeline",
    challenges: [
      "Integration of multiple security tools",
      "Minimal pipeline performance impact",
      "Compliance with SOC2 requirements"
    ],
    solutions: [
      "Parallel security scanning implementation",
      "Custom policy-as-code framework",
      "Automated security reporting"
    ],
    metrics: [
      "90% reduction in security vulnerabilities",
      "Compliance verification time reduced by 75%",
      "Zero security incidents post-deployment"
    ],
    status: "completed"
  },
  {
    id: 'container-platform-optimization',
    title: "Container Platform Optimization",
    description: "Optimized Kubernetes cluster performance and resource utilization",
    detailedDescription: "Comprehensive Kubernetes platform optimization project focusing on cost efficiency and performance.",
    category: 'DevOps',
    tags: ["Kubernetes", "Performance", "Cost Optimization"],
    technologies: ["Kubernetes", "Prometheus", "Grafana", "Horizontal Pod Autoscaling"],
    githubUrl: "https://github.com/yourusername/k8s-optimization",
    challenges: [
      "High infrastructure costs",
      "Resource underutilization",
      "Performance bottlenecks"
    ],
    solutions: [
      "Implemented pod right-sizing",
      "Custom autoscaling algorithms",
      "Resource quota management"
    ],
    metrics: [
      "45% reduction in cloud costs",
      "30% improvement in resource utilization",
      "99.99% platform availability maintained"
    ],
    status: "completed"
  },
  {
    id: 'zero-trust-security-implementation',
    title: "Zero-Trust Security Implementation",
    description: "Implemented zero-trust architecture across cloud infrastructure",
    detailedDescription: "Complete zero-trust security model implementation with identity-based access control and network segmentation.",
    category: 'Infrastructure',
    tags: ["Security", "Zero-Trust", "IAM"],
    technologies: ["Azure AD", "NSGs", "Service Endpoints", "Private Link"],
    githubUrl: "https://github.com/yourusername/zero-trust-implementation",
    challenges: [
      "Legacy system integration",
      "Minimal user experience impact",
      "Complex service dependencies"
    ],
    solutions: [
      "Implemented service mesh with mTLS",
      "Just-in-time access provisioning",
      "Automated certificate management"
    ],
    metrics: [
      "100% encrypted service-to-service communication",
      "75% reduction in attack surface",
      "Zero unauthorized access attempts"
    ],
    status: "completed"
  },
  {
    id: 'infrastructure-as-code-migration',
    title: "Infrastructure as Code Migration",
    description: "Migrated manual infrastructure provisioning to Infrastructure as Code",
    detailedDescription: "Large-scale migration of manually provisioned infrastructure to Terraform with state management and modular design.",
    category: 'Automation',
    tags: ["IaC", "Terraform", "Automation"],
    technologies: ["Terraform", "Azure DevOps", "Python", "Go"],
    githubUrl: "https://github.com/yourusername/terraform-migration",
    challenges: [
      "Complex existing infrastructure",
      "Minimal downtime requirement",
      "State management complexity"
    ],
    solutions: [
      "Developed custom Terraform modules",
      "Automated state migration tool",
      "Progressive infrastructure adoption"
    ],
    metrics: [
      "100% infrastructure documented as code",
      "Deployment time reduced by 90%",
      "Zero production incidents during migration"
    ],
    status: "completed"
  }
];
