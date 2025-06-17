// Experience Section Data
// Update this file to modify your work experience and education

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

export const experienceData: ExperienceItem[] =  [
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
