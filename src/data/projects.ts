// Projects Section Data
// Update this file to modify your projects

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
  architectureImage?: string;
  status?: 'completed' | 'in-progress' | 'planned';
}

export const projectsData: ProjectItem[] = [
  {
    id: 'cloud-infrastructure-migration',
    title: 'Cloud Infrastructure Migration',
    description: 'Enterprise-scale on-premise to AWS cloud migration with zero downtime',
    detailedDescription:
      'Architected and executed a comprehensive cloud migration strategy for a mission-critical infrastructure supporting 100+ microservices.',
    category: 'Infrastructure',
    tags: ['Cloud Migration', 'High Availability', 'Cost Optimization'],
    technologies: ['AWS', 'Terraform', 'Docker', 'Route53', 'EKS', 'RDS'],
    githubUrl: 'https://github.com/yourusername/cloud-migration',
    challenges: [
      'Complex legacy system dependencies with 24/7 availability requirement',
      'Data migration of 5TB+ with minimal downtime',
      'Multi-region failover requirements',
    ],
    solutions: [
      'Implemented blue-green deployment with automated rollback',
      'Designed custom data migration pipeline with parallel processing',
      'Set up cross-region replication with automated failover',
    ],
    metrics: [
      'Achieved 99.99% uptime during migration',
      'Reduced infrastructure costs by 40%',
      'Improved system response time by 60%',
    ],
    status: 'completed',
  },
  {
    id: 'kubernetes-platform-engineering',
    title: 'Kubernetes Platform Engineering',
    description: 'Production-grade Kubernetes platform with automated scaling and self-healing',
    detailedDescription:
      'Designed and implemented a robust Kubernetes platform supporting multiple development teams and environments.',
    category: 'Infrastructure',
    tags: ['Container Orchestration', 'Platform Engineering'],
    technologies: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD', 'Istio'],
    githubUrl: 'https://github.com/yourusername/k8s-platform',
    challenges: [
      'Multi-tenant cluster security requirements',
      'Complex monitoring and alerting needs',
      'Automated disaster recovery',
    ],
    solutions: [
      'Implemented network policies and pod security policies',
      'Set up comprehensive monitoring with custom dashboards',
      'Automated backup and restore procedures',
    ],
    metrics: [
      'Supporting 200+ microservices',
      '99.99% platform availability',
      '70% reduction in deployment time',
    ],
    status: 'completed',
  },
  {
    id: 'gitops-cicd-pipeline',
    title: 'GitOps CI/CD Pipeline',
    description: 'Fully automated GitOps pipeline with advanced deployment strategies',
    detailedDescription:
      'End-to-end CI/CD automation implementing GitOps principles for a microservices architecture.',
    category: 'Automation',
    tags: ['CI/CD', 'GitOps', 'Automation'],
    technologies: ['ArgoCD', 'GitHub Actions', 'Terraform', 'Docker'],
    githubUrl: 'https://github.com/yourusername/gitops-pipeline',
    challenges: [
      'Complex dependency management across services',
      'Strict security compliance requirements',
      'Multiple environment configurations',
    ],
    solutions: [
      'Implemented Helm charts for dependency management',
      'Integrated security scanning in pipeline',
      'Created dynamic environment provisioning',
    ],
    metrics: [
      'Reduced deployment time from hours to minutes',
      'Zero failed productions deployments',
      '100% audit compliance',
    ],
    status: 'completed',
  },
  {
    id: 'multi-region-disaster-recovery',
    title: 'Multi-Region Disaster Recovery',
    description:
      'Designed and implemented a comprehensive DR strategy with automated failover across multiple regions',
    detailedDescription:
      'Enterprise-grade disaster recovery solution ensuring business continuity with minimal data loss and downtime.',
    category: 'Infrastructure',
    tags: ['Disaster Recovery', 'High Availability', 'Cloud Architecture'],
    technologies: ['Azure Site Recovery', 'Traffic Manager', 'PowerShell', 'Terraform'],
    githubUrl: 'https://github.com/yourusername/dr-automation',
    challenges: [
      'RPO/RTO requirements under 15 minutes',
      'Complex database synchronization',
      'Regulatory compliance requirements',
    ],
    solutions: [
      'Implemented active-active architecture',
      'Automated failover testing',
      'Real-time data replication',
    ],
    metrics: [
      'Achieved RPO of < 5 minutes',
      'Reduced failover time by 80%',
      '100% successful DR tests',
    ],
    status: 'completed',
  },
  {
    id: 'devsecops-pipeline-enhancement',
    title: 'DevSecOps Pipeline Enhancement',
    description: 'Integrated security scanning and compliance checks into the CI/CD pipeline',
    detailedDescription:
      'Advanced DevSecOps implementation with automated security testing, vulnerability scanning, and compliance verification.',
    category: 'Automation',
    tags: ['Security', 'Compliance', 'CI/CD'],
    technologies: ['SonarQube', 'Snyk', 'OWASP', 'Jenkins', 'Artifactory'],
    githubUrl: 'https://github.com/yourusername/devsecops-pipeline',
    challenges: [
      'Integration of multiple security tools',
      'Minimal pipeline performance impact',
      'Compliance with SOC2 requirements',
    ],
    solutions: [
      'Parallel security scanning implementation',
      'Custom policy-as-code framework',
      'Automated security reporting',
    ],
    metrics: [
      '90% reduction in security vulnerabilities',
      'Compliance verification time reduced by 75%',
      'Zero security incidents post-deployment',
    ],
    status: 'completed',
  },
  {
    id: 'container-platform-optimization',
    title: 'Container Platform Optimization',
    description: 'Optimized Kubernetes cluster performance and resource utilization',
    detailedDescription:
      'Comprehensive Kubernetes platform optimization project focusing on cost efficiency and performance.',
    category: 'DevOps',
    tags: ['Kubernetes', 'Performance', 'Cost Optimization'],
    technologies: ['Kubernetes', 'Prometheus', 'Grafana', 'Horizontal Pod Autoscaling'],
    githubUrl: 'https://github.com/yourusername/k8s-optimization',
    challenges: [
      'High infrastructure costs',
      'Resource underutilization',
      'Performance bottlenecks',
    ],
    solutions: [
      'Implemented pod right-sizing',
      'Custom autoscaling algorithms',
      'Resource quota management',
    ],
    metrics: [
      '45% reduction in cloud costs',
      '30% improvement in resource utilization',
      '99.99% platform availability maintained',
    ],
    status: 'completed',
  },
  {
    id: 'zero-trust-security-implementation',
    title: 'Zero-Trust Security Implementation',
    description: 'Implemented zero-trust architecture across cloud infrastructure',
    detailedDescription:
      'Complete zero-trust security model implementation with identity-based access control and network segmentation.',
    category: 'Infrastructure',
    tags: ['Security', 'Zero-Trust', 'IAM'],
    technologies: ['Azure AD', 'NSGs', 'Service Endpoints', 'Private Link'],
    githubUrl: 'https://github.com/yourusername/zero-trust-implementation',
    challenges: [
      'Legacy system integration',
      'Minimal user experience impact',
      'Complex service dependencies',
    ],
    solutions: [
      'Implemented service mesh with mTLS',
      'Just-in-time access provisioning',
      'Automated certificate management',
    ],
    metrics: [
      '100% encrypted service-to-service communication',
      '75% reduction in attack surface',
      'Zero unauthorized access attempts',
    ],
    status: 'completed',
  },
  {
    id: 'infrastructure-as-code-migration',
    title: 'Infrastructure as Code Migration',
    description: 'Migrated manual infrastructure provisioning to Infrastructure as Code',
    detailedDescription:
      'Large-scale migration of manually provisioned infrastructure to Terraform with state management and modular design.',
    category: 'Automation',
    tags: ['IaC', 'Terraform', 'Automation'],
    technologies: ['Terraform', 'Azure DevOps', 'Python', 'Go'],
    githubUrl: 'https://github.com/yourusername/terraform-migration',
    challenges: [
      'Complex existing infrastructure',
      'Minimal downtime requirement',
      'State management complexity',
    ],
    solutions: [
      'Developed custom Terraform modules',
      'Automated state migration tool',
      'Progressive infrastructure adoption',
    ],
    metrics: [
      '100% infrastructure documented as code',
      'Deployment time reduced by 90%',
      'Zero production incidents during migration',
    ],
    status: 'completed',
  },
];
